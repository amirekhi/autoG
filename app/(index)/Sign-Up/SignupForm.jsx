"use client";

import { SignUp } from "../login/actions";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import SpinningLoading from "@/components/SpinningLoading";


export function SignUpForm() {
  const [state, SignUpAction] = useActionState(SignUp);


  useEffect(() => {
   
    if(state?.errors?.res == 'User-added'){
      window.location.reload()
    }
   } , [state])

  return (<>
           <h1 className="font-semibold text-3xl mt-20 " > Please Sign Up</h1>
          <form action={SignUpAction}  className="flex w-[30vw] max-md:w-[80vw] my-16  flex-col gap-2 mt-8 border-gray-400  border-2 rounded-xl shadow-blue-600 p-6  shadow-lg transform transition-transform duration-500 hover:scale-105  ">
            <div className="flex flex-col gap-2 p-6">
              <input id="email"  className="p-6 border-gray-400  rounded-lg border-2" name="email" placeholder="Email" />
            </div>   
            {state?.errors?.email && (
               <p className="text-red-500">{state.errors.email}</p>
              )}    
            <div className="flex flex-col gap-2 p-6">
              <input   className="p-6 border-gray-400  rounded-lg border-2" name="username" placeholder="Username" />
            </div>     
            <div className="flex flex-col gap-2 p-6">
              <input
                className="p-6 border-gray-400 rounded-lg  border-2"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col gap-2 p-6">
              <input
                className="p-6 border-gray-400 rounded-lg  border-2"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Phone number"
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
     {pending ? (<SpinningLoading size={8}/>) :  ('Sign Up')}
    </button>
  );
}
