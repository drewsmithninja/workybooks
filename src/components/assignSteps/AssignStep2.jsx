import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Col, Form, Input, List, Row, Select, Space } from 'antd';
import React from 'react';
import ADTitle from '../antd/ADTitle';

export default function AssignStep2({ onAssignSelected, onAssignClass }) {
  const { Option } = Select;
  const onFinish = (values) => {};
  const onFinishFailed = (errorInfo) => {};
  const handleChange = (value) => {};
  const data = [
    {
      checked: false,
      avatar: <UserOutlined />,
      title: 'checkbox item 1'
    },
    {
      checked: false,
      avatar: <UserOutlined />,
      title: 'checkbox item 2'
    },
    {
      checked: false,
      avatar: <UserOutlined />,
      title: 'checkbox item 3'
    },
    {
      checked: false,
      avatar: <UserOutlined />,
      title: 'checkbox item 4'
    },
    {
      checked: false,
      avatar: <UserOutlined />,
      title: 'checkbox item 5'
    }
  ];

  return (
    <div>
      <Form className='py-2' size='large' name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={7}>
            <div className='font-bold py-2'>Assign to entire class</div>
          </Col>
          <Col xs={24} sm={10} className='flex items-center'>
            <Form.Item className='w-full mb-0' name='classAssign'>
              <Select defaultValue='lucy' onChange={handleChange}>
                <Option value='jack'>Jack</Option>
                <Option value='lucy'>Lucy</Option>
                <Option value='disabled' disabled>
                  Disabled
                </Option>
                <Option value='Yiminghe'>yiminghe</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={7}>
            <Form.Item className='mb-0'>
              <Button type='primary' htmlType='submit' className='w-full' onClick={onAssignClass}>
                ASSIGN
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <ADTitle level={5} className='text-center'>
        OR
      </ADTitle>
      <Form className='py-2' size='large' name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Row gutter={16}>
          <Col xs={24} sm={7}>
            <div className='font-bold pt-2'>Select Students</div>
          </Col>
          <Col xs={24} sm={10}>
            <Checkbox.Group className='w-full' onChange={() => {}}>
              <List
                style={{
                  background: '#F6F9FC'
                }}
                className='px-4 rounded-md'
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Checkbox value={item.title}>
                      <div className='flex items-center'>
                        <Space size='middle' className='ml-2'>
                          <Avatar size='large' icon={item.checked} />
                          <div className='font-bold'>{item.title}</div>
                        </Space>
                      </div>
                    </Checkbox>
                  </List.Item>
                )}
              />
            </Checkbox.Group>
          </Col>
          <Col xs={24} sm={7}>
            <Form.Item className='flex-none'>
              <Button onClick={onAssignSelected} type='primary' htmlType='submit' className='w-full text-sm'>
                ASSIGN TO SELECTED
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
