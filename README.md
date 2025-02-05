# Weather App

A modern weather application built with React and TypeScript that allows users to check current weather conditions and forecasts for any city. The app features a clean, responsive design with dark mode support.

## Features

- Search weather by city name
- Current weather conditions display
- 5-day weather forecast with chart visualization
- Geolocation support for automatic local weather
- Dark/Light mode toggle
- Responsive design for all screen sizes
- Real-time weather data from OpenWeatherMap API

## Tech Stack

- React
- TypeScript
- Material-UI
- Chart.js
- OpenWeatherMap API
- Vite

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

4. Start the development server:
```bash
npm run dev
```

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Enter a city name in the search bar to get weather information
2. Click the location icon to use your current location
3. Toggle between dark and light modes using the theme switch
4. View the 5-day forecast chart below the current weather display

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
