import { cn } from '../lib/utils';

type GenreIconProps = {
  genre: string;
  icon: string;
  isSelected: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function GenreIcon({
  genre,
  icon,
  isSelected,
  className,
  ...props
}: GenreIconProps) {
  return (
    <div className="flex flex-col items-center w-14">
      <button
        className={cn(
          'rounded-xl flex items-center justify-center h-14 w-14 text-[1.875rem]',
          isSelected ? 'bg-white-dimmed' : 'bg-dark-light',
          className
        )}
        {...props}
      >
        {icon}
      </button>
      <p className="text-white-dimmed pt-2 font-700 text-s whitespace-nowrap">
        {genre}
      </p>
    </div>
  );
}