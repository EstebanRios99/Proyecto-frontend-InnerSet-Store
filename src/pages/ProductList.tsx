import React from 'react';

import {
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonPage, IonToolbar,IonFab, IonIcon, IonTitle, IonHeader, IonAvatar, IonFabButton,
} from '@ionic/react';
import {add, menuSharp} from "ionicons/icons";
import {Link} from "react-router-dom";

const ProductList: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className={"header"} color="orange">
                    <IonToolbar className="header" color="primary">
                        <IonTitle className="title"><Link to="/login"><IonIcon className="back" icon={menuSharp} slot="start"></IonIcon></Link>Ingreso de Productos</IonTitle>
                    </IonToolbar>
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
                <Link to="/newproducts"><IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                </Link>
            </IonContent>
        </IonPage>
    );
};

export default ProductList;