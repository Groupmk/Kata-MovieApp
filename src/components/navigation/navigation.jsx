import React from 'react';
import { Tabs } from 'antd';
import FirstList from '../first-list/first-list';
import Rated from '../rated/rated';

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: `Search`,
    children: <FirstList />,
  },
  {
    key: '2',
    label: `Rated`,
    children: <Rated />,
  },
];

const Navigation = () => <Tabs style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} defaultActiveKey="1" items={items} onChange={onChange} />;

export default Navigation;
