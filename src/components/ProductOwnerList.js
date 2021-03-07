import {useProducts} from "../data/useProducts";
import {Row, Col, Skeleton, Form, Input, message} from "antd";
import React, {useState} from "react";
import ShowError from "./ShowError";
import {
    IonButton,
    IonCard, IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid, IonHeader,
    IonItem,IonModal, IonPage,
    IonRow, IonTitle, IonToolbar,
} from "@ionic/react";
import API from "../data";
import {useProduct} from "../data/useProduct";
import {translateMessage} from "../utils/translateMessage";
import {useSearchProduct} from "../data/useSearchProduct";
import Search from "antd/es/input/Search";
import "../theme/toolbar.css";




const ProductOwnerList = () => {

    const { products, isLoading, isError, mutate } = useProducts();
    const [idProduct, setIdProduct]=useState('')
    const [showInfo, setShowInfo] = useState(false);
    const [ form ] = Form.useForm();

    const [search, setSearch]=useState('');

    const {searchProduct}=useSearchProduct(search);

    console.log("productos", products);

    console.log("busqueda", searchProduct);

    const product = useProduct(idProduct);
    console.log('info product', product);

    const onUpdate = async values => {
        console.log( 'Received values of form: ', values );

        form.validateFields()
            .then( async( values ) => {
                try {
                    await API.put( `/products/${idProduct}`, {
                        name: values.name,
                        stock: parseInt(product.product.stock) + parseInt(values.stock),
                        price: values.price,
                    } ); // post data to server
                    form.resetFields();
                    await afterCreate();
                    setShowInfo(false);

                } catch( error ) {
                    console.error(
                        'You have an error in your code or there are Network issues.',
                        error
                    );
                    message.error( translateMessage( error.message ) );
                }
            } )
            .catch( info => {
                console.log( 'Validate Failed:', info );
            } );

    };

    const afterCreate = async () => {
        await mutate('/products');
    };

    const onSearch = value =>{
        console.log('producto', value);
        setSearch(value);
    };

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

    const showDetail = (index)=>{
        const id=index;
        setIdProduct(id);
        setShowInfo(true);
    }


    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonToolbar>
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    </IonToolbar>
            {
                searchProduct ?
                    searchProduct.map((search, i)=>(
                        <IonCol  size="6">
                            <IonCard key={i} onClick={()=>showDetail(search.id)} >
                                <IonItem >
                                    <img src={ `http://localhost:8000/storage/${ search.image }` }
                                         style={{height: "100px", width:"100px", align: "center"}}/>
                                </IonItem>

                                <IonCardContent>
                                    <IonCardTitle>{search.name}</IonCardTitle>
                                    <IonCardSubtitle>{search.price.toFixed(2)}</IonCardSubtitle>
                                    <IonCardSubtitle><strong>Stock: </strong>{search.stock}</IonCardSubtitle>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))
                    :
                    products ?
                products.map((product,i)=>(
                    <IonCol size="6">
                    <IonCard key={i} onClick={()=>showDetails(i)} >
                            <IonItem >
                                <img src={ `http://localhost:8000/storage/${ product.image }` }
                                     style={{height: "100px", width:"100px", align: "center"}}/>
                            </IonItem>

                        <IonCardContent>
                            <IonCardTitle>{product.name}</IonCardTitle>
                            <IonCardSubtitle>{product.price.toFixed(2)}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Stock: </strong>{product.stock}</IonCardSubtitle>
                        </IonCardContent>
                    </IonCard>
                    </IonCol>
                ))
                : "Cargando..."
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
                                    <IonToolbar id={"toolbar"}>
                                        <IonTitle id={"letter"}>
                                            Detalle del producto
                                        </IonTitle>
                                    </IonToolbar>
                                </IonHeader>

                                    <IonItem>
                                        <img src={ `http://localhost:8000/storage/${ product.product.image }` }
                                             style={{height: "100px", width:"100px", align: "center"}}/>
                                    </IonItem>

                                <Form
                                    form={form}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onUpdate}
                                >
                                    <Form.Item name='name'
                                               hasFeedback
                                     >
                                        <Input  placeholder={product.product.name}/>
                                    </Form.Item>
                                    <Form.Item name='stock'
                                               hasFeedback
                                    >
                                        <Input  placeholder={product.product.stock}/>
                                    </Form.Item>
                                    <Form.Item name='price'
                                               hasFeedback
                                    >
                                        <Input  placeholder={product.product.price}/>
                                    </Form.Item>
                                    <IonButton type='primary' htmlType='submit' className='login-form-button'>
                                        Actualizar Producto
                                    </IonButton>
                                </Form>
                                <IonButton onClick={()=>setShowInfo(false)}>Cancelar</IonButton>
                            </IonPage>
                        </IonModal>
                    </>
            }
        </>
    );
};

export default ProductOwnerList;