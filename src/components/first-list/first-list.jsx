import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Space } from 'antd';
import MovieApi from '../../service/movie-api';
import LoaderRotate from '../UI/loader/loader';
import { useFetching } from '../castomHuks/useFetching';
import Search from '../search/searchMovie';
import GetList from '../get-list/get-list';
import './first-list.css';
import AlertError from '../UI/alert-error/alert-error';
import PaginationMovie from '../pagination/pagination';
const { Header, Footer, Content } = Layout;

const FirstList = () => {
  const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#fff',
  };

  const contentStyle = {
    minHeight: 120,
    color: '#000',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const footerStyle = {
    textAlign: 'center',
    backgroundColor: '#fff',
  };

  const moveiApi = new MovieApi();
  const [movies, setMovies] = useState([]);
  
  const [noResults, setNoResults] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [fetchMovies, loading, error, errorType, currentPage, setCurrentPage] = useFetching(async (query, page) => {
    setCurrentPage(1);
    const data = await moveiApi.searchMovie(query, page); 
    if (data.results.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    setMovies(data.results);
  }, guestSessionId);

  
  const createGuestSession = useCallback(async () => {
    const initialRating = 0;
    try {
      const response = await moveiApi.rateMovie(initialRating); 
      console.log(response);
      setGuestSessionId(response.guest_session_id);
      console.log(response.guest_session_id);
    } catch (error) {
      console.error("Error creating guest session:", error);
    }
  }, []);

  useEffect(() => {
    createGuestSession();

    fetchMovies(setCurrentPage);
  }, [createGuestSession, setCurrentPage]);

  

  let errorMessage = null;
  if (error) {
    switch (errorType) {
      case 'clientError':
        errorMessage = <AlertError 
        type="error" 
        message="Oops! Something went wrong on our end. Please try again later." />;
        break;
      case 'serverError':
        errorMessage = <AlertError 
        type="error" 
        message="Server Error: We apologize,
         but our server encountered an issue. 
         Please try again later. If the problem persists, 
         feel free to contact our support team." />;
        break;
      default:
        errorMessage = <AlertError 
        type="error" 
        message="Unknown error: Oops, something mysterious happened!
         Our team is on the case, but it seems
         like they've gone out for coffee. Hang tight and keep 
         smiling while we figure things out.&#x2615;&#x1F604;" />;
        break;
    }
  }
  const resetState = () => {
    setMovies([]);
    setNoResults(false);
    setItemsPerPage(6);
    setGuestSessionId(null);
  };

  const handleSearchCancel = () => {
    resetState();
  };

  return (
    <Space direction="vertical" size={[0, 48]} style={{ width: '100%' }}>
        <Layout className="layout">
          <Header style={headerStyle}></Header>
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Search searchMovie={fetchMovies} onCancel={handleSearchCancel} />
          </div>
          {error && errorMessage}
          <Content className="Content" style={{ ...contentStyle, height: '100%' }}>
          {loading ? (
              <LoaderRotate />
            ) : noResults ? (
              <p>Начни вводить текст</p>
            ) : (
              <GetList movies={movies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
              guestSessionId={guestSessionId}
              createGuestSession={createGuestSession}
              />
            )}
          </Content>
          <Footer style={footerStyle}>
          <PaginationMovie
            current={currentPage}
            total={movies.length}
            pageSize={itemsPerPage}  
            onChange={(page) => setCurrentPage(page)}
          />
        </Footer>
        </Layout>
    </Space>
  );
};

export default FirstList;
