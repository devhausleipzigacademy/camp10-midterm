import { cn } from '../lib/utils';

type BookingDetailsProps = {
  isDisabled?: boolean;
  isActive?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
function BookingDetails({
  isDisabled,
  isActive,
  className,
  children,
  ...props
}: BookingDetailsProps) {
  return (
    <button
      className={`${cn(
        'flex justify-center rounded-s font-500 px-4 py-[.375rem] rounded',
        isDisabled ? 'text-dark-light' : 'text-white-dimmed',
        isActive ? 'bg-yellow text-dark' : '',
        className
      )} text-m`}
      {...props}
    >
      {children}
    </button>
  );
}

export default BookingDetails;
