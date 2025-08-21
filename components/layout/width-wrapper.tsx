import React from 'react'

type Props = {
  children: React.ReactNode;
}

function WidthWrapper({children}: Props) {
  return (
    <div className="max-w-7xl px-8 mx-auto  h-full">
      {children}
    </div>
  );
}

export default WidthWrapper;