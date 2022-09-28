import { Button } from 'antd';

function ADButton({
  children, className, size, ...props
}) {
  return (
    <Button
      className={`${className ?? ''}${' '}
      border-2 border-gray-250 rounded-md font-medium
      ${size === 'small' && 'text-sm h-9'}
      ${size === 'default' && 'text-base h-12'}
      `}
      {...props}
    >
      {children}
    </Button>
  );
}
ADButton.defaultProps = {
  size: 'default'
};

export default ADButton;
