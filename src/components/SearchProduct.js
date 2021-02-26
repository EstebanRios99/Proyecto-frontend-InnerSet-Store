import {
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonItem,
} from "@ionic/react";
import React from "react";



const SearchProduct = (searchProduct) => {

    console.log('busqueda', searchProduct);

    return (
      <>
          {
              searchProduct.searchProduct ?
              searchProduct.searchProduct.map((search, i)=>(
                  <IonCol key={i}  size="6">
                      <IonCard>
                          <IonItem >
                              <img src={ `http://localhost:8000/storage/${ search.image }` }
                                   style={{height: "100px", width:"100px", align: "center"}}/>
                          </IonItem>

                          <IonCardContent>
                              <IonCardSubtitle>{search.price}</IonCardSubtitle>
                              <IonCardTitle>{search.name}</IonCardTitle>
                          </IonCardContent>
                      </IonCard>
                  </IonCol>
              )):
                  "Cargando..."
          }

      </>
    );
}
export default SearchProduct;