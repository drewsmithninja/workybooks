import { FaPrint, FaFolderPlus, FaRegImages, FaPinterest, FaFacebook, FaInstagram, FaLink } from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import { Col, Image, Row, Space, Tag } from 'antd';
import React from 'react';
import dummyImage from '../../assets/images/dummyImage.png';
import ADButton from '../../components/antd/ADButton';
import ADTitle from '../../components/antd/ADTitle';
import MainLayout from '../../components/layout/MainLayout';

function Worksheet() {
  return (
    <MainLayout>
      <div className='container pt-16 md:px-0 px-4'>
        <Row gutter={[16, 16]} className='pb-8'>
          <Col xs={24} md={12} lg={8} xl={6}>
            <div className='xl:pr-10 lg:pr-6 md:pr-4 pr-0'>
              <Space direction='vertical' className='w-full'>
                <div className='bg-gray-300 aspect-[2.5/3] w-full rounded w-full' />
                <ADButton type='primary' className='w-full'>
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
            <ADTitle level={2}>short passage - find the meaning of a word - Ruth Bader</ADTitle>
            <div className='grid grid-cols-2 py-4 w-fit mb-4'>
              <div>Publisher:</div>
              <div>Workybooks</div>
              <div>Written by:</div>
              <div>Jacqueline Juliano</div>
              <div>Illustrated by:</div>
              <div>Phoebe Rothfeld</div>
            </div>
            <div className='flex pb-4'>
              <div className='font-bold min-w-[100px]'>Grades</div>
              <Space size='large' className='pb-3'>
                <div className='w-[80px] text-center bg-gray-200'>3</div>
                <div className='w-[80px] text-center bg-gray-200'>3</div>
              </Space>
            </div>
            <div className='flex pb-4'>
              <div className='font-bold min-w-[100px]'>Standards</div>
              <Space size='large' className='pb-3'>
                <div className='w-[80px] text-center bg-gray-200'>3</div>
                <div className='w-[80px] text-center bg-gray-200'>3</div>
                <div className='w-[80px] text-center bg-gray-200'>3</div>
              </Space>
            </div>
            <ADTitle level={4}>About this Activities</ADTitle>
            <p>About this activity A template for students to use when planning a narrative text. Use this teaching resource to help your students plan their narrative writing. The template adheres to the following narrative structure:</p>
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
              <Space>
                <Tag className='rounded-full'>Web 1</Tag>
                <Tag className='rounded-full'>Web 2</Tag>
                <Tag className='rounded-full'>Web 3</Tag>
                <Tag className='rounded-full'>Web 4</Tag>
              </Space>
            </div>
          </Col>
        </Row>
        <ADTitle level={4}>Similar worksheets</ADTitle>
        <Space size='large' className='overflow-x-auto w-full py-6'>
          {Array(15)
            .fill()
            .map((i) => (
              <Image width={200} key={i} src={dummyImage} />
            ))}
        </Space>
      </div>
    </MainLayout>
  );
}

export default Worksheet;
