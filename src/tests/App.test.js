import React from 'react';

test('Actualizar la cantidad y precio del carrito', () => {
  let total = 0;
  let quantity=3;
  let cart=[{cartId:0,cartPrice:3,cartQuantity:1,},
  {cartId:1,cartPrice:4,cartQuantity:1,},
  {cartId:2,cartPrice:7,cartQuantity:1,},
  {cartId:3,cartPrice:1,cartQuantity:1,}];
  console.log("nuevaCantidad", quantity);
  for (let i=0; i < cart.length; i++){
      if (i === cart[i].cartId){
          cart[i].cartPrice = parseFloat(((cart[i].cartPrice/cart[i].cartQuantity) * quantity).toFixed(2));
          cart[i].cartQuantity = quantity;
      }
      total = total + parseFloat(cart[i].cartPrice);
  }
  console.log("cart",cart)
  expect(total).toBe(45);
});