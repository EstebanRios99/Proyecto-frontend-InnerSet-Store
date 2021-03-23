import React, {useState} from 'react';
import API from '../data/index';
import {useRequests} from '../data/useRequests';
import ShowError from "./ShowError";
import {translateMessage} from "../utils/translateMessage";
import {
    IonList,
    IonItem,
    IonLabel, IonButton,
    IonGrid, IonRow, IonCol, IonIcon, IonText, IonLoading
} from "@ionic/react";
import {useRequest} from "../data/useRequest";
import {useDetailRequest} from "../data/useDetailRequest";
import "../theme/toolbar.css";
import {ellipse} from "ionicons/icons";
import {CloseOutlined} from '@ant-design/icons';
import Skeleton from './Skeleton';
import {Modal, message} from 'antd';
import moment from "moment";


const NewRequest = () =>{
    const {requests, isLoadingRequest, isErrorRequest, mutate} = useRequests();

    const [idRequest, setIdRequest] = useState('');
    const [showDetail, setShowDetail] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const request = useRequest(idRequest);
    const detailRequest = useDetailRequest(idRequest);
    console.log("pedidos", requests);
    

    if( isLoadingRequest ) {
        return <Skeleton />;       
    }

    if( isErrorRequest ) {
        return <ShowError error={ isErrorRequest } />;
    }

    const handleShowDetail=async (index)=>{
        const id=index.id;
        setIdRequest(id);
        setShowDetail(true);
    }

    console.log("detalle_pedido", request.request);

    const onUpdate = async() => {
        let status='';
        setShowLoading(true);
        if(request.request.status==='new'){
            status='pending'
        }
        if (request.request.status==='pending'){
            status='accomplished';
        }
        if (request.request.status==='accomplished'){
            if(request.request.type==='withdraw'){
                status='retired';
            }else{
                status='sent';
            }
        }
        if (request.request.status==='retired'){
            status='delivered';
        }
        if (request.request.status==='sent'){
            status='delivered';
        }
    
        console.log("status", status);
        console.log('id', idRequest);
        try {
            await API.put( `/requests/status/${idRequest}`, {
                status: status,
            } );
            await afterCreate();
            setShowDetail(false);

        } catch( error ) {
            console.error('You have an error in your code or there are Network issues.',error);
            message.error( translateMessage( error.message ) );
        }
        setShowLoading(false);
    };

    const afterCreate = async () => {
        await mutate('/requests', async requests => {
            return {data: [{}, ...requests.data]};
        },false);

    };

    

    return (
        <>
        <IonList>
            {
                requests ?
                requests.filter(i => i.date  === moment().format('YYYY-MM-D')).map( ( orders, i ) => (
                    <IonItem key={i} onClick={()=>handleShowDetail(orders)}>
                        {orders.status==='pending'
                        ?<IonIcon slot="end" icon={ellipse} style={{width:"40px", height:"40px", color:"#ff4961"}}/>
                            :orders.status=== 'accomplished'
                            ?<IonIcon slot="end" icon={ellipse} style={{width:"40px", height:"40px", color:"#ffd534"}}/>
                                :orders.status==='retired'
                                ?<IonIcon slot="end" icon={ellipse} style={{width:"40px", height:"40px", color:"#50c8ff"}}/>
                                :orders.status==='sent'
                                ?<IonIcon slot="end" icon={ellipse} style={{width:"40px", height:"40px", color:"#ff9b48"}}/>
                                    :orders.status==='delivered'
                                    ?<IonIcon slot="end" icon={ellipse} style={{width:"40px", height:"40px", color:"#2fdf75"}}/>
                                        :""
                        }
                        <IonLabel>
                            <div><h2><strong>N° de pedido: </strong>{orders.id}</h2></div>
                            <div><p><strong>Numero de casa: </strong>{orders.usertype.home_number}</p></div>
                            <div><p><strong>Ordenado por: </strong>{orders.user.name}</p></div>
                            <div><p><strong>Total: </strong>{orders.total.toFixed(2)}</p></div>
                            {orders.type==='withdraw'
                                ? <div><p><strong>Orden para: </strong> Retirar</p></div>
                                : <div><p><strong>Orden a: </strong>Domicilio</p></div>
                            }
                        </IonLabel>
                    </IonItem>
                ))
                    : ""
            }
        </IonList>

        {
            request.isLoading
                ? <><Skeleton/></>
                : request.isError
                ? <ShowError error={request.isError}/>
                : <>
                <Modal  title="Detalle del pedido" className={"report"}
                        visible={showDetail}
                        closeIcon={<CloseOutlined onClick={()=>setShowDetail(false)}/>}
                        closable={true}
                        footer={request.request.status==='pending'
                                ?<IonButton style={{margin:'auto', display:'block' }} onClick={onUpdate}>
                                    Realizado
                                </IonButton>
                                :request.request.status==='accomplished' && request.request.type==='withdraw'
                                ?<IonButton style={{margin:'auto', display:'block' }} onClick={onUpdate}>
                                    Para Retirar
                                </IonButton>
                                :request.request.status==='accomplished' && request.request.type==='deliver'
                                ?<IonButton style={{margin:'auto', display:'block' }} onClick={onUpdate}>
                                    Enviar
                                </IonButton>
                                :request.request.status==='retired'
                                ?<IonButton style={{margin:'auto', display:'block' }} onClick={onUpdate}>
                                    Finalizar
                                </IonButton>
                                :request.request.status==='sent'
                                ?<IonButton style={{margin:'auto', display:'block' }} onClick={onUpdate}>
                                    Finalizar
                                </IonButton>
                                :request.request.status==='delivered'
                                ?<IonItem>
                                   <IonLabel style={{margin:'auto', display:'block', background: "#2fdf75"}}>
                                       <IonText>
                                            <h2 align="center" ><strong>Finalizado</strong></h2>
                                       </IonText>
                                   </IonLabel>
                                </IonItem>
                                :request.request.status==='new'
                                ?<IonButton style={{margin:'auto', display:'block' }} onClick={onUpdate}>
                                    Aceptar Pedido
                                </IonButton>
                                :""
                            }
                    >
                        <IonGrid>
                            <IonRow>
                                <IonCol><strong>N° de Pedido: </strong><h4>{request.request.id}</h4></IonCol>
                                <IonCol><strong>Fecha: </strong> {request.request.date}</IonCol>
                            </IonRow>
                            <IonRow>
                                {request.request.type==='withdraw'
                                    ?<IonCol><strong>Tipo: </strong><h4>Retirar</h4></IonCol>
                                    :<IonCol><strong>Tipo: </strong><h4>Domicilio</h4></IonCol>
                                }
                                {request.request.status==='new'
                                    ?<IonCol><strong>Estado: </strong> Nuevo</IonCol>
                                    :request.request.status==='pending'
                                    ?<IonCol><strong>Estado: </strong> Pendiente</IonCol>
                                    :request.request.status==='accomplished'
                                    ?<IonCol><strong>Estado: </strong> Realizado</IonCol>
                                    :request.request.status==='retired'
                                    ?<IonCol><strong>Estado: </strong> Por Retirar</IonCol>
                                    :request.request.status==='sent'
                                    ?<IonCol><strong>Estado: </strong> Enviado</IonCol>
                                    :request.request.status==='delivered'
                                    ?<IonCol><strong>Estado: </strong> Finalizado</IonCol>
                                    :""
                                }  
                            </IonRow>
                        </IonGrid>
                        {
                            detailRequest.isLoading
                            ? <><Skeleton/></>
                            : detailRequest.isError
                            ? " "
                            : <><IonList>
                                <IonItem>
                                    <IonLabel>
                                        <IonRow>
                                            <IonCol>
                                                <p align={"center"}><strong>Producto</strong></p>
                                            </IonCol>
                                            <IonCol>
                                                <p align={"center"}><strong>Cantidad</strong></p>
                                            </IonCol>
                                            <IonCol>
                                                <p align={"center"}><strong>Precio</strong></p>
                                            </IonCol>
                                        </IonRow>
                                    </IonLabel>
                                </IonItem>
                                {
                                    detailRequest.detailRequest.map((detail, i)=>(
                                        <IonItem key={i}>
                                            <IonLabel>
                                                <IonRow>
                                                    <IonCol>
                                                        <p align={"center"}>{detail.product.name}</p>
                                                    </IonCol>
                                                    <IonCol>
                                                        <p align={"center"}>{detail.quantity}</p>
                                                    </IonCol>
                                                    <IonCol>
                                                        <p align={"center"}>{detail.finalprice.toFixed(2)}</p>
                                                    </IonCol>
                                                </IonRow>
                                            </IonLabel>
                                        </IonItem>))
                                }
                                <IonItem>
                                    <IonLabel>
                                        <IonRow>
                                            <IonCol/>
                                                <IonCol>
                                                    <p align={"right"}><strong>Subtotal:</strong></p>
                                                </IonCol>
                                                <IonCol>
                                                    <p align={"center"}>{request.request.subtotal.toFixed(2)}</p>
                                                </IonCol>
                                        </IonRow>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>
                                        <IonRow>
                                            <IonCol/>
                                            <IonCol>
                                                <p align={"right"}><strong>Recargo:</strong></p>
                                            </IonCol>
                                            <IonCol>
                                                <p align={"center"}>{request.request.surcharge.toFixed(2)}</p>
                                            </IonCol>
                                        </IonRow>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>
                                        <IonRow>
                                            <IonCol/>
                                                <IonCol>
                                                    <p align={"right"}><strong>Total:</strong></p>
                                                </IonCol>
                                                <IonCol>
                                                    <p align={"center"}>{request.request.total.toFixed(2)}</p>
                                                </IonCol>
                                        </IonRow>
                                    </IonLabel>
                                </IonItem>
                            </IonList>
                        </>
                    }
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
}

export default NewRequest;