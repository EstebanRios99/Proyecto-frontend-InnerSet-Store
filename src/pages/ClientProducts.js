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
import '../styles/app.css';
import Layouts from '../components/Layout';
import {Link} from "react-router-dom";
import Routes from "../constants/routes";
import Layouts from "../components/Layout;
import '../theme/toolbar.css';



const ClientProductsPage = () => {

    const status="delivered";

    return    (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle id={"letter">Lista de Productos </IonTitle>
                    </IonToolbar>
            </IonHeader>
            <ProductClientList/>
        </IonPage>
    </>
    )};

export default ClientProductsPage;
