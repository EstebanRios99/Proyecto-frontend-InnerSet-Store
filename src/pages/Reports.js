import React, {useState} from 'react';
import {
    IonButton, IonCol,
    IonGrid,
    IonHeader, IonItem,
    IonPage, IonRow,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import Layouts from '../components/Layout';
import '../styles/app.css';
import "../theme/toolbar.css";

const Reports = () => {


    return    (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle id={"letter"}>Reportes</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        <IonCol/>
                        <IonCol>
                            <a href="http://localhost:8000/api/pdf/requests" id={"text"}>
                                <IonButton id={"btn"}>Reporte de Pedidos</IonButton>
                            </a>
                        </IonCol>
                        <IonCol/>
                    </IonRow>
                    <IonRow>
                        <IonCol/>
                        <IonCol>
                            <a href="http://localhost:8000/api/pdf/products" id={"text"}>
                            <IonButton id={"btn"}>Reporte de Productos</IonButton>
                            </a>
                        </IonCol>
                        <IonCol/>
                    </IonRow>
                </IonGrid>
            </IonPage>
        </>
    );
};

export default Reports;
