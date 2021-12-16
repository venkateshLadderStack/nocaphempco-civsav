import React, { Fragment } from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({
  children,
  menu,
}: {
  children: React.ReactNode;
  menu?: any;
}) {
  return (
    <Fragment>
      <Navbar menu={menu} />
      <main className='pt-18 lg:pt-36'>{children}</main>
      <Footer />
    </Fragment>
  );
}
