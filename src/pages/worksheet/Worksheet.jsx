/* eslint-disable react/jsx-one-expression-per-line */
import { FaPrint, FaFolderPlus, FaLink } from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import { Col, Image, Row, Space, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { EmailShareButton, PinterestShareButton, PinterestIcon, EmailIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import { Link, useParams } from 'react-router-dom';
import { worksheetDetails } from '../../app/features/home/homepageSlice';
import ADButton from '../../components/antd/ADButton';
import AssignModal from '../../components/modals/AssignModal';
import CollectionModal from '../../components/modals/CollectionModal';
import StepModal from '../../components/modals/StepModal';
import ADTitle from '../../components/antd/ADTitle';
import MainLayout from '../../components/layout/MainLayout';
import { createCollection } from '../../app/features/collection/collectionSlice';

let wDetail;
function Worksheet() {
  const { user } = useSelector((state) => state.auth);
  const authToken = user?.payload?.verification?.token;
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [worksheetDetail, setWorksheetDetails] = useState();
  const [copied, setCopied] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { worksheetData, worksheetDetailsInfo } = useSelector((state) => state.home);

  useEffect(() => {
    if (user && userId) {
      dispatch(
        worksheetDetails({
          id: userId
        })
      );
    }
  }, [userId]);

  useEffect(() => {
    if (worksheetDetailsInfo !== undefined) {
      setWorksheetDetails(worksheetDetailsInfo);
    }
  }, [worksheetDetailsInfo]);

  const copyHandler = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  // collection modal's functions
  const showCollectionModal = () => {
    setIsCollectionModalOpen(true);
  };

  const handleCollectionModalOk = () => {
    setIsCollectionModalOpen(false);
  };

  const onCollectionCreateClick = (val) => {
    if (val) {
      const data = {
        title: val,
        favorite: false,
        content: [userId],
        added_by: user?.payload?._id
      };
      dispatch(createCollection(data));
      // dispatch(updateCollection());
      setIsCollectionModalOpen(false);
      // setRerender(Math.random());
    }
  };

  const handleCollectionModalCancel = () => {
    setIsCollectionModalOpen(false);
  };

  // assign modal's functions
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

  // step modal's functions
  const handleStepModalOk = () => {
    setIsStepModalOpen(false);
  };

  const handleStepModalCancel = () => {
    setIsStepModalOpen(false);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const assignModal = <AssignModal open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} onCreate={onAssignCreateClick} />;
  const collectionModal = <CollectionModal open={isCollectionModalOpen} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel} onCreate={onCollectionCreateClick} cardData={worksheetDetail} />;
  const stepModal = <StepModal open={isStepModalOpen} onOk={handleStepModalOk} onCancel={handleStepModalCancel} nextStep={nextStep} prevStep={prevStep} />;

  return (
    <MainLayout>
      {collectionModal}
      {assignModal}
      {stepModal}
      <div className='container pt-16 my-0 mx-auto ml- md:px-4'>
        <Row gutter={[16, 16]} className='pb-8'>
          <Col xs={24} md={12} lg={8} xl={6}>
            <div className='xl:pr-10 lg:pr-6 md:pr-4 pr-0'>
              <Space direction='vertical' className='w-full'>
                {worksheetDetail?.thumbnail ? (
                  <Image
                    width='100%'
                    src={worksheetDetail?.thumbnail}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = 'https://via.placeholder.com/215x278';
                    }}
                  />
                ) : (
                  <div className='bg-gray-300 aspect-[2.5/3] w-full rounded w-full' />
                )}
                <ADButton type='primary' block className='justify-center mt-3' onClick={() => window.open('https://www.google.com')}>
                  PLAY WORKSHEET
                </ADButton>
              </Space>
              <Row gutter={16} className='text-gray-400 pt-6 pb-5'>
                <Col lg={8} className='flex items-center border-y-0 border-l-0 border-solid'>
                  <div className='text-2xl mr-2 flex'>
                    <FaPrint />
                  </div>
                  <div className='text-xs text-gray-500'>PRINT</div>
                </Col>
                <Col lg={8} className='flex items-center border-y-0 border-l-0 border-solid'>
                  <ADButton onClick={showAssignModal} type='text' className='text-left text-gray-400 !p-0 !m-0'>
                    <div className='flex items-center'>
                      <div className='text-2xl mr-2 flex'>
                        <MdAssignmentTurnedIn />
                      </div>
                      <div className='text-xs text-gray-500 leading-snug'>ASSIGN</div>
                    </div>
                  </ADButton>
                </Col>
                <Col lg={8}>
                  <ADButton onClick={showCollectionModal} type='text' className='text-left text-gray-400 !p-0 !m-0'>
                    <div className='flex items-center'>
                      <div className='text-2xl mr-2 flex'>
                        <FaFolderPlus />
                      </div>
                      <div className='text-xs text-gray-500 leading-snug'>
                        ADD TO <br /> COLLECTION
                      </div>
                    </div>
                  </ADButton>
                </Col>
              </Row>
              <div className='border border-solid border-slate-300 rounded-2xl py-4 px-3 text-slate-400'>
                <div className='flex items-center justify-between'>
                  <div className='flex mx-0'>SHARE</div>
                  <div className='text-2xl flex mx-2'>
                    <EmailShareButton className='flex justify-center'>
                      <EmailIcon size={28} round />
                    </EmailShareButton>
                  </div>
                  <div className='text-2xl flex mx-2'>
                    <PinterestShareButton url={copyHandler} media title='Pinterest' className='flex justify-center'>
                      <PinterestIcon size={28} round />
                    </PinterestShareButton>
                  </div>
                  <div className='text-2xl flex mx-2'>
                    <WhatsappShareButton url={copyHandler} className='flex justify-center'>
                      <WhatsappIcon size={28} round />
                    </WhatsappShareButton>
                  </div>
                  <div className='text-2xl flex mx-2'>
                    <ADButton onClick={copyHandler} type='text' className='!p-0 text-gray-400 flex items-center w-full'>
                      {!copied ? <FaLink className='text-xl px-px' /> : <BsFillCheckCircleFill className='text-primary text-2xl font-bold' />}
                    </ADButton>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12} lg={16} xl={18}>
            <ADTitle level={2}>{worksheetDetail?.title}</ADTitle>
            <div className='grid grid-cols-2 py-4 w-fit mb-4'>
              <div>Publisher:</div>
              <div>{worksheetDetail?.publisher}</div>
              <div>Written by:</div>
              <div>{worksheetDetail?.author}</div>
              <div>Illustrated by:</div>
              <div>{worksheetDetail?.illust}</div>
            </div>
            <div className='flex pb-4'>
              <div className='font-bold min-w-[100px]'>Grades</div>
              <Space size='large' className='pb-3'>
                {worksheetDetail?.grades?.map((item) => (
                  <div key={item._id} className='w-[80px] text-center bg-gray-200'>
                    {item.title}
                  </div>
                ))}
              </Space>
            </div>
            <div className='flex pb-4'>
              <div className='font-bold min-w-[100px]'>Standards</div>
              <Space size='large' className='pb-3'>
                {worksheetDetail?.stds?.map((item, index) => (
                  <div key={item._id} className='w-[80px] text-center bg-gray-200'>
                    {item.title}
                  </div>
                ))}
              </Space>
            </div>
            <ADTitle level={4}>About this Activities</ADTitle>
            <p>{worksheetDetail?.descrpt}</p>
            <Space direction='vertical' size='small'>
              <div>orientation (setting, characters, and mood)</div>
              <div>complication</div>
              <div>events and climax</div>
              <div>resolution</div>
            </Space>
            <div>
              <ADTitle level={4} className='py-4'>
                Tags
              </ADTitle>
              <Space className='flex-wrap'>
                {worksheetDetail?.keyw?.map((item) => (
                  <Tag key={item} className='rounded-full'>
                    {item}
                  </Tag>
                ))}
              </Space>
            </div>
          </Col>
        </Row>
        <ADTitle level={4}>Similar worksheets</ADTitle>
        <Space size='large' className='overflow-x-auto w-full py-6'>
          {worksheetData?.list?.slice(0, 15).map((i) => (
            <Link key={i._id} to={i._id ? `/worksheet/${i._id}` : ''}>
              <Image
                key={i}
                src={i.thumbnail}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = 'https://via.placeholder.com/215x278';
                }}
                preview={false}
                className='rounded-2xl w-full w-[200px]'
              />
            </Link>
          ))}
        </Space>
      </div>
    </MainLayout>
  );
}

export default Worksheet;
