"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/(index)/login/actions";
import { useEffect } from "react";
import SpinningLoading from "@/components/SpinningLoading";
import Link from "next/link";

export function PELoginForm() {
  const [state, loginAction] = useActionState(login);

  useEffect(() => {
    if (state?.errors?.res === "User-logged") {
      window.location.reload();
    }
  }, [state]);

  return (

      <div className="bg-white w-[90vw] max-w-md rounded-2xl shadow-2xl p-10 transform transition-transform duration-500 hover:scale-[1.02]">
        <h1 className="font-semibold text-3xl text-center mb-8 text-gray-800">
          لطفاً وارد شوید
        </h1>

        <form action={loginAction} className="flex flex-col gap-6">
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

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium text-gray-700 mb-2">
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="رمز عبور خود را وارد کنید"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-right"
            />
            {state?.errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <SubmitButton />

          {/* Signup Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            حساب کاربری ندارید؟{" "}
            <Link
              href="/Pe/Sign-Up"
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              ثبت‌نام کنید
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
      {pending ? <SpinningLoading size={8} /> : "ورود"}
    </button>
  );
}
