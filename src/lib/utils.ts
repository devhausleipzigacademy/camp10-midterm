import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generate 12-digit ticket id randomly
export function generateTicketId() {
  return Math.floor(Math.random() * 1000000000000);
}

export function formatName(name: string) {
  const [firstName, middleName, lastName] = name.split(' ');

  return name.length <= 13
    ? name
    : lastName
    ? `${firstName[0]}.${middleName[0]}. ${lastName}`
    : `${firstName[0]}. ${middleName}`;
}
