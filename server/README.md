# Data Center News and RFPs

This project is a web application that provides a user interface for displaying recent news developments in the data center industry and recent Requests for Proposals (RFPs). It includes a server-side API that scrapes the web for relevant headlines and RFPs, which are then displayed in the client application.

## Project Structure

- **client/**: Contains the React application.
  - **src/**: Source files for the client application.
    - **index.tsx**: Entry point for the React application.
    - **App.tsx**: Main application component with routing.
    - **pages/**: Contains the main pages of the application.
      - **Home.tsx**: Displays recent news headlines.
      - **RFPs.tsx**: Displays recent RFPs.
    - **components/**: Reusable components for the application.
      - **NewsList/**: Component for rendering news headlines.
      - **RfpList/**: Component for rendering RFPs.
      - **Header.tsx**: Navigation header component.
    - **services/**: API service for fetching data.
    - **types/**: TypeScript interfaces for data structures.

- **server/**: Contains the server application.
  - **src/**: Source files for the server application.
    - **index.ts**: Entry point for the server application.
    - **app.ts**: Configures the Express app.
    - **routes/**: API route definitions.
    - **controllers/**: Request handling logic.
    - **services/**: Business logic, including web scraping and caching.
    - **jobs/**: Background jobs for periodic tasks.
    - **middleware/**: Error handling middleware.
    - **types/**: TypeScript interfaces for server data structures.

## Installation

1. Clone the repository.
2. Navigate to the `client` and `server` directories and run `npm install` to install dependencies.
3. Set up the environment by running the setup script: `./scripts/setup.sh`.
4. Start the application using the start script: `./scripts/start.sh`.

## Usage

- The client application will be available at `http://localhost:3000`.
- The server API will be available at `http://localhost:5000/api`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.