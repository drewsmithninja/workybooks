import { Typography } from 'antd';
import React from 'react';

function SubjectComponent({
  subjectImage,
  subjectName
}) {
  return (
    <Typography.Text className='flex flex-col items-center justify-items-center gap-[10px]'>
      <img src={subjectImage} alt='subjectImage' width='75px' height='75px' className='rounded-full' />
      <p className='text-medium text-[16px]'>{subjectName}</p>
    </Typography.Text>
  );
}

export default SubjectComponent;
