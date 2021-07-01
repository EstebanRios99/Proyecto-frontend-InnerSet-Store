import React, {useState, useEffect} from 'react';
import {
    IonHeader, IonIcon, IonPopover,
    IonPage, IonItem, IonList,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import ProductClientList from "../components/ProductClientList";
import '../theme/app.css';
import Layouts from '../components/Layout';
import '../theme/toolbar.css';
import {useRequestsByUser} from "../data/useRequestsByUser";
import {notifications} from "ionicons/icons";


const ClientProductsPage = () => {

    const {requestsByUser}=useRequestsByUser();
    const [data, setData]= useState([]);
    const [popoverState, setPopoverState] = useState(false);
    const [newState, setNewState] = useState(true);

    useEffect ( () => {
        if (requestsByUser && newState){
            const newData= requestsByUser.filter(i => i.status  === 'pending' );
            console.log('nueva lon ', newData.length);
            setData(newData);
            setNewState(false);
        }
    });

    console.log("pedidos", requestsByUser);

    const handleStatus = () =>{
        setPopoverState(true);
    }

    return    (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle id={"letter"}>Lista de Productos </IonTitle>
                        {data.length > 0
                        ?<IonIcon slot={"end"} onClick={handleStatus} icon={notifications} style={{color:'red',width:"25px", height:"25px", 'margin-right':'8px'}} />
                        :<IonIcon slot={"end"} icon={notifications} style={{color:'white',width:"25px", height:"25px", 'margin-right':'8px'}}/>
                        }
                    </IonToolbar>
            </IonHeader>
            <ProductClientList/>
        </IonPage>
        <IonPopover isOpen={popoverState} cssClass='my-custom-class'
            onDidDismiss={() => setPopoverState(false)}>
                <div style={{background:'#3880ff'}}><h3 style={{'text-align':'center'}}>Su Orden ha sido Recibida</h3></div>
                {
                    data.map((orders, i)=>(
                        <IonList key={i}>
                            <IonItem> Orden Nº {orders.id}
                            <br/> Estado de orden: {orders.status === "pending" ? "Pendiente" : ""} </IonItem>
                        </IonList>
                    ))
                }       
            </IonPopover>
    </>
    )};

export default ClientProductsPage;
