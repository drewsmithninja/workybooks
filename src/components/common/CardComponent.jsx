/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Dropdown, Modal, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloseOutlined, EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import ADTitle from '../antd/ADTitle';
import ADButton from '../antd/ADButton';
import ADImage from '../antd/ADImage';
import AssignStep1 from '../assignSteps/AssignStep1';
import AssignStep2 from '../assignSteps/AssignStep2';
import NewAssignmentOrCollection from '../modalSteps/NewAssignmentOrCollection';
import { createCollection, getCollection, getCollections, updateCollection } from '../../app/features/collection/collectionSlice';
import { likeWorksheet } from '../../app/features/home/homepageSlice';
import printIcon from '../../assets/images/icons/print_gray.png';
import assignIcon from '../../assets/images/icons/assign_gray.png';
import folderIcon from '../../assets/images/icons/folder_gray.png';
import shareIcon from '../../assets/images/icons/share_gray.png';
import AssignStep3 from '../assignSteps/AssignStep3';
import { selectWorksheet, setCurrentWorksheet, unSelectWorksheet } from '../../app/features/worksheet/worksheetSlice';
import AddToCollectionModal from '../modals/AddToCollectionModal';
import AssignModal from '../modals/AssignModal';
import { getAssignments } from '../../app/features/assignment/assignmentSlice';
import dummyImage from '../../assets/images/dummyImage.png';

function CardComponent({ cardWidth = 215, item, setRerender }) {
  const selectedWorksheets = useSelector((state) => state.worksheet.selectedWorksheets);
  const worksheets = useSelector((state) => state.worksheet.selectedWorksheets);
  const { collections } = useSelector((state) => state);
  const [checked, setChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  // const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();
  const { Step } = Steps;

  const showAssignModal = () => {
    setIsAssignModalOpen(true);
    dispatch(getAssignments());
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
    dispatch(getCollections());
    dispatch(setCurrentWorksheet(item));
    setIsCollectionModalOpen(true);
  };
  const handleCollectionModalOk = (val) => {
    // if (val) {
    //   const data = {
    //     title: val,
    //     favorite: false,
    //     content: [item?._id],
    //     added_by: user?.data?.user?._id
    //   };
    //   dispatch(createCollection(data));
    //   // dispatch(updateCollection());
    //   setIsCollectionModalOpen(false);
    //   setRerender(Math.random());
    // }
    setIsAssignModalOpen(false);
    // setChecked(false);
  };
  const handleCollectionModalCancel = () => {
    setIsCollectionModalOpen(false);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const setLike = async () => {
    const data = {
      id: await item._id,
      status: {
        like: (await item?.likes?.isLike) !== undefined ? !item?.likes?.isLike : true
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

  const items = [
    {
      label: <span className='ml-2'>PRINT</span>,
      key: '1',
      icon: <ADImage width={25} src={printIcon} alt='print' />
    },
    {
      label: <span className='ml-2'>ASSIGN</span>,
      key: '2',
      icon: <ADImage width={25} src={assignIcon} alt='assign' />,
      onClick: showAssignModal
    },
    {
      label: <span className='ml-2'>ADD TO COLLECTION</span>,
      key: '3',
      icon: <ADImage width={25} src={folderIcon} alt='add to collection' />,
      onClick: showCollectionModal
    },
    {
      label: <span className='ml-2'>SHARE</span>,
      key: '4',
      icon: <ADImage width={25} src={shareIcon} alt='share' />
    }
  ];

  const addToCollectionModal = <AddToCollectionModal closable={false} open={isCollectionModalOpen} onShow={showCollectionModal} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel} />;
  const assignModal = <AssignModal closable={false} open={isAssignModalOpen} onShow={showAssignModal} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} />;

  return (
    <>
      {addToCollectionModal}
      {assignModal}
      <div
        className='cardComponent m-3 flex max-w-auto flex-col gap-[10px]'
        style={{
          width: cardWidth
        }}
      >
        {/* Card Image */}
        <div
          className='topImage rounded-2xl'
          style={{
            width: cardWidth
          }}
        >
          <Link to={item._id ? `/worksheet/${item._id}` : ''}>
            <ADImage
              src={item?.thumbnail}
              // onError={({ currentTarget }) => {
              //   currentTarget.onerror = null; // prevents looping
              //   currentTarget.src = 'https://via.placeholder.com/215x278';
              // }}
              onError={(e) => (e.target.src = dummyImage)}
              alt='cardImage'
              className='rounded-2xl w-full object-cover'
            />
          </Link>
        </div>

        {/* Card action buttons */}
        <div className='cardActionButtons flex items-center'>
          <div className='flex flex-1 items-center'>
            <Checkbox
              checked={selectedWorksheets?.includes(item?._id)}
              className='w-[25px] scale-125 cardCheckbox'
              onChange={(e) => {
                console.log(item?._id, 'itemId');
                if (e.target.checked) {
                  dispatch(selectWorksheet(item?._id));
                  // setChecked(true);
                } else {
                  dispatch(unSelectWorksheet(item?._id));
                  // setChecked(false);
                }
              }}
              id={`collection_id_${item.worky_id}`}
              name={`collection_id_${item.worky_id}`}
              // checked={checked}
            />
          </div>
          <ADButton className='flex flex-1 items-center justify-center' onClick={setLike} type='text'>
            {item.likes.isLike ? <HeartFilled className='text-[25px] text-red-500 cursor-pointer' /> : <HeartOutlined className='text-[25px] text-gray-300 cursor-pointer' />}
          </ADButton>
          <div className='flex flex-1 items-center justify-end'>
            <Dropdown
              menu={{
                items
              }}
              trigger={['click']}
              placement='topLeft'
              arrow
              className='cursor-pointer'
            >
              <div className='rounded-full border-solid border-2 border-slate-300 flex'>
                <EllipsisOutlined className='text-[18px] text-medium p-px text-gray-400' />
              </div>
            </Dropdown>
            {/* <Modal className='rounded-xl' centered footer={false} open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel}>
              <NewAssignmentOrCollection assign onOk={onAssignCreateClick} cardData={item} closeModal={handleAssignModalCancel} />
            </Modal> */}
            {/* <Modal className='rounded-xl' centered footer={false} open={isCollectionModalOpen} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel}>
              <NewAssignmentOrCollection onOk={onCollectionCreateClick} cardData={item} />
            </Modal> */}
            {/* <Modal className='rounded-xl' closeIcon={<CloseOutlined className='!text-danger font-bold' onClick={() => setIsStepModalOpen(false)} />} centered footer={false} open={isStepModalOpen}>
              <ADTitle level={3} className='text-center text-danger pb-8'>
                Create New Assign Activities
              </ADTitle>
              <Steps current={currentStep}>
                {steps.map((step) => (
                  <Step key={step.title} title={step.title} />
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
            </Modal> */}
          </div>
        </div>

        {/* Card Title */}
        <p className='leading-4 text-[12px] mb-0'>{`${item.title}-${item?.descrpt?.substring(0, 50)}`}</p>

        {/* Card author */}
        <p className='leading-4 text-[10px] text-gray-400'>{item.author}</p>

        {/* Extra content */}
        <div className='flex flex-row gap-[10px]'>
          {item?.stds_topic?.length > 0 &&
            item?.stds_topic?.slice(0, 3).map((t, index) => (
              <span key={index} className='leading-4 text-[10px] bg-gray-300 text-black px-[3px] rounded-[3px]'>
                {t}
              </span>
            ))}
        </div>
      </div>
    </>
  );
}

export default CardComponent;
