import React, {useState} from 'react';
import {
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonDatetime,
    IonGrid,
    IonHeader, IonImg, IonItem, IonLabel,
    IonPage, IonRow,
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

    const [startDate, setStartDate]=useState('');
    const [endDate, setEndDate]=useState('');

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
                        onIonChange={e => setEndDate(e.detail.value)}
                        doneText={"Aceptar"}
                        cancelText={"Cancelar"}

                    />
                </IonItem>
                    <a href={`http://localhost:8000/api/pdf/requests/${moment(startDate).format('YYYYMMDD')}/${moment(endDate).format('YYYYMMDD')}`} id={"text"}>
                        <IonCard>
                            <IonImg src={sale}
                                    style={{height: "100px"}}/>
                            <IonCardHeader>
                                <IonCardSubtitle>Documento</IonCardSubtitle>
                                <IonCardTitle>Reporte de Ventas por Cliente</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </a>
                    <a href={`http://localhost:8000/api/pdf/products/${moment(startDate).format('YYYYMMDD')}/${moment(endDate).format('YYYYMMDD')}`} id={"text"}>
                        <IonCard>
                            <IonImg src={product}
                                    style={{height: "100px"}}/>
                            <IonCardHeader>
                                <IonCardSubtitle>Documento</IonCardSubtitle>
                                <IonCardTitle>Reporte de Productos</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </a>
                    <a href="http://localhost:8000/api/pdf/stock" id={"text"}>
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