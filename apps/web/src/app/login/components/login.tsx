'use client';
import { useAppDispatch } from '@/lib/hooks';
import { withFormik } from 'formik';
import { useRouter, usePathname } from 'next/navigation';
import * as Yup from 'yup';
import { FormProps, FormValues } from '../types/login.type';
import { signIn } from '@/lib/features/auth/authSlice';
import InnerForm from './innerForm';
import { loginAdmin } from '@/lib/features/auth/adminAuthSlice';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format!')
    .required('Email is required!'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const router = useRouter();
  const routerNext = usePathname();
  const dispatch = useAppDispatch();

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
    }),
    validationSchema: loginSchema,
    enableReinitialize: true,
    handleSubmit({ email, password }: FormValues, { resetForm }) {
      if (routerNext === '/login') {
        dispatch(signIn({ email, password }));
        resetForm();
        router.push('/');
      } else if (routerNext === '/login/admin') {
        dispatch(loginAdmin({ email, password }));
        resetForm();
        router.push('/');
      }
    },
  })(InnerForm);
  return (
    <>
      <LoginForm />
    </>
  );
}
