import { Navbar } from "./components/NavBar";
import { Editor } from "@monaco-editor/react";

function App() {
  return (
    <div>
      <Navbar />
      <Editor
        height="100vh"
        width="100%"
        defaultLanguage="python"
        theme="vs-dark"
      />
    </div>
  );
}

export default App;
