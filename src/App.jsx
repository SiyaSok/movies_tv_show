/** @format */

import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieProvider } from "./context/MovieContext";
import MovieDetails from "./pages/MovieDetails";
import Genres from "./pages/Genre";
import TVShows from "./pages/TVShows";
import TVShowDetails from "./pages/TVShowDetails";
import TVGenre from "./pages/TVGenre";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <main>
        <MovieProvider>
          <QueryClientProvider client={queryClient}>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/movie/:id' element={<MovieDetails />} />
              <Route path='/genre/:id' element={<Genres />} />
              <Route path='/tv-genre/:id' element={<TVGenre />} />
              <Route path='/tv-shows' element={<TVShows />} />
              <Route path='/tv-shows/:id' element={<TVShowDetails />} />
            </Routes>
          </QueryClientProvider>
        </MovieProvider>
      </main>
    </>
  );
}

export default App;
