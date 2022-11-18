import { Col, Menu, Modal, Row, Select, Space, Steps, Tabs, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { favoriteData, collectionList, recentList } from '../../app/features/library/librarypageSlice';
import MainLayout from '../../components/layout/MainLayout';
import sortIcon from '../../assets/images/icons/sort.png';
import CardComponent from '../../components/common/CardComponent';
import ThumbnailCard from '../../components/thumbnailCard/ThumbnailCard';
import ADTitle from '../../components/antd/ADTitle';
import ADButton from '../../components/antd/ADButton';
import AssignStep1 from '../../components/assignSteps/AssignStep1';
import AssignStep2 from '../../components/assignSteps/AssignStep2';
import AssignStep3 from '../../components/assignSteps/AssignStep3';
import NewAssignmentOrCollection from '../../components/modalSteps/NewAssignmentOrCollection';
import { updateCollection, updateCollectionLike } from '../../app/features/collection/collectionSlice';

function MyLibrary() {
  const user = localStorage.getItem('user');
  const authToken = user?.data?.verification?.isVerified ? user.data.verification.token : null;
  const [rerender, setRerender] = useState(0);
  const [currentTab, setCurrentTab] = useState('my collection');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { favoriteList, recentData } = useSelector((state) => state.library);
  const myCollectionData = useSelector((state) => state.library.myCollectionData);
  const myCollection = myCollectionData?.data?.list;

  const { Step } = Steps;

  const collectionFavHandler = (e) => {
    const data = {
      collectionId: e._id,
      favorite: !e.favorite
    };
    dispatch(updateCollectionLike(data)).then(setRerender(Math.random()));
  };

  useEffect(() => {
    dispatch(updateCollectionLike());
    dispatch(favoriteData());
    dispatch(recentList());
    dispatch(collectionList());
  }, [rerender]);

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
  console.log(myCollection);
  const collectionTab = (
    <Row gutter={[16, 16]}>
      {myCollection?.length ? (
        myCollection?.map((item) => (
          <Col xs={24} xl={6} lg={8} sm={12} key={item._id}>
            <ThumbnailCard onFavChange={() => collectionFavHandler(item)} favorite={item.favorite} collection={item} thumbnails={item.thumbnailList} key={item._id} id={item._id} />
          </Col>
        ))
      ) : (
        <ADTitle level={3} className='px-2 py-20 rounded-xl'>
          No Collections here!
        </ADTitle>
      )}
    </Row>
  );

  const favCollectionTab = (
    <>
      <Typography.Text className='font-bold'>COLLECTIONS</Typography.Text>
      <Row gutter={[16, 16]} className='py-4'>
        {myCollection?.length ? (
          myCollection
            ?.filter((item) => item.favorite)
            ?.map((item) => (
              <Col xs={24} xl={6} lg={8} sm={12} key={item._id}>
                <ThumbnailCard onFavChange={() => collectionFavHandler(item)} favorite={item.favorite} collection={item} thumbnails={item.thumbnailList} key={item._id} id={item._id} />
              </Col>
            ))
        ) : (
          <ADTitle level={3} className='px-2 py-20 rounded-xl'>
            No any favorites Collections
          </ADTitle>
        )}
      </Row>
      <Typography.Text className='font-bold'>WORKSHEETS</Typography.Text>
      <div className='flex flex-row flex-wrap'>
        {favoriteList?.data?.list?.length ? (
          favoriteList?.data?.list.map((item) => <CardComponent setRerender={setRerender} likeStatus={item?.likes?.isLike} key={item._id} cardData={item} cardImage={item.thumbnail} cardWidth={215} />)
        ) : (
          <ADTitle level={3} className='px-2 py-20 rounded-xl'>
            No any favorites Worksheets
          </ADTitle>
        )}
      </div>
    </>
  );

  const recentTab = (
    <div className='flex flex-row flex-wrap'>
      {recentData?.data?.list?.length > 0 ? (
        recentData?.data?.list?.map((item) => <CardComponent setRerender={setRerender} likeStatus={item?.likes?.isLike} key={item._id} cardData={item} cardImage={item.thumbnail} cardWidth={215} />)
      ) : (
        <ADTitle level={3} className='px-2 py-20 rounded-xl'>
          No any recent Worksheets
        </ADTitle>
      )}
    </div>
  );

  const tabItems = [
    {
      label: 'my collection',
      key: 'my collection',
      children: collectionTab
    },
    {
      label: 'favorites',
      key: 'favorites',
      children: favCollectionTab
    },
    {
      label: 'recent',
      key: 'recent',
      children: recentTab
    }
  ];
  const tabChangeHandler = (e) => {
    if (e === 'my collection') {
      setCurrentTab(e);
      dispatch(collectionList());
    } else if (e === 'favorites') {
      setCurrentTab(e);
      dispatch(favoriteData());
    } else if (e === 'recent') {
      setCurrentTab(e);
      dispatch(recentList());
    }
  };
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
        <Tabs onChange={tabChangeHandler} activeKey={currentTab} items={tabItems} />
      </div>
    </MainLayout>
  );
}

export default MyLibrary;
