/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import React, { useEffect } from 'react';
import { Button, Checkbox, Col, Form, List, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setClass } from '../../app/features/classroom/classroomSlice';
import { getStudents } from '../../app/features/students/studentsSlice';
import ADSelect from '../antd/ADSelect';
import ADTitle from '../antd/ADTitle';
import dummyImage from '../../assets/images/dummyImage.png';
import ADImage from '../antd/ADImage';
import ADButton from '../antd/ADButton';
import { setNewAssignment } from '../../app/features/assignment/assignmentSlice';

export default function AssignStep2({ next, onCancel }) {
  const classes = useSelector((state) => state.classroom.classes?.list);
  const newAssignment = useSelector((state) => state.assignment.newAssignment);
  const students = useSelector((state) => state.students?.students?.list);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values);
    dispatch(
      setNewAssignment({
        ...newAssignment,
        assignedClass: [values?.assignedClass?.classId],
        assignedTo: 'Classroom'
      })
    );
    next();
  };
  const onFinishFailed = (errorInfo) => {};

  const classOptions = classes?.length
    ? classes?.map(({ _id: value, name: label, ...rest }) => ({
        value,
        label,
        ...rest
      }))
    : [
        {
          value: '',
          label: 'No Class'
        }
      ];

  useEffect(() => {
    const getData = async () => {
      await dispatch(setClass(classes?.[0]?._id));
      await dispatch(getStudents(classes?.[0]?._id));
    };
    getData();
  }, []);

  const onClassChangeHandler = async (e) => {
    const sc = await classes?.find((item) => item?._id === e);
    await dispatch(setClass(sc));
    await dispatch(getStudents(e));
  };

  return (
    <div>
      <Form
        initialValues={{
          assignedClass: classOptions?.[0] ?? 'No Class'
        }}
        className='py-2'
        size='large'
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={7}>
            <div className='font-bold py-2'>Assign to entire class</div>
          </Col>
          <Col xs={24} sm={10} className='flex items-center'>
            <Form.Item className='w-full mb-0' name='assignedClass'>
              <ADSelect className='w-32' onChange={(e) => onClassChangeHandler(e)} options={classOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={7}>
            <Form.Item className='mb-0'>
              <Button type='primary' htmlType='submit' className='w-full bg-blue-400 border border-solid border-blue-400'>
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
          <Col xs={24} sm={10} className='max-h-[300px] overflow-auto'>
            <Checkbox.Group className='w-full' onChange={() => {}}>
              <List
                className='px-4 rounded-md'
                dataSource={students}
                renderItem={(item) => (
                  <List.Item>
                    <Checkbox value={item._id}>
                      <div className='flex items-center'>
                        <Space size='middle' className='ml-2'>
                          <ADImage src={item?.avatar ?? dummyImage} className='object-cover shadow w-12 h-12 rounded-full shadow' />
                          <div className='font-bold'>{item?.fullName}</div>
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
              <Button type='primary' htmlType='submit' className='w-full text-sm !px-0 text-center mt-28 bg-blue-400 border border-solid border-blue-400'>
                ASSIGN TO SELECTED
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <div className='flex justify-evenly pt-4'>
          <ADButton type='danger' onClick={onCancel} className='w-40'>
            Cancel
          </ADButton>
          <ADButton type='primary' className='bg-blue-400 border border-solid border-blue-400 w-40' onClick={next}>
            Assign
          </ADButton>
        </div>
      </Form>
    </div>
  );
}
