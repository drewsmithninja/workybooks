import React, { useState } from 'react';
import { Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ADTitle from '../../antd/ADTitle';
import ADButton from '../../antd/ADButton';

export default function ImportClass({ next }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      }
    ]
  };
  const columns = [
    {
      title: 'Class',
      dataIndex: 'class'
      //   render: (text) => <div>{text}</div>
    },
    {
      title: 'Grade',
      dataIndex: 'grade'
    },
    {
      title: 'Students',
      dataIndex: 'students'
    }
  ];
  const data = [
    {
      key: '1',
      class: 'John',
      grade: 'Brown',
      students: 32,
      checked: false
    },
    {
      key: '2',
      class: 'Max',
      grade: 'Smith',
      students: 18,
      checked: false
    },
    {
      key: '3',
      class: 'Deny',
      grade: 'Josh',
      students: 20,
      checked: false
    }
  ];
  return (
    <div className="flex flex-col items-center">
      <ADTitle level={2}>Import Classroom</ADTitle>
      <div className="py-4 text-dark text-lg">Please select the classrooms you wish to import</div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <ADButton size="large" className="my-4" type="primary" onClick={next}>
        Continue
      </ADButton>
    </div>
  );
}
