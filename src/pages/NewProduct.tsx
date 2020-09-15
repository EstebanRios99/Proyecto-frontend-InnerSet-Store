
import React from 'react';
import {
    IonButton,
    IonCol,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem, IonLabel,
    IonPage,
    IonRow, IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {arrowBack, imageOutline, menuSharp} from "ionicons/icons";
import '../css/Login.css';
import {Link} from "react-router-dom";

const NewProduct: React.FC = () => {
    const [name, setName] = React.useState<string>();
    const [price, setPrice] = React.useState<number>();
    const [stock, setStock] = React.useState<number>();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className={"header"} color="orange">
                    <IonToolbar className="header" color="primary">
                        <IonTitle className="title"><Link to="/login"><IonIcon className="back" icon={menuSharp} slot="start"></IonIcon></Link>Ingreso de Productos</IonTitle>
                    </IonToolbar>
                </IonToolbar>
            </IonHeader>
            <IonContent className={"contenedor1"}>
                <IonItem className="ion-item1">
                    <IonInput type="text" value={name} placeholder="Nombre" onIonChange={e => setName(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem className="ion-item1">
                    <IonInput type="text" value={price} placeholder="Apellido" onIonChange={e => setPrice(price)}></IonInput>
                </IonItem>
                <IonItem className="ion-item1">
                    <IonInput type="text" value={stock} placeholder="Número de casa" onIonChange={e => setStock(stock)}></IonInput>
                </IonItem>
                <IonItem className="ion-item1">
                    {/*Se debe realizar las funcion respectiva que tome los datos de la galeria o direccion url*/}
                    <IonLabel>
                        <h2>Cargar Imagen de Producto</h2>
                    </IonLabel>
                    <IonIcon className="back" icon={imageOutline}/>
                </IonItem>
                <Link to="/newproduct"><IonButton className="ion-item-button" >Añadir Producto</IonButton></Link>
            </IonContent>
        </IonPage>
    );
};
export default NewProduct;