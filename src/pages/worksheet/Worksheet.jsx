/* eslint-disable react/jsx-one-expression-per-line */
import { FaPrint, FaFolderPlus, FaRegImages, FaPinterest, FaInstagram, FaLink } from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import { Col, Image, Row, Space, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { worksheetDetails } from '../../app/features/home/homepageSlice';
import ADButton from '../../components/antd/ADButton';
import ADTitle from '../../components/antd/ADTitle';
import MainLayout from '../../components/layout/MainLayout';

let wDetail;
function Worksheet() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [worksheetDetail, setWorksheetDetails] = useState();
  const { worksheetData, worksheetDetailsInfo, ccsData, gradeData, isError, isSucess, message } = useSelector((state) => state.home);

  useEffect(() => {
    if (userId) {
      dispatch(
        worksheetDetails({
          id: userId
        })
      );
    }
  }, [userId]);

  useEffect(() => {
    if (worksheetDetailsInfo?.data !== undefined) {
      setWorksheetDetails(worksheetDetailsInfo?.data);
    }
  }, [worksheetDetailsInfo?.data]);

  return (
    <MainLayout>
      <div className='container pt-16 my-0 mx-auto ml- md:px-4'>
        <Row gutter={[16, 16]} className='pb-8'>
          <Col xs={24} md={12} lg={8} xl={6}>
            <div className='xl:pr-10 lg:pr-6 md:pr-4 pr-0'>
              <Space direction='vertical' className='w-full'>
                {worksheetDetail?.thumbnail ? (
                  <Image
                    src={worksheetDetail?.thumbnail}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = 'https://via.placeholder.com/215x278';
                    }}
                  />
                ) : (
                  <div className='bg-gray-300 aspect-[2.5/3] w-full rounded w-full' />
                )}
                <ADButton type='primary' className='w-9/12 justify-center' onClick={() => window.open('https://www.google.com')}>
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
                  <div className='text-2xl mr-2 flex'>
                    <MdAssignmentTurnedIn />
                  </div>
                  <div className='text-xs text-gray-500'>ASSIGN</div>
                </Col>
                <Col lg={8} className='flex items-center'>
                  <div className='text-2xl mr-2 flex'>
                    <FaFolderPlus />
                  </div>
                  <div className='text-xs text-gray-500 leading-snug'>ADD TO COLLECTION</div>
                </Col>
              </Row>
              <div className='border border-solid border-slate-300 rounded-2xl py-4 px-3 text-slate-400'>
                <div className='flex items-center justify-between'>
                  <div className='flex mx-0'>SHARE</div>
                  <div className='text-2xl flex  mx-2'>
                    <FaRegImages />
                  </div>
                  <div className='text-2xl flex  mx-2'>
                    <FaPinterest />
                  </div>
                  <div className='text-2xl flex  mx-2'>
                    <FaInstagram />
                  </div>
                  <div className='text-2xl flex  mx-2'>
                    <FaLink />
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
                  <div className='w-[80px] text-center bg-gray-200'>{item.title}</div>
                ))}
              </Space>
            </div>
            <div className='flex pb-4'>
              <div className='font-bold min-w-[100px]'>Standards</div>
              <Space size='large' className='pb-3'>
                {worksheetDetail?.stds?.map((item, index) => (
                  <div className='w-[80px] text-center bg-gray-200'>{item.title}</div>
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
                {worksheetDetail?.keyw?.map((item, index) => (
                  <Tag className='rounded-full'>{item}</Tag>
                ))}
              </Space>
            </div>
          </Col>
        </Row>
        <ADTitle level={4}>Similar worksheets</ADTitle>
        <Space size='large' className='overflow-x-auto w-full py-6'>
          {worksheetData?.data?.list?.slice(0, 15).map((i) => (
            <Link to={i._id ? `/worksheet/${i._id}` : ''}>
              <Image
                width={200}
                key={i}
                src={i.thumbnail}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = 'https://via.placeholder.com/215x278';
                }}
                preview={false}
                className='rounded-2xl w-full'
              />
            </Link>
          ))}
        </Space>
      </div>
    </MainLayout>
  );
}

export default Worksheet;
