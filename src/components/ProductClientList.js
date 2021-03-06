import {useProducts} from "../data/useProducts";
import {message,Row,Col, Skeleton, InputNumber, Modal} from "antd";
import Card from "antd-mobile/es/card";
import React, {useEffect, useState} from "react";
import ShowError from "./ShowError";
import {
    IonCard, IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonText, IonItem,
    IonRow, IonToolbar, IonIcon, IonButton,
    IonList, IonLabel, IonAvatar, IonSelect, IonSelectOption, IonAlert, IonImg, IonBadge, IonLoading
} from "@ionic/react";
import {useSearchProduct} from "../data/useSearchProduct";
import Search from "antd/es/input/Search";
import {addCircleOutline, arrowUpCircleOutline, cartOutline, trashOutline} from "ionicons/icons";
import moment from 'moment';
import API from "../data";
import {useRequests} from "../data/useRequests";
import {useRequestsByUser} from "../data/useRequestsByUser";
import "../theme/toolbar.css";



const ProductClientList = () => {

    const { products, isLoading, isError} = useProducts();
    const {mutate} = useRequests();
    const {requestsByUser, mutateByUser}=useRequestsByUser();
    const [search, setSearch]=useState('');
    const {searchProduct}=useSearchProduct(search);

    const [cart, setCart]=useState([]);
    const [showCart, setShowCart]=useState(false);
    const [type, setType]=useState('');
    const [noStock, setNoStock]=useState('');
    const [total, setTotal] = useState(0);
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [showAlert5, setShowAlert5] = useState(false);
    const [showLoading, setShowLoading] = useState(false);



    console.log('search', searchProduct);

    console.log("productos", products);

    useEffect(()=>{
        let total2 = 0;
        for (let i = 0; i < cart.length; i++) {
            total2 = total2 + parseFloat(cart[i].cartPrice);
        }
        setTotal(total2);
    },[cart]);

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
        let cartQuantity = 1;
        let cartPrice = index.price * cartQuantity;
        let total1 = 0;

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
        console.log("total", total1);
        console.log("carrito",cart);

        message.success('Producto agregado al carrito', 1)
    }

    const updateCart =(index)=>{
        let total = 0;
        let quantity=document.querySelector( `#${index.cartName.split(" ").join("")}` ).value;
        console.log("nuevaCantidad", quantity);
        if (quantity > 0){
        for (let i=0; i < cart.length; i++){
            if (index.cartId === cart[i].cartId){
                cart[i].cartPrice = parseFloat(((index.cartPrice/cart[i].cartQuantity) * quantity).toFixed(2));
                cart[i].cartQuantity = quantity;
            }
            total = total + parseFloat(cart[i].cartPrice);
        }}
        setTotal(total);
        console.log ("nuevoCarrito", cart);
    }

    const deleteCart =(index)=>{
        setCart ((prevState)=>{
            return prevState.filter((cart, i)=> i!== index);
        })


    }

    const onCreate = async () => {
        let cart2=[];
        if (cart.length > 0){
            for (let i=0; i<cart.length; i++) {
                for (let j = 0; j < products.length; j++) {
                    if (products[j].id === cart[i].cartId){
                        if(products[j].stock >= cart[i].cartQuantity) {
                            cart2.push(cart[i]);
                        }else{
                            setNoStock(cart[i].cartName + ', solo se dispone de '+ products[j].stock);
                        }}}}
                    console.log("no stock", noStock);
                    if (cart2.length === cart.length){
                        let subtotal=0;
                        console.log("tipo entrega", type);
                        for (let i=0; i < cart.length; i++){
                            subtotal=subtotal + parseFloat(cart[i].cartPrice);
                        }
                        setShowLoading(true);
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
                                    status: "new",
                                });
                                await afterCreate();
                                setShowLoading(false);
                                setShowAlert5(true);
                            } catch( error ) {
                                console.error(
                                    'You have an error in your code or there are Network issues.',
                                    error
                                );
                            }
                        }
                        else{
                            if (type==="withdraw"){
                                try {
                                    const surcharge=0;
                                    const total=subtotal;
                                    await API.post( '/requests', {
                                        date :moment().format('YYYY-MM-D'),
                                        subtotal: subtotal,
                                        type: type,
                                        surcharge: surcharge,
                                        total: total,
                                        status: "new",
                                    }); // post data to server
                                    await afterCreate();
                                    setShowLoading(false);
                                    setShowAlert5(true);
                                } catch( error ) {
                                    console.error(
                                        'You have an error in your code or there are Network issues.',
                                        error
                                    );
                                }
                            }else{
                                setShowAlert4(true);
                                setShowLoading(false);
                            }
                        }
                            } else{
                        setShowAlert2(true);
                        setShowLoading(false);
                        setType();
                    }
                        }else{
            setShowAlert1(true);
            setType();
        }
    }

    const onConfirm =async ()=>{
      console.log("Prueba de función");
      console.log("pedidos", requestsByUser);
        setShowLoading(true);
        const idR = requestsByUser[requestsByUser.length - 1].id;
        console.log("ultimo", idR);
        for (let i = 0; i < cart.length; i++) {
            await API.post(`/requests/${idR}/details`, {
                product_id: cart[i].cartId,
                quantity: cart[i].cartQuantity,
                final_price: parseFloat(cart[i].cartPrice),
            })
            for (let j = 0; j < products.length; j++) {
                if (products[j].id === cart[i].cartId) {
                    let stock = products[j].stock - cart[i].cartQuantity;
                    await API.put(`/products/${cart[i].cartId}`, {
                        stock: stock,
                    })
                }
            }
        }
        setShowLoading(false);
        setShowCart(false);
        setCart([]);
        setType();
        setShowAlert3(true);

    };

    const afterCreate = async () => {
        await mutate('/requests', async requests => {
            return {data: [{}, ...requests.data]};
        },false);

        await  mutateByUser('/request/user');
    };

    const handleShowCart = () =>{
        let total1 = 0;
        for (let i=0; i < cart.length; i++){
            total1 = total1 + parseFloat(cart[i].cartPrice);
        }
        setTotal(total1);
        setShowCart(true);
    }

    return (
        <>
        <IonToolbar>
            <Search placeholder="Ingrese nombre del producto" onSearch={onSearch} enterButton />
        </IonToolbar>
            <IonIcon icon={cartOutline} slot={"end"} style={{width: "35px",height: "35px" }} onClick={handleShowCart}/>
            <IonBadge >{cart.length}</IonBadge>
        <IonRow>
            {
                searchProduct ?
                    searchProduct.filter(i => i.stock  > 0).map((search, i)=>(
                        <IonCol  size={"6"}>
                            <IonCard key={i}>
                                <IonImg src={ `https://proyecto-inner-set-store-olosd.ondigitalocean.app/storage/${ search.image }` }
                                        style={{height: "100px"}}/>
                                <IonCardContent>
                                    <IonCardTitle><p>{search.name}</p></IonCardTitle>
                                    <IonCardSubtitle><p>{parseFloat(search.price).toFixed(2)}</p>
                                        <p align={"right"}>
                                            <IonIcon icon={addCircleOutline}
                                                     style={{width:"25px", height:"25px"}}
                                                     onClick={()=>addCart(search)}

                                            /></p>
                                    </IonCardSubtitle>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))
                    :
                    products.filter(i => i.stock  > 0).map((product,i)=>(
                        <IonCol size={"6"}>
                            <IonCard key={i} >
                                <IonImg style={{ height: "100px"}} src={ `https://proyecto-inner-set-store-olosd.ondigitalocean.app/storage/${ product.image }` }
                                />
                                <IonCardContent>
                                    <IonCardTitle><p>{product.name}</p></IonCardTitle>
                                    <IonCardSubtitle><p>{parseFloat(product.price).toFixed(2)}</p>
                                    <p align={"right"}>
                                        <IonIcon icon={addCircleOutline}
                                                 style={{width:"25px", height:"25px"}}
                                                 onClick={()=>addCart(product)}

                                    /></p>
                                    </IonCardSubtitle>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))
            }
        </IonRow>
        <Modal  title="Carrito de compras"
                visible={showCart}
                closable={false}
                footer={[
                    <IonButton htmlType='submit' onClick={onCreate} size={"small"}>Comprar</IonButton>,
                    <IonButton onClick={()=>setShowCart(false)} size={"small"}>Cancelar</IonButton>
                ]}
        >
            <IonList>
                {
                 cart.map((car,i)=>(
                    <IonItem key={i}>
                        <IonAvatar slot={"start"}>
                            <IonImg src={`https://proyecto-inner-set-store-olosd.ondigitalocean.app/storage/${ car.cartImage }`} />
                        </IonAvatar>
                        <IonLabel>
                        {car.cartName}
                            <IonRow>
                                <IonCol><InputNumber
                                    id={car.cartName.split(" ").join("")}
                                    defaultValue={car.cartQuantity}
                                    min={1}
                                    max={10}
                                    style={{width:"50px"}}/>
                                </IonCol>
                                <IonCol>{car.cartPrice.toFixed(2)}</IonCol>
                                <IonCol>
                                    <IonIcon
                                    icon={arrowUpCircleOutline}
                                    style={{width:"25px", height:"25px"}}
                                    onClick={()=>updateCart(car)}
                                    />
                                </IonCol>
                                <IonCol>
                                    <IonIcon
                                    icon={trashOutline}
                                    style={{width:"25px", height:"25px"}}
                                    onClick={()=>deleteCart(i)}
                                    />
                                </IonCol>
                            </IonRow>
                        </IonLabel>
                    </IonItem>
                    ))
                }
            </IonList>
            <IonItem>
                <IonLabel><div><p align={"right"}><strong>Subtotal: </strong>{total.toFixed(2)}</p></div></IonLabel>
            </IonItem>
            <IonText>
                <h3><strong>Tipo de entrega</strong></h3>
            </IonText>

            <IonRow>
                <IonCol>
                    <IonSelect value={type}
                       placeholder={"Tipo de entrega"}
                       onIonChange={e => setType(e.detail.value)}
                       okText={"Aceptar"}
                       cancelText={"Cancelar"}
                    >
                        <IonSelectOption value={"deliver"}>A domicilio</IonSelectOption>
                        <IonSelectOption value={"withdraw"}>En la tienda</IonSelectOption>
                    </IonSelect>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel>
                            {
                                type === "deliver"
                                    ? <><p align={"right"}>{(total * .1).toFixed(2)}</p></>
                                    : <><p align={"right"}>0.00</p></>
                            }
                        </IonLabel>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonLabel>
                {
                    type === "deliver"
                        ? <><p>* Se te cobrará un 10% adicional por la entrega</p></>
                        : <></>
                }
            </IonLabel>
            <IonItem>
                <IonLabel slot={"end"}>
                    <div><p align={"right"}><strong>Total: </strong>{
                        type === "deliver"
                            ? (total * 1.1).toFixed(2)
                            : total.toFixed(2)
                    }</p></div>
                </IonLabel>
            </IonItem>
            </Modal>
            <IonAlert
                isOpen={showAlert1}
                onDidDismiss={()=>setShowAlert1(false)}
                cssClass={'my-custom-class'}
                header={'Carrito Vacio'}
                message={'No puede realizar la compra porque el carrito esta vacio'}
                buttons={['OK']}
            />
            <IonAlert
                isOpen={showAlert2}
                onDidDismiss={()=>setShowAlert2(false)}
                cssClass={'my-custom-class'}
                header={'Sin stock'}
                message={'No se puede realizar la compra porque no hay stock suficiente del producto ' + noStock + ' en stock'}
                buttons={['OK']}
            />
            <IonAlert
                isOpen={showAlert3}
                onDidDismiss={()=>setShowAlert3(false)}
                cssClass={'my-custom-class'}
                header={'Compra Exitosa'}
                message={'¡Su compra se realizo de manera exitosa!'}
                buttons={['OK']}
            />
            <IonAlert
                isOpen={showAlert4}
                onDidDismiss={()=>setShowAlert4(false)}
                cssClass={'my-custom-class'}
                header={'Tipo de entrega'}
                message={'No ha seleccionado un tipo de entrega'}
                buttons={['OK']}
            />
            <IonAlert
                isOpen={showAlert5}
                onDidDismiss={(()=>setShowAlert5(false))}
                cssClass={'my-custom-class'}
                header={'Nueva Compra'}
                message={'Usted debe confirmar su compra'}
                buttons={[{
                    text:'OK',
                    handler: onConfirm,
                }]}
            />
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={()=>setShowLoading(false)}
                message={'Por favor espere...'}
            />
        </>
    );
};

export default ProductClientList;