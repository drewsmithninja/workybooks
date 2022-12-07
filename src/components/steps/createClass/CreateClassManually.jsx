import React, { useState, useEffect } from 'react';
import { Form, Input, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';
import { fetchGrades } from '../../../app/features/grade/GradeSlice';
import { createClass, reset, setClass } from '../../../app/features/classroom/classroomSlice';

export default function CreateClassManually({ next }) {
  const { currentClass, message, isError, isSuccess } = useSelector((state) => state.classroom);
  const { grades, isLoading } = useSelector((state) => state.grades);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);

  const onFinish = async (values) => {
    dispatch(createClass(values));
    if (isSuccess) {
      next();
      dispatch(reset());
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    dispatch(fetchGrades());
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Create Classroom</ADTitle>
      <div className='py-4 text-dark text-lg text-center'>Please provide the classroom details</div>
      <Form name='add-class-manually' onFinish={onFinish}>
        <Form.Item
          name='name'
          rules={[
            {
              // required: true,
              message: 'Please input your class name!'
            }
          ]}
        >
          <Input placeholder='Class Name' autoFocus />
        </Form.Item>
        <div className='py-4 text-dark text-lg text-center'>Grade Level</div>
        <Form.Item
          name='grade'
          rules={[
            {
              required: true,
              message: 'Please pick a grade!'
            }
          ]}
        >
          <Radio.Group buttonStyle='solid' onChange={(e) => setValue(e.target.value)} value={value}>
            <Space wrap className='flex justify-center py-6'>
              {grades?.list?.length &&
                grades?.list?.map((grade) => (
                  <Radio.Button key={grade._id} value={grade._id} className='flex items-center whitespace-nowrap justify-center min-w-[70px] py-1 !rounded-full border border-success border-solid bg-success'>
                    {grade.title}
                  </Radio.Button>
                ))}
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item className='flex justify-center'>
          <ADButton size='large' type='primary' htmlType='submit' disabled={isLoading}>
            CONTINUE
          </ADButton>
        </Form.Item>
      </Form>
    </div>
  );
}
