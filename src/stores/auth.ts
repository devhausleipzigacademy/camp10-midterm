import { create } from 'zustand';

type AuthStore = {
  token: string;
  setToken: (token: string) => void;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    city: string;
    zip: string;
  };
  setUser: (data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    city: string;
    zip: string;
  }) => void;
};

const useAuthStore = create<AuthStore>(function (set) {
  return {
    token: '',
    setToken: token => {
      set(state => ({ token }));
    },
    user: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      city: '',
      zip: '',
    },
    setUser: user => {
      set(state => ({
        user,
      }));
    },
  };
});

export default useAuthStore;
