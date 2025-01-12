**No-Code Workflow Builder**

Setup and Run Instructions:

Ensure the following are installed on your system:
**.Node.js (version v20.18.0)**
**.npm (version 7.x or higher)**

**Steps to Set Up:**

**1.Clone the Repository**
.git clone <repository-url>
.cd <repository-directory>

**2.Install dependencies**
.npm install or yarn install

**3.Configure EmailJS**
.Create an account on EmailJS.
.Configure your EmailJS account with the service ID, template ID, and user ID as specified in the application code.

**4.Start the development server**
.npm start or yarn start

**5.Open your browser**
.https://localhost:3000

**6.Run unit tests**
.npm test

Key Architectural Decisions:

1. **Tooling**: The application is built using react, react-router-dom, react-beautiful-dnd, react-flow-renderer, @heroicons/react, tailwindcss, autoprefixer, clsx, uuid, web-vitals, and emailjs-com for sending emails.

2. **State Management**: The application uses the Redux Toolkit for state management.

3. **Routing and Navigation**: The application uses react-router-dom for routing and navigation.

4. **Drag-and-Drop Functionality**: The application uses react-beautiful-dnd for drag-and-drop functionality.

5. **Workflow Visualisation**: The application uses react-flow-renderer for workflow visualisation.

6. **Modular Components**: The application is built using modular components which makes it easier to maintain and extend.

7. **Unit Testing**: The application includes unit tests using @testing-library/react and @testing-library/user-event to ensure components function as expected and to facilitate regression testing.

Assumptions Made:

**Tasks**

Tasks are predefined with specific types (Email, Calculation, Log a Message), and their fields are fixed as per the tasks constant in the code.
Each task requires a unique identifier (instanceId) to ensure tasks can be referenced and managed individually.

**Workflow Details**

Critical fields like workflowName, description, and taskName must be filled out to create a valid workflow. This ensures the workflow has all necessary metadata for saving or further processing.

**Default Task Values**

Tasks are initialized with a default set of values (e.g., empty strings for text fields, zero for numeric fields) to simplify the setup and avoid undefined states during interactions.

**Flowchart**

The flowchart representation is assumed to be a core feature of the application for workflow visualization and task management. Tasks can be reordered interactively, reflecting the sequence of operations in the workflow.

**Error Handling**

Validation is applied to user inputs (e.g., empty fields) through a custom hook, but advanced error handling, such as server-side validation or logging, is not implemented.

**Navigation**

The application assumes a single-page app architecture using react-router-dom for client-side routing. No server-side routing or multi-page functionality is planned at this stage.
