import {useProducts} from "../data/useProducts";
import {Row,Col, Skeleton} from "antd";
import Card from "antd-mobile/es/card";
import React, {useState} from "react";
import ShowError from "./ShowError";
import {
    IonCard, IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid,
    IonItem,
    IonRow, IonToolbar,
} from "@ionic/react";
import {useSearchProduct} from "../data/useSearchProduct";
import SearchProduct from "./SearchProduct";
import Search from "antd/es/input/Search";


const ProductClientList = () => {

    const { products, isLoading, isError, mutate } = useProducts();
    const [search, setSearch]=useState('');

    const {searchProduct}=useSearchProduct(search);

    console.log('search', searchProduct);


    console.log("productos", products);

    if( isLoading ) {
        return <Row justify='center' gutter={ 30 }>
            {
                [ ...new Array( 9 ) ].map( ( _, i ) =>
                    <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
                        <div style={ { textAlign: 'center' } }>
                            <Skeleton.Image style={ { width: 200 } } />
                            <Card title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if( isError ) {
        return <ShowError error={ isError } />;
    }

    const onSearch = value =>{
        console.log('producto', value);
        setSearch(value);
    };

    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonToolbar>
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    </IonToolbar>

            {
                searchProduct ?
                    <SearchProduct searchProduct={searchProduct}/>
                    :
                    products.map((product,i)=>(
                    <IonCol key={i}  size="6">
                    <IonCard>
                            <IonItem >
                                <img src={ `http://localhost:8000/storage/${ product.image }` }
                                     style={{height: "100px", width:"100px", align: "center"}}/>
                            </IonItem>

                        <IonCardContent>
                            <IonCardSubtitle>{product.price}</IonCardSubtitle>
                            <IonCardTitle>{product.name}</IonCardTitle>
                        </IonCardContent>
                    </IonCard>
                    </IonCol>
                ))
            }
                </IonRow>
            </IonGrid>
        </>
    );
};

export default ProductClientList;