import { CloseOutlined, EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Dropdown, Input, Menu, message, Modal, Row, Space, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ADTitle from '../antd/ADTitle';
import ADButton from '../antd/ADButton';
import AssignStep1 from '../assignSteps/AssignStep1';
import AssignStep2 from '../assignSteps/AssignStep2';
import { selectCollection, unselectCollection } from '../../redux/actions/selectedCollectionAction';

import printIcon from '../../assets/images/icons/print_gray.png';
import assignIcon from '../../assets/images/icons/assign_gray.png';
import folderIcon from '../../assets/images/icons/folder_gray.png';
import shareIcon from '../../assets/images/icons/share_gray.png';
import AssignStep3 from '../assignSteps/AssignStep3';

function CardComponent({
  cardImage = 'https://via.placeholder.com/400x200',
  cardTitle = 'Short passage - find the meaning of the word - Ruth Bader',
  cardAuthor = 'By Workybooks',
  isLiked = true,
  isChecked = false,
  extraDetails = [
    {
      key: 1,
      detail: '3.W.3.1.B'
    },
    {
      key: 2,
      detail: '3.W.3.1.B'
    },
    {
      key: 3,
      detail: '3.W.3.1.B'
    }
  ],
  cardWidth = 215,
  cardData = {
  }
}) {
  const dispatch = useDispatch();
  const { Step } = Steps;
  const { collections } = useSelector((state) => state);
  const [c, setc] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const showModal = () => {
    setIsAssignModalOpen(true);
  };
  const onCreateClick = () => {
    setIsAssignModalOpen(false);
    setIsStepModalOpen(true);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: 'Select Items',
      content: <AssignStep1 />
    },
    {
      title: 'Select Students',
      content: <AssignStep2 onAssignClass={() => nextStep()} onAssignSelected={() => nextStep()} />
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
          icon: <img src={printIcon} alt='print' />
        },
        {
          label: 'ASSIGN',
          key: '2',
          icon: <img src={assignIcon} alt='assign' />
        },
        {
          label: 'ADD TO COLLECTION',
          key: '3',
          icon: <img src={folderIcon} alt='add to collection' />,
          onClick: showModal
        },
        {
          label: 'SHARE',
          key: '4',
          icon: <img src={shareIcon} alt='share' />
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
  }, [collections]);
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
        <Link to={cardData.worky_id ? `/worksheet/${cardData.worky_id}` : ''}>
          <img
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
        <div className='flex flex-1 items-center justify-center'>{isLiked ? <HeartFilled className='text-[25px] text-red-500 cursor-pointer' /> : <HeartOutlined className='text-[25px] text-gray-300 cursor-pointer' />}</div>
        <div className='flex flex-1 items-center justify-end'>
          <Dropdown overlay={menu} placement='topLeft' arrow>
            <div className='rounded-full border-solid border-2 border-slate-300 flex'>
              <EllipsisOutlined className='text-[18px] text-medium p-px text-gray-400' />
            </div>
          </Dropdown>
          <Modal className='rounded-xl' centered width={670} footer={false} closable={false} open={isAssignModalOpen}>
            <ADTitle level={3} className='text-center pb-8'>
              Assign
            </ADTitle>
            <Row className='pb-8'>
              <Col xs={24} sm={8}>
                <div className='bg-slate-300 h-auto w-[200px] aspect-[3/4]' />
              </Col>
              <Col xs={24} sm={16}>
                <div className='sm:pl-4'>
                  <ADTitle level={5}>Create new Assignment</ADTitle>
                  <Row gutter={16} className='py-4' wrap={false}>
                    <Col xs={24} flex='auto'>
                      <Input className='w-full flex min-w-full' />
                    </Col>
                    <Col xs={24} flex='none'>
                      <ADButton type='primary' size='small' className='!rounded-full' onClick={onCreateClick}>
                        Create
                      </ADButton>
                    </Col>
                  </Row>
                  <div className='border border-solid border-black border-x-0 border-t-0' />
                  <ADTitle level={5} className='py-4'>
                    Add to existing Assignment
                  </ADTitle>
                  {Array(3)
                    .fill('Fractions')
                    .map((item, index) => (
                      <Row gutter={16} key={index} className='mt-4'>
                        <Col flex='none'>
                          <div className='bg-slate-300 h-auto w-[75px] aspect-[4/3]' />
                        </Col>
                        <Col xs={24} flex='auto' className='flex items-center'>
                          {item}
                        </Col>
                      </Row>
                    ))}
                </div>
              </Col>
            </Row>
          </Modal>
          <Modal
            className='rounded-xl'
            closeIcon={(
              <CloseOutlined
                style={{
                  color: '#EC1E24'
                }}
                className='!text-danger font-bold'
                onClick={() => setIsStepModalOpen(false)}
              />
            )}
            centered
            width={670}
            footer={false}
            open={isStepModalOpen}
          >
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
                  <Button size='large' type='danger' onClick={() => nextStep()}>
                    CANCEL
                  </Button>
                  <Button size='large' type='primary' onClick={() => nextStep()}>
                    ADD MORE ITEMS
                  </Button>
                  <Button size='large' type='primary' onClick={() => nextStep()}>
                    ASSIGN
                  </Button>
                </div>
              )}
              {currentStep === 1 && (
                <div className='flex justify-between'>
                  <Button size='large' type='danger' onClick={() => nextStep()}>
                    CANCEL
                  </Button>
                  <Button size='large' type='primary' onClick={() => prevStep()}>
                    BACK
                  </Button>
                </div>
              )}
              {currentStep === 2 && (
              <div className='flex justify-between'>
                <Button size='large' type='danger' onClick={() => nextStep()}>
                  CANCEL
                </Button>
                <Button size='large' type='primary' onClick={() => prevStep()}>
                  BACK
                </Button>
                <Button size='large' type='primary' onClick={() => nextStep()}>
                  ASSIGN
                </Button>
              </div>
              )}
            </div>
          </Modal>
        </div>
      </div>

      {/* Card Title */}
      <p className='leading-4 text-[12px] mb-0'>
        {cardData.title}
        -
        {cardData?.descrpt?.substring(0, 50)}
      </p>

      {/* Card author */}
      <p className='leading-4 text-[10px] text-gray-400'>{cardData.author}</p>

      {/* Extra content */}
      <div className='flex flex-row gap-[10px]'>
        {cardData?.stds_topic?.length > 0 &&
          cardData?.stds_topic?.slice(0, 3).map((item, index) => (
            <span className='leading-4 text-[10px] bg-gray-300 text-black px-[3px] rounded-[3px]'>
              {item}
            </span>
          ))}
      </div>
    </div>
  );
}

export default CardComponent;
