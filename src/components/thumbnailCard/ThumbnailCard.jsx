import React, { useRef, useState } from 'react';
import { Checkbox, Col, Dropdown, Image, Menu, Modal, Row, Steps } from 'antd';
import { EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import printIcon from '../../assets/images/icons/print_gray.png';
import assignIcon from '../../assets/images/icons/assign_gray.png';
import folderIcon from '../../assets/images/icons/folder_gray.png';
import shareIcon from '../../assets/images/icons/share_gray.png';
import ADCard from '../antd/ADCard';
import ADButton from '../antd/ADButton';
import sampleImage from '../../assets/images/dummyImage.png';
import AssignStep1 from '../assignSteps/AssignStep1';
import AssignStep2 from '../assignSteps/AssignStep2';
import AssignStep3 from '../assignSteps/AssignStep3';
import ADTitle from '../antd/ADTitle';
import ADImage from '../antd/ADImage';
import PrintImages from '../common/PrintImages';
import ShareModal from '../modals/ShareModal';
import AddToCollectionModal from '../modals/AddToCollectionModal';
import AssignModal from '../modals/AssignModal';

function ThumbnailCard({ className, cardWidth, onCheck, id, cardChecked, collection, thumbnails = [], favorite, onFavChange, likes, ...props }) {
  const componentRef = useRef();
  const [currentStep, setCurrentStep] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const { Step } = Steps;
  const navigate = useNavigate();

  const showAssignModal = () => {
    setIsAssignModalOpen(true);
  };
  const handleAssignModalOk = () => {
    setIsAssignModalOpen(false);
    dispatch(setCurrentStep(0));
  };
  const handleAssignModalCancel = () => {
    setIsAssignModalOpen(false);
  };
  const onAssignCreateClick = () => {
    setCurrentStep(0);
    setIsAssignModalOpen(false);
    setIsStepModalOpen(true);
  };
  const showCollectionModal = () => {
    setIsCollectionModalOpen(true);
  };
  const handleCollectionModalOk = () => {
    setIsCollectionModalOpen(false);
  };
  const handleCollectionModalCancel = () => {
    setIsCollectionModalOpen(false);
  };
  const onCollectionCreateClick = () => {
    setIsCollectionModalOpen(false);
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleShareModalOk = () => {
    setIsShareModalOpen(false);
  };

  const handleShareModalCancel = () => {
    setIsShareModalOpen(false);
  };

  const showShareModal = () => {
    setIsShareModalOpen(true);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const items = [
    {
      label: 'PRINT',
      key: '1',
      icon: <ADImage src={printIcon} alt='print' />,
      onClick: handlePrint
    },
    {
      label: 'ASSIGN',
      key: '2',
      icon: <ADImage src={assignIcon} alt='assign' />,
      onClick: showAssignModal
    },
    {
      label: 'COPY TO MY COLLECTION',
      key: '3',
      icon: <ADImage src={folderIcon} alt='copy to my collection' />
      // onClick: showCollectionModal
    },
    {
      label: 'SHARE',
      key: '4',
      icon: <ADImage src={shareIcon} alt='share' />,
      onClick: showShareModal
    }
  ];

  const steps = [
    {
      title: 'Select Items',
      content: <AssignStep1 />
    },
    {
      title: 'Select Students',
      content: <AssignStep2 onAssignClass={nextStep} onAssignSelected={nextStep} />
    },
    {
      title: 'Select Assignment Details',
      content: <AssignStep3 />
    }
  ];

  const shareModal = <ShareModal open={isShareModalOpen} onOk={handleShareModalOk} onCancel={handleShareModalCancel} path={[`/collection/${id}`]} multiple />;
  const addToCollectionModal = <AddToCollectionModal closable={false} open={isCollectionModalOpen} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel} />;
  const assignModal = <AssignModal open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} />;
  
  return (
    <>
      {addToCollectionModal}
        {assignModal}
        {shareModal}
      <Modal className='rounded-xl' centered footer={false} open={isStepModalOpen}>
        <ADTitle level={3} className='text-center text-danger pb-8'>
          Create New Assign Activities
        </ADTitle>
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className='steps-content'>{steps[currentStep].content}</div>
        <div className='steps-action'>
          {currentStep === 0 && (
            <div className='flex justify-between'>
              <ADButton size='large' type='danger' onClick={nextStep}>
                CANCEL
              </ADButton>
              <ADButton size='large' type='primary' onClick={nextStep}>
                ADD MORE ITEMS
              </ADButton>
              <ADButton size='large' type='primary' onClick={nextStep}>
                ASSIGN
              </ADButton>
            </div>
          )}
          {currentStep === 1 && (
            <div className='flex justify-between'>
              <ADButton size='large' type='danger' onClick={nextStep}>
                CANCEL
              </ADButton>
              <ADButton size='large' type='primary' onClick={prevStep}>
                BACK
              </ADButton>
            </div>
          )}
          {currentStep === 2 && (
            <div className='flex justify-between'>
              <ADButton size='large' type='danger' onClick={nextStep}>
                CANCEL
              </ADButton>
              <ADButton size='large' type='primary' onClick={prevStep}>
                BACK
              </ADButton>
              <ADButton size='large' type='primary' onClick={() => setIsStepModalOpen(false)}>
                ASSIGN
              </ADButton>
            </div>
          )}
        </div>
      </Modal>
      <PrintImages src={thumbnails} ref={componentRef} display={display} />
      <ADCard className={`${className ?? ''} ${cardWidth} bg-slate-200 h-full p-2`} hoverable {...props}>
        <div className='w-full h-full aspect-[16/9]'>
          <Row gutter={[8, 8]}>
            {thumbnails && thumbnails?.length ? (
              thumbnails.slice(0, 4).map((item, index) => (
                <Col key={index} xs={thumbnails?.length === 1 ? 24 : 12} onClick={() => navigate(`/collection/${id}`)}>
                  <Image preview={false} src={item} className='rounded-md aspect-[16/9] object-cover' />
                </Col>
              ))
            ) : (
              <Image preview={false} src={sampleImage} className='rounded-md aspect-[16/9] object-cover' alt='thumbnail-default-image' />
            )}
          </Row>
        </div>
        <div className='flex justify-between items-center py-2'>
          <Checkbox onChange={onCheck} id={id} name={id} checked={cardChecked} />
          <div className='flex items-center'>
            <ADButton className='!p-0 !border-0 text-xl !focus:bg-transparent !active:bg-transparent !hover:bg-transparent' type='text' onClick={onFavChange}>
              {favorite ? <HeartFilled className='text-primary' /> : <HeartOutlined className='text-success' />}
            </ADButton>
            <span className='text-sm pl-2'>{likes}</span>
          </div>
          <Dropdown
            menu={{
              items
            }}
            placement='topLeft'
            arrow
          >
            <div className='rounded-full border-solid border-2 border-slate-300 flex'>
              <EllipsisOutlined className='text-[18px] text-medium p-px text-gray-400' />
            </div>
          </Dropdown>
        </div>
        <div>{collection?.title}</div>
        <div className='flex justify-between'>
          <div className='text-xs text-slate-400'>
            By
            {collection?.added_by?.firstName}
            {collection?.added_by?.lastName}
          </div>
          <div className='text-xs text-slate-400'>{`${thumbnails?.length} Worksheets`}</div>
        </div>
      </ADCard>
    </>
  );
}

ThumbnailCard.defaultProps = {
  className: '',
  cardWidth: 'w-full',
  cardChecked: false,
  favorite: false,
  likes: 15.4
};
export default ThumbnailCard;
