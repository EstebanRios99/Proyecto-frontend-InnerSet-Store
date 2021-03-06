const publicRoutes = {
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  USERS: '/usuarios',
  USERS_ID: `/usuario/:id`,
  //HOME: '/',
  EMAIL: '/activacion',
};

const privateRoutes = {
  LOGOUT: '/logout',
  PRIVATE: '/privada',
  CLIENTPRODUCTS: '/client-products',
  OWNERPRODUCTS: '/owner-products',
  REGISTERPRODUCT: '/register-product',
  DAILYORDER: '/daily-order',
  PROFILE: '/profile',
  NEWORDER: '/neworder',
  REPORTS: '/reports',
  
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;