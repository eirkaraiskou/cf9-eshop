CODING FACTORY 9
Full Stack E-Commerce Web Application

Author: Karaiskou Anna Eirini

🛈 Description

This project implements a full-stack e-commerce web application that simulates an online store.

The application provides customers with functionality for browsing and searching products, managing favorites and shopping carts, creating orders, and viewing their order history.

Administrators have additional privileges for managing users, orders, and the product catalog.

🛈 Key Features
Responsive Web Design

The application provides a responsive user interface that adapts to different screen sizes and devices.

User Authentication

User registration and login are implemented securely using JWT authentication.

User sessions are managed using JSON Web Tokens (JWT).
User passwords are securely hashed using BCrypt.
Authentication and authorization are handled using Spring Security.
Role-Based Access Control

The application supports two user roles:

Customer

Customers can:

Browse products.
Search for products by ID or name.
Filter products by category and price range.
Add and remove products from their favorites.
Add products to their shopping cart.
Adjust product quantities in their cart.
Remove products from their cart.
Create orders.
View their order history.
View order details and order status.
Admin

Administrators can:

Manage user accounts and user status.
Manage order status.
Manage the product catalog.
Create products.
View products.
Update products.
Delete products.
🛈 Search & Filtering

Customers can search and filter products using the following functionality.

Search

Products can be searched by:

Product ID
Product name
Filters

Products can be filtered by:

Product category
Price range
🛒 Shopping Cart

Customers can manage their shopping cart by:

Adding products to the cart.
Adjusting product quantities.
Removing products from the cart.
Reviewing the products currently in the cart.

The shopping cart is persistent for users with a customer account.

❤️ Favorites System

Customers can mark products as favorites.

Favorite products can be accessed through the customer's profile for quick access.

💳 Checkout & Order Creation

Customers can proceed to checkout after adding products to their shopping cart.

During checkout, the application creates an order containing the selected products and their quantities.

📦 Order History

Customers can view their previous orders.

Each order contains information such as:

Ordered products
Product quantities
Order status
Order details
🛈 Architecture

The application follows a client-server architecture.

┌────────────────────────────┐
│      Frontend | React      │
└────────────────────────────┘
             ▲
             │ RESTful APIs
             ▼
┌────────────────────────────┐
│ Backend | Java Spring Boot │
└────────────────────────────┘
             ▲
             │ Spring Data JPA / Hibernate
             ▼
┌────────────────────────────┐
│       Database | MySQL     │
└────────────────────────────┘

Communication Flow
The React frontend provides the user interface and handles client-side logic.
The frontend communicates with the backend through RESTful APIs.
The Spring Boot backend handles business logic, authentication, authorization, and API requests.
Spring Data JPA / Hibernate provides persistence and communication with the MySQL database.
The MySQL database stores application data such as users, products, carts, favorites, and orders.
🛈 Technologies
Backend
Java — Used to implement the application's business logic.
Maven — Used for dependency management and project configuration.
Spring Boot — Used to implement RESTful APIs and application configuration.
Spring Security — Used for authentication and role-based authorization.
JWT — Used for secure user authentication and session management.
BCrypt — Used for secure password hashing.
Spring Data JPA — Used for database access and entity management.
Hibernate — Used as the JPA implementation.
MySQL — Used as the relational database management system.
Frontend
React — Used to implement the frontend and user interface.
Tailwind CSS — Used for utility-based styling.
DaisyUI — Used as a component library for the user interface.
Axios — Used to make HTTP requests to the RESTful APIs.
CSS — Used for custom styling.
Database
MySQL — Relational database management system.
Main Entities

The main entities of the application include:

User
Product
Category
Cart
Cart Item
Favorite
Order
Order Item
🛈 Utilities & Development Tools
Version Control
Git — Used for version control.
GitHub — Used for source code management and repository hosting.
Project Initialization
Spring Initializr — Used to initialize the Spring Boot project.
Local Development
Vite — Used as the frontend development and build tool.
XAMPP — Used for local development and MySQL/database services.
RESTful API Testing
Postman — Used for testing and validating RESTful APIs.
🧪 Testing
Frontend

Frontend functionality was tested using:

Manual testing
User interaction testing
UI and responsive design testing
Backend

Backend functionality was tested using:

Unit tests
Integration tests
RESTful API tests

The tests cover important application functionality such as authentication, authorization, product management, and order-related operations.

🐳 Distribution & Deployment

The application is containerized using Docker.

Docker is used to package and run the frontend and backend applications in containers.

Run the Application

From the project's root directory, run:

docker-compose up --build


This command builds the required Docker images and starts the application's services.

📚 Documentation
JavaDoc

JavaDoc is used to document the Java source code and provide information about classes, methods, and application components.

Swagger / OpenAPI

The backend RESTful APIs are documented using Swagger.

When the application is running, Swagger UI is available at:

http://localhost:8080/swagger-ui/index.html

🖼️ Resources & Contributions

The project uses the following external resources:

Images: Unsplash
Icons: Flaticon
Logo: FreeLogoDesign
👩‍💻 Author

Karaiskou Anna Eirini

📄 License

This project was developed as part of the Coding Factory 9 full-stack project.
