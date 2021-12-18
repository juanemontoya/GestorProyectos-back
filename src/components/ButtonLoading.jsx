import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading = ({ disabled, loading, text, onClick=()=>{} }) => {
  return (
    <button
      onClick ={onClick}
      disabled={disabled}
      type='submit'
      className='sidebar-col text-white font-bold text-lg py-1 px-5  rounded-xl hover:bg-indigo-200 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'
    >
      {loading ? <ReactLoading type='spin' height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;
