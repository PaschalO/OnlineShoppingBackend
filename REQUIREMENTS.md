# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- ShowAllProducts - `/products` [GET]
- ShowSingleProducts - `products/:id` [GET]
- CreateProduct [token required] -  `/products` [POST]
- [OPTIONAL] Top 5 most popular products `/products/product/top-five-popular-products` [GET]
- [OPTIONAL] Products by category (args: product category) `/products/category/:category` [GET]
- [OPTIONAL] Delete [token required, admin permission] product by id (args: product id) `/products/:id` [DELETE]

#### Users
- showAllUsers [token required] `/users` [GET]
- showSingleUser [token required] `/users/:id` [GET]
- createUser - `/users` [POST]
- deleteAllUsers [token required, admin permission] -`/users` [DELETE]
- deleteUser [token required, admin permission] - `/users/:id` [DELETE]

#### Orders
- Current Order by user (args: user id)[token required] `/orders/:id` [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] `/orders/users/:id/:status` [POST]
- showAllOrders [token required] - `/orders` [GET]

#### Order_Products
- addProductOrder `/orders/quantity` [POST]


## Data Shapes
#### Product
-  id [SERIAL PRIMARY KEY]
- name [VARCHAR]
- price [FLOAT]
- [OPTIONAL] category [VARCHAR]
- DESCRIPTION [TEXT]
- image [VARCHAR]

#### User
- id [SERIAL PRIMARY KEY] 
- firstName [VARCHAR]
- lastName [VARCHAR]
- password [VARCHAR]
- email [VARCHAR]
- role [VARCHAR]

#### Orders
- id [SERIAL PRIMARY KEY]
- id of each product in the order [FOREIGN KEY TO PRODUCT ID]
- quantity of each product in the order [INTEGER]
- user_id [FOREIGN KEY TO USER ID]
- status of order (active or complete) [CHAR]

