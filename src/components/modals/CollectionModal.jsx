import { Modal } from 'antd';
import React from 'react';
import NewAssignmentOrCollection from '../modalSteps/NewAssignmentOrCollection';

function CollectionModal({ onCreate, cardData, ...props }) {
  return (
    <Modal className='rounded-xl' centered width={670} footer={false} {...props}>
      <NewAssignmentOrCollection onCreate={onCreate} cardData={cardData} />
    </Modal>
  );
}

export default CollectionModal;
