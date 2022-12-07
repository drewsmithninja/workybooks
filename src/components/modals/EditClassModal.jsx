import React, { useState } from 'react';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import EditClass from '../steps/editClass/EditClass';
import ClassUpdated from '../steps/editClass/ClassUpdated';

export default function EditClassModal({ onShow, onCancel, ...props }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = [
    {
      title: 'first step',
      content: <EditClass next={next} />
    },
    {
      title: 'second step',
      content: <ClassUpdated prev={prev} onClose={onCancel} />
    }
  ];

  return (
    <ADModal centered width={670} footer={false} onCancel={onCancel} {...props}>
      <ADSteps items={items} current={1} />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content max-w-[420px]'>{items[current].content}</div>
      </div>
    </ADModal>
  );
}
