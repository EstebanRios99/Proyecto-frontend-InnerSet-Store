import React from 'react';
import Routes from '../constants/routes';
import API from '../data/index';
import { Form, Input,message} from 'antd';
import {
    LockOutlined,
    UserOutlined,
    MailOutlined,
} from '@ant-design/icons';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';
import withoutAuth from '../hocs/withoutAuth';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import {useAuth} from '../providers/Auth';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons/lib';
import {IonButton, IonCol, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar} from "@ionic/react";
import NumberOutlined from "@ant-design/icons/lib/icons/NumberOutlined";
import {arrowBack} from "ionicons/icons";
import logo from '../images/logo-inner.PNG';
import "../theme/toolbar.css";
import '../theme/register.css';


const RegisterUser = () => {

    const {setAuthenticated, setCurrentUser} = useAuth();
    const role = 'ROLE_CLIENT';

    const onFinish = async (userData) => {
        console.log('Received values of form: ', userData);
        const {name, email, home_number, password, password_confirmation} = userData;

        try {
            const user = await API.post('/register', {
                name,
                email,
                home_number,
                password,
                password_confirmation,
                role
            });

            console.log('User', user);

            localStorage.setItem('login', JSON.stringify(true)); // this is to sync auth state in local storage
            Cookies.set('token', user.data.token, {expires: 1});
            API.headers['Authorization'] = 'Bearer ' + user.data.token; // start sending authorization header
            delete user.data.token;
            setCurrentUser(user.data);
            setAuthenticated(true);
        } catch (e) {
            console.error('No se pudo registrar el usuario', e);
            setAuthenticated(false);
            const errorList = e.error && <ErrorList errors={e.error}/>;
            message.error(<>{translateMessage(e.message)}{errorList}</>);
        }
    };

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar id={"toolbar"}>
                       <IonTitle className="iontitle" id={"letter"}>
                           <IonRow>
                               <IonCol size={2}>
                                   <Link to={ Routes.LOGIN}>
                                        <IonIcon id={"icon"} icon={arrowBack} slot="start" style={{width:"23px", height:"23px"}} className="ionicon" />
                                    </Link>
                               </IonCol>
                               <IonCol size={2}>
                                    Registro
                               </IonCol>
                           </IonRow>
                       </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <br></br>
                <IonImg src={logo} style={{width:"100px", height:"100px", display:"block", margin:"auto"}}/>
                <br></br>
                    <Form name='register-form'
                          className='register-form'
                          initialValues={{
                              email: '',
                              password: ''
                          }}
                          onFinish={onFinish}
                    >
                        <Form.Item name='name'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingrese su nombre'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<UserOutlined/>} placeholder='Nombre Completo'/>
                        </Form.Item>
                        <Form.Item name='home_number'
                                   rules={[
                                       {
                                            required: true,
                                            message: 'Ingrese su número de casa (1-60)',
                                       }
                                   ]}
                                   
                        >
                            
                            <Input prefix={<NumberOutlined/>} type="number" min="1" max="60" placeholder='Número de Casa'/>
                            
                        </Form.Item>
                        <Form.Item name='email'
                                   rules={[
                                       {
                                            required: true,
                                            message: 'Ingrese su correo'
                                       },
                                       {
                                            type: 'email',
                                            message: 'Ingrese un correo válido'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<MailOutlined/>} placeholder='Correo'/>
                        </Form.Item>

                        <Form.Item name='password'
                                   rules={[
                                        {
                                            required: true,
                                            message: 'Ingrese su contraseña',
                                        },
                                        {
                                            min: 6,
                                            message: 'Ingrese mínimo 6 caracteres',
                                        }
                                   ]}
                                   hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                            placeholder='Contraseña'/>
                        </Form.Item>

                        <Form.Item name='password_confirmation'
                                   dependencies={['password']}
                                   hasFeedback
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Confirme su contraseña',
                                       },
                                       ({getFieldValue}) => ({
                                           validator(rule, value) {
                                               if (!value || getFieldValue('password') === value) {
                                                   return Promise.resolve();
                                               }
                                               return Promise.reject('Las contraseñas no coinciden');
                                           },
                                       }),
                                   ]}
                        >
                            <Input.Password prefix={<LockOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                            placeholder='Confirma tu contraseña'/>
                        </Form.Item>

                        <Form.Item>
                            <IonButton id="button-register" type='primary' htmlType='submit' className='login-form-button'>
                                Registrar
                            </IonButton>
                        </Form.Item>
                    </Form>
           </IonPage>
        </>
    );
};

export default withoutAuth(RegisterUser);

