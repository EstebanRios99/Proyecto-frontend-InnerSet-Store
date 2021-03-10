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
              <IonTitle id={"letter"} > Lista de Pedidos</IonTitle>
                <div slot={"start"} className="menu">
                    <Layouts />
                </div>
            </IonToolbar>
          </IonHeader>
        </IonPage>
        <RequestsByUser />

      </>
  )
};

export default DailyOrdersClient;




