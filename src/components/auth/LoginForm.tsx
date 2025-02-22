// src/components/LoginForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuthStore from "@/store/authStore";
import { FirebaseError } from "firebase/app";

interface FormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    setFirebaseError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFirebaseError(error.message);
      } else {
        setFirebaseError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setFirebaseError(null);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFirebaseError(error.message);
      } else {
        setFirebaseError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            id="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>
        {firebaseError && <p className="text-red-500 text-sm">{firebaseError}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-md bg-indigo-600 py-2 px-4 text-white ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
        >
          {loading ? "Logging in..." : "Sign in"}
        </button>
      </form>
      <div className="mt-6">
        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className={`w-full rounded-md bg-blue-500 py-2 px-4 text-white ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {loading ? "Signing in with Google..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}