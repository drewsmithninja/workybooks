import React, { useEffect, useState } from 'react';

// import CsvDownloadButton from 'react-json-to-csv';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

import { Col, Row, Checkbox, Modal, Typography } from 'antd';
import ADTitle from '../../../../components/antd/ADTitle';

const { Text } = Typography;

const exportCsv = [
  {
    _id: 4,
    title: 'Time',
    value: 'time'
  },
  {
    _id: 5,
    title: 'Total Questions',
    value: 'totalQuestions'
  },
  {
    _id: 6,
    title: 'Correct',
    value: 'totalCorrectAnswer'
  },
  {
    _id: 7,
    title: 'Wrong',
    value: 'totalWrongAnswer'
  },
  {
    _id: 8,
    title: 'Skipped',
    value: 'totalBlankAnswer'
  },
  {
    _id: 9,
    title: 'Score',
    value: 'averagePercentage'
  }
];
const staticItem = [
  {
    _id: 1,
    title: 'Student Name',
    value: 'studentName'
  },
  {
    _id: 2,
    title: 'Submitted Date',
    value: 'submittedDate'
  },
  {
    _id: 3,
    title: 'Assignment Grade',
    value: 'assignmentGrade'
  }
];

function ExportAssignmentReport({ onShow, onOk, onCancel, ...props }) {
  let headers = [
    {
      label: 'Student Name',
      key: 'studentName'
    },
    {
      label: 'Submitted Date',
      key: 'submittedDate'
    },
    {
      label: 'Assignment Grade',
      key: 'assignmentGrade'
    }
  ];

  const [updatedRecords, setUpdatedRecords] = useState([]);
  const [updatedHeader, setUpdatedHeader] = useState([]);
  const { studentAssignmentReportJson } = useSelector((state) => state.assignment);

  useEffect(() => {
    filterRecords(staticItem);
    setUpdatedHeader(headers);
  }, []);

  const filterRecords = (data) => {
    let newJsonData = [];

    studentAssignmentReportJson.forEach((item) => {
      const newObject = {
      };
      data.forEach((newItem) => {
        newObject[newItem?.value] = item[newItem?.value];
      });
      newJsonData = [...newJsonData, newObject];
    });

    setUpdatedRecords(newJsonData);
  };

  const onChange = (data) => {
    let newChangedArr = [];

    exportCsv.forEach((item, index) => {
      if (data.includes(item._id)) {
        newChangedArr = [...newChangedArr, exportCsv[index]];
        headers = [
          ...headers,
          {
            lable: exportCsv[index].title,
            key: exportCsv[index].value
          }
        ];
      }
    });

    setUpdatedHeader(headers);
    const tempArr = [...staticItem, ...newChangedArr];
    filterRecords(tempArr);
  };

  return (
    <Modal forceRender rounded centered width={550} footer={false} onCancel={onCancel} {...props} className='flex text-center'>
      <div>
        <Row gutter={[16, 0]}>
          <Col xl={24} md={24} sm={24} xs={24}>
            <ADTitle level={3}>Export Grades</ADTitle>
          </Col>
        </Row>
        {/* <Row gutter={[16, 0]}>
          <Col xl={24} md={24} sm={24} xs={24}>
            <Text level={5}>Please select export options</Text>
          </Col>
        </Row>
        <Row gutter={[16, 0]} className='pt-6 pb-6'>
          <Col xl={24} md={24} sm={24} xs={24}>
            <Text level={5}>export to</Text>
          </Col>
        </Row> */}
        <Row gutter={[16, 0]} className='center items-center'>
          <Col xl={24} md={24} sm={24} xs={24} className='pt-4'>
            <Text>Select additional fields to export with Grade information</Text>
          </Col>
          <Col className='pt-4'>
            <Checkbox.Group onChange={onChange}>
              <Row>
                {exportCsv.map((item, index) => (
                  <Col xl={8} md={8} sm={8} xs={8} className='text-left' key={`grade_col_${item?._id}`}>
                    <Checkbox key={`grade_${item?._id}`} value={item?._id}>
                      <span className='uppercase'>{item?.title}</span>
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Col>
        </Row>

        <Row className='pt-10 pb-10'>
          <Col xl={24} md={24} sm={24} xs={24}>
            <CSVLink data={updatedRecords} headers={updatedHeader} style={csvButton}>
              Export Grades Reports
            </CSVLink>
          </Col>
        </Row>
      </div>
    </Modal>
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

export default ExportAssignmentReport;