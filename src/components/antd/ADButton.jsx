import { Button } from 'antd';

function ADButton({ children, className, type, htmlType, innerRef, size, ...props }) {
  return (
    <Button
      className={`${className ?? ''}${' '}
      rounded-md font-medium flex items-center justify-center
      ${size === 'medium' ? 'py-2 px-4 h-auto' : ''}
      ${size === 'small' ? 'py-1 px-3 h-auto' : ''}
      `}
      ref={innerRef}
      type={type}
      size={size}
      htmlType={htmlType}
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
