import React, { useEffect } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router';

const Login = () =>{
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { form, formData, updateFormData } = useFormData();

    const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] = useMutation(LOGIN);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formData);
        login({variables: formData});  
    };

    useEffect(() => {       
      console.log(dataMutation);       
        if(dataMutation){
          console.log("dataMutation ", dataMutation)  
          if(dataMutation.login.token){
                setToken(dataMutation.login.token);             
                navigate('/');
            }
          if(dataMutation.login.error === 'Contraseña no válida'){
            window.alert("Contraseña no válida");      
          }else if(dataMutation.login.error === 'Usuario no registrado'){
            window.alert("Usuario no registrado");
          }         
        }        
      }, [dataMutation, setToken, navigate]);

  
    return(
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className="border-2 border-black rounded-2xl -mt-24 p-10">
      <h1 className='text-3xl font-bold text-gray-900 my-4 ml-2'>Inicio de Sesión</h1>
      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <Input name='correo' type='email' label='Correo Electrónico' required={true} />
        <Input name='password' type='password' label='Contraseña' required={true} />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Iniciar Sesión'
        />
      </form>
      <span>¿No tienes una cuenta?</span>
      <Link to='/auth/register'>
        <span className='text-blue-700'> Regístrate</span>
      </Link>
      </div>
    </div>
    );
};

export default Login