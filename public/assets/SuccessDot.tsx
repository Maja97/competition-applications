import * as React from 'react';
import { SVGProps } from 'react';
const SuccessDot = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="none" {...props}>
    <circle cx={5} cy={5} r={5} fill="#27C200" />
  </svg>
);
export default SuccessDot;
