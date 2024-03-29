import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ProjectInterface, RelatedProjectsProps, UserProfile } from '@/types';
import { getUserProjects } from '@/lib/actions';

const RelatedProjects = async({ userId, projectId }: RelatedProjectsProps) => {

    const result = await getUserProjects(userId) as { user?: UserProfile };

    const filterProjects = result?.user?.projects?.edges?.filter(({ node }: { node: ProjectInterface }) => (
        node?.id !== projectId
    ));

    if(filterProjects?.length === 0) return null;

    return (
        <section className='flex flex-col mt-32 w-full'>
            <div className='flexBetween'>
                <p className='text-base font-bold'>More by {result?.user?.name}</p>
                <Link href={`/profile/${result?.user?.id}`} className='text-primary-purple text-base'>View All</Link>
            </div>
            <div className='related_projects-grid'>
                {filterProjects?.map(({ node }: { node: ProjectInterface }) => (
                    <div key={node?.id} className='flexCenter related_project-card drop-shadow-card'>
                        <Link href={`/projects/${node?.id}`} className='flexCenter group relative w-full h-full'>
                            <Image src={node?.image} width={414} height={314} alt='Project' className='w-full h-full object-cover rounded-2xl' />
                            <div className='hidden group-hover:flex related_project-card_title'>
                                <p className='w-full'>{node?.title}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RelatedProjects;