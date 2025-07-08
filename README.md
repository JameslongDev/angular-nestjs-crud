# Angular & NestJS CRUD Project

This is a full-stack web application demonstrating how to build a CRUD (Create, Read, Update, Delete) system using **Angular** for the frontend and **NestJS** for the backend, connected to a **PostgreSQL** database.

## ✨ Features

-   **Frontend**: Built with **Angular 17** and styled with **Tailwind CSS**.
-   **Backend**: Powered by **NestJS 11** with **TypeORM** for database interaction.
-   **Database**: Uses **PostgreSQL** for data persistence.
-   **Full-Stack**: Complete setup for both client and server-side development.
-   **Ready to Run**: Includes detailed setup instructions for a smooth start.

---

##  Prerequisites

Before you begin, ensure you have the following installed on your system:

1.  **Node.js**: Version `20.9.0` or higher. We highly recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage Node.js versions.
    ```bash
    # Example using nvm
    nvm install 20
    nvm use 20
    ```
2.  **Angular CLI**: Version `17.x.x`
    ```bash
    npm install -g @angular/cli@17
    ```
3.  **NestJS CLI**: Version `11.x.x`
    ```bash
    npm install -g @nestjs/cli@11
    ```
4.  **PostgreSQL**: A running instance of PostgreSQL. You can download it from the [official website](https://www.postgresql.org/download/).

---

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

First, clone the project repository to your local machine.

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

### 2. Set Up and Run the Backend (NestJS)

The backend server connects to a PostgreSQL database.

#### A. Set Up PostgreSQL Database

1.  **Install PostgreSQL** on your machine if you haven't already. You can find installers and instructions on the [PostgreSQL official website](https://www.postgresql.org/download/).
2.  **Create a new database** for this project. You can use a GUI tool like [pgAdmin](https://www.pgadmin.org/) or the command-line interface (`psql`).

    Example using `psql`:
    ```sql
    CREATE DATABASE mydatabase;
    ```
3.  Make sure you have a user and password with access to this new database.

#### B. Configure Backend Environment

1.  Navigate to the `backend` directory.
    ```bash
    cd backend
    ```
2.  Create a `.env` file by copying the example file.
    ```bash
    cp .env.example .env
    ```
3.  Open the `.env` file and update it with your local PostgreSQL connection details.

    ```env
    # .env file for the backend
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_postgres_user
    DB_PASSWORD=your_postgres_password
    DB_DATABASE=mydatabase
    ```

#### C. Install Dependencies and Run

1.  Install the required npm packages.
    ```bash
    npm install
    ```
2.  Run the development server. The server will automatically connect to your database and apply any necessary migrations.
    ```bash
    npm run start:dev
    ```

The backend server is now running on `http://localhost:3000`.

### 3. Set Up and Run the Frontend (Angular)

Open a **new terminal window** for this step, leaving the backend server running.

1.  Navigate to the `frontend` directory from the project root.
    ```bash
    cd ../frontend
    # Or from the root: cd frontend
    ```
2.  Install the required npm packages.
    ```bash
    npm install
    ```
3.  Run the Angular development server.
    ```bash
    ng serve
    ```

The frontend application is now running on `http://localhost:4200`.

### 4. Access the Application

Open your web browser and navigate to **[http://localhost:4200](http://localhost:4200)**. You should now see the application running!

---

## 🛠️ Available Scripts

### Backend (`/backend`)

-   `npm run start:dev`: Starts the development server with hot-reloading.
-   `npm run build`: Compiles the TypeScript code to JavaScript.
-   `npm run start:prod`: Runs the built application in production mode.
-   `npm test`: Runs unit tests.

### Frontend (`/frontend`)

-   `npm start` or `ng serve`: Starts the Angular development server.
-   `npm run build`: Builds the application for production.
-   `npm run test`: Runs unit tests with Karma.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License
This project is licensed under the MIT License. You can see the full license in the LICENSE file.




This project is licensed under the MIT License. You can see the full license in the `LICENSE` file.
