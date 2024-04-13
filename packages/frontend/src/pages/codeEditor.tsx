import { Navbar } from "../components/NavBar";
import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";
import { Sidebar } from "../components/sidebar";

const files = {
  "script.py": {
    name: "script.py",
    langauge: "python",
    value: "Here is some python text",
  },
  "index.html": {
    name: "index.html",
    langauge: "html",
    value: "<div></div>",
  },
};

export function CodeEditor() {
  const [filename, setFileName] = useState("script.py");
  const editorRef = useRef(null);
  const file = files[filename as keyof typeof files];

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function getEditorValue() {
    alert(editorRef.current.getValue());
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar onClick={setFileName} />
        <div className="w-4/5">
          <Editor
            height="100vh"
            width="100%"
            theme="vs-dark"
            onMount={handleEditorDidMount}
            path={file.name}
            defaultLanguage={file.langauge}
            defaultValue={file.value}
          />
        </div>
      </div>
      <button onClick={() => getEditorValue()}>Get editor value</button>
    </div>
  );
}
