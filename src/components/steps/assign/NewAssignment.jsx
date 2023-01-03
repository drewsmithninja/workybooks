/* eslint-disable no-return-assign */
import React from 'react';
import { Col, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';
import ADImage from '../../antd/ADImage';
import dummyImage from '../../../assets/images/dummyImage.png';
import { getAssignments, setNewAssignment, updateAssignment } from '../../../app/features/assignment/assignmentSlice';

export default function NewAssignment({ next, onOk }) {
  const currentWorksheet = useSelector((state) => state.worksheet.currentWorksheet);
  const assignments = useSelector((state) => state.assignment.assignments?.list);
  const newAssignment = useSelector((state) => state.assignment.newAssignment);
  const selectedWorksheets = useSelector((state) => state.worksheet.selectedWorksheets);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(
      setNewAssignment({
        title: e.target.value
      })
    );
  };

  const addToAssignmentHandler = (assignment) => {
    if (selectedWorksheets.length) {
      const data = {
        id: assignment?._id,
        content: selectedWorksheets
      };
      dispatch(updateAssignment(data));
    } else {
      const data = {
        id: assignment?._id,
        content: [currentWorksheet?._id]
      };
      dispatch(updateAssignment(data));
    }
    dispatch(getAssignments());
    onOk();
  };

  return (
    <div>
      <ADTitle level={3} className='text-center pb-8'>
        Assign
      </ADTitle>
      <Row className='pb-8'>
        <Col xs={24} sm={8}>
          <div className='rounded-lg overflow-hidden'>
            <ADImage src={currentWorksheet?.thumbnail} alt='thumbnail-worksheet-img' onError={(e) => (e.target.src = dummyImage)} className='w-full object-cover aspect-[3/4]' />
          </div>
        </Col>
        <Col xs={24} sm={16}>
          <div className='sm:pl-4'>
            <ADTitle level={5}>Create new Assignment</ADTitle>
            <Row gutter={16} className='py-4' wrap={false}>
              <Col xs={24} flex='auto'>
                <Input type='text' value={newAssignment?.title} className='w-full flex min-w-full' onChange={handleChange} name='collectionName' />
              </Col>
              <Col xs={24} flex='none'>
                <ADButton type='primary' size='small' className='!rounded-full' onClick={next} disabled={!newAssignment?.title.trim()}>
                  Create
                </ADButton>
              </Col>
            </Row>
            <div className='border border-solid border-black border-x-0 border-t-0' />
            <ADTitle level={5} className='py-4'>
              Add to existing Assignment
            </ADTitle>
            <div className='max-h-56 overflow-y-auto'>
              {assignments?.length &&
                assignments.map((assignment) => (
                  <Row key={assignment._id} gutter={16} className='mt-4 cursor-pointer' onClick={() => addToAssignmentHandler(assignment)}>
                    <Col flex='none'>
                      <ADImage src={assignment.content?.[0]?.thumbnail} onError={(e) => (e.target.src = dummyImage)} className='h-auto w-[75px] aspect-[4/3] rounded-lg object-cover' />
                    </Col>
                    <Col xs={24} flex='auto' className='flex items-center'>
                      {assignment.title}
                    </Col>
                  </Row>
                ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}