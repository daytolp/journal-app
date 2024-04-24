import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth/thunks'; 


const formData = {
  email: 'kioo.lp10@gmail.com',
  password: '1234567',
  displayName: 'fidel ortiz'
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @'],
  password:  [(value) => value.length >= 6, 'El password debe tener más de 6 letras'],
  displayName:  [(value) => value.length >= 1, 'El nombre es obligatorio'],
 }

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const {state, errorMessage } = useSelector(state => state.auth);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const isCheckingAuthentication = useMemo(() => state === 'checking', [state])

  const { displayName, email, password, onInputChange, formState,
         isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);

 

 const onSubmit = (event) => {
  event.preventDefault();
  setFormSubmitted(true);

  if (!isFormValid) return;
  console.log({email, password, displayName})
  dispatch(startCreatingUserWithEmailAndPassword({email, password, displayName}));
 
 }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}  className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name="displayName"
                value={displayName}
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted}
                helperText="El nombre es obligatorio"
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name="email"
                value={email}
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted}
                helperText="El nombre es obligatorio"
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="password"
                value={password}
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText="El nombre es obligatorio"
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } display={ !!errorMessage ? '': 'none' }>
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
              <Grid item xs={ 12 }>
                <Button disabled={ isCheckingAuthentication } type='submit' variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
