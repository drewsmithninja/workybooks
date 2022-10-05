import { CloseCircleFilled } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Modal, Row, Select, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import CardComponent from '../../components/common/CardComponent';
import MainLayout from '../../components/layout/MainLayout';
import { grades } from '../../utils/appData';

function SearchSubject() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const cards = [];
  Array(2)
    .fill(1)
    .map((item, index) => cards.push({
      id: index + 1,
      key: index + 1,
      name: 'test_card'
    }));
  const worksheets = [];
  Array(20)
    .fill(1)
    .map((item, index) => worksheets.push({
      id: index + 1,
      key: index + 1,
      name: 'test_card'
    }));
  return (
    <MainLayout>
      <div className='w-full h-full overflow-hidden flex flex-row'>
        <div className='min-w-[300px] hidden md:flex items-start'>
          <Row gutter={[16, 16]} className='flex flex-1 w-full !m-0 pt-[35px] flex-col'>
            <Col span={24} className='!pl-[50px] flex flex-col gap-[10px]'>
              <Typography.Text className='font-bold'>GRADES</Typography.Text>
              <div className='flex flex-col gap-[10px]'>
                {grades.length > 0 &&
                  grades.map((item) => (
                    <Checkbox value={item} key={`grade_${item}`} className='!ml-0'>
                      Grade
                      {' '}
                      <span className='capitalize'>{item}</span>
                    </Checkbox>
                  ))}
              </div>
              <Divider className='my-0' />
            </Col>
            <Col span={24} className='!pl-[50px] flex flex-col gap-[10px]'>
              <Typography.Text className='font-bold'>GRADES</Typography.Text>
              <div className='flex flex-col gap-[10px]'>
                {grades.length > 0 &&
                  grades.map((item) => (
                    <Checkbox value={item} key={`grade_${item}`} className='!ml-0'>
                      Grade
                      {' '}
                      <span className='capitalize'>{item}</span>
                    </Checkbox>
                  ))}
              </div>
              <Divider className='my-0' />
            </Col>
            <Col span={24} className='!pl-[50px] flex flex-col gap-[10px]'>
              <Typography.Text className='font-bold'>CCS</Typography.Text>
              <div className='flex flex-col gap-[10px]'>
                <Select className='max-w-[220px] !rounded-[8px]'>
                  <Select.Option value='test'>Test</Select.Option>
                </Select>
              </div>
            </Col>
          </Row>
        </div>
        <div className='flex flex-1 pt-[15px]'>
          <Row gutter={[16, 16]} className='flex flex-1 w-full !m-0'>
            <Col span={24} className='flex gap-[10px] md:hidden pb-[20px] items-center justify-center'>
              <Button type='primary' className='!rounded-[60px] w-full !text-center !mx-auto bg-[#243E8F]' onClick={() => setShowMobileFilter(true)}>
                <Typography.Text className='text-normal text-white'>Filter</Typography.Text>
              </Button>
            </Col>
            <Col span={24} className='!pl-[20px] flex flex-wrap gap-[10px]'>
              <Tag closable className='h-[32px] bg-[#21212114] border-0 pt-[5px] rounded-[16px] px-[15px]' closeIcon={<CloseCircleFilled className='text-[12px] pl-[5px] pt-[5px]' />}>
                <Typography.Text className='text-baseline'>Prek</Typography.Text>
              </Tag>
              <Tag closable className='h-[32px] bg-[#21212114] border-0 pt-[5px] rounded-[16px] px-[15px]' closeIcon={<CloseCircleFilled className='text-[12px] pl-[5px] pt-[5px]' />}>
                <Typography.Text className='text-baseline'>Grade K</Typography.Text>
              </Tag>
            </Col>
            <Col span={24} className='!pl-[20px]'>
              <Typography.Text className='font-bold'>
                COLLECTIONS
                {' '}
                <span className='font-normal'>
                  (
                  {cards.length}
                  {' '}
                  results)
                </span>
              </Typography.Text>
            </Col>
            <Col span={24} className='flex flex-wrap'>
              {cards.length > 0 && cards.map((item, index) => <CardComponent cardWidth={350} />)}
            </Col>
            <Col xs={12} md={24} className='!pl-[20px]'>
              <Typography.Text className='font-bold'>
                WORKSHEETS
                {' '}
                <span className='font-normal'>
                  (
                  {worksheets.length}
                  {' '}
                  results)
                </span>
              </Typography.Text>
            </Col>
            <Col span={24} className='flex flex-wrap'>
              {worksheets.length > 0 && worksheets.map((item, index) => <CardComponent />)}
            </Col>
          </Row>
        </div>
      </div>
      <Modal
        title='Filter'
        visible={showMobileFilter}
        onCancel={() => setShowMobileFilter(false)}
        mask={false}
        className='mobileFilterModal'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: 0,
          width: '100%',
          height: '100%',
          maxWidth: 'calc(100vw)',
          borderRadius: 0
        }}
        bodyStyle={{
          height: 'calc(100vh - 55px)',
          overflow: 'auto',
          borderRadius: 0
        }}
        footer={false}
      >
        <Row gutter={[16, 16]} className='flex flex-1 w-full !m-0 pt-[10px] flex-col'>
          <Col span={24} className='!pl-[10px] flex flex-col gap-[10px]'>
            <Typography.Text className='font-bold'>GRADES</Typography.Text>
            <div className='flex flex-col gap-[10px]'>
              {grades.length > 0 &&
                grades.map((item) => (
                  <Checkbox value={item} key={`grade_${item}`} className='!ml-0'>
                    Grade
                    {' '}
                    <span className='capitalize'>{item}</span>
                  </Checkbox>
                ))}
            </div>
            <Divider className='my-0' />
          </Col>
          <Col span={24} className='!pl-[10px] flex flex-col gap-[10px]'>
            <Typography.Text className='font-bold'>GRADES</Typography.Text>
            <div className='flex flex-col gap-[10px]'>
              {grades.length > 0 &&
                grades.map((item) => (
                  <Checkbox value={item} key={`grade_${item}`} className='!ml-0'>
                    Grade
                    {' '}
                    <span className='capitalize'>{item}</span>
                  </Checkbox>
                ))}
            </div>
            <Divider className='my-0' />
          </Col>
          <Col span={24} className='!pl-[10px] flex flex-col gap-[10px]'>
            <Typography.Text className='font-bold'>CCS</Typography.Text>
            <div className='flex flex-col gap-[10px]'>
              <Select className='max-w-[220px] !rounded-[8px]'>
                <Select.Option value='test'>Test</Select.Option>
              </Select>
            </div>
          </Col>
        </Row>
      </Modal>
    </MainLayout>
  );
}

export default SearchSubject;