# The Clothing Store Project

* This is a full-stack app for a small online clothing store with authentication.
* Website: [https://clothing-store-mu.vercel.app/](https://clothing-store-mu.vercel.app/)
* Stack: React, Next.js, Material UI,  HTML, CSS, Framer Motion, Node.js,  MongoDB, NextAuth, bryptjs

![image](https://drive.google.com/uc?export=view&id=1yCWfQIx2Wh-NjVImdNo_jAn1CzenR0ku)

## Description


Clothing Store is a full-stack application that is made with Next.js.

The application has an <b>authentication</b>, which is implemented via a custom form on the frontend and the NextAuth package on the backend. User input verification is handled both by the frontend and the backend, providing the best possible user experience for error handling.
Should one not want to create a new account, there is a demo account "TestUser" available, and its credentials are shown as helper text below the input fields.


![image](https://drive.google.com/uc?export=view&id=13FiWvnM4nhT4AKVAOmmyNu0pTtBAUpcW)


On the webpage, the user can use various <b>filters</b> to sort the items by price or category as desired.

![image](https://drive.google.com/uc?export=view&id=1zm9Gt2p5oi6Fk0fnO_8QKgJ96uy4zUPf)

The user of an application can add items to the <b>cart</b> or mark them as <b>favorites</b>. Once the item is added to the cart, a new menu is opened, where one can check what is in the cart, adjust the quantity if needed, and place an order. If the user is authenticated, he will be redirected to the profile page; otherwise, the user has to enter his credentials since the <b>profile route is protected</b>.


![image](https://drive.google.com/uc?export=view&id=1vVYuy9-vl6oEoZtVRjxovKvK7VNhO8fH)


Finally, on the <b>profile page</b> user can browse the <b>orders</b> that were previously placed as well as <b>change the current password</b> and <b>logout</b>. User input verification regarding the old and new passwords is done both by the frontend and the backend. After the user logs out, the auth token is removed from the cookies, therefore, protected routes become no longer accesible.





The application supports the following API routes:

|  /api/auth/signup                                                                                                                          | /api/change-password                                       | /api/add-order                                                                                                             |
|-------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| { <br /> method: 'POST', <br />headers: { 'Content-Type': 'application/json' }, <br /> body: JSON.stringify({username, password}) <br />} | { <br /> method: 'PATCH', <br />headers: { 'Content-Type': 'application/json' }, <br /> body: JSON.stringify({oldPassword, newPassword}) <br />} | { <br /> method: 'POST', <br />headers: { 'Content-Type': 'application/json' }, <br /> body: JSON.stringify(items) <br />} |

The NextAuth package also supports requests to /api/auth/[...nextAuth] to provide built-in signIn and signOut methods, which are being used in this application.




## How to install

1. Download the zip file or clone the repo
2. Install and run

```sh
npm install
npm run dev
```

