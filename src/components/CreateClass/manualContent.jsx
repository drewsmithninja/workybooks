import {
  Col,
  Form,
  Row,
  Typography,
  Input,
  Button
} from 'antd';
import React from 'react';

function ManualContent({
  setManualStep
}) {
  return (
    <>
      <Typography.Title level={1} className="!text-2xl md:!text-2xl mt-[30px] text-center">
        Create Classroom
      </Typography.Title>
      <Typography.Title level={5} className="!font-normal !mt-[16px] !mb-[60px] !text-[14px] text-center">
        Please provide the classroom details
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={24} className='text-center'>
          <Form>
            <Form.Item label={false}>
              <Input placeholder='Class Name' className='w-[384px] h-[46px] rounded-[8px] mb-[55px]' />
            </Form.Item>
          </Form>
        </Col>
        <Col span={24} className='text-center'>
          <p className='text-baseline'>Grade Level</p>
          <div className='w-[80%] m-auto'>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                  K
                </Button>
              </Col>
              <Col span={6}>
                <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                  PreK
                </Button>
              </Col>
              <Col span={6}>
                <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                  1
                </Button>
              </Col>
              <Col span={6}>
                <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                  2
                </Button>
              </Col>
              <Col span={3}>&nbsp;</Col>
              <Col span={6}>
                <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                  3
                </Button>
              </Col>
              <Col span={6}>
                <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                  4
                </Button>
              </Col>
              <Col span={6}>
                <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                  5
                </Button>
              </Col>
              <Col span={3}>&nbsp;</Col>
            </Row>
          </div>
        </Col>
        <Col span={24} className='text-center'>
          <Button type='primary' className='mt-[63px] m-auto' onClick={() => setManualStep(2)}>CONTINUE</Button>
        </Col>
      </Row>
    </>
  );
}

export default ManualContent;
