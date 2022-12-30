import React, { useState } from 'react';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import CreateClassAddStudents from '../steps/createClass/CreateClassAddStudents';
import CreateClassManually from '../steps/createClass/CreateClassManually';
import ManualClassCreated from '../steps/createClass/ManualClassCreated';
import CreateClassStep1 from '../steps/CreateClassStep1';
import ImportClass from '../steps/createClass/ImportClass';
import ImportClassesCreated from '../steps/createClass/ImportClassesCreated';

function CreateClassModal({ onOk, ...props }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(current + 1);

  const items = [
    {
      title: 'create class', // 0
      content: <CreateClassStep1 onGoogleClick={() => setCurrent(4)} onManualClick={next} />
    },
    {
      title: 'create manual', // 1
      content: <CreateClassManually next={next} />
    },
    {
      title: 'add students', // 2
      content: <CreateClassAddStudents next={next} />
    },
    {
      title: 'class created', // 3
      content: <ManualClassCreated onOk={onOk} />
    },
    {
      title: 'import class', // 4
      content: <ImportClass next={next} />
    },
    {
      title: 'classes created', // 5
      content: <ImportClassesCreated />
    }
  ];

  return (
    <ADModal centered footer={false} onOk={onOk} afterClose={() => setCurrent(0)} {...props}>
      <ADSteps items={items} current={1} />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content'>{items[current].content}</div>
      </div>
    </ADModal>
  );
}

export default CreateClassModal;
