import React, { useState } from 'react';

interface NavItemProps {
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, disabled, children }) => {
  const baseClasses = "text-center flex justify-center items-center font-bold cursor-pointer px-4 py-2 w-26 h-12 rounded-full";
  const enabledClasses = "bg-[#0B9D8E] text-white hover:bg-[#0a8c7f]";
  const disabledClasses = "bg-[#F2F4F7] text-[#475467] cursor-not-allowed";

  return (
    <a 
      href={href}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
    >
      {children}
    </a>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-10 left-0 right-0 flex items-center p-2 bg-white shadow-md rounded-full z-50 mx-6">
      <div className="flex items-center flex-1">
        <img src="/yego_logo.png" alt="Vehicle Tracker Logo" className="h-12 w-auto mr-4" />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-3">
          <NavItem href="#map">Map</NavItem>
          <NavItem href="#settings" disabled>Settings</NavItem>
        </div>
      </div>
      
      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
          <img src="/menu.png" alt="Menu" className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu Items (Hidden by default) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-md rounded-lg p-4 md:hidden">
          <NavItem href="#map">Map</NavItem>
          <div className="my-2"></div>
          <NavItem href="#settings" disabled>Settings</NavItem>
        </div>
      )}
    </nav>
  );
};

export default Navbar;