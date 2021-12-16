import React, { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdShoppingCart, MdOutlineClose } from 'react-icons/md';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import CartItem from './cartItem';
import Logo from '@/assets/images/logo.png';
import Button from '@/components/global/button';

interface Props {
  menu?: any;
}

export default function Navbar({ menu }: Props) {
  const [uniqueMenu] = useState<any>([
    ...menu.filter(
      ({ node }: { node: any }) =>
        node.label === 'Delta 8 THC' || node.label === 'CBD Products'
    ),
  ]);
  const [stickyClass, setStickyClass] = useState('');
  const openSide = () => {
    document.getElementById('side-bar')!.style.transform = 'translateX(0px)';
  };
  const clsoeSide = () => {
    document.getElementById('side-bar')!.style.transform = 'translateX(-700px)';
  };
  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      if (windowHeight > 0) {
        setStickyClass('shadow shadow-md');
        document.getElementById('logo')!.style.height = '70px';
        document.getElementById('logo')!.style.width = '180px';
      } else {
        setStickyClass('');
        document.getElementById('logo')!.style.height = '100px';
        document.getElementById('logo')!.style.width = '250px';
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);
  return (
    <div
      className={`px-4 py-3 fixed z-50 bg-white top-0 left-0 right-0 ${stickyClass}`}
    >
      <div className='relative'>
        <div className='flex items-center justify-between w-full'>
          <div className='block lg:hidden'>
            <HiOutlineMenuAlt1 size={32} onClick={openSide} />
          </div>
          <div className='relative block mx-auto lg:hidden'>
            <Link href='/'>
              <a>
                <Image src={Logo} alt='nocaphemp' height={70} width={150} />
              </a>
            </Link>
          </div>

          <div className='relative hidden lg:block' id='logo'>
            <Link href={'/'}>
              <a>
                <Image
                  src={Logo}
                  alt='nocaphemp'
                  layout='fill'
                  objectFit='contain'
                />
              </a>
            </Link>
          </div>
          <div className='flex'>
            <div className='hidden space-x-6 lg:flex' id='side-bar'>
              <div className='absolute block lg:hidden right-8 top-4'>
                <MdOutlineClose size={30} onClick={clsoeSide} />
              </div>
              <ul id='menu' className='mt-[2px]'>
                <li className='parent'>
                  <Link href='/'>
                    <a className='font-roboto top'>Home</a>
                  </Link>
                </li>
                {uniqueMenu.map(({ node }: { node: any }) => (
                  <li className='parent' key={node.label}>
                    <Link href={node.path} as={node.path}>
                      <a className='font-roboto top'>{node.label}</a>
                    </Link>
                    {node.childItems.edges.length && (
                      <ul className='child'>
                        {node.childItems.edges.map(
                          (childItem: any, index: number) => (
                            <li className='parent' key={index}>
                              <Link
                                href={childItem.node.path}
                                as={childItem.node.path}
                              >
                                <a>
                                  {childItem.node.label}
                                  {childItem.node.childItems.edges.length >
                                    0 && (
                                    <span className='expand'>&nbsp;»</span>
                                  )}
                                </a>
                              </Link>
                              {childItem.node.childItems.edges.length > 0 && (
                                <ul className='child'>
                                  {childItem.node.childItems.edges.map(
                                    (grandChildItem: any) => (
                                      <li key={grandChildItem.node.label}>
                                        <Link
                                          href={grandChildItem.node.path}
                                          as={grandChildItem.node.path}
                                        >
                                          <a>{grandChildItem.node.label}</a>
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </li>
                ))}
                <li className='parent'>
                  <Link href='/'>
                    <a className='font-roboto top'>Certificatess of Analysis</a>
                  </Link>
                </li>
                <li className='parent'>
                  <Link href='/wholesale-catalog/wholesale-delta-8-products'>
                    <a className='font-roboto top'>
                      Wholesale Delta 8 Products
                    </a>
                  </Link>
                </li>
                <li className='parent'>
                  <Link href='/blog'>
                    <a className='text-sm font-roboto top'>Blog</a>
                  </Link>
                </li>
                <li className='parent'>
                  <Link href='/checkout'>
                    <a className='text-sm font-roboto top'>Checkout</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='flex cursor-pointer c-cart group ml-1'>
              <Link href='/cart'>
                <a className='relative'>
                  <MdShoppingCart size={35} />
                  <div className='absolute -right-1 p-[3px] bg-white rounded-full -top-2'>
                    <div className='flex items-center justify-center w-4 h-4 text-xs font-normal text-white rounded-full bg-primary font-roboto'>
                      0
                    </div>
                  </div>
                </a>
              </Link>
              {/* Hover cart */}
              <div className='popup-cart-transition invisible shadow-cart-popup lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:visible absolute z-[1000] right-[10px] top-[75px] rounded bg-white opacity-0 py-3 before:absolute before:border-transparent before:border-solid before:border-b-white before:border-[11px] before:ml-[-10px] before:top-[-21px] before:right-[5px] before:z-10 before:content-end transform translate-y-13'>
                {[1, 2, 3].map((item, index) => (
                  <Fragment key={item}>
                    <CartItem isBackground={index % 2 === 0 ? false : true} />
                  </Fragment>
                ))}

                <p className='p-3 my-2 text-white bg-gray-400 font-heading'>
                  <b>Subtotal:</b> $100.08
                </p>

                <div className='flex justify-center space-x-3'>
                  <Button type='button' title='View cart' size='small' />
                  <Button type='button' title='Checkout' size='small' />
                </div>
              </div>
            </div>
          </div>

          {/* <div className='flex items-center pr-2 space-x-6'>
            <div className='hidden space-x-6 lg:block'>
              <Link href='/blog'>
                <a className='text-sm font-normal font-roboto hover:text-primary hover:font-bold'>
                  Blog
                </a>
              </Link>
              <Link href='/checkout'>
                <a className='text-sm font-normal font-roboto hover:text-primary hover:font-bold'>
                  Checkout
                </a>
              </Link>
            </div>
            <div className='flex cursor-pointer c-cart group'>
              <Link href='/cart'>
                <a className='relative'>
                  <MdShoppingCart size={35} />
                  <div className='absolute -right-1 p-[3px] bg-white rounded-full -top-2'>
                    <div className='flex items-center justify-center w-4 h-4 text-xs font-normal text-white rounded-full bg-primary font-roboto'>
                      0
                    </div>
                  </div>
                </a>
              </Link>
            
              <div className='popup-cart-transition invisible shadow-cart-popup lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:visible absolute z-[1000] right-[10px] top-[75px] rounded bg-white opacity-0 py-3 before:absolute before:border-transparent before:border-solid before:border-b-white before:border-[11px] before:ml-[-10px] before:top-[-21px] before:right-[5px] before:z-10 before:content-end transform translate-y-13'>
                {[1, 2, 3].map((item, index) => (
                  <Fragment key={item}>
                    <CartItem isBackground={index % 2 === 0 ? false : true} />
                  </Fragment>
                ))}

                <p className='p-3 my-2 text-white bg-gray-400 font-heading'>
                  <b>Subtotal:</b> $100.08
                </p>

                <div className='flex justify-center space-x-3'>
                  <Button type='button' title='View cart' size='small' />
                  <Button type='button' title='Checkout' size='small' />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
