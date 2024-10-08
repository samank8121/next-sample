'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { useTranslations } from 'next-intl';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import request from 'graphql-request';
import { SIGNUP_MUTATION } from '@/shared/graphql/authentication';
import commonQueryClient from '@/shared/getQueryClient';
import { queryKeys } from '@/shared/constant';
import { useRouter } from 'next/navigation';
import { AuthType } from '@/types/AuthType';
import { z } from 'zod';

export default function Signup() {
  const t = useTranslations('Login');
  const tv = useTranslations('Validation');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState<string| undefined>();

  const router = useRouter();  
  const formSchema = z
    .object({
      username: z.string().min(1, tv('required')),
      email: z.string().email(tv('email')),
      password: z.string().min(8, tv('password')),
      confirmation: z
        .string()
        .min(8, tv('password')),
      
    })
    .refine((d) => d.password === d.confirmation, {
      message: tv('rePassword'),
      path: ['confirmation'],
    });
  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    try {
      formSchema.parse({
        username,
        email,
        confirmation,
        password,
      });
      const data = await request<AuthType>(
        process.env.NEXT_PUBLIC_API_ADDRESS!,
        SIGNUP_MUTATION,
        { username, email, password },
      );
      if(data){
        commonQueryClient.setQueryData([queryKeys.userInfo], data);        
        const history = commonQueryClient.getQueryData([queryKeys.historyPage]);
        if (history) {
          router.push(history as string);
        }
        else
        {
          router.push('/');
        }
      }
      
    } catch (error:any) {
      if (error instanceof z.ZodError) {
        console.log(error.errors);
        setError(error.errors[0].message);
      }
      else if (error.response && error.response.errors) {
        const errorMessage = error.response.errors[0].message;
        setError(errorMessage);
      }
      
      console.error(error);
    }
  };
  return (
    <div className={styles.signup}>
      <form className={styles.container} onSubmit={onSignup}>
        <Input
          label={t('username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label={t('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label={t('password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label={t('rePassword')}
          type="password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        />
        {error&&<span className={styles.error}>{error}</span>}
        <Button type="submit" className={styles.loginBtn}>
          {t('signUp')}
        </Button>
      </form>
    </div>
  );
}
