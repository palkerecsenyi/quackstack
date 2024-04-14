import { useEffect, useState } from "react";
import APIClient from "../data/client";
import { Link } from "react-router-dom";

export default function ProjectSelector() {
	const [projects, setProjects] = useState<string[]>([]);
	useEffect(() => {
		(async () => {
			const resp = await new APIClient().listRepos();
			setProjects(resp.map((i) => i.name));
		})();
	}, []);

	return (
		<ul className="mx-16 my-4 space-y-1">
			{projects.map((proj) => (
				<li key={proj}>
					<Link
						to={`/code/${proj}`}
						className="py-1 px-2 rounded-md bg-lightGreen/50 block hover:scale-y-110 active:scale-95 transition-transform"
					>
						{proj}
					</Link>
				</li>
			))}
		</ul>
	);
}
