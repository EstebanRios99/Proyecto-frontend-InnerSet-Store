# Proyecto-frontend-InnerSet-Store
### Instalación
***
* Clonar el repositorio
* Ejecutar **npm install** para instalar las dependencias
### Configuración de las rutas
***
Dentro de la carpeta *src/constants* se encuentra el archivo *routes.js* donde se establecen todas las rutas que se van a usar para el proyecto.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/1.jpg)  

De la misma manera dentro de la carpeta *src/routes* en el archivo *AppRouter.js* se configuran las rutas 
para que estas se soliciten bajo demanda. Para esto se importan las librerías que se muestran en la siguiente imagen.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/2.jpg)  

Luego se usa el módulo *loadable* que permite dividir los componentes en diferentes archivos js compilados, de esta manera la aplicación puede ir cargando los componentes cuando sean solicitados, es decir cargarán cuando sean usados por el usuario. El objetivo de esto es para mejorar la carga de la aplicación.
En la imagen se puede observar donde se declaran cada uno de los componentes.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/3.jpg)  

El componente *AppRouter* es el que se encarga de renderizar el componente adecuado de acuerdo a la ruta en la que se encuentra la aplicación. 
El método *PublicRoute* llama a las páginas que son accesibles para todos los usuarios mientras que el método *PrivateRoute* es usado para las páginas que son protegidas, valida si la sesión esta activa.  
En la imagen se puede ver como se llaman a cada una de las rutas con el respectivo componente.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/4.jpg)  

### Inicio de sesión
***
Dentro de la carpeta *src/pages* se encuentra el archivo *Login.js* se establece todo el proceso para el inicio de sesión con su respectivo componente, para esto se deben importar las librerías y archivos como se muestran en la imagen.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/5.jpg)  

Dentro de este archivo existe la función asíncrona *onFinish* la cual utiliza la variable *userData* que toma los datos del formulario del inicio de sesión, en donde se usa em método *try* y *catch* para la comunicación con la API.
Dentro del *try* la constante *response* llama a la API y el método *post* con la ruta */login* y se envian los parámetros (*email y password*), luego se utiliza el método *localStorage.setItem* para agregar o actulizar la nueva clave, y el método *JSON.stringify* para transformar un objeto js en un json.
Luego se utiliza el método *Cookies.set* para almacenar el token generado, y el método *API.headers* para enviar dicho token a la cabecera.
Finalmente se utiliza el método *setCurrentUser* para enviar la información y realizar la autenticación.

Dentro del *catch* se implementa un mensaje de error en el caso de que la autenticación no se haya realizado correctamente.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/6.jpg)  

Para la parte del formulario se utiliza un componente *Form* de *AntDesign* a la cual se le asigna un nombre con la propiedad *name*.
Se utiliza el *Form.Item* para cada campo que se necesita, en este caso tenemos el *username* que valida que el campo sea obligatorio y de tipo *email*

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/7.jpg)

Y el *password* valida que el campo sea de tipo contraseña cuyo *Input* tiene la configuración para que si se desea se pueda hacer visible el campo.
Y por último tenemos el botón que es el que se enlaza con el formulario y llama al método *onFinish* para realizar el inicio de sesión.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/8.jpg)  

### Registrar nuevo usuario
***
Dentro de la carpeta *src/pages* se encuentra el archivo *RegisterUser.js* se establece todo el proceso para registrar un nuevo usuario con su respectivo componente, para esto se deben importar las librerías y archivos como se muestran en la imagen.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/9.jpg) 

Dentro de este archivo existe la función asícnrona *onFinish* la cual utiliza la variable *userData* que toma los datos del formulario de registro, en donde se usa el método *try* y *catch* para la coomunicación con la API.
Se crean constantes que toman la información de cada *item* del formulario, luego se llama a la API y el método *post* con la ruta */register* y se le envia cada uno de los parámetros almacenados del formulario, luego se utiliza el método *localStorage.setItem* para agregar o actulizar la nueva clave, y el método *JSON.stringify* para transformar un objeto js en un json.
Se emplea el mismo método *Cookies.set* y el método *API.headers* implementado en el *Login*, se envía la información y se genera un correo de verificación. 

Dentro del *catch* se implementa un mensaje de error en el caso de que no se haya podido registar el usuario.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/10.jpg)  

Para la parte del formulario se utiliza el mismo componente *Form*, con la diferencia de que tenemos los siguientes *Form.Item*
* **name:** donde se valida que el campo este lleno
* **home_number:** donde se valida que el campo este llego y este dentro del rango establecido
* **email:** donde se valida que el campo este lleno y sea de tipo *email*
* **password:** donde se valida que el campo este lleno y sea de mínimo 6 caracteres
* **password_confirmation:** que depende el campo *password* donde se valida que que el campo este lleno y sea igual al campo *password*  

Y por último tenemos el botón que es el que se enlaza con el formulario y llama al método *onFinish* para realizar el registro de usuario.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/11.jpg)  
![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/12.jpg)  
![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/13.jpg)  
![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/14.jpg)

## Cliente
### Página de productos y componente carrito de compras
***
Dentro de la carpeta *src/pages* se encuentra el archivo *ClientProducts.js* se establece la pagina de productos y se utiliza el componente para traer los productos y el carrito de compras, para esto se deben importar las librerías y archivos como se muestran en la imagen.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/15.jpg)  

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/16.jpg)  

