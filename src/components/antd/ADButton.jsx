import { Button } from 'antd';

function ADButton({ children, className, type, size, ...props }) {
  return (
    <Button
      className={`${className ?? ''}${' '}
      rounded-lg font-medium
      ${size === 'medium' ? 'py-3 px-4 h-auto' : ''}
      ${size === 'small' ? 'py-1 px-3 h-auto' : ''}
      ${type === 'default' ? 'border-2' : ''}
      `}
      type={type}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
}
ADButton.defaultProps = {
  size: 'medium',
  type: 'default'
};

export default ADButton;
