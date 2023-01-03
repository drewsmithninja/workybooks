/* eslint-disable no-return-assign */
/* eslint-disable implicit-arrow-linebreak */
import { Row, Col } from 'antd';
import { BsDashCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import ADTitle from '../antd/ADTitle';
import ADImage from '../antd/ADImage';
import dummyImage from '../../assets/images/dummyImage.png';
import ADButton from '../antd/ADButton';
import {
  resetCurrentWorksheet,
  unSelectWorksheet
} from '../../app/features/worksheet/worksheetSlice';
import { setNewAssignment } from '../../app/features/assignment/assignmentSlice';

export default function AssignStep1({ next, onCancel }) {
  const selectedWorksheets = useSelector((state) => state.worksheet.selectedWorksheets);
  const newAssignment = useSelector((state) => state.assignment.newAssignment);
  const currentWorksheet = useSelector((state) => state.worksheet.currentWorksheet);
  const worksheets = useSelector((state) => state.worksheet.worksheets?.list);
  const data = worksheets.filter((w) => selectedWorksheets.includes(w?._id));

  const dispatch = useDispatch();

  const onAssignHandler = () => {
    if (selectedWorksheets.length) {
      dispatch(
        setNewAssignment({
          ...newAssignment,
          content: selectedWorksheets
        })
      );
    } else {
      dispatch(
        setNewAssignment({
          ...newAssignment,
          content: [currentWorksheet?._id]
        })
      );
    }
    next();
  };
  console.log(data, 'data');
  return (
    <div className="mt-1">
      <div>
        <ADTitle level={5} className="text-center pb-3">
          {`${
            selectedWorksheets.length ? selectedWorksheets.length : currentWorksheet ? 1 : 0
          } Items selected`}
        </ADTitle>
        <div className="grid grid-cols-5 gap-5 min-h-[260px]">
          {!selectedWorksheets?.length && currentWorksheet ? (
            <div>
              <ADButton
                type="danger"
                className="worksheet-delete-button border-0"
                onClick={() => dispatch(resetCurrentWorksheet())}>
                <BsDashCircle className="text-danger" />
              </ADButton>
              <ADImage
                className="aspect-square object-cover rounded-lg border border-solid border-slate-300"
                src={currentWorksheet?.thumbnail}
                onError={(e) => (e.target.src = dummyImage)}
              />
            </div>
          ) : (
            data.map((worksheet) => (
              <div key={worksheet?._id}>
                <ADButton
                  type="danger"
                  className="worksheet-delete-button border-0"
                  onClick={() => dispatch(unSelectWorksheet(worksheet?._id))}>
                  <BsDashCircle className="text-danger" />
                </ADButton>
                <ADImage
                  key={worksheet?._id}
                  className="aspect-square object-cover rounded-lg border border-solid border-slate-300"
                  src={worksheet?.thumbnail}
                  onError={(e) => (e.target.src = dummyImage)}
                />
              </div>
            ))
          )}
        </div>
        <p className="text-xs text-center pb-4">
          You may continue adding more items to this assignment, or select ASSIGN button to finish
          assigning.
        </p>
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <ADButton type="danger" block onClick={onCancel}>
              Cancel
            </ADButton>
          </Col>
          <Col xs={24} md={8}>
            <ADButton
              type="primary"
              className="bg-blue-400 border border-solid border-blue-400"
              block>
              Add more items
            </ADButton>
          </Col>
          <Col xs={24} md={8}>
            <ADButton
              type="primary"
              className="bg-blue-400 border border-solid border-blue-400"
              block
              onClick={onAssignHandler}>
              Assign
            </ADButton>
          </Col>
        </Row>
      </div>
    </div>
  );
}
