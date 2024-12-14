# Online Library System RESTful API

This project is a RESTful API implementation for an online books library system. It provides functionality for users to borrow and return books and magazines based on their subscription plans, adhering to specific borrowing rules and constraints.

## Features

1. **Order API**
   - Allows users to borrow books or magazines based on their subscription plans.
   - Enforces borrowing limits and genre restrictions.
   - Returns success or error messages based on eligibility.

2. **Return API**
   - Allows users to return one or more borrowed books or magazines.
   - Updates the availability status of the returned items.

## Assumptions

- The system uses static data (no database connection). Data is stored in a `data` folder containing JSON files for users, books, and magazines.
- User transactions, borrowing limits, and item availability are managed in-memory during runtime.
- No authentication or persistent storage is implemented, as this was not required in the assignment.

## Prerequisites

Ensure the following are installed on your machine:
- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)

You can download and install **Node.js** and **npm** from [Node.js official website](https://nodejs.org/).

### Check Node.js and npm installation

After installing, you can verify the installation by running the following commands:

```bash
node -v
npm -v
```

### Project Installation and Setup

1. Extract the ZIP File
- Download the .zip file containing the project.
- Extract the contents of the .zip file to a directory on your local machine.


2. Navigate to the Project Directory
 
```bash
cd path/to/extracted/folder
```

3. Install Dependencies

```bash
npm install
```

4. Start the Application

```bash
npm start
```

5. Verify the Application is Running

- Once the server starts, you should see an output in the terminal like this 

```bash
Server is running on http://localhost:3000

```

6. You can verify if the server is running by opening a web browser and navigating to:

http://localhost:3000


## Test APIS
# API Endpoints

1. Order API - To borrow a book or magazine

- Endpoint: POST /library/order
- Request Body:json
{
  "userId": "<user-id>",
  "itemType": "book | magazine",
  "title": "<item-title>"
}

- Response:
Success: A success message is returned when the item is borrowed.
Error: If the user has exceeded borrowing limits or the item is unavailable, an error message is returned.

2. Return API - To return borrowed books or magazines

- Endpoint: POST /library/return
- Request Body:json
{
  "userId": "<user-id>",
  "items": ["<item-title1>", "<item-title2>", ...]
}

- Response:
Success: A success message is returned when the items are returned.
Error: If the items are not found in the user's borrowed list, an error message is returned.

