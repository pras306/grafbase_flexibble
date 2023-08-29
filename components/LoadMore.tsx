'use client';

import { useRouter } from 'next/navigation';

import { LoadMoreProps } from '@/types';
import { CustomButton } from '@/components';

const LoadMore = ({ startCursor, endCursor, hasPreviousPage, hasNextPage }: LoadMoreProps) => {
    const router = useRouter();

    const handleNavigation = (direction: string) => {
        const currentParams = new URLSearchParams(window.location.search);

        if(direction === 'next' && hasNextPage) {
            currentParams.delete('startCursor');
            currentParams.set('endcursor', endCursor);
        } else if(direction === 'first' && hasPreviousPage) {
            currentParams.delete('endCursor');
            currentParams.set('startCursor', startCursor);
        }

        const newSearchParams = currentParams.toString();
        const newPathName = `${window.location.pathname}?${newSearchParams}`;

        router.push(newPathName);
    };

    return (
        <div className='w-full flexCenter gap-5 mt-10'>
            {hasPreviousPage && (
                <CustomButton 
                    title='First Page'
                    handleClick={() => handleNavigation('first')}
                />
            )}
            {hasNextPage && (
                <CustomButton 
                    title='Next'
                    handleClick={() => handleNavigation('next')}
                />
            )}
        </div>
    );
};

export default LoadMore;