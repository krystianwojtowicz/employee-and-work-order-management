import * as React from 'react';
import { SVGProps } from 'react';
export const SquareCheckIcon = ({
    fill = '#0C3B2E',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        fill='none'
        {...props}
    >
        <path
            fill={fill}
            d='m10 17-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z'
        />
    </svg>
);