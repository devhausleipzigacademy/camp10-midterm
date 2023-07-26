import {
  HiHome,
  HiKey,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlineUserCircle,
  HiUser,
} from 'react-icons/hi';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { IoChevronBackSharp } from 'react-icons/io5';
import { BsArrowUpCircle } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Renderable,
  Toast,
  Toaster,
  ValueFunction,
  toast,
} from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();
  return (
    <div className="bg-dark flex flex-col items-center justify-around w-[375px] h-[667px] rounded-3xl px-5 py-8 m-auto text-white">
      <div className="flex justify-between w-3/5 self-start">
        <IoChevronBackSharp />
        <p className="text-l font-500">User Page</p>
      </div>
      <div className="bg-white-dimmed rounded-full p-1 relative">
        {<HiOutlineUserCircle className="h-16 w-16 stroke-[0.8]" />}
        <button className="rounded-full bg-yellow absolute -right-1 -bottom-1 p-1 text-dark">
          {<BsArrowUpCircle className="text-m" />}
        </button>
      </div>

      <p className="text-[1.5rem] font-500 pb-4"> {'Max Mustermann'}</p>
      <div>
        <Toaster />
      </div>
      <form
        className="flex flex-col space-y-4 pt-2 w-full"
        onSubmit={async event => {
          event.preventDefault();

          const target = event.target as HTMLFormElement;
          const formData = new FormData(target);
          const userSignUpData = Object.fromEntries(formData.entries());

          const response = await axios
            .post('http://localhost:8000/auth/signup', userSignUpData, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(res => navigate('/login'))
            .catch(err => err.response.data);

          response[1] &&
            response.map(
              (data: {
                message: Renderable | ValueFunction<Renderable, Toast>;
              }) => toast.error(data.message)
            );
          response.data && toast.error(response.data);
        }}
      >
        <Input
          name="firstName"
          placeholder="First Name*"
          icon={<HiUser />}
          type="text"
        />
        <Input
          name="lastName"
          placeholder="Last Name*"
          icon={<HiUser />}
          type="text"
        />
        <Input
          name="email"
          placeholder="Mail@mail.com*"
          icon={<HiOutlineMail />}
          type="email"
        />
        <Input
          name="password"
          placeholder="Enter Your Password"
          icon={<HiKey />}
          type="password"
        />
        <Input name="city" placeholder="City" icon={<HiHome />} type="text" />
        <Input
          name="zip"
          placeholder="Postal Id "
          icon={<HiOutlineLocationMarker />}
          type="text"
        />
        <Button type="submit" label="Confirm Information" />
      </form>
    </div>
  );
}
