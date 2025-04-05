
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout
      title="Sign in to your account"
      description="Enter your email below to sign in to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
