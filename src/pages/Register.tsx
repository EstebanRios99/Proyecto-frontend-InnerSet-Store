import {IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonInput} from '@ionic/react';
import React, { useState } from 'react';
import { Link, Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import {arrowBack} from 'ionicons/icons';
import Login from './Login';

const Register: React.FC = () => {

  
  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [home, setHome] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [pswd, setPswd] = useState<string>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header" color="primary">
        <IonTitle className="title"><Link to="/login"><IonIcon className="back" icon={arrowBack} slot="start"></IonIcon></Link>Registro de cliente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonItem className="ion-item1">
            <IonInput type="text" value={name} placeholder="Nombre" onIonChange={e => setName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem className="ion-item1">
            <IonInput type="text" value={lastName} placeholder="Apellido" onIonChange={e => setLastName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem className="ion-item1">
            <IonInput type="number" value={home} placeholder="Número de casa" onIonChange={e => setHome(e.detail.value!)}></IonInput>
          </IonItem>
        <IonItem className="ion-item1">
            <IonInput type="email" value={email} placeholder="Ingrese su correo" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem className="ion-item1">
            <IonInput type="password" value={pswd} placeholder="Contraseña" onIonChange={e => setPswd(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton className="ion-item-button" color="primary">Registrarse</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Register;