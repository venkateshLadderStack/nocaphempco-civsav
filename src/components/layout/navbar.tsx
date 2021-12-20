import React, { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdShoppingCart, MdOutlineClose } from 'react-icons/md';
import { HiOutlineMenuAlt1, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { useSiteContext } from '../../context';
import { menu } from '../../constant/menu';
import CartItem from './cartItem';
import Logo from '@/assets/images/logo.png';
import Button from '@/components/global/button';

export default function Navbar() {
  const { cartLength, list, removeItem, total } = useSiteContext();

  const [stickyClass, setStickyClass] = useState('');
  const [activeParent, setActiveParent] = useState(100);
  const [activeChild, setActiveChild] = useState(1000);

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

  const _toggleParent = (index: number) => {
    if (index === activeParent) {
      setActiveParent(100);
      setActiveChild(1000);
    } else {
      setActiveParent(index);
    }
  };

  const _toggleChild = (index: number) => {
    if (index === activeChild) {
      setActiveChild(1000);
    } else {
      setActiveChild(index);
    }
  };
  return (
    <div
      className={`px-4 py-3 fixed z-50 bg-white top-0 left-0 right-0 ${stickyClass}`}
    >
      <div className='relative'>
        <div className='flex items-center justify-between w-full'>
          <div className='block lg:hidden cursor-pointer'>
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
                {menu.map((parent: any, pIndex: number) => (
                  <li className='parent' key={pIndex}>
                    <Link href={parent.path}>
                      <a className='font-roboto top'>{parent.label}</a>
                    </Link>
                    {parent.childItems.length > 0 && (
                      <span
                        className='absolute block px-2 lg:hidden right-4 -top-1'
                        onClick={() => _toggleParent(pIndex)}
                      >
                        {activeParent === pIndex ? (
                          <HiChevronUp size={25} />
                        ) : (
                          <HiChevronDown size={25} />
                        )}
                      </span>
                    )}
                    {parent.childItems.length > 0 && (
                      <ul
                        className='child'
                        style={
                          activeParent === pIndex ? { display: 'block' } : {}
                        }
                      >
                        {parent.childItems.map((child: any, cIndex: number) => (
                          <li className='parent' key={cIndex}>
                            <Link
                              href={child.path === '' ? '#' : child.path}
                              as={child.path}
                            >
                              <a>
                                {child.label}
                                {child.childItems.length > 0 && (
                                  <span className='hidden expand lg:block'>
                                    &nbsp;»
                                  </span>
                                )}
                              </a>
                            </Link>
                            {child.childItems.length > 0 && (
                              <span
                                className='absolute right-0 block px-4 lg:hidden top-1'
                                onClick={() => _toggleChild(cIndex)}
                              >
                                {activeChild === cIndex ? (
                                  <HiChevronUp size={20} />
                                ) : (
                                  <HiChevronDown size={20} />
                                )}
                              </span>
                            )}

                            {child.childItems.length > 0 && (
                              <ul
                                className='child'
                                style={
                                  activeParent === pIndex &&
                                  activeChild === cIndex
                                    ? { display: 'block' }
                                    : {}
                                }
                              >
                                {child.childItems.map((grandChildItem: any) => (
                                  <li key={grandChildItem.label}>
                                    <Link
                                      href={grandChildItem.path}
                                      as={grandChildItem.path}
                                    >
                                      <a>{grandChildItem.label}</a>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex ml-1 cursor-pointer c-cart group'>
            <Link href='/cart'>
              <a className='relative'>
                <MdShoppingCart size={35} />
                <div className='absolute -right-1 p-[3px] bg-white rounded-full -top-2'>
                  <div className='flex items-center justify-center w-4 h-4 text-xs font-normal text-white rounded-full bg-primary font-roboto'>
                    {cartLength}
                  </div>
                </div>
              </a>
            </Link>
            {/* Hover cart */}
            <div className='popup-cart-transition invisible shadow-cart-popup lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:visible absolute z-[1000] right-[10px] top-[70px] rounded bg-white opacity-0 py-3 before:absolute before:border-transparent before:border-solid before:border-b-white before:border-[11px] before:ml-[-10px] before:top-[-21px] before:right-[5px] before:z-10 before:content-end transform translate-y-13'>
              {list.length === 0 ? (
                <p className='font-heading text-base opacity-70 font-bold px-8 py-3 w-96'>
                  No products in the cart
                </p>
              ) : (
                <>
                  {list.map((item: any, index: number) => (
                    <Fragment key={index}>
                      <CartItem
                        isBackground={index % 2 === 0 ? false : true}
                        item={item}
                        removeItem={removeItem}
                      />
                    </Fragment>
                  ))}

                  <p className='p-3 my-2 text-white bg-gray-400 font-heading'>
                    <b>Subtotal:</b> ${total?.toFixed(2)}
                  </p>

                  <div className='flex justify-center space-x-3'>
                    <Button
                      type='internalLink'
                      path='/cart'
                      title='View cart'
                      size='small'
                    />
                    <Button
                      type='internalLink'
                      path='/checkout'
                      title='Checkout'
                      size='small'
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
