import {useProducts} from "../data/useProducts";
import {Row,Col, Skeleton} from "antd";
import React, {useEffect, useState} from "react";
import ShowError from "./ShowError";
import {
    IonButton,
    IonCard, IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid, IonHeader, IonIcon,
    IonItem, IonLabel, IonList, IonModal, IonPage,
    IonRow, IonTitle, IonToolbar,
} from "@ionic/react";
import infoProduct from "./infoProduct";
import API from "../data";
import {useProduct} from "../data/useProduct";
import {Link} from "react-router-dom";
import Routes from "../constants/routes";
import {arrowBack} from "ionicons/icons";


const ProductOwnerList = () => {

    const { products, isLoading, isError, mutate } = useProducts();
    const [idProduct, setIdProduct]=useState('')
    const [showInfo, setShowInfo] = useState(false);

    console.log("productos", products);

    const product = useProduct(idProduct);
    console.log('info product', product);

    if( isLoading ) {
        return <Row justify='center' gutter={ 30 }>
            {
                [ ...new Array( 9 ) ].map( ( _, i ) =>
                    <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
                        <div style={ { textAlign: 'center' } }>
                            <Skeleton.Image style={ { width: 200 } } />
                            <IonCard title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if( isError ) {
        return <ShowError error={ isError } />;
    }

    const showDetails = (index)=>{
        const id=products[index].id;
        setIdProduct(id);
        setShowInfo(true);
    }


    return (
        <>
            <IonGrid>
                <IonRow>
            {
                products.map((product,i)=>(
                    <IonCol size="6">
                    <IonCard key={i} onClick={()=>showDetails(i)} >
                            <IonItem >
                                <img src={ `http://localhost:8000/storage/${ product.image }` }
                                     style={{height: "100px", width:"100px", align: "center"}}/>
                            </IonItem>

                        <IonCardContent>
                            <IonCardSubtitle>{product.price}</IonCardSubtitle>
                            <IonCardTitle>{product.name}</IonCardTitle>
                        </IonCardContent>
                        <IonButton>Detalles</IonButton>
                    </IonCard>
                    </IonCol>
                ))
            }
                </IonRow>
            </IonGrid>
            {
                product.isLoading
                    ? <div>Cargando...</div>
                    : product.isError
                    ? <ShowError error={product.isError}/>
                    : <>
                        <IonModal isOpen={showInfo} cssClass='my-custom-class'>
                            <IonPage>
                                <IonHeader>
                                    <IonToolbar >
                                        <IonTitle>
                                            Detalle del producto
                                        </IonTitle>
                                    </IonToolbar>
                                </IonHeader>
                            <IonList>
                                <IonItem>
                                    <img src={ `http://localhost:8000/storage/${ product.product.image }` }
                                         style={{height: "100px", width:"100px", align: "center"}}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>{product.product.name}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>{product.product.price}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>{product.product.stock}</IonLabel>
                                </IonItem>
                            </IonList>
                            <IonButton onClick={()=>setShowInfo(false)}>Close</IonButton>
                            </IonPage>
                        </IonModal>
                    </>
            }
        </>
    );
};

export default ProductOwnerList;