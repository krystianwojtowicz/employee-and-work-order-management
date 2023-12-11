import * as React from 'react';
import { SVGProps } from 'react';
export const SquareIcon = ({
    fill = '#0C3B2E',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        className='square'
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        {...props}
    >
        <path
            fill={fill}
            d='M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 2v14H5V5h14Z'
        />
    </svg>
);
