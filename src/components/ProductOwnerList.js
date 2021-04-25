import {useProducts} from "../data/useProducts";
import {Row, Col, Skeleton, Form, Input, message, Modal, Card} from "antd";
import React, {useState} from "react";
import {
    IonButton,
    IonCard, IonCardContent,
    IonCardSubtitle, IonImg,
    IonCardTitle, IonCol,
    IonItem,
    IonRow, IonThumbnail, IonToolbar, IonLoading,
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
    const [showLoading, setShowLoading] = useState(false)
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
                setShowLoading(true);
                try {
                    await API.put( `/products/${idProduct}`, {
                        name: values.name,
                        stock: parseInt(product.product.stock) + parseInt(values.stock),
                        price: values.price,
                    } ); // post data to server
                    form.resetFields();
                    await afterCreate();
                    setShowLoading(false);
                    setShowInfo(false);

                } catch( error ) {
                    console.error(
                        'You have an error in your code or there are Network issues.',
                        error
                    );
                    setShowLoading(false);
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
                            <br/>
                            <Skeleton.Image style={ { width: 200 } } />
                            <Card title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if( isError ) {
        return "";
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
                    <IonToolbar>
                        <Search placeholder="Ingrese nombre del producto" onSearch={onSearch} enterButton />
                    </IonToolbar>
                    <IonRow>
            {
                searchProduct ?
                    searchProduct.map((search, i)=>(
                        <IonCol  size="6">
                            <IonCard key={i} onClick={()=>showDetail(search.id)} >
                                    <IonImg src={ `https://proyecto-inner-set-store-olosd.ondigitalocean.app/storage/${ search.image }` }
                                         style={{height: "100px"}}/>
                                <IonCardContent>
                                    <IonCardTitle><p>{search.name}</p></IonCardTitle>
                                    <IonCardSubtitle>{parseFloat(search.price).toFixed(2)}</IonCardSubtitle>
                                    <IonCardSubtitle>{
                                        search.stock > 5
                                        ? <strong>Stock: {search.stock}</strong>
                                            : <p style={{color: "#ff4961"}}><strong>Stock: {search.stock}</strong></p>
                                    }</IonCardSubtitle>

                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))
                    :
                    products ?
                products.map((product,i)=>(
                    <IonCol size="6">
                    <IonCard key={i} onClick={()=>showDetails(i)} >
                                <IonImg style={{ height: "100px"}} src={ `https://proyecto-inner-set-store-olosd.ondigitalocean.app/storage/${ product.image }` }
                                     />
                        <IonCardContent>
                            <IonCardTitle><p>{product.name}</p></IonCardTitle>
                            <IonCardSubtitle>{parseFloat(product.price).toFixed(2)}</IonCardSubtitle>
                            <IonCardSubtitle>{
                                product.stock > 5
                                    ? <strong>Stock: {product.stock}</strong>
                                    : <p style={{color: "#ff4961"}}><strong>Stock: {product.stock}</strong></p>
                            }</IonCardSubtitle>
                        </IonCardContent>
                    </IonCard>
                    </IonCol>
                ))
                : "Cargando..."
            }
                </IonRow>
            {
                product.isLoading
                    ? <div>Cargando...</div>
                    : product.isError
                    ? " "
                    : <>
                        <Modal  title="Producto" style={{background:"blue"}}
                                visible={showInfo}
                                closable={false}
                                footer={[
                                    <IonButton type='primary' htmlType='submit' className='login-form-button' onClick={onUpdate}>Actualizar</IonButton>,
                                    <IonButton onClick={()=>setShowInfo(false)}>Cancelar</IonButton>
                                ]}
                        >
                                <IonRow>
                                    <IonCol/>
                                    <IonCol>
                                        <IonItem>
                                            <IonThumbnail style={{width: "100px", height:"100px"}}>
                                                <IonImg src={ `https://proyecto-inner-set-store-olosd.ondigitalocean.app/storage/${ product.product.image }` }
                                                />
                                            </IonThumbnail>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol/>
                                </IonRow>

                                <Form
                                    className="register-form"
                                    layout="vertical"
                                    form={form}
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                    <Form.Item label="Nombre Producto" name='name' hasFeedback>
                                        <Input  placeholder={product.product.name}/>
                                    </Form.Item>
                                    <Form.Item label="Stock" name='stock'>
                                        <Input type="number" min="1" placeholder={product.product.stock}/>
                                    </Form.Item>
                                    <Form.Item label="Precio" name='price'>
                                        <Input type="number" min="0.01" step="0.01" placeholder={product.product.price}/>
                                    </Form.Item>
                                </Form>
                        </Modal>
                    </>
            }
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={()=>setShowLoading(false)}
                message={'Por favor espere...'}
            />
        </>
    );
};

export default ProductOwnerList;