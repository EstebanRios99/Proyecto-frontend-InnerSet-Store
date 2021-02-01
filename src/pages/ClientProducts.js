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


const ClientProductsPage = () => {

    return    (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar>
                    <IonTitle> Lista de Productos</IonTitle>
                    <Link to={Routes.LOGOUT} slot={"end"}>
                        <IonIcon icon={logOut} slot={"end"} style={{width: "25px",height: "25px" }}/>
                    </Link>
                </IonToolbar>
            </IonHeader>
            <ProductClientList/>
        </IonPage>
    </>
    )};

export default ClientProductsPage;
