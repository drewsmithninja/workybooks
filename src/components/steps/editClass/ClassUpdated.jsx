import React from 'react';
import { useSelector } from 'react-redux';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';

export default function ClassUpdated({ prev, onClose }) {
  const { currentClass } = useSelector((state) => state.classroom);
  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Classroom updated</ADTitle>
      <div className='py-4 text-dark text-lg my-16 text-center'>{`Classroom updated as ${currentClass?.classroom?.name}`}</div>
      <ADButton size='large' type='primary' className='w-1/3' onClick={onClose}>
        Close
      </ADButton>
    </div>
  );
}
