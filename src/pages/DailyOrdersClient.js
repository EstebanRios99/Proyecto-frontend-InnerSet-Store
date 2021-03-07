import React from 'react';
import {
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Layouts from "../components/Layout";
import RequestsByUser from "../components/RequestsByUser";
import "../theme/toolbar.css";


const DailyOrdersClient = () => {
  return    (
      <>
        <IonPage>
          <IonHeader >
            <IonToolbar id={"toolbar"}>
              <IonTitle id={"letter"} slot={"primary"}> Lista de Pedidos</IonTitle>
              <Layouts />
            </IonToolbar>
          </IonHeader>
        </IonPage>
        <RequestsByUser />
      </>
  )
};

export default DailyOrdersClient;




