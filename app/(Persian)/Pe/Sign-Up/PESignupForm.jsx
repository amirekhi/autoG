"use client";

import { SignUp } from "@/app/(index)/login/actions";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import SpinningLoading from "@/components/SpinningLoading";


export function PESignUpForm() {
  const [state, SignUpAction] = useActionState(SignUp);


  useEffect(() => {
   
    if(state?.errors?.res == 'User-added'){
      window.location.reload()
    }
   } , [state])

  return (<>
           <h1 className="font-semibold text-3xl mt-20 " > لطفا ثبت نام کنید</h1>
          <form action={SignUpAction}  className="flex w-[30vw] max-md:w-[80vw] my-16  flex-col gap-2 mt-8 border-gray-400  border-2 rounded-lg p-6 shadow-blue-600 shadow-xl transform transition-transform duration-500 hover:scale-105  ">
            <div className="flex flex-col gap-2 p-6">
              <input id="email"  className="p-6 border-gray-400  rounded-lg border-2 text-left placeholder:text-right" name="email" placeholder="ایمیل" />
            </div>   
            {state?.errors?.email && (
               <p className="text-red-500">{state.errors.email}</p>
              )}    
            <div className="flex flex-col gap-2 p-6">
              <input   className="p-6 border-gray-400  rounded-lg border-2 text-left placeholder:text-right" name="username" placeholder="نام اکانت مورد نظر" />
            </div>     
            <div className="flex flex-col gap-2 p-6">
              <input
                className="p-6 border-gray-400 rounded-lg  border-2 text-left placeholder:text-right"
                id="password"
                name="password"
                type="password"
                placeholder="رمز مورد نظر"
              />
            </div>
            <div className="flex flex-col gap-2 p-6">
              <input
                className="p-6 border-gray-400 rounded-lg  border-2 text-left placeholder:text-right"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="تلفن همراه"
              />
            </div>
            {state?.errors?.password && (
               <p className="text-red-500">{state.errors.password}</p>
            )}
            <SubmitButton />
          </form>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit " className="border-2 w-[50%] mx-auto border-gray-400 rounded-lg p-6 hover:bg-[#797979] transition duration-200">
     {pending ? (<SpinningLoading size={8}/>) :  ('ثبت نام')}
    </button>
  );
}
