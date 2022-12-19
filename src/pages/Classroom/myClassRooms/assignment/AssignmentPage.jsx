/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Col, List, Row, Segmented, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAssignments, getAssignmentsByStatus } from '../../../../app/features/assignment/assignmentSlice';
import AssignmentItem from './AssignmentItem';

const options = [
  {
    label: 'All Assignment',
    value: ''
  },
  {
    label: 'Unassigned',
    value: 'Unassigned'
  },
  {
    label: 'Active',
    value: 'Active'
  },
  {
    label: 'Archived',
    value: 'Archived'
  },
  {
    label: 'Closed',
    value: 'Closed'
  }
];

function AssignmentPage() {
  const { assignments, status } = useSelector((state) => state.assignment);
  const { currentClass } = useSelector((state) => state.classroom);

  const dispatch = useDispatch();
  const onSegmentChangeHandler = async (e) => {
    if (e) {
      dispatch(
        getAssignmentsByStatus({
          classId: currentClass?._id,
          status: e
        })
      );
    } else {
      dispatch(getAssignments(await currentClass?._id));
    }
  };

  return (
    <div className='xl:px-20 lg:px-16 md:px-10 px-0'>
      <Space direction='vertical' size='large' className='flex'>
        <div className='flex justify-center pt-2'>
          <Segmented options={options} onChange={(e) => onSegmentChangeHandler(e)} />
        </div>
        <List
          className='rounded-t-lg with-header'
          pagination={{
            onChange: (page) => {},
            pageSize: 10
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
          dataSource={assignments?.list || []}
          bordered
          renderItem={(item) => <AssignmentItem item={item} />}
        />
      </Space>
    </div>
  );
}

export default AssignmentPage;
