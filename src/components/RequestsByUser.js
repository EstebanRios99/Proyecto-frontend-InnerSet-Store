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
    IonGrid, IonRow, IonCol, IonButton
} from "@ionic/react";
import {useRequest} from "../data/useRequest";
import {useDetailRequest} from "../data/useDetailRequest";
import "../theme/toolbar.css";
import {Modal} from "antd";
import moment from "moment";


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
                  requestsByUser.filter(i => i.date  === moment().format('YYYY-MM-D')).map( ( requests, i ) => (
                  <IonItem key={i} onClick={()=>handleShowDetail(requests)}>
                       <IonLabel>
                          <div><p><strong>N° de pedidos: </strong>{requests.id}</p></div>
                          <div><p><strong>Total: </strong>{requests.total.toFixed(2)}</p></div>
                          <div><p><strong>Estado: </strong>{requests.status === "pending"
                              ? "Pendiente"
                              : requests.status=== "accomplished"
                                  ? "Realizado"
                                  : requests.status === "retired"
                                      ? "En camino"
                                      : requests.status === "delivered"
                                          ? "Entregado"
                                          : ""}</p></div>
                          <IonProgressBar style={{height: "15px"}} value={
                              requests.status === "pending"
                                  ? 0.25
                                  : requests.status=== "accomplished"
                                  ? 0.5
                                  : requests.status === "retired"
                                      ? 0.75
                                      : requests.status === "delivered"
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
                                                          <p align={"center"}>{detail.finalprice.toFixed(2)}</p>
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
export default RequestsByUser;