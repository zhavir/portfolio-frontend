import React from 'react';
import Link from 'next/link';
import { CpuChipIcon } from '@heroicons/react/24/solid';

const Logo = () => {
  return (
    <Link
      href={'/'}
      className="text-xl md:text-3xl text-primaryText font-semibold"
    >
      <div className="flex justify-between">
        <CpuChipIcon className="h-10 w-10 md:h-14 md:w-14" />
        <span className="mt-1 md:mt-2 hidden md:block ml-2">
          {' '}
          Andrea Aramini
        </span>
      </div>
    </Link>
  );
};

export default Logo;
