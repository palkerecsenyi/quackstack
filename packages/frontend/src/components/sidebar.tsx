export default function Sidebar({
	onClick,
	onSaveClick,
	files,
	selectedFile,
}: {
	onClick(newFilename: string): void;
	onSaveClick(): void;
	files: string[];
	selectedFile: string | undefined;
}) {
	return (
		<div className="bg-background h-screen w-1/5 p-4 flex flex-col">
			{files.map((file) => (
				<button
					className="px-4 py-2 text-white hover:bg-gray-600"
					style={{
						backgroundColor: selectedFile === file ? "gray" : undefined,
					}}
					onClick={() => onClick(file)}
					key={file}
				>
					{file}
				</button>
			))}
			<button
				className="px-4 py-2 text-white hover:bg-gray-600 mt-2"
				onClick={onSaveClick}
			>
				Push & Run
			</button>
		</div>
	);
}
