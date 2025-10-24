# Data Center News and RFPs

This project is a web application designed to display recent news developments in the data center industry and recent Requests for Proposals (RFPs). It consists of a client-side React application and a server-side Node.js application.

## Project Structure

- **client/**: Contains the React application.
  - **src/**: Source files for the React application.
    - **index.tsx**: Entry point for the React application.
    - **App.tsx**: Main application component that sets up routing.
    - **pages/**: Contains the main pages of the application.
      - **Home.tsx**: Displays recent news headlines.
      - **RFPs.tsx**: Displays recent RFPs.
    - **components/**: Reusable components for the application.
      - **NewsList/**: Component for displaying news headlines.
      - **RfpList/**: Component for displaying RFPs.
      - **Header.tsx**: Navigation header component.
    - **services/**: Contains API service functions.
      - **api.ts**: Functions for making API calls.
    - **types/**: TypeScript interfaces for data structures.
      - **index.ts**: Type definitions.

- **server/**: Contains the Node.js backend application.
  - **src/**: Source files for the server application.
    - **index.ts**: Entry point for the server application.
    - **app.ts**: Configures the Express application.
    - **routes/**: API route definitions.
      - **api.ts**: Defines routes for fetching news and RFPs.
    - **controllers/**: Contains request handling logic.
      - **headlinesController.ts**: Handles requests related to news and RFPs.
    - **services/**: Contains business logic and data handling.
      - **scraper.ts**: Functions for web scraping.
      - **cache.ts**: Functions for caching data.
    - **jobs/**: Background jobs for periodic tasks.
      - **fetchCron.ts**: Cron job for fetching new data.
    - **middleware/**: Custom middleware for the application.
      - **errorHandler.ts**: Error handling middleware.
    - **types/**: TypeScript interfaces for server data structures.
      - **index.ts**: Type definitions.

- **scripts/**: Contains utility scripts.
  - **start.sh**: Script to start the server and client applications.
  - **setup.sh**: Script to set up the project environment.

- **docker-compose.yml**: Configuration for running the application in Docker containers.

- **package.json**: Root configuration file for the project, listing dependencies and scripts.

- **tsconfig.json**: Root TypeScript configuration file for the project.

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Run `scripts/setup.sh` to install dependencies.
4. Start the application using `scripts/start.sh`.

## Features

- Displays recent news headlines in the data center industry.
- Lists recent RFPs for data center projects.
- Scrapes the web for the latest news and RFPs.
- Responsive and user-friendly interface.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.