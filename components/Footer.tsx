import { footerLinks } from '@/constants';
import { FooterColumnProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FooterColumn = ({ title, links }: FooterColumnProps) => (
    <div className='footer_column'>
        <h4 className='font-semibold'>{title}</h4>
        <ul className='flex flex-col gap-2 font-normal'>
            {links.map((link) => (
                <Link href='/' key={link}>{link}</Link>
            ))}
        </ul>
    </div>
);

const Footer = () => {

    return (
        <footer className='flexStart footer'>
            <div className='flex flex-col gap-12 w-full'>
                <div className='flex items-start flex-col'>
                    <Image 
                        src={'/logo-purple.svg'}
                        width={150}
                        height={38}
                        alt='Flexibble'
                    />
                    <p className='text-start text-sm font-normal mt-5 max-w-xs'>
                        Flexibble is the world's leading community for creatives to share, grow and get hired.
                    </p>
                </div>
                <div className='flex flex-wrap gap-12'>
                    {footerLinks.map((footerLink) => (
                        <FooterColumn title={footerLink.title} links={footerLink.links} />
                    ))}
                </div>
            </div>
            <div className='flexBetween footer_copyright'>
                <p>@ 2023 Flexibble. All rights reserved</p>
                <p className='text-gray'>
                    <span className='text-black font-semibold'>10,214</span> projects submitted.
                </p>
            </div>
        </footer>
    );
};

export default Footer;