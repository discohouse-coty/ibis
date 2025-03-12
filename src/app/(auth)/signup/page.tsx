    // pages/login.js or pages/login.tsx


    'use client';

    import SignupForm from '@/components/auth/SignupForm';
    import React from 'react';
    
    const SignupPage = () => {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <h1>Sign Up</h1>
          <SignupForm />
        </div>
      );
    };
    
    export default SignupPage;