import {
  Col,
  Row,
  Select,
  Space,
  Tabs,
  Typography
} from 'antd';
import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';

import sortIcon from '../../assets/images/icons/sort.png';
import CardComponent from '../../components/common/CardComponent';
import dummyImage from '../../assets/images/dummyImage.png';

function MyLibrary() {
  const [currentTab, setCurrentTab] = useState('Collections');
  const cards = [];
  Array(8).fill(1).map((item, index) => cards.push({
    id: index + 1,
    key: index + 1,
    name: 'test_card'
  }));
  const worksheets = [];
  Array(3).fill(1).map((item, index) => worksheets.push({
    id: index + 1,
    key: index + 1,
    name: 'test_card'
  }));
  return (
    <MainLayout>
      <Row gutter={[16, 16]} className='p-[30px] my-library-page'>
        <Col md={12} xs={24} sm={24}>
          <Typography.Title level={3} className='md:text-left text-center'>
            My Library -&nbsp;
            {currentTab}
          </Typography.Title>
        </Col>
        <Col md={12} xs={24} sm={24} className='md:text-right text-center'>
          <Space>
            <img src={sortIcon} alt='sort' />
            <Select placeholder='Sort By' className='w-[150px] text-left' style={{ borderRadius: 8 }}>
              <Select.Option value='Date Updated'>Date Updated</Select.Option>
            </Select>
          </Space>
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey={currentTab} tabBarStyle={{ fontWeight: 'bold' }} onChange={(e) => setCurrentTab(e)}>
            <Tabs.TabPane tab="MY COLLECTIONS" key="Collections">
              <div className='flex flex-row flex-wrap'>
                {cards.length > 0 && cards.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} cardWidth={335} />)}
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="FAVORITES" key="Favorites">
              <Typography.Text className='font-bold'>COLLECTIONS</Typography.Text>
              <div className='flex flex-row flex-wrap'>
                {worksheets.length > 0 && worksheets.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} cardWidth={335} />)}
              </div>
              <Typography.Text className='font-bold'>WORKSHEETS</Typography.Text>
              <div className='flex flex-row flex-wrap'>
                {cards.length > 0 && cards.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} cardWidth={215} />)}
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RECENTS" key="Recents">
              <div className='flex flex-row flex-wrap'>
                {cards.length > 0 && cards.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} cardWidth={215} />)}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default MyLibrary;
