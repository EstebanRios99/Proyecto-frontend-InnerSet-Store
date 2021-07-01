import React, {useState} from 'react';
import API from '../data/index';
import {Select,Card,Skeleton, Col, Form, Input, message, Upload, Row} from 'antd';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';
import '../theme/register.css';
import {IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonLoading, IonGrid, IonRow, IonCol} from "@ionic/react";
import {useProducts} from "../data/useProducts";
import ShowError from "../components/ShowError";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {useCategories} from "../data/useCategories";
import "../theme/toolbar.css";
import Layouts from '../components/Layout';
import '../theme/app.css';
import '../theme/registerp.css';
import viveres from '../images/viveres.jpg'


const { Option } = Select;


function getBase64( file, callback ) {
    console.log( 'file', file );
    const reader = new FileReader();
    reader.addEventListener( 'load', () => callback( reader.result ) );
    reader.readAsDataURL( file );
}

const RegisterProduct = () => {

    const [ form ] = Form.useForm();
    const {isLoading, isError, mutate} = useProducts();
    const [ imageUrl, setImageUrl ] = useState( null );
    const [ fileList, setFileList ] = useState( [] );
    const [showLoading, setShowLoading] = useState(false);
    const categories = useCategories();

    const onCreate = async values => {

        console.log( 'Received values of form: ', values );
        form.validateFields()
            .then( async( values ) => {
                console.log( 'values', values );
                setShowLoading(true);
                // use form data to be able to send a file to the server
                const data = new FormData();
                data.append( 'image', values.image[ 0 ] );
                data.append( 'name', values.name );
                data.append( 'stock', values.stock );
                data.append( 'price', values.price );
                data.append( 'category_id', values.category_id );

                console.log('nuevos valores', data);

                try {
                    await API.post( '/products', data ); // post data to server
                    form.resetFields();
                    await afterCreate();
                    setFileList( [] );
                    setImageUrl( null );
                    setShowLoading(false);
                } catch( e ) {
                    const errorList = e.error && <ErrorList errors={ e.error } />;
                    message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
                }
            } )
            .catch( info => {
                console.log( 'Validate Failed:', info );
            } );


    };

    const afterCreate = async () => {
        await mutate('/products', async products => {
            return {data: [{}, ...products.data]};
        },false);
    };




    const normPhotoFile = e => {
        console.log( 'Upload event:', e );
        const file = e.file;
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if( !isJpgOrPng ) {
            message.error( 'La imagen debe tener formato JPG o PNG' );
            setFileList( [] );
            setImageUrl( null );
            return null;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if( !isLt2M ) {
            message.error( 'La imagen debe ser menor a 2MB' );
            setFileList( [] );
            setImageUrl( null );
            return null;
        }

        if( file.status === 'removed' ) {
            setFileList( [] );
            setImageUrl( null );
            return null;
        }

        getBase64( e.file, imageUrl => setImageUrl( imageUrl ) );

        if( Array.isArray( e ) ) {
            return e;
        }

        console.log( 'e.file', e.file );
        console.log( 'e.fileList', e.fileList );
        setFileList( [ file ] );

        return e && [ e.file ];
    };

    if (isLoading) {
        return <Row>
            {
                [...new Array(9)].map((_, i) =>
                    <Col xs={24} sm={12} md={8} style={{marginBottom: 30}} key={i}>
                        <div style={{textAlign: 'center'}}>
                            <br/>
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
                    <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>

                       <IonTitle id={"letter"}>Registro de productos</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <br/>
                    <IonImg src={viveres} style={{width:"125px", height:"125px", display:"block", margin:"auto"}}/>
                <br/>
                    <Form
                        form={form}
                          initialValues={{
                              remember: true,
                          }}                          
                    >
                        <Form.Item name='name'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingrese nombre del producto'
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
                                           message: 'Ingrese el stock o la cantidad del producto'
                                       },
                                   ]}
                                   
                        >
                            <Input type="number" min="1" placeholder='Cantidad del producto o Stock'/>
                        </Form.Item>
                        <Form.Item name='price'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingrese el precio del producto'
                                       }
                                   ]}
                                   
                        >
                            <Input type="number" min="0.01" step="0.01" placeholder='Precio'/>
                        </Form.Item>

                        <Form.Item name='category_id'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingrese una categoría'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Select placeholder={'Categorías'}>
                                {
                                    categories.isLoading
                                    ? <div>Cargando...</div>
                                    : categories.isError
                                    ? <ShowError error={categories.isError} />
                                    : categories.categories.map((category, i)=>
                                    <Option value={category.id} key={i}>{category.name}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item name='image'
                                   label='Imagen'
                                   valuePropName='fileList'
                                   getValueFromEvent={ normPhotoFile }
                                   rules={ [
                                       {
                                           required: true,
                                           message: 'Sube la foto del producto'
                                       }
                                   ] }
                        >
                            <Upload name='files'
                                    accept='image/jpeg,image/png'
                                    listType='picture-card'
                                    multiple={ false }
                                    showUploadList={ false }
                                    beforeUpload={ () => false }
                                    fileList={ fileList }
                            >
                                { imageUrl
                                    ? <img src={ imageUrl } alt='Foto' style={ { width: '80px' } } />
                                    : <div>
                                        <PlusOutlined />
                                        <div className='ant-upload-text'>Subir imagen</div>
                                    </div> }
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonButton htmlType='submit' onClick={onCreate} id="button-registerp">
                                            Registrar Producto
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                                </IonGrid>
                        </Form.Item>
                    </Form>
           </IonPage>
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={()=>setShowLoading(false)}
                message={'Por favor espere...'}
            />
        </>
    );
};

export default RegisterProduct;
