import { ReactNode } from 'react';
interface PropClass {
  className?: string;
  children: ReactNode;
}
const Container = ({ className, children }: PropClass) => {
  return (
    // <div className="-mx-5 overflow-hidden">
    <div
      className={`max-w-[1280px] max-lg:px-4 px-5 mx-auto   ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
    // </div>
  );
};

export default Container;
