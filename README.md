# The Clothing Store Project

* This is a full-stack app for a small online clothing store with authentication.
* Website: [https://clothing-store-mu.vercel.app/](https://clothing-store-mu.vercel.app/)
* Stack: React, Next.js, Material UI,  HTML, CSS, Framer Motion, Node.js, MongoDB, NextAuth, bryptjs


![image](https://github.com/i-sviridov/i-sviridov/blob/6c54b3314a4fa3786a04c4f91a6940f36475ee60/clothing-store-files/first-load.gif)

## Description


Clothing Store is a full-stack application that is made with Next.js.

The application has an <b>authentication</b>, which is implemented via a custom form on the frontend and the NextAuth package on the backend. User input verification is handled both by the frontend and the backend, providing the best possible user experience for error handling.
Should one not want to create a new account, there is a demo account "TestUser" available, and its credentials are shown as helper text below the input fields.


![image](https://github.com/i-sviridov/i-sviridov/blob/6c54b3314a4fa3786a04c4f91a6940f36475ee60/clothing-store-files/authentication.gif)


On the webpage, the user can use various <b>filters</b> to sort the items by price or category as desired.
![image](https://github.com/i-sviridov/i-sviridov/blob/7f9b6a4a77e2ea2150f86d42bbba73c981b26640/clothing-store-files/filter.gif)


The user of an application can add items to the <b>cart</b> or mark them as <b>favorites</b>. Once the item is added to the cart, a new menu is opened, where one can check what is in the cart, adjust the quantity if needed, and place an order. If the user is authenticated, he will be redirected to the profile page; otherwise, the user has to enter his credentials since the <b>profile route is protected</b>.


![image](https://github.com/i-sviridov/i-sviridov/blob/6c54b3314a4fa3786a04c4f91a6940f36475ee60/clothing-store-files/cart-favorites.gif)

Finally, on the <b>profile page</b> user can browse the <b>orders</b> that were previously placed as well as <b>change the current password</b> and <b>logout</b>. User input verification regarding the old and new passwords is done both by the frontend and the backend. After the user logs out, the auth token is removed from the cookies, therefore, protected routes become no longer accesible.

![image](https://github.com/i-sviridov/i-sviridov/blob/6c54b3314a4fa3786a04c4f91a6940f36475ee60/clothing-store-files/profile%20page.gif)



The application supports the following API routes:

| /api/auth/signup|
|-----------------------------------------------------------------------------------------------------------------------------|
| `{` <br /> ` method: 'POST',` <br />` headers: { 'Content-Type': 'application/json' },` <br /> ` body: JSON.stringify({username, password})` <br />`}`|




| /api/change-password|
|-----------------------------------------------------------------------------------------------------------------------------|
|  `{` <br /> ` method: 'PATCH', `<br />` headers: { 'Content-Type': 'application/json' }, `<br /> ` body: JSON.stringify({oldPassword, newPassword})` <br /> `}` |




| /api/add-order |                                                                                                             
|-----------------------------------------------------------------------------------------------------------------------------|
| `{` <br /> ` method: 'POST',` <br />` headers: { 'Content-Type': 'application/json' },` <br /> ` body: JSON.stringify(items)` <br />`}` |


## How to install

1. Download the zip file or clone the repo
2. Install and run

```sh
npm install
npm run dev
```

