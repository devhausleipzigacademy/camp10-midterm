import React from 'react';
import { cn } from '../lib/utils';

type PaginationButtonProps = {
  currentPage: number;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function PaginationButton({
  currentPage,
  className,
  children,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      className={cn(
        'flex justify-center items-center  h-8 w-8 rounded-sm  text-dark-light ',
        currentPage == children ? 'bg-yellow' : 'bg-white-dimmed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default PaginationButton;
