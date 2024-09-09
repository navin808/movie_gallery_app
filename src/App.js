import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import { Container } from "@mui/material";
import BottomNav from "./components/BottomNav";
import Header from "./components/Headers/Header";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
import Favourites from "./Pages/Favourites/Favourites";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
       <div className="app">
          <Container>
            <Routes>
              <Route exact path="/" element={<Trending />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/favourites" element={<Favourites />} />
            </Routes>
          </Container>
        </div>
        <BottomNav />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
