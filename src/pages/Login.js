import React from 'react';
import { useAuth } from '../providers/Auth';
import {  Form, Input, message } from 'antd';
import { LockOutlined, EyeTwoTone, EyeInvisibleOutlined, MailOutlined } from '@ant-design/icons/lib';
import API from '../data';
import withoutAuth from '../hocs/withoutAuth';
import Cookies from 'js-cookie';
import { translateMessage } from '../utils/translateMessage';
import ErrorList from '../components/ErrorList';
import '../theme/variables.css';
import '../theme/login.css';
import {IonHeader, IonImg, IonPage, IonTitle, IonToolbar,IonButton, IonRow, IonCol, IonGrid} from '@ionic/react';
import '../theme/toolbar.css';
import {Link} from "react-router-dom";
import Routes from "../constants/routes";
import logo from '../images/logo-inner.PNG';
import '../theme/login.css';


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
        <IonToolbar id={"toolbar"}>
          <IonTitle id={"letter"}>
            InnerSet Store
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <br />
          <IonImg src={logo} style={{width:"150px", height:"150px", display:"block", margin:"auto"}}/>
      <br />
                    
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
                        message: 'Ingrese su correo registrado'
                    },
                    {
                        type: 'email',
                        message: 'Ingrese un correo válido'
                    }
                ] }
            >

                <Input prefix={ <MailOutlined className='site-form-item-icon' /> }
                        placeholder='Correo'
                        autoComplete='email'/>
            </Form.Item>

            <Form.Item
                name='password'
                rules={ [
                    {
                        required: true,
                        message: 'Ingrese su contraseña'
                    }
                ] }
            >
                <Input.Password
                    prefix={ <LockOutlined className='site-form-item-icon' /> }
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    placeholder='Contraseña' autoComplete='password'
                />
            </Form.Item>

            <Form.Item>
            <div align="center">¿Aún no tienes cuenta con nosotros? </div>
            <IonGrid>
              <IonRow>
                <IonCol> 
                  <Link to={ Routes.REGISTER }><IonButton id="button-register">Regístrate</IonButton></Link>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton type='primary' htmlType='submit' className='login-form-button' id="button-login">
                      Ingresar
                  </IonButton>
                </IonCol>
              </IonRow>
              </IonGrid>
            </Form.Item>
        </Form>
    </IonPage>
      
    </>
  );
};

export default withoutAuth( Login );
