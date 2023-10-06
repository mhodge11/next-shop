import { ReactNode } from 'react';

interface FieldProps {
  label: string;
  children: ReactNode;
}

export default function Field({ label, children }: FieldProps) {
  return (
    <label className='block my-2'>
      <span className='block text-sm text-gray-600'>{label}</span>
      {children}
    </label>
  );
}
