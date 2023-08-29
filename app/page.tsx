import React from 'react';

import { fetchAllProjects } from '@/lib/actions';
import { ProjectSearch, ProjectInterface, HomeProps } from '@/types';
import { Categories, LoadMore, ProjectCard } from '@/components';

export const dynamic = 'force-dynamic';
export const dynamicParams = 'true';
export const revalidate = 0;

const Home = async({ searchParams: { category, endCursor } }: HomeProps) => {
    const data = await fetchAllProjects(category, endCursor) as ProjectSearch;

    const projectsToDisplay = data?.projectSearch?.edges || [];

    const pagination = data?.projectSearch?.pageInfo;

    if(projectsToDisplay.length === 0 ){
        return (
            <section className='flexStart flex-col paddings'>
                <Categories />
                <p className='no-result-text text-center'>No Projects found, go create some first</p>
            </section>
        )
    }

    return (
        <section className='flex-start flex-col paddings mb-16'>
            <Categories />
            <section className='projects-grid'>
                {projectsToDisplay.map(({ node }: {node: ProjectInterface}) => (
                    <ProjectCard 
                        key={node?.id}
                        id={node?.id}
                        image={node?.image}
                        title={node?.title}
                        name={node?.createdBy?.name}
                        avatarUrl={node?.createdBy?.avatarUrl}
                        userId={node?.createdBy?.id}
                    />
                ))}
            </section>
            
            <LoadMore 
                startCursor={pagination.startCursor}
                endCursor={pagination.endCursor}
                hasPreviousPage={pagination.hasPreviousPage}
                hasNextPage={pagination.hasNextPage}
            />
        </section>
    );
};

export default Home;