import "./App.css";
import Weather from "./components/Weather";
import Navbar from "./UI/Navbar";
import Footer from "./UI/Footer";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http.js";

import ForecastList from "./components/ForecastList";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Weather />
      <ForecastList />
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
