import React, {useState} from 'react';
import {
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonDatetime,
    IonHeader, IonImg, IonItem, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import Layouts from '../components/Layout';
import '../theme/app.css';
import "../theme/toolbar.css";
import moment from 'moment';
import sale from '../images/ventas.png';
import product from '../images/productos.png';
import stock from '../images/stock.png';

const Reports = () => {

    const [startDate, setStartDate]=useState(moment().format('YYYY-MM-D'));
    const [endDate, setEndDate]=useState(moment().format('YYYY-MM-D'));

    return    (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle id={"letter"}>Reportes</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonItem>
                    <IonLabel><strong>Inicio</strong></IonLabel>
                    <IonDatetime
                        displayFormat="DD MMM YYYY"
                        placeholder="Seleccione Fecha"
                        value={startDate}
                        max={moment().format('YYYY-MM-D')}
                        onIonChange={e => setStartDate(e.detail.value)}
                        doneText={"Aceptar"}
                        cancelText={"Cancelar"}

                    />
                </IonItem>
                <IonItem>
                    <IonLabel><strong>Fin</strong></IonLabel>
                    <IonDatetime
                        displayFormat="DD MMM YYYY"
                        placeholder="Seleccione Fecha"
                        value={endDate}
                        max={moment().format('YYYY-MM-D')}
                        onIonChange={e => setEndDate(e.detail.value)}
                        doneText={"Aceptar"}
                        cancelText={"Cancelar"}

                    />
                </IonItem>
                    <a href={`https://proyecto-inner-set-store-olosd.ondigitalocean.app/api/pdf/requests/${moment(startDate).format('YYYYMMDD')}/${moment(endDate).format('YYYYMMDD')}`}
                       id={"text"}
                    >
                        <IonCard>
                            <IonImg src={sale}
                                    style={{height: "100px"}}/>
                            <IonCardHeader>
                                <IonCardSubtitle>Documento</IonCardSubtitle>
                                <IonCardTitle>Reporte de Ventas por Cliente</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </a>
                    <a href={`https://proyecto-inner-set-store-olosd.ondigitalocean.app/api/pdf/products/${moment(startDate).format('YYYYMMDD')}/${moment(endDate).format('YYYYMMDD')}`}
                       id={"text"}
                    >
                        <IonCard>
                            <IonImg src={product}
                                    style={{height: "100px"}}/>
                            <IonCardHeader>
                                <IonCardSubtitle>Documento</IonCardSubtitle>
                                <IonCardTitle>Reporte de Productos</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </a>
                    <a href="https://proyecto-inner-set-store-olosd.ondigitalocean.app/api/pdf/stock" id={"text"} >
                        <IonCard>
                            <IonImg src={stock}
                                    style={{height: "100px"}}/>
                            <IonCardHeader>
                                <IonCardSubtitle>Documento</IonCardSubtitle>
                                <IonCardTitle>Stock</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </a>
            </IonPage>
        </>
    );
};

export default Reports;
