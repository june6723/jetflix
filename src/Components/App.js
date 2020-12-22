import React from "react";
import Router from "Components/Router";
import GlobalStyles from "Components/GlobalStyles";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <Router />
        <GlobalStyles />
      </HelmetProvider>
    </>
  );
}

export default App;
