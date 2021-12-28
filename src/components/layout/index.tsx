import React, { Fragment } from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  menu?: any;
}) {
  return (
    <Fragment>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
