import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../components/NavBar";
import APIClient from "../data/client";

export default function AuthProvider() {
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			const isSignedIn = await new APIClient().isSignedIn();
			if (!isSignedIn) {
				navigate("/signin");
			}
		})();
	}, [navigate]);

	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
