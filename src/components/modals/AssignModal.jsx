import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetNewAssignment } from '../../app/features/assignment/assignmentSlice';
import { resetSelectedWorksheets } from '../../app/features/worksheet/worksheetSlice';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import AssignStep1 from '../assignSteps/AssignStep1';
import AssignStep2 from '../assignSteps/AssignStep2';
import AssignStep3 from '../assignSteps/AssignStep3';
import NewAssignment from '../steps/assign/NewAssignment';

function AssignModal({ onOk, ...props }) {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();

  const next = () => {
    setCurrent(current + 1);
  };

  const afterClose = () => {
    setCurrent(0);
    dispatch(resetNewAssignment());
    dispatch(resetSelectedWorksheets());
  };

  const items = [
    {
      title: 'Create New',
      content: <NewAssignment next={next} onOk={onOk} />
    },
    {
      title: 'Select Items',
      icon: <>1</>,
      content: <AssignStep1 next={next} {...props} />
    },
    {
      title: 'Select Students',
      icon: <>2</>,
      content: <AssignStep2 next={next} />
    },
    {
      title: 'Set Assignment Details',
      icon: <>3</>,
      content: <AssignStep3 onOk={onOk} {...props} />
    }
  ];

  return (
    <ADModal afterClose={afterClose} closable={false} footer={null} width={680} {...props}>
      <ADSteps items={items} current={current} showSteps={current !== 0} className='custom-assign-steps' />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content max-w-[600px]'>{items[current].content}</div>
      </div>
    </ADModal>
  );
}

export default AssignModal;
