import { SummaryRow } from '../types/booking';

export function BookingSummaryRow({ type, amount, price }: SummaryRow) {
  return (
    <li className="flex justify-between text-white-dimmed text-s">
      <div className="flex">
        <div className="w-12">{`${amount}x`}</div>
        <div className="text-white">{`Seat - ${type}`}</div>
      </div>
      <div>
        <span className="text-white">{`$${price}`}</span>
        <span className="text-white-dimmed"> / each</span>
      </div>
    </li>
  );
}
