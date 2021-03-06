import React, {useState} from "react";
import {useRequestsByUser} from "../data/useRequestsByUser";
import ShowError from "./ShowError";
import {
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonSkeletonText,
    IonProgressBar,
    IonGrid, IonRow, IonCol, IonButton, IonChip,IonIcon
} from "@ionic/react";
import {useRequest} from "../data/useRequest";
import {useDetailRequest} from "../data/useDetailRequest";
import "../theme/toolbar.css";
import "../theme/requestU.css";
import {Modal} from "antd";
import {chevronDownCircleOutline } from "ionicons/icons";


const RequestsByUser = () => {

    const {requestsByUser, isLoadingRequests, isErrorRequests}=useRequestsByUser();

    const [idRequest, setIdRequest] = useState('');
    const [showDetail, setShowDetail] = useState(false);

    const request = useRequest(idRequest);
    const detailRequest = useDetailRequest(idRequest);

    console.log("pedidos1", requestsByUser);

    if( isLoadingRequests ) {
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

    if( isErrorRequests ) {
        return <ShowError error={ isErrorRequests } />;
    }

    const handleShowDetail=(index)=>{
        const id=index.id;
        setIdRequest(id);
        setShowDetail(true);
    }
    console.log("detalle_pedido", request.request);


    return (
      <>
          <IonList>
              { requestsByUser ?
                  requestsByUser.filter(i => i.status  !== "delivered").map( ( requests, i ) => (
                  <IonItem key={i}>
                       <IonLabel>
                          <div>
                              <p>
                                <strong>N° de pedidos: </strong>{requests.id}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <IonChip id="chip"  onClick={()=>handleShowDetail(requests)}>
                                    <IonIcon  icon={chevronDownCircleOutline} style={{height:"22px", width: "22px"}}/>
                                    <IonLabel>Ver Detalle</IonLabel>
                                </IonChip>
                              </p>
                          </div>
                          <div><p><strong>Total: </strong>{parseFloat(requests.total).toFixed(2)}</p></div>
                          <div><p><strong>Estado: </strong>{requests.status === "new"
                              ? "Nuevo"
                              : requests.status=== "pending"
                                  ? "Pendiente"
                                  : requests.status === "accomplished"
                                      ? "Realizado"
                                      :requests.status === "retired"
                                        ? "Por retirar"
                                        : requests.status === "sent"
                                            ? "Enviado"
                                            : requests.status === "delivered"
                                          ? "Finalizado"
                                          : ""}</p></div>
                          <IonProgressBar style={{height: "15px"}} value={
                              requests.status === "new"
                                  ? 0
                                  : requests.status=== "pending"
                                  ? 0.25
                                  : requests.status === "accomplished"
                                      ? 0.5
                                      : requests.status === "retired"
                                          ? 0.75
                                          : requests.status === "sent"
                                              ? 0.75
                                              :requests.status === "delivered"
                                                ? 1
                                                : 0
                          }/>
                        </IonLabel>
                  </IonItem>
              )) : ""
            }
          </IonList>

          {
              request.isLoading
                  ? <>
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
                  : request.isError
                  ? ""
                  : <>
                      <Modal  title="Detalle del pedido" id={"modal"}
                              visible={showDetail}
                              closable={false}
                              footer={[
                                  <IonButton onClick={()=>setShowDetail(false)} size={"small"}>Cerrar</IonButton>
                              ]}
                      >
                          <IonGrid>
                              <IonRow>
                                  <IonCol><strong>N° de Pedido: </strong><h2 align={"center"}>{request.request.id}</h2></IonCol>
                                  <IonCol><strong>Fecha: </strong> {request.request.date}</IonCol>
                              </IonRow>
                          </IonGrid>
                              {
                                  detailRequest.isLoading
                                      ? <>
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
                                      : detailRequest.isError
                                      ? " "
                                      : <>
                                      <IonList>
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
                                                      <IonLabel >
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
                                                  </IonItem>
                                              ))
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
      </>
    );
}
export default RequestsByUser;