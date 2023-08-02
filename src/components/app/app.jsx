import React, { useState, useEffect } from 'react';
import { Layout, Space } from 'antd';
import MovieApi from '../../service/movie-api';
import LoaderRotate from '../UI/loader/loader';
import { useFetching } from '../castomHuks/useFetching';
import Search from '../search/searchMovie';
import GetList from '../get-list/get-list';
import { useOnlineOfline } from '../castomHuks/useOnlineOfline';
import './app.css';
import AlertError from '../UI/alert-error/alert-error';
import PaginationMovie from '../pagination/pagination';
const { Header, Footer, Content } = Layout;

const App = () => {
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
    color: '#fff',
    backgroundColor: '#7dbcea',
  };

  const moveiApi = new MovieApi();
  const [movies, setMovies] = useState([]);
  const isOnline = useOnlineOfline();
  const [noResults, setNoResults] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [fetchMovies, loading, error, errorType, currentPage, setCurrentPage] = useFetching(async (query, page) => {
    setCurrentPage(1);
    const data = await moveiApi.searchMovie(query, page); 
    if (data.results.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    setMovies(data.results);
    console.log(data.results);
  });

  useEffect(() => {
    fetchMovies(setCurrentPage);
  }, [setCurrentPage]);

  

  let errorMessage = null;
  if (error) {
    switch (errorType) {
      case 'clientError':
        errorMessage = <AlertError 
        type="error" 
        message="Client error: This is an error message about copywriting." />;
        break;
      case 'serverError':
        errorMessage = <AlertError 
        type="error" 
        message="Server error: This is an error message about copywriting." />;
        break;
      default:
        errorMessage = <AlertError 
        type="error" 
        message="Unknown error: This is an error message about copywriting." />;
        break;
    }
  }

  return (
    <Space direction="vertical" size={[0, 48]} style={{ width: '100%' }}>
      {!isOnline ? (
        <div className="offline-message">
          <h1>Offline</h1>
          <p>Please check your internet connection and try again.</p>
          <div className="imageOfline" />
        </div>
      ) : (
        <Layout className="layout">
          <Header style={headerStyle}></Header>
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Search searchMovie={fetchMovies} />
          </div>
          {errorMessage}
          <Content className="Content" style={{ ...contentStyle, height: '100%' }}>
          {loading ? (
              <LoaderRotate />
            ) : noResults ? (
              <p>Нашел что искал ? Попробуй снова</p>
            ) : (
              <GetList movies={movies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} />
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
      )}
    </Space>
  );
};

export default App;
