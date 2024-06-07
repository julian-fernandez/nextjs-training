'use client';

import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { signup } from '@/app/lib/actions';

type SignupState = {
  name: string;
  email: string;
  password: string;
  success?: boolean;
  error?: string | null;
  pending: boolean;
};

export default function SignupForm() {
  const [formState, setFormState] = useState<SignupState>({
    name: '',
    email: '',
    password: '',
    success: undefined,
    error: null,
    pending: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prevState) => ({
      ...prevState,
      pending: true,
    }));
    const response = await signup({
      name: formState.name,
      email: formState.email,
      password: formState.password,
    });
    setFormState((prevState) => ({
      ...prevState,
      success: response.success,
      error: response.error,
      pending: false,
    }));
  };

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      password: '',
      success: undefined,
      error: null,
      pending: false,
    });
  };

  const errorMessage = formState.error;

  return (
    <div>
      {!formState.success ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Create a new account
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                  <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formState.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <SignupButton pending={formState.pending} />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </form>
      ) : (
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Signup Successful!
          </h1>
          <p className="text-green-500 mb-4">You have successfully signed up.</p>
          <Button className="ml-4" onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </div>
      )}
    </div>
  );
}

function SignupButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" className="mt-4 w-full" aria-disabled={pending}>
      Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}