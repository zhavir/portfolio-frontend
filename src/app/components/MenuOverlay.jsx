import React from 'react';
import NavLink from './Navlink';

const MenuOverlay = ({ links, handleOnClick }) => {
  return (
    <ul className="flex flex-col py-4 items-center" id="menu-overlay">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            href={link.path}
            title={link.title}
            handleOnClick={handleOnClick}
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
