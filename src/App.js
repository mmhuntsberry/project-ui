import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Header />
          <main className="main">
            <Router />
          </main>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
