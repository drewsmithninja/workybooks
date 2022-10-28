import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, InputNumber, Radio, Row } from 'antd';

export default function AssignStep3() {
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  const options = [
    {
      label: (
        <div className='w-auto'>
          <div className='font-bold'>Optional Enrichment Activity</div>
          <p>An enrichment activity which is optional and not graded, has no due date</p>
        </div>
      ),
      value: 1
    },
    {
      label: (
        <div className='w-auto'>
          <div className='font-bold'>Assignment</div>
          <p>A graded activity with a due date</p>
        </div>
      ),
      value: 2
    },
    {
      label: (
        <div className='w-auto'>
          <div className='font-bold'>Live Assignment</div>
          <p>A timed, graded activity to be completed NOW</p>
        </div>
      ),
      value: 3
    }
  ];
  const [value, setValue] = useState(options.value);
  const [form] = Form.useForm();
  const onChange = ({ target: { updatedValue } }) => {
    console.log('radio checked', updatedValue);
    setValue(updatedValue);
  };
  const onDateChange = (e, dateString) => {
    console.log('Selected Time: ', e);
    console.log('Formatted Selected Time: ', dateString);
  };
  return (
    <div>
      <Form form={form} layout='vertical'>
        <Form.Item label='Assignment Name'>
          <Input placeholder='input placeholder' />
        </Form.Item>
        <Form.Item name='radio-group' label='Assignment Type'>
          <Radio.Group onChange={onChange} value={value} label='{options.label}'>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Radio value={1}>
                  <div className='w-auto'>
                    <div className='font-bold'>Optional Enrichment Activity</div>
                    <p>An enrichment activity which is optional and not graded, has no due date</p>
                  </div>
                </Radio>
              </Col>
              <Col xs={24} sm={8}>
                <Radio value={2}>
                  <div className='w-auto'>
                    <div className='font-bold'>Assignment</div>
                    <p>A graded activity with a due date</p>
                  </div>
                </Radio>
              </Col>
              <Col xs={24} sm={8}>
                <Radio value={3}>
                  <div className='w-auto'>
                    <div className='font-bold'>Live Assignment</div>
                    <p>A timed, graded activity to be completed NOW</p>
                  </div>
                </Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label='Start Date'>
              <DatePicker
                showTime={{
                  format: 'HH:mm'
                }}
                format='DD/MM/YYYY HH:mm'
                onChange={onDateChange}
                onOk={onOk}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label='Due Date'>
              <DatePicker
                showTime={{
                  format: 'HH:mm'
                }}
                format='DD/MM/YYYY HH:mm'
                onChange={onDateChange}
                onOk={onOk}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label='Points'>
          <InputNumber min={1} max={10} defaultValue={10} onChange={(e) => console.log(e.target.value)} />
        </Form.Item>
      </Form>
    </div>
  );
}
