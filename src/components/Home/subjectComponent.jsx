import React from 'react';
import { Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

function SubjectComponent({ subjectImage, subjectName, subjectId }) {
  const { sid } = useParams();
  return (
    <Link to={`/subject/${subjectId}`}>
      <Typography.Text className={`flex flex-col items-center justify-items-center gap-[10px] ${parseInt(sid, 30) === parseInt(subjectId, 30) ? 'activeSubject' : ''}`}>
        <img src={subjectImage} alt='subjectImage' width='75px' height='75px' className='rounded-full' />
        <p className='text-medium text-[14px]'>{subjectName}</p>
      </Typography.Text>
    </Link>
  );
}

export default SubjectComponent;
