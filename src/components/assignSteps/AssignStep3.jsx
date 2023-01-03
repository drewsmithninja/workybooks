import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Col, DatePicker, Form, Input, InputNumber, Radio, Row } from 'antd';
import { createAssignment, getAssignments, resetNewAssignment } from '../../app/features/assignment/assignmentSlice';
import ADButton from '../antd/ADButton';

export default function AssignStep3({ onOk, onCancel }) {
  const newAssignment = useSelector((state) => state.assignment.newAssignment);
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
    try {
      const updatedAssignment = {
        ...newAssignment,
        title: values.name,
        assignmentType: values?.assignmentType,
        startDate: moment(values?.startDate).format('MM/DD/YYYY HH:MM'),
        endDate: moment(values?.endDate).format('MM/DD/YYYY HH:MM'),
        points: values?.points
      };

      await dispatch(createAssignment(updatedAssignment));
      await dispatch(getAssignments());
      await resetNewAssignment();
      await onOk();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          name: newAssignment?.title
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
          <Input />
        </Form.Item>
        <Form.Item
          name='assignmentType'
          label='Assignment Type'
          rules={[
            {
              required: true,
              message: 'Please select assignment type!'
            }
          ]}
        >
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
            <Form.Item
              label='Start Date'
              name='startDate'
              rules={[
                {
                  required: true,
                  message: 'Please select starting Date of assignment!'
                }
              ]}
            >
              <DatePicker
                showTime={{
                  format: 'HH:mm'
                }}
                format='DD/MM/YYYY HH:mm'
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label='Due Date'
              name='endDate'
              rules={[
                {
                  required: true,
                  message: 'Please select ending Date of assignment!'
                }
              ]}
            >
              <DatePicker
                showTime={{
                  format: 'HH:mm'
                }}
                format='DD/MM/YYYY HH:mm'
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label='Points'
          name='points'
          rules={[
            {
              required: true,
              message: 'Please select points!'
            }
          ]}
        >
          <InputNumber min={1} max={10} />
        </Form.Item>
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <ADButton type='danger' block onClick={onCancel}>
              Cancel
            </ADButton>
          </Col>
          <Col xs={24} md={8}>
            <ADButton type='primary' className='bg-blue-400 border border-solid border-blue-400' block>
              Add more items
            </ADButton>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item>
              <ADButton type='primary' htmlType='submit' className='bg-blue-400 border border-solid border-blue-400' block onClick={onOk} disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0}>
                Assign
              </ADButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
