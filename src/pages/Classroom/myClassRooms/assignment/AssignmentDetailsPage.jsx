import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Col, List, Progress, Row, Select, Space, Image, Input } from 'antd';
import { FaChartLine, FaCheck, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CsvDownloadButton from 'react-json-to-csv';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { AntDesignOutlined } from '@ant-design/icons';
import Spinner from '../../../../components/spinner/Spinner';
import data from '../../../../data.json';
import ADButton from '../../../../components/antd/ADButton';
import dummyImage from '../../../../assets/images/dummyImage.png';
import ADTitle from '../../../../components/antd/ADTitle';
import MainLayout from '../../../../components/layout/MainLayout';
import ADImage from '../../../../components/antd/ADImage';
import { getStudentAssignmentDetail } from '../../../../app/features/assignment/assignmentSlice';
import ADModal from '../../../../components/antd/ADModal';
import ViewAssignmentReport from './ViewAssignmentReport';
import ADInput from '../../../../components/antd/ADInput';

function AssignmentDetailsPage() {
  const [modal, setModal] = useState(false);
  const [isEditableInput, setIsEditableInput] = useState(false);

  const { Option } = Select;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentClass } = useSelector((state) => state.classroom);
  const { studentAssignmentDetail, studentAssignmentReportJson, assignments, isLoading } = useSelector((state) => state.assignment);
  const updatedAssignmentList = assignments.map((item) => ({
    label: item?.title,
    value: item?._id
  }));
  const getIndex = updatedAssignmentList.findIndex((item) => item.value === id);

  const [currentSelectedAssignment, setCurrentSelectedAssignment] = useState(updatedAssignmentList?.[getIndex] || {
  });
  useEffect(() => {
    onAssignmentApiCall(id);
  }, []);

  const onAssignmentApiCall = (assignmentId) => {
    dispatch(
      getStudentAssignmentDetail({
        assignmentId,
        classId: currentClass?._id
      })
    );
  };
  const { assignmentDetails, assignmentItems, assignmentScore } = studentAssignmentDetail?.studentsAssignmentData?.[0];

  const viewAssignmentReportModal = <ViewAssignmentReport closable={false} open={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)} />;

  const onChangeAssignment = (value) => {
    setCurrentSelectedAssignment(value);
    navigate(`/my-classrooms/assignment/${value}`);
    onAssignmentApiCall(value);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <MainLayout>
      {viewAssignmentReportModal}
      <div className='px-4 py-5 w-full flex justify-between'>
        <Space size='large'>
          <ADTitle level={3}>Assignment</ADTitle>
          <Select
            value={currentSelectedAssignment}
            onChange={onChangeAssignment}
            style={{
              width: '200px'
            }}
            options={updatedAssignmentList || []}
          />

          <div className='flex'>
            <FaPencilAlt className='text-gray-400 text-lg' />
          </div>
        </Space>
      </div>
      <div className='px-6'>
        <Row gutter={[16, 16]} className='border border-x-0 border-t-0 border-solid'>
          <Col xl={10}>
            <div>
              <div className='font-bold text-xs'>{`ASSIGNMENT ITEMS (${assignmentItems.length} WORKSHEETS)`}</div>
            </div>
            <Space>
              {/* <div className='flex bg-slate-300 w-[60px] h-[60px] rounded-xl aspect[1/1] mt-4' />
              <div className='flex bg-slate-300 w-[60px] h-[60px] rounded-xl aspect[1/1] mt-4' />
              <div className='flex bg-slate-300 w-[60px] h-[60px] rounded-xl aspect[1/1] mt-4' />
              <div className='flex bg-slate-300 w-[60px] h-[60px] rounded-xl aspect[1/1] mt-4' /> */}
              {assignmentItems.map((item, index) => (
                <ADImage src={item?.thumbnail} onError={(e) => (e.target.src = dummyImage)} alt='Worksheet image' className='flex bg-slate-300 w-[60px] h-[60px] rounded-xl aspect[1/1] mt-4' />
              ))}
              {assignmentItems.length > 4 ? <div className='font-bold text-xs px-4 pt-3 items-center'>+2 MORE</div> : null}
            </Space>
          </Col>
          <Col xl={7} className='border border-solid border-y-0 border-r-0'>
            <div>
              <div className='font-bold text-xs'>ASSIGNED TO</div>
            </div>
            <Space>
              {assignmentScore.map((item, index) => {
                console.log('----index---', index);
                if (index >= 3) return null;
                return <Avatar src={item?.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />;
              })}
              {assignmentScore.length > 4 ? (
                <div>
                  <div className='font-bold text-xs'>
                    +
                    {assignmentScore.length - 3}
                    {' '}
                    MORE
                  </div>
                </div>
              ) : null}
            </Space>
          </Col>
          <Col xl={7} className='border border-solid border-y-0 border-r-0'>
            <Row gutter={16}>
              <Col xl={8}>
                <div className='font-bold text-xs'>DUE DATE</div>
                <div className='text-slate-400 pt-3'>
                  {moment(assignmentDetails?.[0]?.endDate).format('DD/MM/YYYY hh:mm a')}
                  <br />
                </div>
              </Col>
              <Col xl={8}>
                <div className='font-bold text-xs'>TYPE</div>
                <div className='text-slate-400 pt-3'>Graded</div>
              </Col>
              <Col xl={8}>
                <div className='font-bold text-xs'>POINTS</div>
                <div className='text-slate-400 pt-3'>{assignmentDetails?.[0]?.points}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className='flex py-4 justify-between px-4 items-center'>
        <div>
          <ADTitle level={4}>Assignment Progress</ADTitle>
        </div>
        <Space size='large'>
          <ADButton
            type='primary'
            onClick={() => {
              setIsEditableInput(!isEditableInput);
            }}
          >
            Edit Grades
          </ADButton>
          <CsvDownloadButton data={studentAssignmentReportJson} filename='student_report.csv' style={csvButton}>
            Export Grades Reports
          </CsvDownloadButton>
          <ADButton type='primary'>Assignment Report</ADButton>
        </Space>
      </div>
      <div className='mx-4 border border-solid border-t-0' />
      <div className='xl:px-20 lg:px-16 md:px-10 px-0 py-6'>
        <List
          className='rounded-t-lg with-header'
          header={(
            <Row>
              <Col xl={7} lg={7} md={7} sm={8} xs={10}>
                <div className='text-center inter-font font-medium text-xs'>NAME</div>
              </Col>
              <Col xl={8} lg={8} md={8} sm={10} xs={8}>
                <div className='text-center inter-font font-medium text-xs'>SCORE</div>
              </Col>
              <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                <div className='text-center inter-font font-medium text-xs'>GRADE</div>
              </Col>
              <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                <div className='text-center inter-font font-medium text-xs'>DATE SUBMITTED</div>
              </Col>
              <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                <div className='text-center inter-font font-medium text-xs'>VIEW WORK</div>
              </Col>
            </Row>
          )}
          itemLayout='horizontal'
          dataSource={assignmentScore}
          bordered
          renderItem={(item) => {
            const test = item?.AssignmentGrades;
            return (
              <List.Item>
                <Row gutter={[0, 16]} className='w-full'>
                  <Col xl={7} lg={7} md={7} sm={8} xs={10} className='flex items-center'>
                    <Row gutter={16} className='w-full'>
                      <Col xs={24} md={24} lg={12} xl={10} xxl={8}>
                        <ADImage alt='cover-img' src={item?.avatar || dummyImage} className='aspect-[80px/100px]   rounded max-w-[80px]' />
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={14} xxl={16} className='inter-font text-sm'>
                        <div className='flex flex-col justify-center h-full lg:py-0 py-4'>
                          <div className='font-medium'>{item?.student_name}</div>
                          {/* <div className='font-normal text-gray-400'>Description</div> */}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={8} lg={8} md={8} sm={10} xs={8} className='flex justify-center items-center'>
                    <Row className='rounded-2xl md:px-4 px-2 py-4 border border-solid border-slate-300 w-full'>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 1
                        }}
                        xl={{
                          span: 4,
                          order: 1
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <div>TIME</div>
                        <div className='font-medium text-lg'>{item?.time.length > 0 ? moment(item?.time?.[0]).format('hh:mm') : 0}</div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 4
                        }}
                        xl={{
                          span: 4,
                          order: 2
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <div className='flex pb-1'>
                          <FaCheck className='text-slate-400' />
                        </div>
                        <div className='font-bold text-lg'>{item?.totalCorrectAnswer || '-'}</div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 5
                        }}
                        xl={{
                          span: 4,
                          order: 3
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <div className='flex pb-1'>
                          <FaTimes className='text-slate-400' />
                        </div>
                        <div className='font-bold text-lg'>{item?.totalWrongAnswer || '-'}</div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 6
                        }}
                        xl={{
                          span: 4,
                          order: 4
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <div className='flex pb-1'>
                          <BsThreeDots className='text-slate-400' />
                        </div>
                        <div className='font-bold text-lg'>{item?.totalBlankAnswer || '-'}</div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 2
                        }}
                        xl={{
                          span: 4,
                          order: 5
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <div className=''>SCORE</div>
                        <div className='font-bold text-lg'>{`${item?.averagePercentage}%`}</div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 3
                        }}
                        xl={{
                          span: 4,
                          order: 6
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <Progress type='circle' width={50} percent={item?.averagePercentage} status='none' />
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                    {isEditableInput ? (
                      <ADInput
                        placeholder='Grade'
                        value={item?.AssignmentGrades?.[0]?.title}
                        style={{
                          margin: 'auto 30px'
                        }}
                      />
                    ) : (
                      <Badge
                        count={item?.AssignmentGrades?.[0]?.title}
                        style={{
                          backgroundColor: item.AssignmentGrades?.[0]?.color || '#52c41a',
                          padding: '0 10px'
                        }}
                      />
                    )}
                  </Col>
                  <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                    <div>
                      {item?.submittedDate.length > 0 ? (
                        <>
                          <div>{moment(item?.submittedDate[0]).format('DD/MM/YYYY')}</div>
                          <div>{moment(item?.submittedDate[0]).format('hh:mm a')}</div>
                        </>
                      ) : (
                        <span
                          style={{
                            color: 'red',
                            textTransform: 'uppercase'
                          }}
                        >
                          Not Submitted
                        </span>
                      )}
                    </div>
                  </Col>
                  <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                    <ADButton type='text' onClick={setModal}>
                      <div className='flex'>
                        <FaChartLine className='text-gray-400 text-2xl' />
                      </div>
                    </ADButton>
                  </Col>
                </Row>
              </List.Item>
            );
          }}
        />
      </div>
    </MainLayout>
  );
}
const csvButton = {
  // pass other props, like styles
  boxShadow: '0 2px 0 rgb(0 0 0 / 5%)',
  background: '#5470FF',
  borderColor: '#5470FF',
  borderRadius: '6px',
  border: '1px solid #5470FF',
  display: 'inline-block',
  cursor: 'pointer',
  color: '#ffffff',
  fontSize: '14px',
  padding: '6px 24px',
  textDecoration: 'none',
  textShadow: '0 -1px 0 rgb(0 0 0 / 12%)'
};

export default AssignmentDetailsPage;
