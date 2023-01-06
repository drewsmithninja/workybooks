import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';

export default function ListAndSaveData({ onOk }) {
  const classState = useSelector((state) => state?.classroom);
  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Students Added</ADTitle>
      <div className='py-4 text-dark text-lg my-16 text-center'>
        All classrooms have been imported to Workybooks
      </div>
      <ADButton size='large' type='primary' className='w-1/3' onClick={onOk}>
        Close
      </ADButton>
    </div>
  );
}
