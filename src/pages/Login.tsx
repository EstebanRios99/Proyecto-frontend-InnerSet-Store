import {IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonFooter, IonItem, IonInput, IonText } from '@ionic/react';
import React, { useState } from 'react';
import '../css/Login.css';
import {Redirect, Link, Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import {home} from 'ionicons/icons';
import Register from './Register';



const Login: React.FC = () => {

  const [email, setEmail] = useState<string>();
  const [pswd, setPswd] = useState<string>();
  
  return (
    <Router>
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
        <IonItem className="ion-item">
            <IonInput  type="email" value={email}  placeholder="Ingrese su correo" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem className="ion-item">
            <IonInput type="password" value={pswd} placeholder="Contraseña" onIonChange={e => setPswd(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton className="ion-item-button"  color="primary">Ingresar</IonButton>
          <IonItem className="ion-item-text">
            <IonText color="dark">
              Aun no tienes cuenta, <br/>
              <Link to="/register"><IonText color="dark">Regístrate</IonText></Link>
            </IonText>
          </IonItem>
      </IonContent>
    </IonPage>
    <Switch>
     <Route path="/register"><Register/></Route>
    </Switch>
    </Router> 
  );
};

export default Login;
