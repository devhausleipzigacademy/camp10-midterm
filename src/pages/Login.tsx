import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { HiUser } from 'react-icons/hi';
import { HiKey } from 'react-icons/hi';

export function Login() {
  return (
    <form className="bg-dark flex flex-col gap-y-8 w-[375px] h-[667px] rounded-3xl px-5 py-8 m-auto">
      <div className="space-y-3">
        <h2 className="text-l font-700 text-white">Welcome to Cine-Scape</h2>
        <p className="text-white-dimmed text-m">
          You need to log in to be able to make reservations and add movies to
          your watchlist.
        </p>
      </div>
      <div className="space-y-4">
        <Input
          name="user-email"
          placeholder="your@email.com"
          icon={<HiUser />}
          type="email"
        />
        <Input
          name="user-password"
          placeholder="Enter Your Password"
          icon={<HiKey />}
          type="password"
        />
      </div>
      <Button className="mt-auto" type="submit" label="Login" />
    </form>
  );
}
