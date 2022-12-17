import React from 'react';
import ADButton from '../antd/ADButton';
import ADTitle from '../antd/ADTitle';

export default function StudentsAdded({ onClose }) {
  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Students Added</ADTitle>
      <div className='py-4 text-dark text-lg my-16 text-center'>students has been added to Workybooks</div>
      <ADButton size='large' type='primary' className='w-1/3' onClick={onClose}>
        Close
      </ADButton>
    </div>
  );
}
