import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const [array, setArray] = useState<number[]>([]);

  return (
    <>
      <Navbar array={array} setArray={setArray} />
      <Home array={array} />
    </>
  );
}

export default App;
