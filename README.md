# Groceries App Project

A groceries app built with React that focuses on browsing and organizing shopping needs. Users can explore products, search and filter items, and manage a virtual cart. The app emphasizes component-based design and smooth state management to deliver an intuitive user experience without checkout functionality.

### Groceries App - Login Page

A page that allows users to login to the site. If the user is not a member they will recieve an error message if they have not provided correct credentials.

!["Screenshot of Login Page"](https://github.com/dburnham12/COMP2013-Project-3/blob/master/Screenshots/LoginPage.png)

### Groceries App - Register Page

A page that allows users to register if they are not already a member. Usernames must be unique and an error message will be provided if the user already exists.

!["Screenshot of Register Page"](https://github.com/dburnham12/COMP2013-Project-3/blob/master/Screenshots/RegisterPage.png)

### Groceries App - Main Page

The main page of the app which allows users to view products and add/remove them to a virtual cart. If a user is an admin they will also be able to edit, delete, and add new products by clicking on the appropriate buttons on this page

#### Admin View

!["Screenshot of Main Page (Admin View)"](https://github.com/dburnham12/COMP2013-Project-3/blob/master/Screenshots/MainAdmin.png)

#### Non Admin View

!["Screenshot of Main Page (Non Admin View)"](https://github.com/dburnham12/COMP2013-Project-3/blob/master/Screenshots/MainNoAdmin.png)

### Groceries App - Add Product Page

This page allows administrators to add new products to the list of available products. Once added these products will be available and are able to be added to the cart.

!["Screenshot of Add Product Page"](https://github.com/dburnham12/COMP2013-Project-3/blob/master/Screenshots/AddProduct.png)

### Groceries App - Edit Product Page

This page allows administrators to edit products currently in the list of available products. After an edit is complete these changes will be reflected on the main page of the app.

!["Screenshot of Edit Product Page"](https://github.com/dburnham12/COMP2013-Project-3/blob/master/Screenshots/EditProduct.png)

## Getting Started

fronend:

-   Install all dependencies (using the `npm install` command).
-   Run the development client using the `npm run dev` command.

backend:

-   Install all dependencies (using the `npm install` command).
-   Initialize a database to store Groceries App data named products in MongoDB.
-   Create and .env with a SECRET_KEY and DB_URI.
-   Run the development web server using the `node --watch server` command.

## Dependencies

frontend:

-   axios
-   js-cookie
-   jwt-decord
-   react
-   react-dom
-   react-router-dom

Server:

-   bcryptjs
-   cors
-   dotenv
-   express
-   jsonwebtoken
-   mongoose
