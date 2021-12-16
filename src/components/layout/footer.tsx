import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className='py-7 bg-gray-50 '>
      <div className='flex flex-col flex-wrap justify-between px-4 mt-4 md:flex-row lg:px-20 md:px-10 '>
        <div className='w-80'>
          <h2 className='text-2xl text-mine font-heading'>ABOUT THE SHOP</h2>
          <p className='my-4 text-sm font-heading'>
            All of our products are derived from our own premium, indoor-grown
            hemp flowers. They are not psychoactive and contain less than 0.3%
            Δ9-THC.
          </p>
          <p className='my-4 text-sm font-heading'>
            These statements have not been evaluated by the Food and Drug
            Administration. Our products are not intended to diagnose, treat,
            cure, or prevent any disease.
          </p>
          <p className='my-4 text-sm font-heading'>
            Davie, FL 33324 <br /> Hemp Permit Number: 2021-R-1888040 <br />{' '}
            Food Entity Number: 394676
          </p>
        </div>
        <div className='mt-4 w-52 md:mt-0'>
          <h2 className='text-2xl text-mine font-heading'>SHOP</h2>
          <div className='flex flex-wrap justify-between my-4'>
            <Link href='#'>
              <a className='block mb-4 text-sm hover:underline'>CBD Flower</a>
            </Link>
            <Link href='#'>
              <a className='block mb-4 text-sm hover:underline'>Best Sellers</a>
            </Link>
            <Link href='#'>
              <a className='block mb-4 text-sm hover:underline'>
                CBD Pre-Rolls
              </a>
            </Link>
            <Link href='#'>
              <a className='block mb-4 text-sm hover:underline'>CBD Flower</a>
            </Link>
            <Link href='#'>
              <a className='block mb-4 text-sm hover:underline'>CBD Flower</a>
            </Link>
            <Link href='#'>
              <a className='block mb-4 text-sm hover:underline'>CBD Flower</a>
            </Link>
            <Link href='#'>
              <a className='block mb-4 text-sm hover:underline'>CBD Flower</a>
            </Link>
          </div>
        </div>
        <div className='w-full mt-4 xl:w-80 xl:mt-0'>
          <div className='w-80'>
            <h2 className='text-2xl text-mine font-heading'>KNOWLEDGE HUB</h2>
            <div className='flex justify-between my-4'>
              <div>
                <Link href='#'>
                  <a className='block mb-4 text-sm hover:underline'>Blog</a>
                </Link>
                <Link href='#'>
                  <a className='block mb-4 text-sm hover:underline'>
                    Contact Us
                  </a>
                </Link>
                <Link href='#'>
                  <a className='block mb-4 text-sm hover:underline'>
                    Laboratory Test Results
                  </a>
                </Link>
                <Link href='#'>
                  <a className='block mb-4 text-sm hover:underline'>
                    Terms & Conditions
                  </a>
                </Link>
              </div>
              <div>
                <Link href='#'>
                  <a className='block mb-4 text-sm hover:underline'>
                    Shipping & Returns
                  </a>
                </Link>

                <Link href='#'>
                  <a className='block mb-4 text-sm hover:underline'>
                    Privacy Policy
                  </a>
                </Link>

                <Link href='#'>
                  <a className='block mb-4 text-sm hover:underline'>
                    Disclaimer
                  </a>
                </Link>

                <Link href='#'>
                  <a className='block mb-4 text-sm hover:underline'>
                    Wholesale CBD FAQs
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className='my-4 text-sm text-center font-heading'>
        © 2021 No Cap Hemp Co. All rights reserved.
      </p>
    </div>
  );
}
