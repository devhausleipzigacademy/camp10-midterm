import { BookingSummaryRow } from './BookingSummaryRow';
import { Button } from './Button';
import { Transition } from '@headlessui/react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { useState } from 'react';
import clsx from 'clsx';
import { cn } from '../lib/utils';
import { SummaryRow } from '../types/booking';
import { Link } from 'react-router-dom';

type BookingSummaryProps = {
  buttonLink: string;
  buttonDisabled: boolean;
  summaries: SummaryRow[];
};

export function BookingSummary({
  summaries,
  buttonLink,
  buttonDisabled,
}: BookingSummaryProps) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSlide = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-dark-light rounded-3xl px-5 pt-7 pb-6">
      <MdOutlineKeyboardArrowUp
        onClick={toggleSlide}
        className={clsx(
          '-mt-4 mx-auto text-white-dimmed text-xl',
          isOpen ? 'rotate-180' : ''
        )}
      />
      <Transition
        show={isOpen}
        enter="transition ease-out duration-700 transform"
        enterFrom="translate-y-20 opacity-0"
        enterTo="translate-y-120 opacity-100"
      >
        <div className="w-full space-y-2">
          {summaries.map(row => (
            <BookingSummaryRow
              key={row.type}
              type={row.type}
              amount={row.amount}
              price={row.price}
            />
          ))}
        </div>
        <div
          className={cn(
            'border border-t-[1px] border-white-dimmed-heavy border-b-0 mt-4',
            summaries.length === 0 && 'border-t-0'
          )}
        ></div>
      </Transition>
      <div className="justify-between w-full flex gap-12 mt-8 items-center">
        <div className="flex flex-col">
          <span className="text-s font-500 text-white-dimmed whitespace-nowrap">
            Total Price
          </span>
          <span className="text-xl font-700 text-white">
            {`$${summaries.reduce((acc, row) => acc + row.amount * row.price, 0).toFixed(2)}`}
          </span>
        </div>
        <Link className="w-3/5" to={buttonLink}>
          <Button className="w-full" disabled={buttonDisabled}>Book Ticket</Button>
        </Link>
      </div>
    </div>
  );
}
