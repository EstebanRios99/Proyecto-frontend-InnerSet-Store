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


    return    (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar >
                        <IonTitle slot={"primary"}>Lista de Productos </IonTitle>
                        <Layouts />
                    </IonToolbar>
                </IonHeader>
                <ProductOwnerList/>
            </IonPage>
        </>
    );
};

export default OwnerProductsPage;
