import React from 'react';
import { Avatar, Col, List, Row, Space } from 'antd';
import ADButton from '../../antd/ADButton';

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
];

function Students() {
  return (
    <div className='px-20'>
      <Space direction='vertical' size='large' className='flex'>
        <div className='flex ant-row-end'>
          <ADButton type='primary'>ADD STUDENTS</ADButton>
        </div>
        <List
          className='rounded-t-lg with-header'
          header={
            <Row>
              <Col span={8}>
                <div className='text-center inter-font'>NAME</div>
              </Col>
              <Col span={8}>
                <div className='text-center inter-font'>ACTIVITY</div>
              </Col>
              <Col span={4}>
                <div className='text-center inter-font'>VIEW WORK</div>
              </Col>
              <Col span={4}>
                <div className='text-center inter-font'>EDIT</div>
              </Col>
            </Row>
          }
          itemLayout='horizontal'
          dataSource={data}
          bordered
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />} title={<a href='https://ant.design'>{item.title}</a>} description='description' />
            </List.Item>
          )}
        />
      </Space>
    </div>
  );
}

export default Students;
