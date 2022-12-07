import { Spin } from 'antd';
import React from 'react';

function Spinner({ className, full }) {
  return <Spin size='large' className={`${className ?? ''} flex justify-center items-center ${full ? 'h-[851px]' : ''}`} />;
}

export default Spinner;
