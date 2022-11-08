import { Checkbox, Col, Dropdown, Image, Menu, Modal, Row, Select, Space, Steps, Tabs, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloseOutlined, EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';
import sortIcon from '../../assets/images/icons/sort.png';
import CardComponent from '../../components/common/CardComponent';
import dummyImage from '../../assets/images/dummyImage.png';
import ADTitle from '../../components/antd/ADTitle';
import ADCard from '../../components/antd/ADCard';
import ADButton from '../../components/antd/ADButton';
import { selectCollection, unselectCollection } from '../../redux/actions/selectedCollectionAction';
import AssignStep1 from '../../components/assignSteps/AssignStep1';
import AssignStep2 from '../../components/assignSteps/AssignStep2';
import AssignStep3 from '../../components/assignSteps/AssignStep3';
import printIcon from '../../assets/images/icons/print_gray.png';
import assignIcon from '../../assets/images/icons/assign_gray.png';
import folderIcon from '../../assets/images/icons/folder_gray.png';
import shareIcon from '../../assets/images/icons/share_gray.png';
import NewAssignmentOrCollection from '../../components/modalSteps/NewAssignmentOrCollection';

function MyLibrary() {
  const [currentTab, setCurrentTab] = useState('Collections');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [c, setc] = useState(false);
  const cards = [];
  const { Step } = Steps;

  Array(8)
    .fill(1)
    .map((index) => {
      cards.push({
        id: index + 1,
        key: index + 1,
        name: 'text_card'
      });
      return cards;
    });
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
  const onCollectionCreateClick = () => {
    setIsCollectionModalOpen(false);
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
          icon: <img src={printIcon} alt='print' />
        },
        {
          label: 'ASSIGN',
          key: '2',
          icon: <img src={assignIcon} alt='assign' />,
          onClick: showAssignModal
        },
        {
          label: 'ADD TO COLLECTION',
          key: '3',
          icon: <img src={folderIcon} alt='add to collection' />,
          onClick: showCollectionModal
        },
        {
          label: 'SHARE',
          key: '4',
          icon: <img src={shareIcon} alt='share' />
        }
      ]}
    />
  );
  const worksheets = [
    {
      id: 1,
      key: 1,
      name: 'test_card_1',
      likes: '7k',
      isLiked: false
    },
    {
      id: 2,
      key: 2,
      name: 'test_card_2',
      likes: '1.5k',
      isLiked: true
    },
    {
      id: 3,
      key: 3,
      name: 'test_card_3',
      likes: '6k',
      isLiked: false
    }
  ];
  return (
    <MainLayout>
      <Modal className='rounded-xl' centered width={670} footer={false} open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel}>
        <NewAssignmentOrCollection assign onCreateClick={onAssignCreateClick} />
      </Modal>
      <Modal className='rounded-xl' centered width={670} footer={false} open={isCollectionModalOpen} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel}>
        <NewAssignmentOrCollection onCreateClick={onCollectionCreateClick} />
      </Modal>
      <Modal className='rounded-xl' centered width={670} footer={false} open={isStepModalOpen}>
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
      <div className='px-8 py-8 flex justify-between align-center'>
        <ADTitle level={3}>{`My Library - ${currentTab}`}</ADTitle>
        <Space>
          <img src={sortIcon} alt='sort' />
          <Select
            placeholder='Sort By'
            className='w-[150px] text-left'
            style={{
              borderRadius: 8
            }}
          >
            <Select.Option value='Date Updated'>Date Updated</Select.Option>
          </Select>
        </Space>
      </div>
      <div className='px-8'>
        <Tabs
          defaultActiveKey={currentTab}
          tabBarStyle={{
            fontWeight: 'bold'
          }}
          onChange={(e) => setCurrentTab(e)}
        >
          <Tabs.TabPane tab='MY COLLECTIONS' key='Collections' className='py-4'>
            <Space size='large'>
              {worksheets.length &&
                worksheets.map((item) => (
                  <ADCard className='w-[400px]' key={item} cover={<Image preview={false} onClick={() => navigate(`/collection/${item.id}`)} className='object-cover w-full aspect-[16/9] cursor-pointer' alt='card-image' src={dummyImage} />}>
                    <div className='flex justify-between items-center py-2'>
                      <Checkbox
                        className='w-[25px] scale-125 cardCheckbox'
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(selectCollection(item));
                          } else {
                            dispatch(unselectCollection(item));
                          }
                        }}
                        id={`collection_id_${item.id}`}
                        name={`collection_id_${item.id}`}
                        checked={c}
                      />
                      <div className='flex items-center'>
                        <ADButton className='!p-1 text-xl' type='text'>
                          {item.isLiked ? <HeartFilled className='text-primary' /> : <HeartOutlined className='text-secondary' />}
                        </ADButton>
                        <span className='text-sm'>{` ${item.likes}`}</span>
                      </div>
                      <Dropdown overlay={menu} placement='topLeft' arrow>
                        <div className='rounded-full border-solid border-2 border-slate-300 flex'>
                          <EllipsisOutlined className='text-[18px] text-medium p-px text-gray-400' />
                        </div>
                      </Dropdown>
                    </div>
                    <div>Make Interfaces</div>
                    <div className='flex justify-between'>
                      <div className='text-xs text-secondary'>By Workybooks</div>
                      <div className='text-xs text-secondary'>12 Worksheets</div>
                    </div>
                  </ADCard>
                ))}
            </Space>
            <div className='flex flex-row flex-wrap'>{worksheets.length > 0 && worksheets.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} cardWidth={335} />)}</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='FAVORITES' key='Favorites'>
            <Typography.Text className='font-bold'>COLLECTIONS</Typography.Text>
            <div className='flex flex-row flex-wrap'>{worksheets.length > 0 && worksheets.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} cardWidth={335} />)}</div>
            <Typography.Text className='font-bold'>WORKSHEETS</Typography.Text>
            <div className='flex flex-row flex-wrap'>{cards.length > 0 && cards.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} cardWidth={215} />)}</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='RECENTS' key='Recents'>
            <div className='flex flex-row flex-wrap'>{cards.length > 0 && cards.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} cardWidth={215} />)}</div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default MyLibrary;
