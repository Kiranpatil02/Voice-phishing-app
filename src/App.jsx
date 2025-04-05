import { Facts } from "./Components/Info/Facts";
import { AudioProcessingFlow } from "./Components/Map/Working";
import { Navbar } from "./Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="max-w-7xl  mx-auto">
        <Navbar />
        <Outlet/>
      </div>
    </>
  );
}

export default App;
