'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { useTranslations } from 'next-intl';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import request from 'graphql-request';
import { LOGIN_MUTATION } from '@/shared/graphql/authentication';
import commonQueryClient from '@/shared/getQueryClient';
import { queryKeys } from '@/shared/constant';
import { useRouter } from 'next/navigation';
import { AuthType } from '@/types/AuthType';

export default function Login() {
  const t = useTranslations('Login');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const onLogin = async () => {
    const variables = { username, password };
    try {
      const data = await request<AuthType>(
        process.env.NEXT_PUBLIC_API_ADDRESS!,
        LOGIN_MUTATION,
        variables
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
      
    } catch (error) {
      setHasError(true);
      console.error(error);
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <Input
          label={t('username')}
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          label={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {hasError&&<span className={styles.error}>Username/password is not correct</span>}
        <Button className={styles.loginBtn} onClick={onLogin}>
          {t('caption')}
        </Button>
      </div>
    </div>
  );
}
