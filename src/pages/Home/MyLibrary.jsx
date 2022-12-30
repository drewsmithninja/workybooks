import React, { useState, useEffect } from 'react';
import { Col, Modal, Row, Select, Space, Steps, Tabs, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
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
import { getCollections, getFavoriteCollections, updateCollectionLike } from '../../app/features/collection/collectionSlice';
import ADImage from '../../components/antd/ADImage';
import { getRecentWorksheets } from '../../app/features/worksheet/worksheetSlice';

function MyLibrary() {
  const favoriteCollections = useSelector((state) => state.collection.favoriteCollections?.list);
  const collections = useSelector((state) => state.collection.collections?.list);
  const recentCollections = useSelector((state) => state.worksheet?.recentCollections?.list);
  const user = localStorage.getItem('user');
  const [rerender, setRerender] = useState(0);
  const [currentTab, setCurrentTab] = useState('my collection');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { Step } = Steps;

  const collectionFavHandler = async (e) => {
    const data = {
      collectionId: await e._id,
      favorite: !e.favorite
    };
    await dispatch(updateCollectionLike(data));
    await setRerender(Math.random());
  };

  useEffect(() => {
    if (user) {
      dispatch(updateCollectionLike());
      dispatch(getRecentWorksheets());
      dispatch(getFavoriteCollections());
      dispatch(getCollections());
    }
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
  const collectionTab = (
    <Row gutter={[16, 16]}>
      {collections?.length ? (
        collections?.map((item) => (
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
        {collections?.length ? (
          collections
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
        {favoriteCollections?.length ? (
          favoriteCollections.map((item) => <CardComponent setRerender={setRerender} likeStatus={item?.likes?.isLike} key={item._id} item={item} cardWidth={215} />)
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
      {recentCollections?.length ? (
        recentCollections?.map((item) => <CardComponent setRerender={setRerender} likeStatus={item?.likes?.isLike} key={item._id} item={item} cardWidth={215} />)
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
      dispatch(getRecentWorksheets());
    }
  };
  return (
    <MainLayout>
      <Modal className='rounded-xl' centered footer={false} open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel}>
        <NewAssignmentOrCollection assign onCreate={onAssignCreateClick} />
      </Modal>
      <Modal className='rounded-xl' centered footer={false} open={isCollectionModalOpen} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel}>
        <NewAssignmentOrCollection onCreate={onCollectionCreateClick} />
      </Modal>
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
      <div className='px-8 py-8 flex justify-between align-center'>
        <ADTitle level={3}>{`My Library - ${currentTab}`}</ADTitle>
        <Space>
          <ADImage src={sortIcon} alt='sort' />
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
