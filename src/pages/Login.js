import React from 'react';
import {home} from 'ionicons/icons';
import { useAuth } from '../providers/Auth';
import {  Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined, MailOutlined } from '@ant-design/icons/lib';
import API from '../data';
import withoutAuth from '../hocs/withoutAuth';
import Cookies from 'js-cookie';
import { translateMessage } from '../utils/translateMessage';
import '../styles/login.css';
import ErrorList from '../components/ErrorList';
import '../theme/variables.css';
import {IonHeader, IonIcon, IonPage, IonTitle, IonToolbar,IonButton} from '@ionic/react';
import {Link} from "react-router-dom";
import Routes from "../constants/routes";

const Login = () => {

  const { setAuthenticated, setCurrentUser } = useAuth();

  const onFinish = async( userData ) => {

    try {
      const response = await API.post( '/login', {
        email: userData.username,
        password: userData.password
      } );
      console.log( 'response login', response );
      

      localStorage.setItem( 'login', JSON.stringify( true ) ); // this is to sync auth state in local storage
      Cookies.set( 'token', response.data.token, { expires: 1 } );
      API.headers[ 'Authorization' ] = 'Bearer ' + response.data.token; // start sending authorization header
      setCurrentUser( response.data.user );
      setAuthenticated( true );
    } catch( e ) {
      console.error( 'No se pudo iniciar sesión', e.message );
      setAuthenticated( false );
      const errorList = e.error && <ErrorList errors={ e.error } />;
      message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
    }
  };

  return (
    <>
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonTitle>
            InnerSet Store
          </IonTitle>
        </IonToolbar>
      </IonHeader>

          <IonIcon icon={home} style={{width:"100px", height:"100px"}} ></IonIcon>
          <Form
            name='login-form'
            className='login-form'
            initialValues={ {
                remember: true,
                username: '',
                password: ''
            } }
            onFinish={ onFinish }
        >
            <Form.Item
                name='username'
                rules={ [
                    {
                        required: true,
                        message: 'Ingresa tu nombre de usuario'
                    },
                    {
                        type: 'email',
                        message: 'Ingresa un correo válido'
                    }
                ] }
            >

                <Input prefix={ <MailOutlined className='site-form-item-icon' /> }
                        placeholder='Email'
                        autoComplete='email'/>
            </Form.Item>

            <Form.Item
                name='password'
                rules={ [
                    {
                        required: true,
                        message: 'Ingresa tu clave'
                    }
                ] }
            >
                <Input.Password
                    prefix={ <LockOutlined className='site-form-item-icon' /> }
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    placeholder='Password' autoComplete='password'
                />
            </Form.Item>

              <div>¿Aun no tienes cuenta con nosotros?, <Link to={ Routes.REGISTER }>registrate</Link></div>

            <Form.Item>
                <IonButton type='primary' htmlType='submit' className='login-form-button'>
                    Ingresar
                </IonButton>
            </Form.Item>
        </Form>
    </IonPage>
      
    </>
  );
};

export default withoutAuth( Login );