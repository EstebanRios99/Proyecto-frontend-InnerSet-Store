import React, {useState} from 'react';
import {
    IonHeader,
    IonItem,
    IonPage,
    IonTitle,
    IonToolbar,
    IonProgressBar
} from "@ionic/react";
import ProductClientList from "../components/ProductClientList";
import Layouts from "../components/Layout";
import "../theme/toolbar.css";


const ClientProductsPage = () => {

    const status="delivered";

    return    (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar id={"toolbar"}>
                    <IonTitle id={"letter"} slot={"primary"}> Lista de Productos</IonTitle>
                    <Layouts />
                </IonToolbar>
            </IonHeader>
            <ProductClientList/>
        </IonPage>
    </>
    )};

export default ClientProductsPage;
