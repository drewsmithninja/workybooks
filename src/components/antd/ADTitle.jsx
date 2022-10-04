import React from 'react';
import { Typography } from 'antd';

function ADTitle({ children, ...props }) {
  const { Title } = Typography;
  return (
    <Title className='text-3xl font-bold leading-6 m-0' {...props}>
      {children}
    </Title>
  );
}

export default ADTitle;
