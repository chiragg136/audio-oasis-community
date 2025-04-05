
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account and get started"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
