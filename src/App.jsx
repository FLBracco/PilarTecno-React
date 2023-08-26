import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Routes from "./pages/routes";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CssBaseline>
    </Provider>
    );
  }
  

export default App
