import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';

const SidebarLinks = () => {
  return (
    <ul className='mt-8'>
      <SidebarRoute to='' title='Inicio' icon='fas fa-home fa-lg' />
      <PrivateComponent roleList={['LIDER', 'ESTUDIANTE']}>
      <SidebarRoute to='/inscripciones' title='Inscripciones' icon='far fa-edit fa-lg' />
      </PrivateComponent>
      <SidebarRoute to='/proyectos' title='Proyectos' icon='fas fa-cogs fa-lg' />
      <PrivateComponent roleList={['ESTUDIANTE', 'LIDER']}>
      <SidebarRoute to='/avances' title='Avances' icon='far fa-copy fa-lg' />
      </PrivateComponent> 
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>      
      <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-user fa-lg' />
      </PrivateComponent>      
      <SidebarRoute to='/perfil' title='Perfil' icon='far fa-user-circle fa-lg' />
       <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log('Eliminar token');
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()} className="mt-12">
      <NavLink to='/auth/login' className='sidebar-route'>
        <div className='flex items-center text-white'>
          <i className='fas fa-sign-out-alt fa-lg' />
          <span className='text-sm  ml-2'>Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src='logo.png' alt='Logo' className= "w-96"/>      
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8 h-full sidebar-col'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between sidebar-col p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <NavLink to=''>
        <i className='fas fa-home' />
        </NavLink>
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8 h-full sidebar-col'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li >
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white shadow-col'
            : 'sidebar-route text-white hover:text-black hover:bg-pink-50'
        }
      >
        <div className='flex items-center' >
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
