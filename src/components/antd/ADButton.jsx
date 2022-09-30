import { Button } from 'antd';

function ADButton({
  children, className, type, size, ...props
}) {
  return (
    <Button
      className={`${className ?? ''}${' '}
       border-gray-250 rounded-md font-medium
       ${size === 'small' && 'text-sm h-9'}
       ${size === 'default' && 'border-2 text-base h-12'}
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
