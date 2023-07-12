import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generate 12-digit ticket id randomly
export function generateTicketId() {
  return Math.floor(Math.random() * 1000000000000);
}