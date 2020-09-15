const publicRoutes = {
    LOGIN: '/ingreso',
    PRODUCTS: '/productos',
    NEWPRODUCT: '/newproducts',
    REGISTER: '/registro',
    //ARTICLES: '/articulos',
    //USERS: '/usuarios',
    //USERS_ID: `/usuario/:id`,
    //HOME: '/',
    //ABOUT: '/acerca-de',
    //ANTD: '/antd',
    //PROFILE: '/perfil'
  };
  
  const privateRoutes = {
    LOGOUT: '/logout',
    PRIVATE: '/privada',
    //ARTICLE_ID: '/articulo/:id'
  };
  
  const Routes = {
    ...publicRoutes,
    ...privateRoutes
  };
  export default Routes;