import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

// import "./app.css";

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
