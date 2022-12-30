import React, { useState } from 'react';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import NewAssignmentOrCollection from '../modalSteps/NewAssignmentOrCollection';

function CollectionModal({ onOk, onShow, item, ...props }) {
  const [current, setCurrent] = useState(0);

  const items = [
    {
      title: 'first step',
      content: <NewAssignmentOrCollection onCreate={onOk} item={item} />
    }
  ];

  return (
    <ADModal className='rounded-xl' afterClose={setCurrent(0)} footer={false} {...props}>
      <ADSteps items={items} current={1} />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content'>{items[current].content}</div>
      </div>
    </ADModal>
  );
}

export default CollectionModal;
