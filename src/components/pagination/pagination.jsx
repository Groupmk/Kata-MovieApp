import React from 'react';
import { Pagination } from 'antd';

const PaginationMovie = ({ current, total, pageSize, onChange }) => (
  <Pagination current={current} total={total} pageSize={pageSize} onChange={onChange} />
);

export default PaginationMovie;
