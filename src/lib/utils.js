import { Modal, Typography } from 'antd';

export const popupModalComponent = (type = 'info', title = '', content = '') => {
  const config = {
    title: <Typography.Title level={1} className="!text-2xl md:!text-2xl mt-[30px] text-center">{title}</Typography.Title>,
    content: <Typography.Title level={5} className="!font-normal !mt-[16px] !mb-[76px] !text-[14px] text-center">{content}</Typography.Title>,
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
