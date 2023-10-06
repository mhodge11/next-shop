import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

function Title({ children }: TitleProps) {
  return <h1 className='text-2xl pb-4 font-bold'>{children}</h1>;
}

export default Title;
