import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export default function Button({
  children,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className='bg-green-800 text-gray-100 rounded px-4 py-2 my-2 hover:bg-green-700'
      {...props}
    >
      {children}
    </button>
  );
}
