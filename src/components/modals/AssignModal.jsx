import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetSelectedWorksheets } from '../../app/features/worksheet/worksheetSlice';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import AssignStep1 from '../assignSteps/AssignStep1';
import AssignStep2 from '../assignSteps/AssignStep2';
import AssignStep3 from '../assignSteps/AssignStep3';
import NewAssignment from '../steps/assign/NewAssignment';

function StepOne({ next }) {
  return <NewAssignment next={next} />;
}

function StepTwo() {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const items = [
    {
      title: 'create assignment',
      content: <NewAssignment next={next} />
    },
    {
      title: 'Select Items',
      content: <AssignStep1 next={next} />
    },
    {
      title: 'Select Students',
      content: <AssignStep2 next={next} />
    },
    {
      title: 'Select Assignment Details',
      content: <AssignStep3 next={next} />
    }
  ];
  return (
    <>
      <ADSteps items={items} current={1} />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content'>{items[current].content}</div>
      </div>
    </>
  );
}

export default function AssignModal({ onOk, ...props }) {
  const [current, setCurrent] = useState(0);

  const dispatch = useDispatch();

  const next = () => {
    setCurrent(current + 1);
  };

  const afterClose = () => {
    setCurrent(0);
    dispatch(resetSelectedWorksheets());
  };

  const steps = [
    {
      title: 'step 1',
      content: <StepOne next={next} />
    },
    {
      title: 'step 2',
      content: <StepTwo next={next} />
    }
  ];

  return (
    <ADModal centered afterClose={afterClose} width={1000} footer={false} {...props}>
      <StepTwo />
    </ADModal>
  );
}
