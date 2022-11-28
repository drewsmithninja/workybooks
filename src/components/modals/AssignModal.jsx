import React from 'react';
import { Modal } from 'antd';
import NewAssignmentOrCollection from '../modalSteps/NewAssignmentOrCollection';

function AssignModal({ onAssignCreateClick, ...props }) {
  return (
    <Modal className='rounded-xl' centered width={670} footer={false} {...props}>
      <NewAssignmentOrCollection assign onCreate={onAssignCreateClick} />
    </Modal>
  );
}

export default AssignModal;
