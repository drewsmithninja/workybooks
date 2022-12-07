import React, { useState } from 'react';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import CreateClassAddStudents from '../steps/createClass/CreateClassAddStudents';
import CreateClassManually from '../steps/createClass/CreateClassManually';
import CreateClassCreated from '../steps/createClass/ManualClassCreated';
import CreateClassStep1 from '../steps/CreateClassStep1';
import ImportClass from '../steps/createClass/ImportClass';
import ImportClassesCreated from '../steps/createClass/ImportClassesCreated';

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
      title: 'create class', // 0
      content: <CreateClassStep1 onGoogleClick={() => setCurrent(4)} onManualClick={() => setCurrent(1)} />
    },
    {
      title: 'create manual', // 1
      content: <CreateClassManually next={next} prev={prev} />
    },
    {
      title: 'add students', // 2
      content: <CreateClassAddStudents next={next} prev={prev} />
    },
    {
      title: 'class created', // 3
      content: <CreateClassCreated prev={prev} />
    },
    {
      title: 'import class', // 4
      content: <ImportClass next={next} prev={() => setCurrent(0)} />
    },
    {
      title: 'classes created', // 5
      content: <ImportClassesCreated prev={() => setCurrent(4)} onClose={onCancel} />
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

export default CreateClassModal;
