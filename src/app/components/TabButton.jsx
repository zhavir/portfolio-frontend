import { motion } from 'framer-motion';
import React from 'react';

const variants = {
  default: { width: 0 },
  active: { width: 'calc(100% - 0.75rem)' },
};

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? 'text-white' : 'text-secondaryText';

  return (
    <button onMouseEnter={selectTab}>
      <p
        className={`mr-3 font-semibold hover:text-primaryText ${buttonClasses}`}
      >
        {children}
      </p>
      <motion.div
        animate={active ? 'active' : 'default'}
        variants={variants}
        className="h-1 bg-primary-500 mt-2 mr-3"
      ></motion.div>
    </button>
  );
};

export default TabButton;
