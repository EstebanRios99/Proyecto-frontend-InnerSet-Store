import React, {useState} from 'react';
import API from '../data/index';
import {useRequests} from '../data/useRequests';
import ShowError from "./ShowError";
import {translateMessage} from "../utils/translateMessage";
import {
    IonList, IonChip,
    IonItem,
    IonLabel, IonButton,
    IonGrid, IonRow, IonCol, IonIcon, IonText, IonLoading
} from "@ionic/react";
import {useRequest} from "../data/useRequest";
import {useDetailRequest} from "../data/useDetailRequest";
import "../theme/toolbar.css";
import "../theme/newRequest.css";
import {chevronDownCircleOutline} from "ionicons/icons";
import {CloseOutlined} from '@ant-design/icons';
import Skeleton from './Skeleton';
import {Modal, message} from 'antd';



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
                requests.filter(i => i.status  !== "delivered").map( ( orders, i ) => (
                    <IonItem key={i}>
                        {orders.status==='pending'
                        ?<IonChip id="chip-pending" slot="end">
                        <IonLabel>Pendiente</IonLabel>
                        </IonChip>
                            :orders.status=== 'accomplished'
                            ?<IonChip id="chip-accomplished" slot="end">
                            <IonLabel>Realizado</IonLabel>
                            </IonChip>
                                :orders.status==='retired'
                                ?<IonChip id="chip-retired" slot="end">
                                <IonLabel>Por retirar</IonLabel>
                                </IonChip>
                                :orders.status==='sent'
                                ?<IonChip id="chip-sent" slot="end">
                                <IonLabel>Enviado</IonLabel>
                                </IonChip>
                                    :orders.status==='delivered'
                                    ?<IonChip id="chip-delivered"  slot="end">
                                    <IonLabel>Finalizado</IonLabel>
                                    </IonChip>
                                        :""
                        }
                        <IonLabel>
                            <div><h2><strong>N° de pedido: </strong>{orders.id}</h2></div>
                            <div><p><strong>Ordenado por: </strong>{orders.user.name}</p></div>
                            <div><p><strong>Total: </strong>{parseFloat(orders.total).toFixed(2)}</p></div>
                            {orders.type==='withdraw'
                                ? <div><p><strong>Orden para: </strong> Retirar</p></div>
                                : <div><p><strong>Orden a: </strong>Domicilio</p></div>
                            }
                            <div>
                                <p align="right">
                                    <IonChip id="chip" onClick={()=>handleShowDetail(orders)}>
                                        <IonIcon  icon={chevronDownCircleOutline} style={{height:"22px", width: "22px"}}/>
                                        <IonLabel>Ver Detalle</IonLabel>
                                    </IonChip>
                                </p>
                            </div>
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
                ? ""
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
                                                        <p align={"center"}>{parseFloat(detail.finalprice).toFixed(2)}</p>
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
                                                    <p align={"center"}>{parseFloat(request.request.subtotal).toFixed(2)}</p>
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
                                                <p align={"center"}>{parseFloat(request.request.surcharge).toFixed(2)}</p>
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
                                                    <p align={"center"}>{parseFloat(request.request.total).toFixed(2)}</p>
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