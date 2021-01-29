import React, {useState} from 'react';
import {
    IonButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import {logOut, search, add, menu} from "ionicons/icons";
import ProductOwnerList from "../components/ProductOwnerList";
import Layouts from '../components/Layout';
import {Link, Route} from "react-router-dom";
import Routes from "../constants/routes";


const OwnerProductsPage = () => {

    const {MenuList, setMenuList} = useState(false);

    return    (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar >
                        <Layouts />
                        <IonTitle>Lista de Productos </IonTitle>
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
    );
};

export default OwnerProductsPage;
