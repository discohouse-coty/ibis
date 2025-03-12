    // pages/login.js or pages/login.tsx


    'use client';

    import SignUpForm from '@/components/auth/SignUpForm';
    import React from 'react';
    
    const SignUpPage = () => {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <h1>Sign Up</h1>
          <SignUpForm />
        </div>
      );
    };
    
    export default LoginPage;