import React, {useState} from 'react';
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import ProductOwnerList from "../components/ProductOwnerList";
import Layouts from '../components/Layout';
import '../styles/app.css';

const OwnerProductsPage = () => {


    return    (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar >
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle>Lista de Productos </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ProductOwnerList/>
            </IonPage>
        </>
    );
};

export default OwnerProductsPage;
