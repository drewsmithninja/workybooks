import React from 'react';
import { useSelector } from 'react-redux';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';
import Spinner from '../../spinner/Spinner';

export default function ManualClassCreated({ onOk }) {
  const { currentClass, isLoading: classLoading } = useSelector((state) => state.classroom);
  const { newStudents, isLoading: studentsLoading } = useSelector((state) => state.students);
  return (
    <div className="flex flex-col items-center">
      <ADTitle level={2}>Classroom created</ADTitle>
      <div className="py-4 text-dark text-lg my-16 text-center">
        {!newStudents || (classLoading && studentsLoading) ? (
          <Spinner />
        ) : (
          `Classroom ( ${currentClass?.name} ) with ( ${newStudents?.student?.students} ) ${
            newStudents?.student?.students === 1 ? ' student' : 'students'
          } has been created`
        )}
      </div>
      <ADButton size="large" type="primary" className="w-1/3" onClick={onOk}>
        Close
      </ADButton>
    </div>
  );
}
