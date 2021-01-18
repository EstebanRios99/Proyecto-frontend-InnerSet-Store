import React from 'react';
import {
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {logOut, search} from "ionicons/icons";
import ProductClientList from "../components/ProductClientList";
import {Link, Route} from "react-router-dom";
import Routes from "../constants/routes";


const ClientProductsPage = () => {

    return    (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar>
                    <IonTitle>
                        Lista de Productos
                    </IonTitle>
                    <IonIcon icon={search} slot={"end"} style={{width: "25px",height: "25px" }}/>
                    <Link to={Routes.LOGOUT}><IonIcon icon={logOut} slot={"end"} style={{width: "25px",height: "25px" }}/></Link>
                </IonToolbar>
            </IonHeader>
            <ProductClientList/>
        </IonPage>
    </>
    )};

export default ClientProductsPage;
