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

    const {requests}=useRequestsByUser();
    const [data, setData]= useState([]);
    const [popoverState, setpopoverState] = useState(false);
    const [newState, setnewState] = useState(true);

    useEffect ( () => {
        if (requests && newState){
            const newData= requests.filter(i => i.status  === 'pending' );
            console.log('nueva lon ', newData.length);
            setData(newData);
            setnewState(false);
        }
    });

    const handleStatus = () =>{
        setpopoverState(true);
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
            onDidDismiss={() => setpopoverState(false)}>
                <div style={{background:'#3880ff'}}><h3 style={{'text-align':'center'}}>Su Orden ha sido Recibida</h3></div>
                {
                    data.map((orders, i)=>(
                        <IonList key={i}>
                            <IonItem> Orden Nº {orders.id}
                            <br/> Estado de orden: {orders.status} </IonItem>
                        </IonList>
                    ))
                }       
            </IonPopover>
    </>
    )};

export default ClientProductsPage;
