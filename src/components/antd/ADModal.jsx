import React from 'react';
import { Modal } from 'antd';

function ADModal({ className, ...props }) {
  return <Modal className={`${className ?? ''} rounded-xl max-w-[500px]`} {...props} />;
}

export default ADModal;
