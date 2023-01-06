import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Col, DatePicker, Form, Input, InputNumber, Radio, Row } from 'antd';
import { createAssignment, getAssignments, resetAssignment, updateAssignment } from '../../app/features/assignment/assignmentSlice';
import ADButton from '../antd/ADButton';
import { resetSelectedWorksheets } from '../../app/features/worksheet/worksheetSlice';

export default function AssignStep3({ onOk, onClose, edit, onCancel }) {
  const currentAssignment = useSelector((state) => state.assignment.currentAssignment?.assignment);
  const currentClass = useSelector((state) => state.classroom.currentClass);
  const [assignmentTitle, setAssignmentTitle] = useState(currentAssignment?.title);

  const options = [
    {
      label: (
        <div className='w-auto'>
          <div className='font-bold'>Optional Enrichment Activity</div>
          <p>An enrichment activity which is optional and not graded, has no due date</p>
        </div>
      ),
      value: 'Optional Enrichment Activity'
    },
    {
      label: (
        <div className='w-auto'>
          <div className='font-bold'>Assignment</div>
          <p>A graded activity with a due date</p>
        </div>
      ),
      value: 'Assignment'
    },
    {
      label: (
        <div className='w-auto'>
          <div className='font-bold'>Live Assignment</div>
          <p>A timed, graded activity to be completed NOW</p>
        </div>
      ),
      value: 'Live Assignment'
    }
  ];

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(
      updateAssignment({
        id: currentAssignment?._id,
        title: assignmentTitle,
        assignmentType: values?.assignmentType,
        startDate: moment(values?.startDate).format('MM/DD/YYYY HH:MM'),
        endDate: moment(values?.endDate).format('MM/DD/YYYY HH:MM'),
        points: values?.points
      })
    )
      .unwrap()
      .then(() => onOk());
    dispatch(resetAssignment());
    dispatch(resetSelectedWorksheets());
    dispatch(getAssignments());
    dispatch(getAssignments(currentClass?._id));
  };

  return (
    <div>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          name: assignmentTitle.trim()
        }}
      >
        <Form.Item
          label='Assignment Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input your assignment name!'
            }
          ]}
        >
          <Input onChange={(e) => setAssignmentTitle(e.target.value)} />
        </Form.Item>
        <Form.Item name='assignmentType' label='Assignment Type'>
          <Radio.Group>
            <Row gutter={16}>
              {options.map((option) => (
                <Col xs={24} sm={8} key={option.value}>
                  <Radio value={option.value}>{option.label}</Radio>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label='Start Date' name='startDate'>
              <DatePicker
                showTime={{
                  format: 'HH:mm'
                }}
                format='DD/MM/YYYY HH:mm'
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label='Due Date' name='endDate'>
              <DatePicker
                showTime={{
                  format: 'HH:mm'
                }}
                format='DD/MM/YYYY HH:mm'
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label='Points' name='points'>
          <InputNumber min={1} max={10} />
        </Form.Item>
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <ADButton type='danger' block onClick={onClose}>
              Close
            </ADButton>
          </Col>
          <Col xs={24} md={8}>
            {!edit && (
              <ADButton type='primary' className='bg-blue-400 border border-solid border-blue-400' block onClick={onCancel}>
                Add more items
              </ADButton>
            )}
          </Col>
          <Col xs={24} md={8}>
            <Form.Item>
              <ADButton type='primary' htmlType='submit' className='bg-blue-400 border border-solid border-blue-400' block>
                Assign
              </ADButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
