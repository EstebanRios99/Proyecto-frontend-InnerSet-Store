import React from 'react';
import Routes from '../constants/routes';
import API from '../data/index';
import ej from '../images/complete.jpg'
import {Select,Card,Skeleton, Col, Form, Input, message, Modal, Row, Typography} from 'antd';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';
import '../styles/register.css';
import {Link} from 'react-router-dom';
import {useAuth} from '../providers/Auth';
import {IonButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {arrowBack, home} from "ionicons/icons";
import {useProducts} from "../data/useProducts";
import ShowError from "../components/ShowError";

const { Option } = Select;

const RegisterProduct = () => {

    const {setAuthenticated, setCurrentUser} = useAuth();
    const image = ej;
    const {products, isLoading, isError, mutate} = useProducts();

    const onFinish = async data => {
        console.log('Received values of form: ', data);
        const {name, stock, price, category_id} = data;

        try {
            await API.post('/products', {
                name,
                stock,
                price,
                category_id,
                image,
            });
            //console.log('Product', product);
            afterCreate();
        }catch(e){
            console.error('No se pudo registrar', e);
            const errorList = e.error && <ErrorList errors={e.error}/>;
            message.error(<>{translateMessage(e.message)}{errorList}</>);
        }
    };

    const afterCreate = async () => {
        await mutate(`/products`);
    };

    if (isLoading) {
        return <Row>
            {
                [...new Array(9)].map((_, i) =>
                    <Col xs={24} sm={12} md={8} style={{marginBottom: 30}} key={i}>
                        <div style={{textAlign: 'center'}}>
                            <Skeleton.Image style={{width: 200}}/>
                            <Card title='' extra='' cover='' loading/>
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if (isError) {
        return <ShowError error={isError}/>;
    }

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar >
                       <IonTitle>
                           <Link to={ Routes.OWNERPRODUCTS}>
                               <IonIcon icon={arrowBack} slot="start"  style={{width:"25px", height:"25px"}}/>
                           </Link>
                           Registro de productos
                       </IonTitle>
                    </IonToolbar>
                </IonHeader>

                    <Form
                          initialValues={{
                              remember: true,
                          }}
                          onFinish={onFinish}
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
                            <Input  placeholder='Nombre del Producto'/>
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
                            <Input placeholder='Cantidad del producto o Stock'/>
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
                            <Input  placeholder='Precio'/>
                        </Form.Item>

                        <Form.Item name='category_id'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa una categoría'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Select>
                                <Option value={"1"}>1</Option>
                                <Option value={"2"}>2</Option>
                                <Option value={"3"}>3</Option>
                                <Option value={"4"}>4</Option>
                                <Option value={"5"}>5</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <IonButton type='primary' htmlType='submit' className='login-form-button'>
                                Registrar Producto
                            </IonButton>
                        </Form.Item>
                    </Form>
           </IonPage>
        </>
    );
};

export default RegisterProduct;
