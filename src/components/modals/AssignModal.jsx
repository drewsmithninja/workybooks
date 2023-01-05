import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssignments, setCurrentStep } from '../../app/features/assignment/assignmentSlice';
import { resetSelectedWorksheets } from '../../app/features/worksheet/worksheetSlice';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import AssignStep1 from '../assignSteps/AssignStep1';
import AssignStep2 from '../assignSteps/AssignStep2';
import AssignStep3 from '../assignSteps/AssignStep3';
import NewAssignment from '../steps/assign/NewAssignment';

function AssignModal({ onOk, onCancel, ...props }) {
  const currentStep = useSelector((state) => state.assignment.currentStep);
  const dispatch = useDispatch();

  const next = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const afterClose = () => {
    dispatch(getAssignments());
  };

  const onClose = () => {
    dispatch(setCurrentStep(0));
    dispatch(resetSelectedWorksheets());
    onOk();
  };

  const items = [
    {
      title: 'Create New',
      content: <NewAssignment next={next} onOk={onOk} />
    },
    {
      title: 'Select Items',
      icon: <>1</>,
      content: <AssignStep1 next={next} onClose={onClose} onCancel={onCancel} />
    },
    {
      title: 'Select Students',
      icon: <>2</>,
      content: <AssignStep2 next={next} onClose={onClose} />
    },
    {
      title: 'Set Assignment Details',
      icon: <>3</>,
      content: <AssignStep3 onOk={onOk} onClose={onClose} onCancel={onCancel} {...props} />
    }
  ];

  return (
    <ADModal afterClose={afterClose} closable={false} footer={null} width={680} {...props}>
      <ADSteps items={items} current={currentStep} onChange={(e) => dispatch(setCurrentStep(e))} showSteps={currentStep !== 0} className='custom-assign-steps' />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content max-w-[600px]'>{items[currentStep].content}</div>
      </div>
    </ADModal>
  );
}

export default AssignModal;
