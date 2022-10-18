import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function SubjectComponent({
  subjectImage,
  subjectName,
  subjectId
}) {
  const { id } = useParams();
  return (
    <Link to={subjectId ? `/subject/${subjectId}` : ''}>
      <Typography.Text className={`flex flex-col items-center justify-items-center gap-[10px] ${parseInt(id, 30) === parseInt(subjectId, 30) ? 'activeSubject' : ''}`}>
        <img src={subjectImage} alt='subjectImage' width='75px' height='75px' className='rounded-full' />
        <p className='text-medium text-[14px]'>{subjectName}</p>
      </Typography.Text>
    </Link>
  );
}

export default SubjectComponent;
