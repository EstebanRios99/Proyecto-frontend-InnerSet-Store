import React, {useState} from 'react';
import API from '../data/index';
import {useRequests} from '../data/useRequests';
import ShowError from "./ShowError";
import {translateMessage} from "../utils/translateMessage";
import {
    IonList,
    IonItem,
    IonLabel, IonButton,
    IonGrid, IonRow, IonCol, IonIcon
} from "@ionic/react";
import {useRequest} from "../data/useRequest";
import {useDetailRequest} from "../data/useDetailRequest";
import "../theme/toolbar.css";
import {bagCheck, bagHandle, checkmarkCircle, alertCircle, cart} from "ionicons/icons";
import {CloseOutlined} from '@ant-design/icons';
import Skeleton from './Skeleton';
import {Modal, message} from 'antd';

const NewRequest = () =>{
    const {requests, isLoadingRequest, isErrorRequest,mutate} = useRequests();

    const [idRequest, setIdRequest] = useState('');
    const [showDetail, setShowDetail] = useState(false);
    const [statusRequest, setStatusRequest] = useState('');
    //const [list, setList] = useState(requests);

    const request = useRequest(idRequest);
    const detailRequest = useDetailRequest(idRequest);
    console.log("pedidos", requests);
    

    if( isLoadingRequest ) {
        return <Skeleton />;       
    }

    if( isErrorRequest ) {
        return <ShowError error={ isErrorRequest } />;
    }

    const handleShowDetail=(index)=>{
        const id=requests[index].id;
        setIdRequest(id);
        setShowDetail(true);
    }

    console.log("detalle_pedido", request.request);

    const onUpdate = async() => {
        let status='';
        if (request.request.status==='pending'){
            status='accomplished';
            setStatusRequest(status);
        }
        if (request.request.status==='accomplished'){
            status='retired';
            setStatusRequest(status);
        }
        if (request.request.status==='retired'){
            status='delivered';
            setStatusRequest(status);
        }
        if (request.request.status==='delivered'){
            status='finished';
            setStatusRequest(status);
        }
    
        console.log("status", status);
        console.log('id', idRequest);
        try {
            await API.put( `/requests/status/${idRequest}`, {
                status: status,
            } );
            

        } catch( error ) {
            console.error('You have an error in your code or there are Network issues.',error);
            message.error( translateMessage( error.message ) );
        }

    };

    

    return (
        <>
        <IonList>
            {
                requests.map( ( orders, i ) => (
                    <IonItem key={i} onClick={()=>handleShowDetail(i)}>
                        {orders.status==='pending'
                        ?<IonIcon slot="end" icon={alertCircle} style={{width:"40px", height:"40px", color:"red"}}/>
                            :orders.status=== 'accomplished'
                            ?<IonIcon slot="end" icon={cart} style={{width:"40px", height:"40px", color:"orange"}}/>
                                :orders.status==='retired'
                                ?<IonIcon slot="end" icon={bagHandle} style={{width:"40px", height:"40px", color:"blue"}}/>
                                    :orders.status==='delivered'
                                    ?<IonIcon slot="end" icon={bagCheck} style={{width:"40px", height:"40px", color:"green"}}/>
                                        :<IonIcon slot="end" icon={checkmarkCircle} style={{width:"40px", height:"40px", color:"green"}}/>
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
                                ?<IonButton style={{margin:'auto', display:'block' }}  htmlType='submit' onClick={onUpdate}>
                                    Poner en Realizado
                                </IonButton>
                                :request.request.status==='accomplished'
                                ?<IonButton style={{margin:'auto', display:'block' }}  htmlType='submit' onClick={onUpdate}>
                                    Pedido por Retirar
                                </IonButton>
                                :request.request.status==='retired'
                                ?<IonButton style={{margin:'auto', display:'block' }}  htmlType='submit' onClick={onUpdate}>
                                    Pedido para Entregar
                                </IonButton>
                                :request.request.status==='delivered'
                                ?<IonButton style={{margin:'auto', display:'block' }}  htmlType='submit' onClick={onUpdate}>
                                    Finalizar Pedido
                                </IonButton>
                                :<IonButton style={{margin:'auto', display:'block' }}  htmlType='submit' onClick={onUpdate}>
                                    Pedido Finalizado
                                </IonButton>
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
                                {request.request.status==='pending'
                                    ?<IonCol><strong>Estado: </strong> Pendiente</IonCol>
                                    :request.request.status==='accomplished'
                                    ?<IonCol><strong>Estado: </strong> Realizado</IonCol>
                                    :request.request.status==='retired'
                                    ?<IonCol><strong>Estado: </strong> Retirado</IonCol>
                                    :request.request.status==='delivered'
                                    ?<IonCol><strong>Estado: </strong> Entregado</IonCol>
                                    :<IonCol><strong>Estado: </strong> Finalizado</IonCol>
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
        </>
    );
}

export default NewRequest;