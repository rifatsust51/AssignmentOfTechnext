# MY-CRM Client

## Setup Instructions
1. Clone the repository:  
  ```bash
  git clone <repository-url>
  ```
2. Navigate to the project directory:  
  ```bash
  cd my-crm-client
  ```
3. Install dependencies:  
  ```bash
  npm install
  ```
4. Start the development server:  
  ```bash
  npm start
  ```

## Tech Stack Used
- **Frontend**: React.js, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express.js (for API integration)
- **Database**: MongoDB
- **Authentication**: JWT, BCRYPT
- **Other Tools**: Axios, ESLint, Prettier

## ERD (Entity Relationship Diagram)
The ERD represents the relationships between the following entities:
- **Users**: Stores user information (e.g., name, email, role).
- **Clients**: Stores client details (e.g., company name, contact info).
- **Projects**: Tracks projects associated with clients.
- **Tasks**: Tracks tasks under specific projects.

```plaintext
Users (1) ---- (N) Clients
Clients (1) ---- (N) Projects
Projects (1) ---- (N) Tasks
```

## Summary of Approach and Decisions
- **Modular Design**: The project is structured into reusable components for scalability.
- **API Integration**: Axios is used for seamless communication with the backend.
- **Authentication**: JWT ensures secure user authentication and authorization.
- **Styling**: Tailwind CSS was selected for its flexibility in managing styles.
- **Database**: MongoDB was chosen for its scalability and flexibility in handling unstructured data.

This project aims to provide a robust and user-friendly CRM solution tailored to client and project management needs.  


 <video controls src="../../../OneDrive/Videos/Screen Recordings/Screen Recording 2025-04-30 121137.mp4" title="text"></video>