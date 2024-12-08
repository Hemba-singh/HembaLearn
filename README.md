# HembaLearn Profile Management

## Project Setup

### Prerequisites
- Node.js (v18 or later)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
- Development Mode (Frontend + Backend):
  ```bash
  npm start
  ```
  This will concurrently start:
  - Vite Development Server (Frontend) on http://localhost:5175
  - Express Mock Backend Server on http://localhost:3001

- Frontend Only:
  ```bash
  npm run dev
  ```

- Backend Only:
  ```bash
  npm run server
  ```

### API Endpoints
- Profile Data: `GET /api/profile`
  Returns mock profile data with various details

### Troubleshooting
- Ensure all dependencies are installed
- Check that no other services are running on ports 5175 or 3001
- Verify network connectivity

### Technologies Used
- React
- TypeScript
- Vite
- Chakra UI
- Express.js
- Cors

### Development Notes
- Mock backend provides simulated profile data
- Proxy configuration in Vite routes API requests
