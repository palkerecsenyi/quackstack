import wretch, { Wretch } from "wretch";

export default class APIClient {
	private baseURL: string;
	private w: Wretch;
	constructor() {
		this.baseURL = import.meta.env.VITE_API_BASE_URL;
		this.w = wretch().options({ credentials: "include" });
	}

	authorizationURL() {
		return `${this.baseURL}/auth/start`;
	}

	isSignedIn() {
		return this.w.get(`${this.baseURL}/auth/check`).json<boolean>();
	}

	listRepos() {
		return this.w.get(`${this.baseURL}/git/repos`).json<{ name: string }[]>();
	}

	cloneRepo(owner: string, repo: string) {
		return this.w
			.json({ owner, repo })
			.url(`${this.baseURL}/git/clone`)
			.post()
			.res();
	}

	pushRepo(owner: string, repo: string) {
		return this.w
			.json({ owner, repo })
			.url(`${this.baseURL}/git/push`)
			.post()
			.res();
	}

	async listFiles(repo: string) {
		const resp = await this.w
			.get(`${this.baseURL}/files?projectId=${repo}`)
			.json<string[]>();

		return resp.map((i) => i.split("/")[2]);
	}

	getFileContents(repo: string, fileName: string) {
		return this.w
			.get(`${this.baseURL}/file?projectId=${repo}&fileName=${fileName}`)
			.text();
	}

	saveFileContents(repo: string, fileName: string, contents: string) {
		return this.w
			.json({ project_id: repo, file_name: fileName, contents })
			.url(`${this.baseURL}/files/save`)
			.put()
			.res();
	}
}
