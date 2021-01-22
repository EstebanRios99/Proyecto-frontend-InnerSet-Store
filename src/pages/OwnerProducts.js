import React from 'react';
import {
    IonButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
} from "@ionic/react";
import {logOut, search, add, menu} from "ionicons/icons";
import ProductOwnerList from "../components/ProductOwnerList";
import MenuClient from '../components/MenuClient';
import {Link, Route} from "react-router-dom";
import Routes from "../constants/routes";


const OwnerProductsPage = () => {

    return    (
        <>
            <IonPage>
                <IonHeader >
                    <IonToolbar>
                        <IonButtons slot={"start"}>
                            <IonIcon icon={menu} style={{width: "25px",height: "25px" }}/>
                            <MenuClient />
                        </IonButtons>
                        <IonTitle>
                            Lista de Productos
                        </IonTitle>
                        <Link to={Routes.LOGOUT}><IonIcon icon={logOut} slot={"end"} style={{width: "25px",height: "25px" }}/></Link>
                    </IonToolbar>
                </IonHeader>
                <Link to={Routes.REGISTERPRODUCT}>
                    <IonButton slot={"end"}>
                        <IonIcon icon={add}/>
                    </IonButton>
                </Link>

                <ProductOwnerList/>
            </IonPage>
        </>
    )};

export default OwnerProductsPage;
