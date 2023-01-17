import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssignments, setCurrentStep } from '../../app/features/assignment/assignmentSlice';
import { resetSelectedCollections } from '../../app/features/collection/collectionSlice';
import { resetSelectedWorksheets } from '../../app/features/worksheet/worksheetSlice';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import AssignStep2 from '../steps/assign/AssignStep2';
import AssignStep3 from '../steps/assign/AssignStep3';
import NewAssignment from '../steps/assign/NewAssignment';
import AssignCollectionStep1 from '../steps/AssignCollectionStep1';

function AssignCollectionModal({ onOk, ...props }) {
  const currentStep = useSelector((state) => state.assignment.currentStep);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();

  const next = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const afterClose = () => {
    dispatch(getAssignments());
  };

  const onClose = () => {
    dispatch(setCurrentStep(0));
    dispatch(resetSelectedCollections());
    onCancel();
  };

  const items = [
    {
      title: 'Create New',
      content: <NewAssignment next={next} onOk={onOk} {...props} />
    },
    {
      title: 'Select Items',
      icon: <>1</>,
      content: <AssignCollectionStep1 next={next} onClose={onClose} onOk={onOk} {...props} />
    },
    {
      title: 'Select Students',
      icon: <>2</>,
      content: <AssignStep2 next={next} onClose={onClose} onOk={onOk} {...props} />
    },
    {
      title: 'Set Assignment Details',
      icon: <>3</>,
      content: <AssignStep3 onOk={onOk} onClose={onClose} {...props} />
    }
  ];

  return (
    <ADModal centered afterClose={afterClose} closable={false} footer={null} width={680} {...props}>
      <ADSteps items={items} current={currentStep} onChange={(e) => dispatch(setCurrentStep(e))} showSteps={currentStep !== 0} className='custom-assign-steps' />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content max-w-[600px]'>{items[currentStep]?.content}</div>
      </div>
    </ADModal>
  );
}

export default AssignCollectionModal;
