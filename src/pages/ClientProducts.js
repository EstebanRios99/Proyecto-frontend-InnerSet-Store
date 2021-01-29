import React from 'react';
import {
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar, 
    IonButtons,
    IonMenuButton
} from "@ionic/react";
import {logOut, search, menu} from "ionicons/icons";
import ProductClientList from "../components/ProductClientList";
import {Link, Route} from "react-router-dom";
import Routes from "../constants/routes";


const ClientProductsPage = () => {

    return    (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar>
                    <IonButtons slot={"start"}>
                        <IonMenuButton />
                    </IonButtons>  
                    <IonTitle> {} </IonTitle>
                    <Link to={Routes.LOGOUT}><IonIcon icon={logOut} slot={"end"} style={{width: "25px",height: "25px" }}/></Link>
                </IonToolbar>
            </IonHeader>
            <ProductClientList/>
        </IonPage>
    </>
    )};

export default ClientProductsPage;
