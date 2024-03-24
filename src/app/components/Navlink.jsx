import Link from 'next/link';

const NavLink = ({ href, title, handleOnClick }) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-secondaryText sm:text-xl rounded md:p-0 hover:text-primaryText"
      onClick={handleOnClick}
    >
      {title}
    </Link>
  );
};

export default NavLink;
