import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export default function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return <input className='border rounded px-3 py-1 w-80' {...props} />;
}
