import React from 'react';
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import '../theme/app.css';
import "../theme/toolbar.css";
import Layouts from '../components/Layout';
import Reports from "../components/Reports";

const Reports = () => {
  return    (
    <>
        <IonPage>
            <IonHeader>
                <IonToolbar id={"toolbar"}>
                    <div slot={"start"} className="menu">
                        <Layouts />
                    </div>
                    <IonTitle id={"letter"}>Reporte de Ventas </IonTitle>
                </IonToolbar>
            </IonHeader>
            <Reports />
        </IonPage>
    </>
  );
};

export default Reports;