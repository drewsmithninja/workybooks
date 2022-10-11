import { Button } from 'antd';

function ADButton({ children, className, type, htmlType, size, ...props }) {
  return (
    <Button
      className={`${className ?? ''}${' '}
      rounded-lg font-medium
      ${type === 'default' ? 'border-2' : ''}
      ${size === 'medium' ? 'py-3 px-4 h-auto' : ''}
      ${size === 'small' ? 'py-1 px-3 h-auto' : ''}
      `}
      type
      size
      htmlType
      {...props}
    >
      {children}
    </Button>
  );
}
ADButton.defaultProps = {
  type: 'default',
  size: 'medium',
  htmlType: 'button'
};

export default ADButton;
