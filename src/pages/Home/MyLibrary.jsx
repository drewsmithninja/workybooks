import React, { useState } from 'react';
import { Col, Menu, Modal, Row, Select, Space, Steps, Tabs, Typography } from 'antd';
import { useSelector } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';
import sortIcon from '../../assets/images/icons/sort.png';
import CardComponent from '../../components/common/CardComponent';
import dummyImage from '../../assets/images/dummyImage.png';
import cardSample1 from '../../assets/images/cardSample1.jpg';
import cardSample2 from '../../assets/images/cardSample2.jpg';
import cardSample3 from '../../assets/images/cardSample3.jpg';
import ADTitle from '../../components/antd/ADTitle';
import ADButton from '../../components/antd/ADButton';
import AssignStep1 from '../../components/assignSteps/AssignStep1';
import AssignStep2 from '../../components/assignSteps/AssignStep2';
import AssignStep3 from '../../components/assignSteps/AssignStep3';
import printIcon from '../../assets/images/icons/print_gray.png';
import assignIcon from '../../assets/images/icons/assign_gray.png';
import folderIcon from '../../assets/images/icons/folder_gray.png';
import shareIcon from '../../assets/images/icons/share_gray.png';
import NewAssignmentOrCollection from '../../components/modalSteps/NewAssignmentOrCollection';
import ThumbnailCard from '../../components/thumbnailCard/ThumbnailCard';

function MyLibrary() {
  const [currentTab, setCurrentTab] = useState('Collections');
  const [currentStep, setCurrentStep] = useState(0);
  const { worksheetData } = useSelector((state) => state.home);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
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
      name: 'test_card_1',
      likes: '7k',
      isLiked: false,
      cardImage: [cardSample1, cardSample2, cardSample3, cardSample1, cardSample2]
    },
    {
      id: 2,
      name: 'test_card_2',
      likes: '1.5k',
      isLiked: true,
      cardImage: [cardSample2, cardSample1, cardSample3]
    },
    {
      id: 3,
      name: 'test_card_3',
      likes: '6k',
      isLiked: false,
      cardImage: [cardSample1, cardSample3]
    },
    {
      id: 4,
      name: 'test_card_4',
      likes: '6k',
      isLiked: false,
      cardImage: [cardSample1]
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
            <Row gutter={[16, 16]}>
              {worksheets.length &&
                worksheets.map((item) => (
                  <Col xs={24} xl={6} lg={8} sm={12}>
                    <ThumbnailCard favorite={item.isLiked} onFavChange={() => !favorite} thumbnails={item.cardImage} key={item.id} />
                  </Col>
                ))}
            </Row>
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
