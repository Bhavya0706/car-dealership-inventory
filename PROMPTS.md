# 🤖 AI-Assisted Development Record

This document transparently explains how ChatGPT was used during the development of the **Car Dealership Inventory System**.

---

## 🎯 Why I Used AI

The project had to be completed within a limited timeframe. Since my main goal was to strengthen and demonstrate my backend development skills, I used AI mainly to speed up frontend development.

AI also helped me understand and implement a few assignment requirements that I had not previously learned or used in a complete project.

All AI-generated suggestions were reviewed, tested, modified where necessary, and integrated by me.

---

## 👨‍💻 Work Completed Primarily by Me

I focused mainly on the backend and independently worked on the following areas:

- Backend architecture using Node.js and Express.js.
- MongoDB database connection and Mongoose models.
- User registration and login flow.
- Password hashing using bcrypt.
- JWT generation and authentication.
- Role-based authorization for customers and administrators.
- Authentication and administrator middleware.
- Protected backend routes.
- Vehicle inventory CRUD operations.
- Purchase and restock business logic.
- Stock availability checks.
- Input validation and error handling.
- API testing using Postman.
- Environment variables and security-related configuration.
- Integration and testing of the complete application.

I made the final decisions regarding the backend structure, security, database operations, and application logic.

---

## 🧠 Areas Where AI Assisted Me

AI assistance was mainly used for:

- Creating most of the React frontend interface.
- Writing and improving CSS styling.
- Making the interface responsive.
- Connecting frontend pages with backend APIs.
- Creating forms, vehicle cards, navigation, and dashboard layouts.
- Implementing selected search and filtering functionality.
- Debugging frontend and backend errors.
- Improving code organization and readability.
- Understanding unfamiliar assignment requirements.
- Reviewing the completed implementation.
- Preparing the README and project documentation.

AI assistance in the backend was limited mainly to search and filter functionality, debugging, code improvements, and guidance for requirements I had not previously implemented.

---

# 📝 Prompt and Session History

The following sections contain representative prompts and requests used during development. Some prompts have been cleaned up for readability without changing their original purpose.

---



## Session 1: Planning the Project Structure

### Prompt

```text
Suggest a simple and organized folder structure for a React frontend and a Node.js, Express.js, and MongoDB backend.
```

### How the Response Was Used

I used the suggested structure as a reference and adjusted it according to the requirements of my project.

---

## Session 2: Frontend Interface Development

### Prompt

```text
Create a responsive React interface for a car dealership inventory system. It should include navigation, vehicle cards, search and filter controls, login and registration pages, vehicle details, and an administrator dashboard.
```

### Follow-up Prompts

```text
Improve the CSS and make the interface look professional and responsive.
```

```text
Create reusable React components for vehicle cards, forms, navigation, and protected pages.
```


### How the Responses Were Used

AI generated a large part of the initial frontend code and styling. I reviewed the components, connected them with my backend, tested the user flow, and modified the code wherever required.

---

## Session 3: Frontend Authentication Integration

### Prompt

```text
Show me how to store the JWT and authenticated user information after login and use them for protected frontend routes.
```


### How the Responses Were Used

The suggestions were used for frontend authentication state and navigation. The actual security enforcement remained on the backend through authentication and role-based middleware.

---

## Session 4: Search and Filter Functionality

### Prompt

```text
Help me implement backend search and filtering for cars using make, model, category, minimum price, and maximum price query parameters.
```

### Follow-up Prompts

```text
Make every filter optional so users can apply one filter or combine multiple filters.
```


### How the Responses Were Used

AI assisted with parts of the search and filter implementation and helped diagnose incorrect query parameters. I tested the API and modified the final implementation to work with my existing backend.

---

## Session 6: Vehicle Inventory Interface

### Prompt

```text
Create an administrator interface for adding, editing, deleting, and restocking vehicles using my backend APIs.
```

### Follow-up Prompts

```text
Add validation to the vehicle form and display backend error messages clearly.
```

```text
Update the inventory interface after a vehicle is added, edited, deleted, or restocked.
```

### How the Responses Were Used

The generated frontend code was adapted to the routes and response formats used by my backend.

---

## Session 7: Purchase Flow

### Prompt

```text
Connect the purchase button in React with my protected vehicle purchase API and send the JWT in the Authorization header.
```

### Follow-up Prompt

```text
Display a clear success or error message and refresh the vehicle quantity after a purchase.
```

### How the Responses Were Used

The response helped with frontend API integration. Backend stock validation and purchase business logic were handled in my backend implementation.

---

## Session 8: Debugging Assistance

### Prompts

```text
Why is the administrator dashboard not appearing after changing the user's role?
```

```text
Why is the vehicle list not refreshing after an inventory operation?
```

### How the Responses Were Used

AI helped identify possible causes such as malformed query parameters, missing authorization headers, outdated JWT information, and frontend state not being refreshed. I verified each suggestion through testing before applying changes.

---

## Session 9: Code Review and Improvements

### Prompt

```text
Review this code for structural problems, repeated logic, missing validation, and possible errors. Keep the solution suitable for an internship assignment.
```


### How the Responses Were Used

The suggestions helped improve code organization and identify edge cases. I chose which improvements were relevant and applied them manually.

---

## Session 10: Documentation

### Prompt

```text
Create a professional README for my Car Dealership Inventory System. Include features, technologies, project structure, installation instructions, environment variables, API endpoints, security details, limitations, and AI usage.
```

### Follow-up Prompt

```text
Make the README attractive using suitable badges and emojis, but keep it professional and honest.
```

### How the Responses Were Used

The generated documentation was reviewed and edited so that it represented the features actually completed in the project.

---

## ✅ Review and Verification Process

Before integrating AI-assisted code, I followed this process:

1. Read and understood the suggested implementation.
2. Compared it with my existing project structure.
3. Modified routes, variable names, and response handling where required.
4. Tested APIs through Postman.
5. Tested customer and administrator flows through the frontend.
6. Checked authentication and role-based access.
7. Verified purchase, inventory, search, filter, and restock operations.
8. Removed or corrected suggestions that did not match the project.

---

## 📌 Final Responsibility Statement

AI was used as a development assistant, mainly because of the limited completion time and the time required to build and style the frontend.

Most of the frontend was created with AI assistance. Selected backend tasks—particularly search, filtering, debugging, and unfamiliar requirements—also received AI assistance.

The backend architecture, authentication, authorization, security middleware, database integration, inventory logic, and final application integration were completed and understood by me. I reviewed, and took responsibility for all code submitted in this repository.