import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Typography
} from 'antd';
import { modalGlobalConfig } from 'antd/lib/modal/confirm';
import React, { useState } from 'react';
import LogoHeader from '../../components/common/LogoHeader';

import googleIcon from '../../assets/images/google-icon.png';
import cleverIcon from '../../assets/images/clever-icon.png';

const mainContent = (setIsImport, setIsManual, setManualStep) => (
  <>
    <Typography.Title level={1} className="!text-2xl md:!text-2xl mt-[30px] text-center">
      Create Classroom
    </Typography.Title>
    <Typography.Title level={5} className="!font-normal !mt-[16px] !mb-[76px] !text-[14px] text-center">
      How would you like to create your
      <br />
      classroom
    </Typography.Title>
    <div className='flex flex-col gap-[14px] pb-[37px]'>
      <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]' onClick={() => setIsImport(true)}>
        <img src={googleIcon} width="24" alt="googleIcon" className='mr-[8px]' />
        Import from Google Classroom
      </Button>
      <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]' onClick={() => setIsImport(true)}>
        <img src={cleverIcon} width="24" alt="cleverIcon" className='mr-[8px]' />
        Import from Clever
      </Button>
      <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]' onClick={() => setIsImport(true)}>
        Import an excel file
      </Button>
      <Button
        className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'
        onClick={() => {
          setManualStep(1);
          setIsManual(true);
        }}
      >
        Create Manually
      </Button>
    </div>
  </>
);

const importContent = (rowSelection, isImport, setCreateClassPopup) => {
  const scroll = {};
  scroll.y = 200;
  const tableProps = {
    rowSelection,
    scroll
  };
  const columns = [
    {
      title: 'Class',
      width: 100,
      dataIndex: 'class',
      key: 'class',
      fixed: 'left',
      sorter: (a, b) => a.class - b.class
    },
    {
      title: 'Grade',
      width: 100,
      dataIndex: 'grade',
      key: 'grade',
      fixed: 'left'
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
      width: 150
    }
  ];
  const data = [];
  for (let i = 0; i < 100; i += 1) {
    data.push({
      key: i,
      class: '3B',
      grade: 3,
      students: 50
    });
  }
  return (
    <>
      <Typography.Title level={1} className="!text-2xl md:!text-2xl mt-[30px] text-center">
        Import Classroom
      </Typography.Title>
      <Typography.Title level={5} className="!font-normal !mt-[16px] !mb-[35px] !text-[14px] text-center">
        Please select the classrooms you wish
        <br />
        to import
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Table columns={columns} dataSource={data} scroll={{ y: 200 }} pagination={false} {...tableProps} />
        </Col>
        <Col span={24} className='text-center'>
          <Button
            type='primary'
            className='mt-[63px] m-auto'
            onClick={() => {
              setCreateClassPopup(false);
              popupModalComponent('error', (<Typography.Title level={1} className="!text-2xl md:!text-2xl mt-[30px] text-center">Classroom(s) created</Typography.Title>), <Typography.Title level={5} className="!font-normal !mt-[16px] !mb-[76px] !text-[14px] text-center">2 classrooms and 40 students have been imported to Workybooks</Typography.Title>);
            }}
          >
            CONTINUE
          </Button>
        </Col>
      </Row>
    </>
  );
};

