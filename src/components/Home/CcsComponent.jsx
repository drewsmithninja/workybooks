import React from 'react';
import { Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

function SubjectComponent({ ccsImage, ccsName, ccsId }) {
  const { id } = useParams();
  return (
    <Link to={`/ccs/${ccsId}`}>
      <Typography.Text className={`flex flex-col items-center justify-items-center gap-[10px] ${parseInt(id, 30) === parseInt(ccsId, 30) ? 'activeSubject' : ''}`}>
        <img src={ccsImage} alt='ccsImage' width='75px' height='75px' className='rounded-full' />
        <p className='text-medium text-[14px]'>{ccsName}</p>
      </Typography.Text>
    </Link>
  );
}

export default SubjectComponent;