Dentro de la carpeta *src/components* se encuentra el archivo *ProductClientList.js* se establece el componente para traer los productos y el carrito de compras, para esto se deben importar las librerías y archivos como se muestran en la imagen.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/17.jpg)  

Dentro de este componente se utilizan las constantes que se muestran en la imagen. 

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/18.jpg)  

Dentro del componente existe el método *useEffect* el cual depende del carrito de compras y se encarga de actualizar el subtotal del carrito.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/19.jpg)  

También existen el método *onSearch* el cual recibe el *value* y se encarga de realizar la búsqueda de productos y el método *addCart* que recibe un *index* (producto seleccionado) en donde se almacena la información necesaria para mostrar en el carrito, esta información se guarda en un arreglo que vendría a ser la lista de productos del carrito.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/20.jpg)  

El método *updateCart* recibe la cantidad del producto a través de un *querySelector*, luego hace la actualización del total para mostrar la nueva información, mientras que el método *deleteCart* recibe un *index* el cual a través de un *filter* elimina el producto que ya no se desea.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/21.jpg)  

El método *onCreate* es una función asíncrona que permite realizar el pedido, para esto primero se valida que el carrito tenga productos, después de esto se comprueba que cada uno de los productos tenga el stock suficiente para realizar el pedido, para esto se crea un carrito auxiliar y un *if* que se encarga de las comparaciones, si el tamaño del carrito auxiliar es igual al del carrito original se procede con  la compra.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/22.jpg)  

Si el tipo de entrega es *deliver* a la constante *surcharge* se le asigna el 10% del subtotal de la compra y a la constante *total* se le asigna la suma del subtotal más el *surcharge*, luego se utiliza el método *API.post* con la ruta */requests* y se le envia los parámetros:
* **date:** seutiliza la función *momentjs*
* subtotal
* type
* surcharge
* total
* **status:** el cual por defecto será pendiente  

Luego se utiliza el método *afterCreate* para actualizar la lista de pedidos, si la compra no se puede realizar el método *catch* enviará un mensaje de error.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/23.jpg)  

Si el tipo de entrega es *withdraw* el proceso es similar con la diferencia de que el *surcharge* será igual a 0, si el *type* no coincide con ninguna de las opciones se enviará un *Alert* que pedirá que seleccione el tipo de entrega.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/24.jpg)  

Luego lo que se hace es generar el detalle del pedido, para esto se llama al método *API.post* con la ruta */requests/id/details* con los parámetros:
* product_id
* quantity
* final_price

Mientras para actualizar el stock se utiliza el método *API.put* con la ruta */products/id* en donde después de in *if* que compara el *id* del producto dentro del carrito con el *id* de la lista de productos, si esto se cumple se actualiza el parámetro *stock*.
Despues de esto se cerrará el carrito, la lista de prodcutos se vaciará al igual que el tipo de entrega y se mostrará un *Alert* que confirma la compra.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/25.jpg)  

Si no se cumple la validación de que exita la cantidad solicitada se desplegará un *Alert*, de la misma manera si el carrito esta vacio se mostrará otro *Alert*.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/26.jpg)  

El método *afterCreate* es una función asíncrona el cual actualiza la lista de pedidos a través de un *mutate*, mientras que el método *handleShowCart* es el que se encarga de mostrár el carrito.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/27.jpg)  

Para la parte de la barra de búsqueda se utiliza el componente *Search* de *AntDesign* el cúal depende del método *onSearch*, mientras que para el carrito de compra se utiliza un icono de *ionic* el cual depende de un *onClick* que llama al método *handleShowCart*.

Para mostrar los productos que se obtienen a través de la búsqueda se utiliza un *Card* el cual utiliza el objeto *searchProduct* al cual se le aplica un *filter* para eliminar los productos cuyo stock sea 0 y un *map* para generar una tarjeta por producto.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/28.jpg)  

En caso de que el arreglo de *searchProduct* se utiliza el objeto *products* para mostrar los prodcutos de la misma manera que ya se menciono.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/29.jpg)  

Para el caso del carrito de compras se utiliza el componente *Modal* de *AntDesign* el cual esta configurado como se muestra en la imagen.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/30.jpg)  

Para desplegar la lista de los productos dentro del carrito se utiliza el arreglo *cart* y a través de un *map* se muestra la imagen del producto *IonicAvatar*, el nombre, el *InputNumber* que es el que permite ingresar la cantidad de productos, el precio y dos iconos, el uno que permite actualizar la cantidad (*arrowUpCircleOutline*) y el otro eliminar producto de la lista (*trashOutline*)

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/31.jpg) 

Para la parte de mostrar el subtotal se utiliza un *IonLabel*, para la parte de seleccionar el tipo de entrega se utiliza un *IonSelect* y un *IonLabel* el cual se mantiene en 0 si el tipo de entrega es **En la tienda* mientras que si es **A domicilio** este valor cambia y depende del subtotal.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/32.jpg)  

Finalmente si el pedido es **A domicilio** aparecerá un mensaje el cual informa que se cobrará un 10% adicional y un *IonLabel* que muestra el total final el cual cambiará dependiendo del tipo de entrega.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/33.jpg) 

Por último se presenta cada uno de los *Alerts* que se desplegará de acuerdo a cada una de las situaciones que ya se han mencionado anteriormente en el método *onCreate*.

![Image text](https://raw.githubusercontent.com/EstebanRios99/Proyecto-frontend-InnerSet-Store/dev/Capturas/34.jpg)


