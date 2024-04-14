import { FormEvent, useCallback, useState } from "react";
import { Message, MessageAgent, formatMessageAgent } from "../data/message";
import { useImmer } from "use-immer";
import { v4 as uuid } from "uuid";

export default function Chatbot({
	onClose,
}: {
	onClose(): void;
}) {
	const [messages, updateMessages] = useImmer<Message[]>([
		{
			id: "intro",
			from: MessageAgent.QuackOverflow,
			content: "Quack! How can I help?",
		},
	]);

	const [newMessageText, setNewMessageText] = useState("");
	const sendMessage = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			updateMessages((draft) => {
				draft.push({
					id: uuid(),
					from: MessageAgent.User,
					content: newMessageText,
				});
			});
			setNewMessageText("");
		},
		[newMessageText],
	);

	return (
		<div className="fixed bottom-28 right-6 z-10 h-[500px] w-80 p-2 rounded-lg bg-brown flex flex-col">
			<div className="flex-1 overflow-y-auto">
				<h2 className="text-xl text-white mb-2">Chat with QuackOverflow</h2>

				{messages.map((msg) => (
					<div
						className="flex justify-center flex-col mb-2"
						style={{
							alignItems:
								msg.from === MessageAgent.User ? "flex-end" : "flex-start",
						}}
					>
						<div key={msg.id} className="bg-darkGreen rounded-md p-2 w-10/12">
							<p>{msg.content}</p>
						</div>
						<p className="text-xs mt-1 text-white/60">
							{formatMessageAgent(msg.from)}
						</p>
					</div>
				))}
			</div>
			<form onSubmit={sendMessage}>
				<input
					className="bg-darkGreen w-full py-1 px-2 rounded-md"
					value={newMessageText}
					onChange={(e) => setNewMessageText(e.target.value)}
				/>
			</form>
		</div>
	);
}