const manualContent = (isManual, setManualStep) => (
  <>
    <Typography.Title level={1} className="!text-2xl md:!text-2xl mt-[30px] text-center">
      Create Classroom
    </Typography.Title>
    <Typography.Title level={5} className="!font-normal !mt-[16px] !mb-[60px] !text-[14px] text-center">
      Please provide the classroom details
    </Typography.Title>
    <Row gutter={[16, 16]}>
      <Col span={24} className='text-center'>
        <Form>
          <Form.Item label={false}>
            <Input placeholder='Class Name' className='w-[384px] h-[46px] rounded-[8px] mb-[55px]' />
          </Form.Item>
        </Form>
      </Col>
      <Col span={24} className='text-center'>
        <p className='text-baseline'>Grade Level</p>
        <div className='w-[80%] m-auto'>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                K
              </Button>
            </Col>
            <Col span={6}>
              <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                PreK
              </Button>
            </Col>
            <Col span={6}>
              <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                1
              </Button>
            </Col>
            <Col span={6}>
              <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                2
              </Button>
            </Col>
            <Col span={3}>&nbsp;</Col>
            <Col span={6}>
              <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                3
              </Button>
            </Col>
            <Col span={6}>
              <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                4
              </Button>
            </Col>
            <Col span={6}>
              <Button className='bg-gray-300 w-[58px] h-[25px] rounded-[60px] text-[12px]'>
                5
              </Button>
            </Col>
            <Col span={3}>&nbsp;</Col>
          </Row>
        </div>
      </Col>
      <Col span={24} className='text-center'>
        <Button type='primary' className='mt-[63px] m-auto' onClick={() => setManualStep(2)}>CONTINUE</Button>
      </Col>
    </Row>
  </>
);

const addStudentContent = (setCreateClassPopup) => (
  <>
    <Typography.Title level={1} className="!text-2xl md:!text-2xl mt-[30px] text-center">
      Add Students
    </Typography.Title>
    <Typography.Title level={5} className="!font-normal !mt-[16px] !mb-[30px] !text-[14px] text-center">
      Please provide the classroom details
    </Typography.Title>
    <Row gutter={[16, 16]}>
      <Col span={24} className='text-center'>
        <Button className='w-[168px] h-[60px] rounded-[8px] m-auto !mb-[30px]'>Import</Button>
      </Col>
      <Col span={24} className='text-center'>
        <p className='text-[13px]'>
          Or, enter student names manually.
          <br />
          Please enter student names as Frist name Last Name  - one per line.
        </p>
      </Col>
      <Col span={24} className='text-center'>
        <Input.TextArea className='!h-[150px] rounded-[8px] m-auto' />
      </Col>
      <Col span={24} className='text-center'>
        <Button
          type='primary'
          className='mt-[63px] m-auto'
          onClick={() => {
            setCreateClassPopup(false);
            popupModalComponent('error', (<Typography.Title level={1} className="!text-2xl md:!text-2xl mt-[30px] text-center">Classroom(s) created</Typography.Title>), <Typography.Title level={5} className="!font-normal !mt-[16px] !mb-[76px] !text-[14px] text-center">2 classrooms and 40 students have been imported to Workybooks</Typography.Title>);
          }}
        >
          ADD
        </Button>
      </Col>
    </Row>
  </>
);

const popupModalComponent = (type = 'info', title = '', content = '') => {
  const config = {
    title,
    content,
    icon: (<div />),
    okText: 'Okay',
    centered: true,
    style: { textAlign: 'center' },
    className: 'customModal'
  };
  switch (type) {
    case 'info':
      Modal.info(config);
      break;
    case 'warning':
      Modal.warning(config);
      break;
    case 'success':
      Modal.success(config);
      break;
    case 'error':
      Modal.error(config);
      break;
    default:
      Modal.info(config);
      break;
  }
};

