import React, { useState } from 'react';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import CreateClassStep1 from '../createClassSteps/CreateClassStep1';
import CreateClassStep2 from '../createClassSteps/CreateClassStep2';
import CreateClassStep3 from '../createClassSteps/CreateClassStep3';

function CreateClassModal({ onShow, onCancel, ...props }) {
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
      content: <CreateClassStep1 next={next} />
    },
    {
      title: 'second step',
      content: <CreateClassStep2 next={next} prev={prev} />
    },
    {
      title: 'third step',
      content: <CreateClassStep3 prev={prev} onCancel={onCancel} />
    }
  ];

  return (
    <ADModal centered width={670} footer={false} onCancel={onCancel} {...props}>
      <ADSteps items={items} current={1} />
      <div className='steps-content'>{items[current].content}</div>
    </ADModal>
  );
}

export default CreateClassModal;
