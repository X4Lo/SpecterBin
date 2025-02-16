# Manual Installation


1. **Clone the Repository**:
```bash
git clone https://github.com/yourusername/specterbin.git
```

2. **Navigate to the Project Directory**:
```bash
cd specterbin
```

3. **Install Dependencies for Backend**:
   - Navigate to the `backend` directory:
```bash
cd backend
```
   - Install dependencies:
```bash
npm install
```

4. **Install Dependencies for Frontend**:
   - Navigate back to the root directory and then to the `frontend` directory:
```bash
cd ../frontend
```
   - Install dependencies:
```bash
npm install
```

5. **Set Up Environment Variables**:
   - Copy `.env.example` in both the `backend` and `frontend` directories to create `.env` files:
```bash
cp .env.example .env
```
   - Configure the `.env` files with your settings (e.g., database connection string, API endpoints).

6. **Start the Backend**:
   - Navigate to the `backend` directory:
```bash
cd ../backend
```
   - Start the server:
```bash
npm start
```

7. **Start the Frontend**:
   - Open a new terminal window or tab.
   - Navigate to the `frontend` directory:
```bash
cd ../frontend
```
   - Start the development server:
```bash
npm start
```

8. **Access SpecterBin**:
   - Open your browser and navigate to `http://localhost:3000`.