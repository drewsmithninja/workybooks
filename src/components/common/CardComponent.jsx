import { CloseOutlined, EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Dropdown, Input, Menu, message, Modal, Row, Space, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ADTitle from '../antd/ADTitle';
import AssignStep1 from '../assignSteps/AssignStep1';
import AssignStep2 from '../assignSteps/AssignStep2';
import NewAssignmentOrCollection from '../modalSteps/NewAssignmentOrCollection';
import { createCollection, updateCollection } from '../../app/features/collection/collectionSlice';
import { likeWorksheet } from '../../app/features/home/homepageSlice';
import printIcon from '../../assets/images/icons/print_gray.png';
import assignIcon from '../../assets/images/icons/assign_gray.png';
import folderIcon from '../../assets/images/icons/folder_gray.png';
import shareIcon from '../../assets/images/icons/share_gray.png';
import AssignStep3 from '../assignSteps/AssignStep3';
import ADButton from '../antd/ADButton';
import ADImage from '../antd/ADImage';

function CardComponent({ cardImage = 'https://via.placeholder.com/400x200', likeStatus, cardWidth = 215, cardData = null, setRerender }) {
  const dispatch = useDispatch();
  const { Step } = Steps;
  const { collections } = useSelector((state) => state);
  const [c, setc] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const showAssignModal = () => {
    setIsAssignModalOpen(true);
  };
  const handleAssignModalOk = () => {
    setIsAssignModalOpen(false);
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
  const onCollectionCreateClick = (val) => {
    if (val) {
      const data = {
        title: val,
        favorite: false,
        content: [cardData?._id],
        added_by: user?.data?.user?._id
      };
      dispatch(createCollection(data));
      dispatch(updateCollection());
      setIsCollectionModalOpen(false);
      setRerender(Math.random());
    }
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const setLike = async () => {
    const data = {
      id: await cardData._id,
      status: {
        like: (await cardData?.likes?.isLike) !== undefined ? !cardData?.likes?.isLike : true
      }
    };
    await dispatch(likeWorksheet(data)).then(setRerender(Math.random()));
  };

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
  const menu = (
    <Menu
      items={[
        {
          label: 'PRINT',
          key: '1',
          icon: <ADImage src={printIcon} alt='print' />
        },
        {
          label: 'ASSIGN',
          key: '2',
          icon: <ADImage src={assignIcon} alt='assign' />,
          onClick: showAssignModal
        },
        {
          label: 'ADD TO COLLECTION',
          key: '3',
          icon: <ADImage src={folderIcon} alt='add to collection' />,
          onClick: showCollectionModal
        },
        {
          label: 'SHARE',
          key: '4',
          icon: <ADImage src={shareIcon} alt='share' />
        }
      ]}
    />
  );
  useEffect(() => {
    if (collections?.selectedCollections?.length > 0) {
      if (collections?.selectedCollections?.findIndex((x) => x.id === cardData.id) > -1) {
        setc(true);
      } else {
        setc(false);
      }
    }
  }, [collections, setRerender]);

  return (
    <div
      className='cardComponent m-3 flex max-w-auto flex-col gap-[10px]'
      style={{
        width: cardWidth
      }}
    >
      {/* Card Image */}
      <div
        className='topImage bg-gray-300 rounded-2xl'
        style={{
          width: cardWidth
        }}
      >
        <Link to={cardData._id ? `/worksheet/${cardData._id}` : ''}>
          <ADImage
            src={cardImage}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = 'https://via.placeholder.com/215x278';
            }}
            alt='cardImage'
            className='rounded-2xl w-full'
          />
        </Link>
      </div>

      {/* Card action buttons */}
      <div className='cardActionButtons flex items-center'>
        <div className='flex flex-1 items-center'>
          <Checkbox
            className='w-[25px] scale-125 cardCheckbox'
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(selectCollection(cardData));
              } else {
                dispatch(unselectCollection(cardData));
              }
            }}
            id={`collection_id_${cardData.worky_id}`}
            name={`collection_id_${cardData.worky_id}`}
            checked={c}
          />
        </div>
        <ADButton className='flex flex-1 items-center justify-center' onClick={setLike} type='text'>
          {likeStatus ? <HeartFilled className='text-[25px] text-red-500 cursor-pointer' /> : <HeartOutlined className='text-[25px] text-gray-300 cursor-pointer' />}
        </ADButton>
        <div className='flex flex-1 items-center justify-end'>
          <Dropdown overlay={menu} placement='topLeft' arrow>
            <div className='rounded-full border-solid border-2 border-slate-300 flex'>
              <EllipsisOutlined className='text-[18px] text-medium p-px text-gray-400' />
            </div>
          </Dropdown>
          <Modal className='rounded-xl' centered width={670} footer={false} open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel}>
            <NewAssignmentOrCollection assign onCreate={onAssignCreateClick} cardData={cardData} />
          </Modal>
          <Modal className='rounded-xl' centered width={670} footer={false} open={isCollectionModalOpen} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel}>
            <NewAssignmentOrCollection onCreate={onCollectionCreateClick} cardData={cardData} />
          </Modal>
          <Modal className='rounded-xl' closeIcon={<CloseOutlined className='!text-danger font-bold' onClick={() => setIsStepModalOpen(false)} />} centered width={670} footer={false} open={isStepModalOpen}>
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
                  <Button size='large' type='danger' onClick={nextStep}>
                    CANCEL
                  </Button>
                  <Button size='large' type='primary' onClick={nextStep}>
                    ADD MORE ITEMS
                  </Button>
                  <Button size='large' type='primary' onClick={nextStep}>
                    ASSIGN
                  </Button>
                </div>
              )}
              {currentStep === 1 && (
                <div className='flex justify-between'>
                  <Button size='large' type='danger' onClick={nextStep}>
                    CANCEL
                  </Button>
                  <Button size='large' type='primary' onClick={prevStep}>
                    BACK
                  </Button>
                </div>
              )}
              {currentStep === 2 && (
                <div className='flex justify-between'>
                  <Button size='large' type='danger' onClick={nextStep}>
                    CANCEL
                  </Button>
                  <Button size='large' type='primary' onClick={prevStep}>
                    BACK
                  </Button>
                  <Button size='large' type='primary' onClick={() => setIsStepModalOpen(false)}>
                    ASSIGN
                  </Button>
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>

      {/* Card Title */}
      <p className='leading-4 text-[12px] mb-0'>{`${cardData.title}-${cardData?.descrpt?.substring(0, 50)}`}</p>

      {/* Card author */}
      <p className='leading-4 text-[10px] text-gray-400'>{cardData.author}</p>

      {/* Extra content */}
      <div className='flex flex-row gap-[10px]'>
        {cardData?.stds_topic?.length > 0 &&
          cardData?.stds_topic?.slice(0, 3).map((item, index) => (
            <span key={index} className='leading-4 text-[10px] bg-gray-300 text-black px-[3px] rounded-[3px]'>
              {item}
            </span>
          ))}
      </div>
    </div>
  );
}

export default CardComponent;
