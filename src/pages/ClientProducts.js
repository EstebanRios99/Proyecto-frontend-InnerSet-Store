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
import ProductClientList from "../components/ProductClientList";
import '../styles/app.css';

import Layouts from '../components/Layout';


const ClientProductsPage = () => {

    return    (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar>
                <IonToolbar >
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle>Lista de Productos </IonTitle>
                    </IonToolbar>
                </IonToolbar>
            </IonHeader>
            <ProductClientList/>
        </IonPage>
    </>
    )};

export default ClientProductsPage;
