import * as React from 'react';
import { SVGProps } from 'react';
const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#000"
      fillRule="evenodd"
      d="m16.5 10.294-1.057-1.046L12 12.649 8.557 9.252 7.5 10.299 12 14.75l4.5-4.456Z"
      clipRule="evenodd"
    />
  </svg>
);
export default ArrowDown;
