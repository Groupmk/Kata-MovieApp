import React from 'react';
import { Alert, Space } from 'antd';

const AlertError = ({ type, message }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff', paddingTop: '50px'}}>
      <Space direction="vertical" style={{ width: '50%' }}>
        <Alert
          message={type === 'error' ? 'Error' : null}
          description={message}
          type={type}
          showIcon
        />
      </Space>
    </div>
  );
};

export default AlertError;
