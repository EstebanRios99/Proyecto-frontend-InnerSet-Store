import React from 'react';
import {
    IonButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {logOut, search, add} from "ionicons/icons";
import ProductOwnerList from "../components/ProductOwnerList";
import {Link, Route} from "react-router-dom";
import Routes from "../constants/routes";


const OwnerProductsPage = () => {

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
