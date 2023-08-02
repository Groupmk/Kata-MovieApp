import React from 'react';
import { Alert, Space, Spin } from 'antd';
import './loader.css';
import './ждун.jpg'
const LoaderRotate = () => (
    <div className='centered-container'>
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
    
  >
    <Spin tip="Loading...">
      <Alert
        message="Идет загрузка..."
        description="Честно-Честно"
        type="info"
        style={{ height: '100vh',  display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', paddingTop: '250px' }}
      />
    </Spin>
  </Space>
  </div>
);


export default LoaderRotate;