"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormSchema, schema } from "@/validators/formSchema";
import Image from "next/image";

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const baseurl = process.env.NEXT_PUBLIC_API || "/api";

  // Form Submission Handler
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(`${baseurl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed. Please try again.");
      }

      if (response.ok) {
        const successMessage = await response.json();
        toast.success(successMessage.message);
        reset();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col lg:flex-row bg-white'>
      <div className='lg:w-1/2 flex flex-col justify-center p-8 bg-white'>
        <div className='max-w-md w-full mx-auto'>
          <div className='bg-[#28123d] p-8 flex justify-center items-center'>
            <Image
              src='/pi-network.webp'
              alt='logo'
              width={250}
              height={250}
              priority
            />
          </div>

          <h2 className='text-2xl font-bold text-[#28123d] mb-6 text-left mt-14'>
            Register to recover your account!
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 flex flex-col'
          >
            <label htmlFor='email' className='text-[#261339]'>
              Email
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-950'
                {...register("email")}
                disabled={isSubmitting}
              />
            </label>
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}

            <label htmlFor='phoneNumber' className='text-[#261339]'>
              Phone number
              <input
                type='tel'
                placeholder='1034567890'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-950'
                {...register("phoneNumber")}
                disabled={isSubmitting}
              />
            </label>
            {errors.phoneNumber && (
              <p className='text-red-500'>{errors.phoneNumber.message}</p>
            )}

            <label htmlFor='password' className='text-[#261339]'>
              Password
              <input
                type='password'
                placeholder='Enter your password'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-950'
                {...register("password")}
                disabled={isSubmitting}
              />
            </label>
            {errors.password && (
              <p className='text-red-500'>{errors.password.message}</p>
            )}

            <button
              type='submit'
              className='w-full py-2 bg-[#fbb44a] text-violet-950 font-semibold rounded-md hover:bg-[#2f133a] hover:text-[#fbb44a] disabled:bg-gray-400 disabled:text-white'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Recover Account"}
            </button>
          </form>
        </div>
      </div>
      <div className='hidden lg:flex lg:bg-[url("/main-bg.jpg")] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:items-center lg:justify-center lg:p-8 lg:min-h-full lg:w-1/2'>
        <div className='max-w-md text-center'>
          <h2 className='text-3xl font-bold text-[#fbb44a]'>Welcome Back!</h2>
          <p className='mt-4 text-lg text-white'>
            Securely access your account and continue your journey with us.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
