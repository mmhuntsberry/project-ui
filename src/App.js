import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <main className="main">
          <Router />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
