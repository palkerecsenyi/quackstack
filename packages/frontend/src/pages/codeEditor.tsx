import { Editor, Monaco } from "@monaco-editor/react";
import { useState, useRef, useCallback, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { useParams } from "react-router-dom";
import { editor } from "monaco-editor";
import APIClient from "../data/client";

export function CodeEditor() {
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	const { owner, repo } = useParams<{ owner: string; repo: string }>();
	const [loading, setLoading] = useState<string>();

	const [files, setFiles] = useState<string[]>([]);
	const [selectedFile, setSelectedFile] = useState<string>();

	const handleEditorDidMount = useCallback(
		(editor: editor.IStandaloneCodeEditor, _: Monaco) => {
			editorRef.current = editor;
		},
		[],
	);

	useEffect(() => {
		if (!owner || !repo) return;
		(async () => {
			const c = new APIClient();

			setLoading("Cloning...");
			await c.cloneRepo(owner, repo);
			setLoading("Loading files...");
			const resp = await c.listFiles(repo);
			setFiles(resp);
			setLoading(undefined);
		})();
	}, [owner, repo]);

	useEffect(() => {
		const e = editorRef.current;
		if (!selectedFile || !repo || !e) return;

		(async () => {
			setLoading("Loading file contents...");
			const resp = await new APIClient().getFileContents(repo, selectedFile);
			setLoading(undefined);
			e.setValue(resp);
		})();
	}, [selectedFile, editorRef, repo]);

	const [timeout, setTimeoutId] = useState<Timer>();
	const [saveLoading, setSaveLoading] = useState(false);
	const onEditorChange = useCallback(
		(value: string | undefined) => {
			if (timeout) {
				clearTimeout(timeout);
				setTimeoutId(undefined);
			}

			if (value === undefined || !repo || !selectedFile) return;
			setTimeoutId(
				setTimeout(async () => {
					setSaveLoading(true);
					await new APIClient().saveFileContents(repo, selectedFile, value);
					setSaveLoading(false);
				}, 2000),
			);
		},
		[repo, selectedFile, timeout],
	);

	const onSaveClick = useCallback(async () => {
		if (!owner || !repo) return

		setLoading("Pushing changes...")
		await new APIClient().pushRepo(owner, repo)
		setLoading(undefined)
	}, [owner, repo])

	return (
		<>
			{loading && (
				<div className="fixed top-0 left-0 h-screen w-screen backdrop-brightness-75 backdrop-blur-md z-10">
					<p className="text-center mt-20 text-2xl text-white">{loading}</p>
				</div>
			)}

			{saveLoading && (
				<p className="fixed top-4 left-4 text-white">Saving...</p>
			)}

			<div className="flex">
				<Sidebar
					onSaveClick={onSaveClick}
					onClick={setSelectedFile}
					files={files}
					selectedFile={selectedFile}
				/>
				<div className="w-4/5">
					<Editor
						height="100vh"
						width="100%"
						theme="vs-dark"
						onMount={handleEditorDidMount}
						onChange={onEditorChange}
						path={selectedFile}
					/>
				</div>
				<img
					src="../../images/duck.svg"
					className="absolute bottom-0 right-10 w-28"
				/>
			</div>
		</>
	);
}
