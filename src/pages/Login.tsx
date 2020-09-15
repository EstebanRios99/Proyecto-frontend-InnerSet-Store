import {
    IonIcon,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonInput,
    IonText
} from '@ionic/react';
import React, {useState} from 'react';
import '../css/Login.css';
import {Link} from 'react-router-dom';
import {home, keyOutline, mailOutline} from 'ionicons/icons';
import withoutAuth from '../hocs/withoutAuth';
import {message} from "antd";
import API from '../data';
import {translateMessage} from '../utils/translateMessage';
import {useAuth} from '../providers/Auth';
import ErrorList from '../components/ErrorList';
import Cookies from 'js-cookie';


const Login: React.FC = () => {

    const [email, setEmail] = useState<string>();
    const [pswd, setPswd] = useState<string>();
    // @ts-ignore
    const {setAuthenticated, setCurrentUser} = useAuth();

    const onFinish = async () => {

        try {
            const response = await API.post('/login', {
                email: email,
                password: pswd,
            });
            console.log('response login', response);
            localStorage.setItem('login', JSON.stringify(true)); // this is to sync auth state in local storage
            Cookies.set('token', response.data.token, {expires: 1});
            API.headers['Authorization'] = 'Bearer ' + response.data.token; // start sending authorization header
            setCurrentUser(response.data.user);
            setAuthenticated(true);
        } catch (e) {
            console.error('No se pudo iniciar sesión', e.message);
            setAuthenticated(false);
            const errorList = e.error && <ErrorList errors={e.error}/>;
            message.error(<>{translateMessage(e.message)}{errorList}</>);
        }
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="header" color="primary">
                    <IonTitle>InnerSet Store</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="icon">
                    <IonIcon className="icon-item" icon={home}></IonIcon>
                </div>
                <form name="test-form" onSubmit={onFinish}>
                    <IonItem className="ion-item">
                        <IonInput required type="email" value={email} placeholder="Ingrese su correo"
                                  onIonChange={e => setEmail(e.detail.value!)}>
                            <IonIcon className="back" icon={mailOutline} slot="start"/>
                        </IonInput>
                    </IonItem>
                    <IonItem className="ion-item">
                        <IonInput required type="password" value={pswd} placeholder="Contraseña"
                                  onIonChange={e => setPswd(e.detail.value!)}>
                            <IonIcon className="back" icon={keyOutline} slot="start"/>
                        </IonInput>
                    </IonItem>
                    <Link to={"/productos"}><IonButton className="ion-item-button" color="primary">Ingresar</IonButton></Link>
                    <IonItem className="ion-item-text">
                        <IonText color="dark">
                            Aun no tienes cuenta, <br/>
                            <Link to="/registro"><IonText color="dark">Regístrate</IonText></Link>
                        </IonText>
                    </IonItem>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default withoutAuth(Login);
