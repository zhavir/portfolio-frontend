'use client';
import React, { useState } from 'react';
import NavLink from './Navlink';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import MenuOverlay from './MenuOverlay';
import Logo from './Logo';
import { navLinks } from '../lib/constants';
import { motion } from 'framer-motion';

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <motion.nav
      initial={false}
      animate={navbarOpen ? 'open' : 'closed'}
      className="fixed top-0 left-0 right-0 z-10 bg-secondaryBackgroud bg-opacity-100"
    >
      <motion.div className="flex flex-wrap items-center justify-between mx-auto px-10 py-1 pr-10 pb-1 border border-b-primaryBorder border-l-transparent border-r-transparent border-t-transparent">
        <Logo />
        <motion.div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <motion.button
              whileTap={{ scale: 1.5 }}
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 boeder rounded border-slate-200 text-slate-200 hover:text-primaryText hover: border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 1.5 }}
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 boeder rounded border-slate-200 text-slate-200 hover:text-primaryText hover: border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </motion.button>
          )}
        </motion.div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </motion.nav>
  );
}

export default Navbar;
