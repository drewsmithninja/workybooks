import React from 'react';
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';
import { createStudents } from '../../../app/features/students/studentsSlice';
import { getClassrooms } from '../../../app/features/classroom/classroomSlice';

export default function CreateClassAddStudents({ next, prev }) {
  const { currentClass, isSuccess } = useSelector((state) => state.classroom);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const data = {
      classroom: currentClass?.classroom?._id,
      ...values
    };
    dispatch(createStudents(data));
    if (await isSuccess) {
      dispatch(getClassrooms());
      await next();
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Add Students</ADTitle>
      <div className='py-4 text-dark text-lg text-center'>Please provide the classroom details</div>
      <ADButton size='large'>Import</ADButton>
      <div className='pt-4 text-dark text-xl text-center'>Or, enter student names manually.</div>
      <div className='py-4 text-dark text-xs text-center'>Please enter student names as First name Last Name - one per line.</div>
      <Form name='dynamic_form_nest_item' onFinish={onFinish} autoComplete='off' className='border border-solid border-success rounded-2xl pt-6 w-full flex flex-col items-center'>
        <Form.List name='students'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8
                  }}
                  align='baseline'
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'firstName']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing first name'
                      }
                    ]}
                  >
                    <Input autoFocus placeholder='First Name' />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'lastName']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing last name'
                      }
                    ]}
                  >
                    <Input placeholder='Last Name' />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item className='w-11/12'>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Student
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <ADButton size='large' className='min-w-[140px]' type='primary' htmlType='submit'>
            ADD
          </ADButton>
        </Form.Item>
      </Form>
    </div>
  );
}
