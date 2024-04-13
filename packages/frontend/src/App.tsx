import { Navbar } from "./components/NavBar";
import Project from "./components/Projects.tsx";

function App() {
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800">Hello, Tailwind CSS!</h1>
      <Navbar />
      <Project name={"Coding 1"}/>
    </div>
  );
}

export default App;
