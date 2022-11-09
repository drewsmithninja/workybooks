import React from 'react';
import { Card } from 'antd';

export default function ADCard({ className, children, ...props }) {
  return (
    <Card className={`${className ?? ''} overflow-hidden`} {...props}>
      {children}
    </Card>
  );
}
