export enum MessageAgent {
	QuackOverflow,
	User,
}

export interface Message {
	id: string;
	from: MessageAgent;
	content: string;
}

export const formatMessageAgent = (agent: MessageAgent) => {
	if (agent === MessageAgent.QuackOverflow) {
		return "QuackOverflow";
	} else {
		return "You";
	}
};
