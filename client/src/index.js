import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import App from './App';
import Information from './pages/information'
import Calculator from './pages/calculator';
import ResponsePage from "./pages/response";
import reportWebVitals from './reportWebVitals';
import localforage from 'localforage';
import Layout from './Layout';

const root = document.getElementById("root");

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
  name: "db"
  
})

ReactDOM.createRoot(root).render(
  <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/information" element={<Information /> } />
          <Route path="/calculator" element={<Calculator /> } />
	  <Route
                    path="response"
                    element={
                        <ResponsePage
                            pokemonData={{
                                name: "Pikachu",
                                weakness: ["ground"],
                                resistance: ["flying", "steel", "electric"],
                                immunity: [],
                            }}
                            onBack={() => window.history.back()}
                        />
                    }
                /> {/* Response */}
      </Route>

    </Routes>
  </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
