import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CodeEditor } from "./pages/codeEditor";
import AuthProvider from "./pages/auth";
import { GitLogIn } from "./pages/gitLogIn";
import ProjectSelector from "./pages/projectList";

const router = createBrowserRouter([
	{
		path: "/signin",
		element: <GitLogIn />,
	},
	{
		path: "/",
		element: <AuthProvider />,
		children: [
			{
				path: "/",
				element: <ProjectSelector />,
			},
			{
				path: "/code/:owner/:repo",
				element: <CodeEditor />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
