'use client';

import { AuthProvider } from '@/types';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { CustomButton } from '@/components';

type Providers = Record<string, AuthProvider>;

const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null);

    useEffect(() => {
        const fetchProviders = async() => {
            const res = await getProviders();

            setProviders(res);
        };

        fetchProviders();
    }, []);

    if(providers) {
        return (
            <div>
                {
                    Object.values(providers).map((provider, i) => (
                        <CustomButton 
                            key={i} 
                            handleClick={() => signIn(provider?.id)}
                            title='Sign In'
                        />
                    ))
                }
            </div>
        );
    }

};

export default AuthProviders;