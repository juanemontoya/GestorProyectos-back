import React from 'react';
import PrivateRoute from 'components/PrivateRoute';

const Index = () => {
  return (
    <PrivateRoute roleList={['ADMINISTRADOR','LIDER', 'ESTUDIANTE']}>
    
    <div className='flex flex-col items-center justify-center mt-28'>
      <h2 className =' text-3xl font-bold'>DASHBOARD</h2>
    
        <div className='flex flex-col mt-6 p-2' >
            <div className='grid grid-cols-2 gap-12'>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='fas fa-cogs fa-lg text-white' />
                <div className='flex flex-col items-center p-1 text-white'>
                <span>XXX</span>
                <span>TOTAL PROYECTOS</span>
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='far fa-edit fa-lg text-white'/>
                <div className='flex flex-col items-center p-1 text-white'>
                <span>XXX</span>
                <span>TOTAL INSCRITOS</span>
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='fas fa-cogs fa-lg text-white'/>
                <div className='flex flex-col items-center p-1 text-white'>
                <span>XXX</span>
                <span>PROYECTOS ACTIVO</span>
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='fas fa-cogs fa-lg text-white'/>
                <div className='flex flex-col items-center p-1 text-white'>
                <span>XXX</span>
                <span>PROYECTOS INICIADOS</span>
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='fas fa-cogs fa-lg text-white'/>
                <div className='flex flex-col items-center p-1 text-white'>
                <span>XXX</span>
                <span>PROYECTOS EN DESARROLLO</span>
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='fas fa-cogs fa-lg text-white'/>
                <div className='flex flex-col items-center p-1 text-white'>
                <span>XXX</span>
                <span>PROYECTOS TERMINADOS</span>
                </div>
            </div>
            </div>           
        </div>   
    </div>
    </PrivateRoute>
  );
};

export default Index;
