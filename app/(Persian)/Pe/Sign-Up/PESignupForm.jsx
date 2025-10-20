"use client";

import { SignUp } from "@/app/(index)/login/actions";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import SpinningLoading from "@/components/SpinningLoading";
import Link from "next/link";

export function PESignUpForm() {
  const [state, SignUpAction] = useActionState(SignUp);

  useEffect(() => {
    if (state?.errors?.res === "User-added") {
      window.location.reload();
    }
  }, [state]);

  return (

      <div className="bg-white w-[90vw] max-w-md rounded-2xl shadow-2xl p-10 transform transition-transform duration-500 hover:scale-[1.02]">
        <h1 className="font-semibold text-3xl text-center mb-8 text-gray-800">
          لطفاً ثبت‌نام کنید
        </h1>

        <form action={SignUpAction} className="flex flex-col gap-6">
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700 mb-2">
              ایمیل
            </label>
            <input
              id="email"
              name="email"
              placeholder="ایمیل خود را وارد کنید"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-right"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
            )}
          </div>

          {/* Username Field */}
          <div className="flex flex-col">
            <label htmlFor="username" className="font-medium text-gray-700 mb-2">
              نام کاربری
            </label>
            <input
              id="username"
              name="username"
              placeholder="نام کاربری مورد نظر خود را وارد کنید"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-right"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium text-gray-700 mb-2">
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="رمز عبور خود را انتخاب کنید"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-right"
            />
            {state?.errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.password}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="font-medium text-gray-700 mb-2"
            >
              شماره تلفن همراه
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="شماره تلفن خود را وارد کنید"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-right"
            />
          </div>

          {/* Submit Button */}
          <SubmitButton />

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            حساب کاربری دارید؟{" "}
            <Link
              href="/Pe/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              وارد شوید
            </Link>
          </p>
        </form>
      </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="mt-4 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
    >
      {pending ? <SpinningLoading size={8} /> : "ثبت‌نام"}
    </button>
  );
}
