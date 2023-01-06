import React, { useState } from 'react';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import AssignStep2 from '../assignSteps/AssignStep2';
import AssignStep3 from '../assignSteps/AssignStep3';

export default function EditAssignModal({ onOk, ...props }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const afterClose = () => {
    setCurrent(0);
  };

  const items = [
    {
      title: 'Select Students',
      status: `${current === 0 ? 'process' : 'wait'}`,
      content: <AssignStep2 next={next} onClose={onOk} {...props} />
    },
    {
      title: 'Set Assignment Details',
      status: `${current === 1 ? 'process' : 'wait'}`,
      content: <AssignStep3 edit onOk={onOk} onClose={onOk} {...props} />
    }
  ];

  return (
    <ADModal centered afterClose={afterClose} footer={false} width={680} closable={false} {...props}>
      <ADSteps items={items} current={1} showSteps />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content'>{items[current].content}</div>
      </div>
    </ADModal>
  );
}
