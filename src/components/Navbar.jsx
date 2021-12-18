import React from 'react';
import { useUser } from 'context/userContext';

const Navbar = () => {
    const { userData } = useUser();

    return (
      <div className='flex hidden md:flex justify-end sidebar-col p-3 text-white'>
             <span>Bienvenido {userData.nombre}</span>
       </div>
    );
  };
  
  export default Navbar;