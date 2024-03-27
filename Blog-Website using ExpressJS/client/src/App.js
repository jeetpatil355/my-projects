import { useState } from "react";

import { Box } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

//components
import DataProvider from "./context/DataProvider";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";
import Update from "./components/create/Update";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Login from "./components/account/Login";
// import SearchComponent from "./components/search/SearchComponent";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem("accessToken");
  return isAuthenticated && token ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/account" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      // Perform search request to the backend
      // Replace '/search' with your backend search endpoint
      const response = await fetch(`/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <DataProvider>
      <BrowserRouter>
        <Box style={{ marginTop: 64 }}>
          {/* <SearchComponent onSearch={handleSearch} /> */}
          <Routes>
            <Route
              path="/account"
              element={<Login isUserAuthenticated={isUserAuthenticated} />}
            />
            {/* <Route path="/" element={<Home searchResults={searchResults} />} /> */}

            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route
              path="/create"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/create" element={<CreatePost />} />
            </Route>

            <Route
              path="/details/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/details/:id" element={<DetailView />} />
            </Route>

            <Route
              path="/update/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/update/:id" element={<Update />} />
            </Route>

            <Route
              path="/about"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/about" element={<About />} />
            </Route>

            <Route
              path="/contact"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
