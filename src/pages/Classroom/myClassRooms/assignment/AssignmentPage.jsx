import React, { useState } from 'react';
import { Avatar, Badge, Col, Image, List, Progress, Radio, Row, Segmented, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FaChartLine, FaPencilAlt } from 'react-icons/fa';
import { BsArrowRightCircle } from 'react-icons/bs';
import dummyImage from '../../../../assets/images/dummyImage.png';

const options = [
  {
    label: 'All Assignment',
    value: 'all-assignment'
  },
  {
    label: 'Unassigned',
    value: 'unassigned'
  },
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Archived',
    value: 'archived'
  }
];

function AssignmentPage() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    appendData();
  }, []);

  const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  return (
    <div className='xl:px-20 lg:px-16 md:px-10 px-0'>
      <Space direction='vertical' size='large' className='flex'>
        <div className='flex justify-center pt-2'>
          <Segmented options={options} />
        </div>
        <List
          className='rounded-t-lg with-header'
          pagination={{
            onChange: (page) => {},
            pageSize: 6
          }}
          header={(
            <Row>
              <Col xl={6} md={6} sm={8} xs={10}>
                <div className='text-center inter-font font-medium text-xs'>ASSIGNMENT TITLE</div>
              </Col>
              <Col xl={2} md={10} sm={10} xs={8}>
                <div className='text-center inter-font font-medium text-xs'>STATUS</div>
              </Col>
              <Col xl={3} md={4} sm={3} xs={3}>
                <div className='text-center inter-font font-medium text-xs'>ASSIGNED TO</div>
              </Col>
              <Col xl={3} md={4} sm={3} xs={3}>
                <div className='text-center inter-font font-medium text-xs'>DUE DATE</div>
              </Col>
              <Col xl={2} md={4} sm={3} xs={3}>
                <div className='text-center inter-font font-medium text-xs'>TURNOUT</div>
              </Col>
              <Col xl={3} md={4} sm={3} xs={3}>
                <div className='text-center inter-font font-medium text-xs'>AVG. SCORE</div>
              </Col>
            </Row>
          )}
          itemLayout='horizontal'
          dataSource={data}
          bordered
          renderItem={(item) => (
            <List.Item>
              <Row gutter={[0, 16]} className='w-full'>
                <Col xl={6} md={6} sm={8} xs={10} className='flex items-center'>
                  <Space>
                    <Image src={dummyImage} className='w-full aspect-[3/4] max-w-[100px]' />
                    <div className='inter-font text-sm ml-5'>
                      <div className='font-medium'>{item.title}</div>
                      <div className='font-normal text-gray-400'>Description</div>
                    </div>
                  </Space>
                </Col>
                <Col xl={2} md={10} sm={10} xs={8} className='flex justify-center items-center'>
                  <Badge
                    count='Working'
                    style={{
                      backgroundColor: '#52c41a',
                      padding: '0 10px'
                    }}
                  />
                </Col>
                <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
                  Josh Doe
                </Col>
                <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
                  08/30/2022
                  <br />
                  06:00 pm
                </Col>
                <Col xl={2} md={4} sm={3} xs={3} className='flex justify-center items-center'>
                  <Progress percent={30} showInfo={false} />
                </Col>
                <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
                  No Data
                </Col>
                <Col xl={2} md={4} sm={3} xs={3} className='flex justify-center items-center'>
                  <div className='flex text-xl text-slate-400'>
                    <FaPencilAlt />
                  </div>
                </Col>
                <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
                  <div className='flex text-4xl text-slate-400'>
                    <BsArrowRightCircle />
                  </div>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Space>
    </div>
  );
}

export default AssignmentPage;
