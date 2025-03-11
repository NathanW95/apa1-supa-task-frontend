# APA1 Supa Task Frontend

## Project Overview
This project is an open-ended CRUD application that allows users to manage expenses. The frontend is built to interact with a Supabase backend, providing full CRUD functionality, user authentication, and various user interface enhancements.

## Features

### Responsive Design
- **Responsive Layout**: Utilizes CSS media queries and a tile-based layout to ensure the application is visually appealing and functional across different devices. The layout dynamically adjusts to different screen sizes, providing a consistent user experience.

### Expense Management
- **Render Expenses**: Expenses are rendered dynamically by creating HTML div elements for each expense, using template literals for IDs. JSON responses are mapped to HTML elements, with certain elements hidden or revealed based on the mode (e.g., edit mode).
- **Sort Drop Downs**: Sort options are available for expenses, with values stored in JavaScript and passed as search parameters to backend endpoints for sorting.
- **Add Expense Form**: The form toggles visibility with an event listener, changing button colors to indicate edit mode. Input values are extracted and passed in a JSON body to the POST endpoint on submission.
- **Edit Mode**: Allows users to update expense details with front-end validation and user feedback. Text values become input elements with placeholders of the current value. Once edited, users can submit to make a PUT request and update expenses.
- **Cancel Edit Mode**: Provides a feature to revert input fields to their original values if changes are not saved, ensuring data consistency.
- **Delete Expense**: Deletes an expense by passing its ID to the API, with the UI updating immediately to reflect changes.

### Data Handling
- **Get Expenses**: Fetches expenses for the logged-in user by using the user ID stored in local storage. This ensures that each user only sees their own expenses.
- **Real-time Updates**: Any changes to expenses, such as adding, editing, or deleting, will trigger a call to `getExpenses` and re-render the homepage to ensure it is up-to-date.

### Bonus Features
- **Admin Access**: Added as a bonus feature for extended functionality. This feature is included for academic purposes and would not be part of a live app.

## Challenges and Solutions

### Frontend Development
- **Express.js and DOM Learning Curve**: As this was my first full-stack project, understanding how Express.js serves as a proxy and interacts with Supabase was crucial. DOM manipulation required careful handling of methods like `.innerText` and `.value` to ensure correct data extraction and updates.
- **Responsive Design**: Achieving a responsive design involved using CSS media queries and understanding how to align elements consistently across different devices.
- **User ID Management**: Storing and retrieving the user ID in local storage was essential for session management and filtering data. This required ensuring consistency between frontend and backend data handling.
- **DOM Event Listeners and Testing**: Initially, DOM elements were accessed globally using `document.getElementById`, which caused issues with unit tests as functions imported separately couldn't access these elements. Refactoring the code to declare DOM element access within each function resolved this issue, allowing functions to independently access necessary DOM elements during testing.

### Login Page Setup
Setting up the login page involved creating a new table, backend endpoints, and frontend logic for user authentication. Initially, I attempted to verify credentials with a GET request, but research indicated that a POST request with input values was more appropriate. This led to the creation of separate endpoints for user creation and login, allowing the frontend to handle these processes distinctly.

## Development Process
Throughout the development process, I documented challenges and solutions, which included:
- Debugging API endpoints and ensuring correct data flow between frontend and backend.
- Addressing CSS alignment issues to maintain a consistent and responsive design.
- Implementing robust error handling and user feedback mechanisms to enhance user experience.

## Testing

### Manual Testing
- **Postman**: Used extensively for testing backend API endpoints. This included verifying CRUD operations and ensuring that data was correctly handled by the Supabase backend. This was essential in ensuring that the issue was infact regarding the front end.

- **Chrome DevTools**: Utilized for frontend testing, focusing on console logs and the network tab to monitor API calls and responses. This helped in debugging and ensuring that the frontend correctly interacted with the backend.

Screenshots have been provided in the submission as evidence of manual testing. 

## Unit Testing Overview
The most comprehensive testing was conducted manually. However, some unit tests were written for core functionality. See below:

- **User Authentication**: 
  - Tests cover user creation, login processes, and checks for existing users, ensuring that authentication flows are secure and function as expected.

- **Expense Management**: 
  - Includes tests for fetching, adding, updating, and deleting expenses, verifying that each operation interacts correctly with the backend and updates the user interface appropriately.

### Focus on Edge Cases
- **Input Validation and User Feedback**: 
  - The tests address edge cases such as incomplete input fields and incorrect data formats, ensuring that the application provides appropriate feedback to users.

- **Edit Mode and Data Consistency**: 
  - Ensures that edit operations maintain data integrity and that changes are accurately reflected in the application.

### Future Testing Improvements
- **Automated Testing**: Plan to implement more comprehensive automated tests to cover a broader range of scenarios and improve test coverage.
- **Integration Testing**: Aim to develop integration tests that simulate real user interactions across the frontend and backend to ensure seamless functionality.

## Login credentials
### Below are some login credentials that you can use to test the application with pre-existing 'users' if required.
Nathan : Pass1
Callum : Pass2
Josh : Pass3
Charlie : Pass4
Admin : Admin 

Attention - logging in as Admin will display all users' expenses and disable ability to add expenses and sort expenses.

## Note
For information on the backend, please refer to the backend repo's README.md file.

Screenshots have been provided in the submission as evidence of manual testing.

