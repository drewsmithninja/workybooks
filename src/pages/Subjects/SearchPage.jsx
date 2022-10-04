import { CloseCircleFilled } from '@ant-design/icons';
import {
  Checkbox,
  Col,
  Divider,
  Row,
  Select,
  Tag,
  Typography
} from 'antd';
import React from 'react';
import CardComponent from '../../components/common/CardComponent';
import MainLayout from '../../components/layout/MainLayout';
import { grades } from '../../utils/appData';

function SearchSubject() {
  const cards = [];
  Array(2).fill(1).map((item, index) => cards.push({
    id: index + 1,
    key: index + 1,
    name: 'test_card'
  }));
  const worksheets = [];
  Array(20).fill(1).map((item, index) => worksheets.push({
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
              <Typography.Text className='font-bold'>
                GRADES
              </Typography.Text>
              <div className='flex flex-col gap-[10px]'>
                {grades.length > 0 && grades.map((item, index) => (
                  <Checkbox value={item} key={`grade_${index}`} className='!ml-0'>
                    Grade
                    {' '}
                    <span className='capitalize'>{item}</span>
                  </Checkbox>
                ))}
              </div>
              <Divider className='my-0' />
            </Col>
            <Col span={24} className='!pl-[50px] flex flex-col gap-[10px]'>
              <Typography.Text className='font-bold'>
                GRADES
              </Typography.Text>
              <div className='flex flex-col gap-[10px]'>
                {grades.length > 0 && grades.map((item, index) => (
                  <Checkbox value={item} key={`grade_${index}`} className='!ml-0'>
                    Grade
                    {' '}
                    <span className='capitalize'>{item}</span>
                  </Checkbox>
                ))}
              </div>
              <Divider className='my-0' />
            </Col>
            <Col span={24} className='!pl-[50px] flex flex-col gap-[10px]'>
              <Typography.Text className='font-bold'>
                CCS
              </Typography.Text>
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
            <Col span={24} className='!pl-[20px] flex flex-wrap gap-[10px]'>
              <Tag
                closable
                className='h-[32px] bg-[#21212114] border-0 pt-[5px] rounded-[16px] px-[15px]'
                closeIcon={<CloseCircleFilled className='text-[12px] pl-[5px] pt-[5px]' />}
              >
                <Typography.Text className='text-baseline'>
                  Prek
                </Typography.Text>
              </Tag>
              <Tag
                closable
                className='h-[32px] bg-[#21212114] border-0 pt-[5px] rounded-[16px] px-[15px]'
                closeIcon={<CloseCircleFilled className='text-[12px] pl-[5px] pt-[5px]' />}
              >
                <Typography.Text className='text-baseline'>
                  Grade K
                </Typography.Text>
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
              {cards.length > 0 && cards.map((item, index) => (
                <CardComponent cardWidth={373} />
              ))}
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
              {worksheets.length > 0 && worksheets.map((item, index) => (
                <CardComponent />
              ))}
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}

export default SearchSubject;
