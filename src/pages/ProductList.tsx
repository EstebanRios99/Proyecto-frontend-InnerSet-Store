import React from 'react';

import {
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonPage, IonToolbar, IonRow, IonCol, IonIcon, IonTitle, IonHeader, IonAvatar, IonButton,
} from '@ionic/react';
import {arrowBackOutline} from "ionicons/icons";

const ProductList: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className={"header"} color="orange">
                    <IonRow>
                        <IonCol size="0.7">
                            <IonIcon className={"icono1"} icon={arrowBackOutline} />
                        </IonCol>
                        <IonCol >
                            <IonTitle className={"titulo"}>Productos Registrados</IonTitle>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonAvatar slot="start">
                            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>Martadela de Pollo</h2>
                            <h3>$ 0.60</h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonAvatar slot="start">
                            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>Supan Pan Cortado</h2>
                            <h3>$1.75</h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonAvatar slot="start">
                            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>Queso Crema</h2>
                            <h3>$ 2.25</h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonAvatar slot="start">
                            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>Helados Salcedo</h2>
                            <h3>$ 0.50</h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonAvatar slot="start">
                            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>Margarina Bonnela</h2>
                            <h3>$ 1.25</h3>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonButton className={"button"} color="orange">Nuevo Producto</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default ProductList;