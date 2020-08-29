import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonRow, IonCol } from '@ionic/react';
import React from 'react';
//import { useParams } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import {arrowBack, arrowBackOutline, home} from 'ionicons/icons';


const Register: React.FC = () => {

  const [name, setName] = React.useState<string>();
  const [lastName, setLastName] = React.useState<string>();
  const [homeNumber, setHomeNumber] = React.useState<number>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={"header"} color="orange">
            <IonRow>
                <IonCol size="0.7">
        <IonIcon className={"icono1"} icon={arrowBackOutline} />
        </IonCol>
        <IonCol >
          <IonTitle className={"titulo"}>Registro de cliente</IonTitle>
          </IonCol>
          </IonRow>
        </IonToolbar>      
      </IonHeader>
      <IonContent className={"contenedor1"}>
      <IonItem className={"contenedor-item1"}>
            <IonInput type="text" value={name} placeholder="Nombre" onIonChange={e => setName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem className={"contenedor-item1"}>
            <IonInput type="text" value={lastName} placeholder="Apellido" onIonChange={e => setLastName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem className={"contenedor-item1"}>
            <IonInput type="text" value={homeNumber} placeholder="Número de casa" onIonChange={e => setHomeNumber(homeNumber)}></IonInput>
          </IonItem>
          <IonItem className={"contenedor-item1"}>
            <IonInput type="email" value={email} placeholder="Correo" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem className={"contenedor-item1"}>
            <IonInput type="password" value={password} placeholder="Contraseña" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
            <IonButton className={"button"} color="orange">Registrarse</IonButton>
      </IonContent>
      
    </IonPage>
  );
};

export default Register;
