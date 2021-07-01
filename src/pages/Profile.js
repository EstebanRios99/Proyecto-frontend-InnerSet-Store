import React from 'react';
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonCardContent,
} from "@ionic/react";
import '../theme/app.css';
import "../theme/toolbar.css";
import Layouts from '../components/Layout';
import user from '../images/avatar.png';
import {useAuth} from '../providers/Auth';

const Profile = () => {
  const {currentUser} = useAuth();
  return    (
    <>
        <IonPage>
            <IonHeader>
                <IonToolbar id={"toolbar"}>
                    <div slot={"start"} className="menu">
                        <Layouts />
                    </div>
                    <IonTitle id={"letter"}>Perfil de Usuario </IonTitle>
                </IonToolbar>
            </IonHeader>
          <IonCard>
          <IonImg  src={user} style={{width:"150px", height:"150px", margin:'auto', display:'block'}}/>
          <IonCardHeader>
            {currentUser.role==='ROLE_ADMIN'
              ?<IonCardTitle>Propietario de la Tienda Víveres Daniela</IonCardTitle>
              :<IonCardTitle>Arrendatario del Conjunto Luluncoto</IonCardTitle>
            }</IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle><p style={{color:"black"}}><strong>Nombre: </strong>{currentUser.name}</p></IonCardSubtitle>
              <IonCardSubtitle><p style={{color:"black"}}><strong>Correo:  </strong>{currentUser.email}</p></IonCardSubtitle>
              {currentUser.role==='ROLE_ADMIN'
              ?""
              :<IonCardSubtitle><p style={{color:"black"}}><strong>Casa:  </strong>{currentUser.home_number}</p></IonCardSubtitle>
            }
            </IonCardContent>       
        </IonCard>
        </IonPage>
    </>
  );
};

export default Profile;