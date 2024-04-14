import { FormEvent, useCallback, useState } from "react";
import { Message, MessageAgent, formatMessageAgent } from "../data/message";
import { useImmer } from "use-immer";
import { v4 as uuid } from "uuid";
import APIClient from "../data/client";
import Markdown from "react-markdown";

export default function Chatbot({
	onClose,
	repo,
	currentFileName,
}: {
	onClose(): void;
	repo: string;
	currentFileName: string;
}) {
	const [messages, updateMessages] = useImmer<Message[]>([
		{
			id: "intro",
			from: MessageAgent.QuackOverflow,
			content: "Quack! How can I help?",
		},
	]);

	const [newMessageText, setNewMessageText] = useState("");
	const [sendLoading, setSendLoading] = useState(false);
	const sendMessage = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const newMessage: Message = {
				id: uuid(),
				from: MessageAgent.User,
				content: newMessageText,
			};
			updateMessages((draft) => {
				draft.push(newMessage);
			});
			setNewMessageText("");

			setSendLoading(true);
			const resp = await new APIClient().sendChatMessage(
				repo,
				currentFileName,
				[...messages, newMessage],
			);
			setSendLoading(false);

			updateMessages((draft) => {
				draft.push({
					id: uuid(),
					from: MessageAgent.QuackOverflow,
					content: resp,
				});
			});
		},
		[newMessageText, repo, currentFileName, messages],
	);

	return (
		<div className="fixed bottom-28 right-6 z-10 h-[700px] w-[500px] p-2 rounded-lg bg-brown flex flex-col">
			<div className="flex justify-between">
				<h2 className="text-xl text-white mb-2">Chat with QuackOverflow</h2>
				<button className="text-white text-4xl" onClick={onClose}>
					&times;
				</button>
			</div>
			<div className="flex-1 overflow-y-auto flex flex-col-reverse">
				{messages.toReversed().map((msg) => (
					<div
						className="flex justify-center flex-col mb-2"
						style={{
							alignItems:
								msg.from === MessageAgent.User ? "flex-end" : "flex-start",
						}}
					>
						<div key={msg.id} className="bg-darkGreen rounded-md p-2 w-8/12">
							<Markdown>{msg.content}</Markdown>
						</div>
						<p className="text-xs mt-1 text-white/60">
							{formatMessageAgent(msg.from)}
						</p>
					</div>
				))}
			</div>
			<form onSubmit={sendMessage} className="mt-2">
				<input
					className="bg-darkGreen w-full py-1 px-2 rounded-md"
					value={newMessageText}
					disabled={sendLoading}
					onChange={(e) => setNewMessageText(e.target.value)}
				/>
			</form>
		</div>
	);
}