function CreateClassroom() {
  const [createClassPopup, setCreateClassPopup] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [isImport, setIsImport] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [manualStep, setManualStep] = useState(1);
  return (
    <>
      <LogoHeader />
      <Typography.Title level={3} className="m-auto !mt-[50px] !mb-[35px] text-center">
        Welcome Mrs. Bieries!
      </Typography.Title>
      <div className='bg-gray-100 w-[90%] max-w-[1121px] min-h-[176px] text-center m-auto rounded-[12px]'>
        <p className='pt-[17px] text-lg pb-[0px]'>Start using Workybooks in your classroom with your students!</p>
        <p className='text-sm pb-[31px]'>With classrooms you can add students and digitally assign worksheets, grade and generate student progress reports.</p>
        <Button
          type='primary'
          className='w-[226px] h-[44px] m-auto mb-[17px]'
          onClick={() => {
            setCreateClassPopup(true);
            setIsImport(false);
            setIsManual(false);
          }}
        >
          CREATE MY FIRST CLASSROOM
        </Button>
      </div>
      <p className='mt-[107px] mb-[39px] text-center text-baseline w-[85%] m-auto'>Don’t wish to create a Classroom yet? Select the grade you want to work with</p>

      <div className='w-full max-w-[620px] min-h-[203px] m-auto !pb-[50px]'>
        <Row gutter={[16, 16]} className='text-center !m-[0px]'>
          <Col lg={6} xs={12}>
            <Button className='bg-gray-300 w-[125px] h-[90px] rounded-[8px]'>
              <p className='text-[10px]'>GRADE</p>
              <Typography.Title level={1}>PreK</Typography.Title>
            </Button>
          </Col>
          <Col lg={6} xs={12}>
            <Button className='bg-gray-300 w-[125px] h-[90px] rounded-[8px]'>
              <p className='text-[10px]'>GRADE</p>
              <Typography.Title level={1}>K</Typography.Title>
            </Button>
          </Col>
          <Col lg={6} xs={12}>
            <Button className='bg-gray-300 w-[125px] h-[90px] rounded-[8px]'>
              <p className='text-[10px]'>GRADE</p>
              <Typography.Title level={1}>1</Typography.Title>
            </Button>
          </Col>
          <Col lg={6} xs={12}>
            <Button className='bg-gray-300 w-[125px] h-[90px] rounded-[8px]'>
              <p className='text-[10px]'>GRADE</p>
              <Typography.Title level={1}>2</Typography.Title>
            </Button>
          </Col>
          <Col lg={3} xs={0}>&nbsp;</Col>
          <Col lg={6} xs={12}>
            <Button className='bg-gray-300 w-[125px] h-[90px] rounded-[8px]'>
              <p className='text-[10px]'>GRADE</p>
              <Typography.Title level={1}>3</Typography.Title>
            </Button>
          </Col>
          <Col lg={6} xs={12}>
            <Button className='bg-gray-300 w-[125px] h-[90px] rounded-[8px]'>
              <p className='text-[10px]'>GRADE</p>
              <Typography.Title level={1}>4</Typography.Title>
            </Button>
          </Col>
          <Col lg={6} xs={24}>
            <Button className='bg-gray-300 w-[125px] h-[90px] rounded-[8px]'>
              <p className='text-[10px]'>GRADE</p>
              <Typography.Title level={1}>5</Typography.Title>
            </Button>
          </Col>
          <Col lg={3} xs={0}>&nbsp;</Col>
        </Row>
      </div>

      <Modal
        closeIcon={<div />}
        visible={createClassPopup}
        onCancel={() => {
          setCreateClassPopup(false);
        }}
        footer={false}
        centered
        width={489}
        bodyStyle={{ height: 600, borderRadius: 16 }}
      >
        {!isManual && !isImport && mainContent(setIsImport, setIsManual, setManualStep)}
        {isImport && importContent(rowSelection, isImport, setCreateClassPopup)}
        {isManual && manualStep === 1 && manualContent(isManual, setManualStep)}
        {isManual && manualStep === 2 && addStudentContent(setCreateClassPopup)}
        {/* <Button onClick={() => popupModalComponent('error', (<Typography.Title level={1} className="!text-2xl md:!text-2xl mt-[30px] text-center">Classroom(s) created</Typography.Title>), <Typography.Title level={5} className="!font-normal !mt-[16px] !mb-[76px] !text-[14px] text-center">2 classrooms and 40 students have been imported to Workybooks</Typography.Title>)}>Test</Button> */}
      </Modal>
    </>
  );
}

export default CreateClassroom;
