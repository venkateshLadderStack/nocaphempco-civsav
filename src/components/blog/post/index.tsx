import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string;
}

export default function BlogPost({ title, slug, thumbnail, excerpt }: Props) {
  return (
    <div>
      <div>
        <Link href='/[blog]' as={slug}>
          <a>
            <Image src={thumbnail} alt='' width='1200' height='800' />
          </a>
        </Link>
      </div>
      <div className='mt-3 mb-2'>
        <Link href='/[blog]' as={slug}>
          <a>
            <h5 className='text-2xl font-medium leading-7 text-primary font-heading'>
              {title}
            </h5>
          </a>
        </Link>
      </div>
      <div
        className='border-b-2 entry-content font-heading border-[#aaa] pb-6 blog-excerpt'
        dangerouslySetInnerHTML={{
          __html: excerpt.replace('nocaphempco.com', 'nocaphempco.vercel.app'),
        }}
      ></div>
    </div>
  );
}
