

const publicRoutes = {
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  USERS: '/usuarios',
  USERS_ID: `/usuario/:id`,
  //HOME: '/',
  ABOUT: '/acerca-de',
  ANTD: '/antd',
  PROFILE: '/perfil',
};

const privateRoutes = {
  LOGOUT: '/logout',
  PRIVATE: '/privada',
  CLIENTPRODUCTS: '/client-products',
  OWNERPRODUCTS: '/owner-products',
  REGISTERPRODUCT: '/register-product',
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;