export const randomChoose = <T>(l: T[]): T => {
	return l[Math.floor(Math.random() * l.length)];
};
