# APA1 Supa Task Frontend

## Project Overview
This project for an open ending CRUD app, what the app does is your choice but it should implement CRUD functionality

## Setup Instructions
1. Install dependencies: Run `npm install` in your terminal to install all necessary dependencies.
2. Set up Supabase:
   - Create a free Supabase account if you don't have one
   - Create a new project in your Supabase dashboard
   - Copy your Supabase URL and anon key into the `.env` file (use `.env.example` as a template)
3. Start the development server: Run `npm run dev` in your terminal.
4. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Database Management
The project uses Supabase as the database provider:

- The database tables will be created automatically based on the schema definitions in the codebase.
- You can manually seed test data through the Supabase dashboard or use the provided script: `npm run database:seed`.
- To view and manage your data directly, use the Supabase dashboard interface.

## Testing
This is an open-ended project, and you may choose your preferred testing approach:
- Manual testing through the application interface
- Leveraging Supabase's built-in Row Level Security (RLS) policy testing
- Writing custom unit or integration tests with a framework of your choice (Jest, Mocha, etc.)

## Database Schema

### Product (Base table)
- id: UUID (Primary Key)
- name: String
- price: Float
- quantity: Integer
- type: String (enum: 'clothing', 'electronics', 'books', 'groceries', 'toys')
- created_at: Timestamp
- updated_at: Timestamp

### Clothing
- product_id: UUID (Foreign Key)
- size: String
- material: String
- color: String
- brand: String
- gender: String

### Electronics
- product_id: UUID (Foreign Key)
- brand: String
- warranty: String
- model: String
- power_consumption: Float
- dimensions: String

### Books
- product_id: UUID (Foreign Key)
- author: String
- isbn: String
- genre: String
- publication_date: Date

### Groceries
- product_id: UUID (Foreign Key)
- expiration_date: Date
- nutritional_info: String
- organic: Boolean

### Toys
- product_id: UUID (Foreign Key)
- age_group: String
- material: String
- battery_operated: Boolean

## Assignment Objectives
- Extend and enhance the existing web application
- Apply database and frontend development principles using Supabase
- Follow good programming standards
- Develop and execute a testing strategy appropriate for your implementation
- Use GitHub effectively for collaboration and documentation
- Prepare for a viva to explain project design and code implementation

## TODO

### Core Functionalities
1. Implement full CRUD operations for all product types using Supabase's JavaScript client
2. Create a unified interface to manage all product types
3. Implement the Supabase authentication system for basic user management
4. Create appropriate database relationships and constraints using Supabase's SQL editor

### Extend Functionalities
1. Implement the models for all product types (Clothing, Electronics, Books, Groceries, Toys)
2. Update the controllers and views to handle all product types
3. Enhance the frontend to display and manage the various product types
4. Implement sorting and filtering options using Supabase queries
5. Extend currency conversion functionality to support multiple currencies (EUR, JPY, CAD, AUD)
   - Refer to [Exchange Rate API](https://www.exchangerate-api.com/docs/free)
6. Develop a dashboard showing current stock status and key metrics

### Good Programming Standards
1. Structure your code for readability and modularity
2. Use consistent naming conventions for Supabase tables and columns
3. Implement proper error handling for Supabase operations
4. Document your code thoroughly

### Testing
Choose one or more testing approaches:
1. Document manual testing procedures and results
2. Leverage Supabase's RLS policies and test them
3. Write unit/integration tests for critical functionality

### GitHub Practices
1. Use Git and GitHub for version control
2. Create a comprehensive README documenting your implementation (replace this README)
3. Make small, meaningful commits with clear messages
4. Create a project board to track your progress (optional)

## Additional Features (Optional)
1. Implement responsive design for different devices
2. Add accessibility features following WCAG guidelines
3. Implement more advanced Supabase features:
   - Real-time updates using Supabase subscriptions
   - Storage for product images
   - Edge Functions for complex operations
4. Add analytics dashboard using Supabase's built-in analytics

## Viva Preparation
Be prepared to discuss:
- Your approach to implementing the Supabase database schema
- How you structured your application around Supabase's features
- Security considerations when using Supabase
- Challenges faced during development and how you overcame them
- How you would scale this application for larger deployments

Remember to document your development process, including any challenges you encounter and how you solve them. This will be valuable during your viva and for maintaining the project in the future.