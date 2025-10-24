# Data Center News and RFPs Client

This project is a web application that displays recent news developments in the data center industry and recent Requests for Proposals (RFPs). It features a user-friendly interface and utilizes an API to scrape the web for relevant headlines.

## Project Structure

- **src/**: Contains the source code for the React application.
  - **index.tsx**: Entry point for the application.
  - **App.tsx**: Main application component that sets up routing.
  - **pages/**: Contains the main pages of the application.
    - **Home.tsx**: Displays recent news headlines.
    - **RFPs.tsx**: Displays recent RFPs.
  - **components/**: Contains reusable components.
    - **NewsList/**: Component for displaying news headlines.
    - **RfpList/**: Component for displaying RFPs.
    - **Header.tsx**: Navigation header component.
  - **services/**: Contains API service functions for fetching data.
    - **api.ts**: Functions for making API calls.
  - **types/**: TypeScript interfaces for data structures.
    - **index.ts**: Type definitions.

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd data-center-news-rfps/client
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

## API Integration

The application connects to a server-side API that scrapes the web for news headlines and RFPs. Ensure the server is running to fetch the latest data.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.