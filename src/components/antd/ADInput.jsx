import { Input } from 'antd';

function ADInput({
  children, className, size, ...props
}) {
  return (
    <Input
      className={`${className ?? ''}${' '}
      ${size === 'default' && 'border-2 rounded-md h-12 text-base flex-1 w-full'}
      
      `}
      {...props}
    />
  );
}
ADInput.defaultProps = {
  size: 'default'
};

export default ADInput;

// eslint-disable-next-line no-lone-blocks
{ /* <input type='text' name='firstName' id='firstName'
className='w-full flex-1 py-2 px-3 rounded-md
border-gray-300 border-1 border-solid border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' placeholder='www.example.com'
 /> */ }
