import {useProducts} from "../data/useProducts";
import {Row,Col, Skeleton, Form, Input, Select} from "antd";
import Card from "antd-mobile/es/card";
import React, {useState} from "react";
import ShowError from "./ShowError";
import {
    IonCard, IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid, IonHeader,
    IonItem, IonModal, IonPage,
    IonRow, IonTitle, IonToolbar, IonIcon, IonButton,
    IonList, IonLabel, IonAvatar, IonSelect, IonSelectOption
} from "@ionic/react";
import {useSearchProduct} from "../data/useSearchProduct";
import Search from "antd/es/input/Search";
import {cartOutline} from "ionicons/icons";
import moment from 'moment';


import API from "../data";
import {useRequests} from "../data/useRequests";

const { Option } = Select;

const ProductClientList = () => {

    const { products, isLoading, isError} = useProducts();
    const { requests,isLoadingRequest,isErrorRequest, mutate} = useRequests();

    const [search, setSearch]=useState('');

    const {searchProduct}=useSearchProduct(search);

    const [cart, setCart]=useState([]);
    const [showCart, setShowCart]=useState(false);
    const [type, setType]=useState('');

    console.log('search', searchProduct);


    console.log("productos", products);

    if( isLoading ) {
        return <Row justify='center' gutter={ 30 }>
            {
                [ ...new Array( 9 ) ].map( ( _, i ) =>
                    <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
                        <div style={ { textAlign: 'center' } }>
                            <Skeleton.Image style={ { width: 200 } } />
                            <Card title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if( isError ) {
        return <ShowError error={ isError } />;
    }

    const onSearch = value =>{
        console.log('producto', value);
        setSearch(value);

    };
    const addCart = (index) => {
        let cartId = index.id;
        let cartName = index.name;
        let cartImage = index.image;
        let cartQuantity = 2;
        let cartPrice = index.price * cartQuantity;

        const newCart={
            cartId,
            cartName,
            cartImage,
            cartQuantity,
            cartPrice
        }
        setCart ((prevState )=>[
            ...prevState,
            newCart
        ]);
        console.log("carrito",cart);
    }

    const onCreate = async () => {
        let subtotal=0;
        console.log("tipo entrega", type);
        for (let i=0; i < cart.length; i++){
            subtotal+=cart[i].cartPrice;
        }
        if (type==="deliver"){
            try {
                const surcharge=subtotal*0.1;
                const total=subtotal+surcharge;
                await API.post( '/requests', {
                    date :moment().format('YYYY-MM-D'),
                    subtotal: subtotal,
                    type: type,
                    surcharge: surcharge,
                    total: total,
                }); // post data to server
                await afterCreate();
                setShowCart(false);
            } catch( error ) {
                console.error(
                    'You have an error in your code or there are Network issues.',
                    error
                );
            }
        }
        else{
            try {
                const surcharge=0;
                const total=subtotal;
                await API.post( '/requests', {
                    date :moment().format('YYYY-MM-D'),
                    subtotal: subtotal,
                    type: type,
                    surcharge: surcharge,
                    total: total,
                }); // post data to server
                await afterCreate();
                setShowCart(false);
            } catch( error ) {
                console.error(
                    'You have an error in your code or there are Network issues.',
                    error
                );
            }
        }
        if (isLoadingRequest){
            return <div>Cargando...</div>
        }else{
            if(isErrorRequest){
                return <ShowError error={ isErrorRequest } />;
            }else{
                console.log("pedidos", requests)
                const idR = requests[requests.length-1].id;
                console.log("ultimo", idR);
                for (let i=0; i < cart.length; i++){
                    await API.post(`/requests/${idR+1}/details`,{
                        product_id: cart[i].cartId,
                        quantity: cart[i].cartQuantity,
                        final_price: cart[i].cartPrice,
                    })
                }
            }
        }
        setCart([]);
    }

    const afterCreate = async () => {
        await mutate('/requests', async requests => {
            return {data: [{}, ...requests.data]};
        },false);
    };

    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonToolbar>
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                        <IonIcon icon={cartOutline} slot={"end"} style={{width: "35px",height: "35px" }} onClick={()=>setShowCart(true)}/>
                    </IonToolbar>

            {
                searchProduct ?
                        searchProduct.map((search, i)=>(
                            <IonCol  size="6">
                                <IonCard key={i} onClick={()=>addCart(search)} >
                                    <IonItem >
                                        <img src={ `http://localhost:8000/storage/${ search.image }` }
                                             style={{height: "100px", width:"100px", align: "center"}}/>
                                    </IonItem>

                                    <IonCardContent>
                                        <IonCardSubtitle>{search.price}</IonCardSubtitle>
                                        <IonCardTitle>{search.name}</IonCardTitle>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))
                    :
                    products.map((product,i)=>(
                    <IonCol size="6">
                    <IonCard key={i} onClick={()=>addCart(product)} >
                            <IonItem >
                                <img src={ `http://localhost:8000/storage/${ product.image }` }
                                     style={{height: "100px", width:"100px", align: "center"}}/>
                            </IonItem>

                        <IonCardContent>
                            <IonCardSubtitle>{product.price}</IonCardSubtitle>
                            <IonCardTitle>{product.name}</IonCardTitle>
                        </IonCardContent>
                    </IonCard>
                    </IonCol>
                ))
            }
                </IonRow>
            </IonGrid>

            <IonModal cssClass='my-custom-class' isOpen={showCart}>
                <IonPage>
                    <IonHeader>
                        <IonToolbar >
                            <IonTitle>
                                Carrito de compra
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonList>
                        {
                         cart.map((car,i)=>(
                            <IonItem key={i}>
                                <IonAvatar slot={"start"}>
                                    <img src={`http://localhost:8000/storage/${ car.cartImage }`} />
                                </IonAvatar>
                                <IonLabel>
                                    <p>{car.cartName} {car.cartQuantity} {car.cartPrice}</p>
                                </IonLabel>
                            </IonItem>
                            ))
                        }
                    </IonList>
                        <IonSelect value={type} placeholder={"Tipo de entrega"} onIonChange={e => setType(e.detail.value)}>
                            <IonSelectOption value={"deliver"}>A domicilio</IonSelectOption>
                            <IonSelectOption value={"withdraw"}>En la tienda</IonSelectOption>
                        </IonSelect>
                     <IonButton htmlType='submit' onClick={onCreate}>Realizar Compra</IonButton>


                    <IonButton onClick={()=>setShowCart(false)}>Cancelar</IonButton>

                </IonPage>
            </IonModal>
        </>
    );
};

export default ProductClientList;