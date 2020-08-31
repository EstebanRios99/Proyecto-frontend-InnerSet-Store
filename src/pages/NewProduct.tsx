
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
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {imageOutline, menuSharp} from "ionicons/icons";

const NewProduct: React.FC = () => {
    const [name, setName] = React.useState<string>();
    const [price, setPrice] = React.useState<number>();
    const [stock, setStock] = React.useState<number>();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className={"header"} color="orange">
                    <IonRow>
                        <IonCol size="0.7">
                            <IonIcon className={"icono1"} icon={menuSharp}/>
                        </IonCol>
                        <IonCol>
                            <IonTitle className={"titulo"}>Productos Registrados</IonTitle>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent className={"contenedor1"}>
                <IonItem className={"contenedor-item1"}>
                    <IonInput type="text" value={name} placeholder="Nombre" onIonChange={e => setName(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem className={"contenedor-item1"}>
                    <IonInput type="text" value={price} placeholder="Apellido" onIonChange={e => setPrice(price)}></IonInput>
                </IonItem>
                <IonItem className={"contenedor-item1"}>
                    <IonInput type="text" value={stock} placeholder="Número de casa" onIonChange={e => setStock(stock)}></IonInput>
                </IonItem>
                <IonItem>
                    {/*Se debe realizar las funcion respectiva que tome los datos de la galeria o direccion url*/}
                    <IonLabel>
                        <h2>Cargar Imagen de Producto</h2>
                    </IonLabel>
                    <IonIcon className={"icono1"} icon={imageOutline}/>
                </IonItem>
                <IonButton className={"button"} color="orange">Añadir Producto</IonButton>
            </IonContent>
        </IonPage>
    );
};
export default NewProduct;