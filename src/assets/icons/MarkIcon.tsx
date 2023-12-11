import * as React from 'react';
import { SVGProps } from 'react';
export const MarkIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        {...props}
    >
        <circle cx={12} cy={12} r={9} stroke='#FFBA00' />
    </svg>
);
