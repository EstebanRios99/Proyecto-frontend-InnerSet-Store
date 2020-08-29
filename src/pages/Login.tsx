import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton } from '@ionic/react';
import React from 'react';
//import { useParams } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import {home} from 'ionicons/icons';


const Login: React.FC = () => {

  const [text, setText] = React.useState<string>();
  const [text1, setText1] = React.useState<string>();
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={"header"} color="orange">
          <IonTitle className={"titulo"}>InnerSet Store</IonTitle>
        </IonToolbar>      
      </IonHeader>
      <IonContent >
        <IonIcon className={"icono"} icon={home} />
      </IonContent>
      <IonContent className={"contenedor"}>
          <IonItem className={"contenedor-item"}>
            <IonInput type="email" value={text} placeholder="Ingrese su correo" onIonChange={e => setText(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem className={"contenedor-item"}>
            <IonInput type="password" value={text1} placeholder="Ingrese su contraseña" onIonChange={e => setText1(e.detail.value!)}></IonInput>
          </IonItem>
            <IonButton className={"button"} color="orange">Ingresar</IonButton>
      </IonContent>
      
    </IonPage>
  );
};

export default Login;
