import {useProducts} from "../data/useProducts";
import {Row, Col, Skeleton, Form, Input, message} from "antd";
import React, {useState} from "react";
import ShowError from "./ShowError";
import {
    IonButton,
    IonCard, IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid, IonHeader, IonIcon,
    IonItem,IonModal, IonPage,
    IonRow, IonTitle, IonToolbar,
} from "@ionic/react";
import API from "../data";
import {useProduct} from "../data/useProduct";
import {translateMessage} from "../utils/translateMessage";



const ProductOwnerList = () => {

    const { products, isLoading, isError, mutate } = useProducts();
    const [idProduct, setIdProduct]=useState('')
    const [showInfo, setShowInfo] = useState(false);
    const [ form ] = Form.useForm();

    console.log("productos", products);

    const product = useProduct(idProduct);
    console.log('info product', product);

    const onUpdate = async values => {
        console.log( 'Received values of form: ', values );

        form.validateFields()
            .then( async( values ) => {
                try {
                    await API.put( `/products/${idProduct}`, values ); // post data to server
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
            {products ?
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
                                    <IonToolbar >
                                        <IonTitle>
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
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: 'Ingresa nombre del producto'
                                                   }
                                               ]}
                                               hasFeedback
                                     >
                                        <Input  placeholder={product.product.name}/>
                                    </Form.Item>
                                    <Form.Item name='stock'
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: 'Ingresa el stock o la cantidad del producto'
                                                   },
                                               ]}
                                               hasFeedback
                                    >
                                        <Input  placeholder={product.product.stock}/>
                                    </Form.Item>
                                    <Form.Item name='price'
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: 'Ingresa el precio del producto'
                                                   }
                                               ]}
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