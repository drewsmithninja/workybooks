import { Col, Row, Select, Space, Divider, Typography } from 'antd';
import { FaPrint, FaFolderPlus, FaRegImages, FaPinterest, FaInstagram, FaLink } from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';

import sortIcon from '../../assets/images/icons/sort.png';
import CardComponent from '../../components/common/CardComponent';
import dummyImage from '../../assets/images/dummyImage.png';
import shareIcon from '../../assets/images/icons/share_gray.png';

function MyCollection() {
  const [currentTab, setCurrentTab] = useState('Collections');
  const cards = [];
  Array(8)
    .fill(1)
    .map((item, index) => cards.push({
      id: index + 1,
      key: index + 1,
      name: 'test_card'
    }));
  return (
    <MainLayout>
      <Row gutter={[16, 16]} className='p-[30px] ant-custom-tabs'>
        <Col md={24} xs={24} sm={24}>
          <Typography.Title level={3} className='md:text-left text-center'>
            Making Refreance
          </Typography.Title>
        </Col>
        <Col md={12} xs={24} sm={24} className='md:text-left text-center'>
          <div className='pb-4'>
            <span>By Mrs Biries</span>
            <span className='md:text-center'> 4 Worksheet</span>
          </div>
          <div className='flex'>
            <div className='font-bold min-w-[100px]'>Standards</div>
            <Space size='large' className='pb-3'>
              <div className='w-[80px] text-center bg-gray-200'>3.W.3.1.B</div>
              <div className='w-[80px] text-center bg-gray-200'>3.W.3.1.B</div>
              <div className='w-[80px] text-center bg-gray-200'>3.W.3.1.B</div>
            </Space>
          </div>
        </Col>
        <Col md={12} xs={24} sm={24} className='md:text-right text-center'>
          <Space>
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
                <div className='text-xs pr-4 text-gray-500'>ASSIGN</div>
              </Col>
              <Col lg={8} className='flex items-center'>
                <div className='text-2xl mr-2 flex'>
                  <img src={shareIcon} alt='share' />
                </div>
                <div className='text-xs text-gray-500 leading-snug'>Share</div>
              </Col>
            </Row>
          </Space>
        </Col>
        <Col span={24}>
          <div className='flex flex-row flex-wrap'>{cards.length > 0 && cards.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} cardWidth={215} />)}</div>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default MyCollection;
