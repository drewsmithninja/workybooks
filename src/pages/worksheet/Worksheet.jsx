import { Col, Row, Space, Tag } from 'antd';
import React from 'react';
import ADButton from '../../components/antd/ADButton';
import ADTitle from '../../components/antd/ADTitle';
import MainLayout from '../../components/layout/MainLayout';

function Worksheet() {
  return (
    <MainLayout>
      <div className='container pt-16'>
        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Space direction='vertical' className='w-full'>
              <div className='bg-gray-300 h-[400px] rounded w-full' />
              <ADButton type='primary' className='w-full'>
                PLAY WORKSHEET
              </ADButton>
            </Space>
            <div className='grid grid-cols-3 py-4'>
              <div className='text-center bg-gray-100'>01</div>
              <div className='text-center bg-gray-000'>02</div>
              <div className='text-center bg-gray-100'>03</div>
            </div>
          </Col>
          <Col xs={24} md={18}>
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
      </div>
    </MainLayout>
  );
}

export default Worksheet;
