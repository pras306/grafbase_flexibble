import React from 'react';

import { getUserProjects } from '@/lib/actions';
import { UserPageProps, UserProfile } from '@/types';
import { ProfilePage } from '@/components';

const UserProfile = async({ params }: UserPageProps) => {
    const result = await getUserProjects(params.id, 100) as { user: UserProfile };

    if(!result?.user) {
        return <p className='no-result-text'>Failed to fetch user info</p>
    }

    return (
        <ProfilePage user={result?.user} />
    );
};

export default UserProfile;