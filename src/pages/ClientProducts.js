import React, {useState} from 'react';
import {
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton, IonSearchbar
} from "@ionic/react";
import {logOut} from "ionicons/icons";
import ProductClientList from "../components/ProductClientList";
import {Link} from "react-router-dom";
import Routes from "../constants/routes";
import Layouts from "../components/Layout";


const ClientProductsPage = () => {

    return    (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar>
                    <IonTitle slot={"primary"}> Lista de Productos</IonTitle>
                    <Layouts />
                </IonToolbar>
            </IonHeader>
            <ProductClientList/>
        </IonPage>
    </>
    )};

export default ClientProductsPage;
