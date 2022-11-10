import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Select, Space, Tabs, Typography } from 'antd';
import MainLayout from '../../components/layout/MainLayout';
import sortIcon from '../../assets/images/icons/sort.png';
import CardComponent from '../../components/common/CardComponent';
import dummyImage from '../../assets/images/dummyImage.png';
import cardSample1 from '../../assets/images/cardSample1.jpg';
import cardSample2 from '../../assets/images/cardSample2.jpg';
import cardSample3 from '../../assets/images/cardSample3.jpg';
import ADTitle from '../../components/antd/ADTitle';
import ThumbnailCard from '../../components/thumbnailCard/ThumbnailCard';

function MyLibrary() {
  const [currentTab, setCurrentTab] = useState('Collections');
  const { worksheetDetails } = useSelector((state) => state.home);
  console.log(worksheetDetails);
  const cards = [];
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

  const worksheets = [
    {
      id: 1,
      name: 'test_card_1',
      likes: '7k',
      isLiked: false,
      cardImages: [cardSample1, cardSample2, cardSample3, cardSample1, cardSample2]
    },
    {
      id: 2,
      name: 'test_card_2',
      likes: '1.5k',
      isLiked: true,
      cardImages: [cardSample2, cardSample1, cardSample3]
    },
    {
      id: 3,
      name: 'test_card_3',
      likes: '6k',
      isLiked: false,
      cardImages: [cardSample1, cardSample3]
    },
    {
      id: 4,
      name: 'test_card_4',
      likes: '6k',
      isLiked: false,
      cardImages: [cardSample1]
    }
  ];
  return (
    <MainLayout>
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
                  <Col xs={24} xl={6} lg={8} sm={12} key={item.id}>
                    <ThumbnailCard favorite={item.isLiked} thumbnails={item.cardImages} key={item.id} />
                  </Col>
                ))}
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab='FAVORITES' key='Favorites'>
            <Typography.Text className='font-bold'>COLLECTIONS</Typography.Text>
            <div className='flex flex-row flex-wrap'>{worksheets.length > 0 && worksheets.map((item) => <CardComponent key={Math.random()} cardData={item} cardImages={dummyImage} cardWidth={335} />)}</div>
            <Typography.Text className='font-bold'>WORKSHEETS</Typography.Text>
            <div className='flex flex-row flex-wrap'>{cards.length > 0 && cards.map((item) => <CardComponent key={Math.random()} cardData={item} cardImages={dummyImage} cardWidth={215} />)}</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='RECENTS' key='Recents'>
            <div className='flex flex-row flex-wrap'>{cards.length > 0 && cards.map((item) => <CardComponent key={Math.random()} cardData={item} cardImages={dummyImage} cardWidth={215} />)}</div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default MyLibrary;
