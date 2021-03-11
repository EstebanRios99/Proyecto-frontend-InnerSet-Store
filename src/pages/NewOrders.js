import {useRequests} from "../data/useRequests";
import {IonItem, IonLabel, IonList, IonProgressBar, IonSkeletonText, IonThumbnail} from "@ionic/react";
import ShowError from "../components/ShowError";
import React from "react";
import moment from 'moment';

const NewOrders = () => {
    const { requests,isLoadingRequest,isErrorRequest} = useRequests();

    if( isLoadingRequest) {
        return <>
            <IonList>
                <IonItem>
                    <IonThumbnail slot={"start"}>
                        <IonSkeletonText />
                    </IonThumbnail>
                    <IonLabel>
                        <IonSkeletonText />
                    </IonLabel>
                </IonItem>
            </IonList>
            <IonList>
                <IonItem>
                    <IonThumbnail slot={"start"}>
                        <IonSkeletonText />
                    </IonThumbnail>
                    <IonLabel>
                        <IonSkeletonText />
                    </IonLabel>
                </IonItem>
            </IonList>
        </>
    }

    if( isErrorRequest) {
        return <ShowError error={ isErrorRequest } />;
    }

    return (
     <>
         <IonList>
             { requests ?
                 requests.filter(i => i.date === moment().format('YYYY-MM-D')).map( ( request, i ) => (
                     <IonItem key={i} >
                         <IonLabel>
                             <div><p><strong>N° de pedidos: </strong>{request.id}</p></div>
                             <div><p><strong>Total: </strong>{request.total.toFixed(2)}</p></div>
                             <div><p><strong>Estado: </strong>{request.status === "pending"
                                 ? "Pendiente"
                                 : request.status=== "accomplished"
                                     ? "Realizado"
                                     : request.status === "retired"
                                         ? "En camino"
                                         : request.status === "delivered"
                                             ? "Entregado"
                                             : ""}</p></div>
                             <IonProgressBar style={{height: "15px"}} value={
                                 request.status === "pending"
                                     ? 0.25
                                     : request.status=== "accomplished"
                                     ? 0.5
                                     : request.status === "retired"
                                         ? 0.75
                                         : request.status === "delivered"
                                             ? 1
                                             : 0
                             }
                             />
                         </IonLabel>
                     </IonItem>
                 ))
                 : ""
             }
         </IonList>
     </>
    )
}
export default NewOrders;

