Coding Factory 9 <br><br>
Full Stack Project <br>
Author: Karaiskou Anna Eirini  
---
### 🛈︎ Description:
This project implements an e-commerce web application that simulates an online store.  

### 🛈︎ Key Features: 
- Responsive Web Design  

- User Authentication:  
    - User registration and login is done securely using JWT authentication.  
    - User sessions are managed via JSON Web Tokens (JWT)  
    - User passwords are hashed using BCrypt  

- Role-Based Access Control:  
    Available roles:  
    - Customer: Can browse products, create favorites list, create cart, create order.  
    - Admin: Can manage users status, orders status and the product catalog (CRUD Operations).  

- Search & Filtering
    Search: Customers are able to search products by product id, product name.  
    Filters: Customers are able to filter products by product category, price range.  

- Shopping Cart:
    Customers can add products to their shopping cart, adjust quantities, and remove items.  
    The cart is persistent for users that have a customer account.  

- Favorites System:  
    Customers can mark their favorite products for quick access via their profile.  

- Checkout & Order Creation  
    Customers are able to proceed with ordering the items that have been added to cart.  

- Order History  
    Customers are able to view a list of their orders, including details like products, quantities and order status.  

### 🛈︎ Architecture  
The application follows a client-server architecture:  
```text
┌────────────────────────────┐ 
│ Frontend | React           │   
└────────────────────────────┘
            ▲
            │ RESTful APIs
            ▼ 
┌────────────────────────────┐ 
│ Backend | Java Spring Boot |         
└────────────────────────────┘
            ▲
            │ Spring Data JPA / Hibernate
            ▼ 
┌────────────────────────────┐   
│ Database | MySQL           | 
└────────────────────────────┘    
```

### 🛈︎ Technology stack:  
- Backend:  
  - Java: Used to implement business logic.
  - Maven: Used for dependencies management.
  - Spring Boot: Used to implement RESTful APIs and application configuration.
  - Spring Security: Used to implement JWT authentication and role-based authorization.
  - Spring Data JPA: Used to implement MySQL integration and management of database entities.  

- Frontend:
  - React: Used to implement frontend logic.
  - Tailwind/Daisy UI: Used for utility styling & components library.
  - Axios: Used to make HTTP requests to RESTful APIs.
  - CSS: Used for custom styling.  

- Database:
    MySQL: Relational RDBMS.

    Database Design - Main Entities

### 🛈︎ Utilities  
- Version control  
    - Git  
    - GitHub  

- Spring Boot project initialization  
    - Spring Initializr  

- Local Server package  
    - Vite (Fronted)  
    - XAMPP (Backend)  

- RESTful APIs  
    - Postman  

### 🛈︎ Testing  
- Frontend  
    - Manual tests  

- Backend  
    - Unit tests  
    - Integration tests  
    - RESTful API tests  

### 🛈︎ Distribution & Deployment:    
 - Docker  
    Run docker-compose up --build from root folder  

### 🛈︎ Documentation  
- Java Doc: localhost:8080/target/site/apidocs/index.html
- Swagger: localhost:8080/swagger-ui/index.html  

### 🛈︎ Contributions:  
- Images: https://unsplash.com
- Icons: https://www.flaticon.com
- Logo: https://www.freelogodesign.org/  
