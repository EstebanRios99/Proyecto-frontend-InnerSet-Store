import React, {useState} from 'react';
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import ProductOwnerList from "../components/ProductOwnerList";
import Layouts from '../components/Layout';

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
                <ProductOwnerList/>
            </IonPage>
        </>
    );
};

export default OwnerProductsPage;
