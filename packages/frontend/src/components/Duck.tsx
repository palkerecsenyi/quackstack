import { useEffect, useMemo, useState } from "react";
import Chatbot from "./Chatbot";
import { randomChoose } from "../data/randomUtil";
import DuckStatic from "../assets/duck.svg";
import DuckFly from "../assets/duck_fly.webp";
import DuckWalk from "../assets/duck_walk.webp";

enum DuckDirection {
	Right,
	Left,
}

enum DuckVelocity {
	Stationary = 0,
	Slow = 30,
	Slowish = 20,
	Medium = 10,
	SpeedyBoi = 6,
	Zoomies = 1,
}

const allVelocities = [
	DuckVelocity.Stationary,
	DuckVelocity.Slow,
	DuckVelocity.Slowish,
	DuckVelocity.Medium,
	DuckVelocity.SpeedyBoi,
	DuckVelocity.Zoomies,
];

export default function Duck() {
	const [showChat, setShowChat] = useState(false);

	const [duckDirection, setDuckDirection] = useState(DuckDirection.Left);
	const [duckVelocity, setDuckVelocity] = useState(DuckVelocity.Slow);
	const [duckPosition, setDuckPosition] = useState(0);
	useEffect(() => {
		if (duckVelocity === DuckVelocity.Stationary) return;

		let pos = duckPosition;
		const interval = setInterval(() => {
			pos = duckDirection === DuckDirection.Left ? pos + 0.5 : pos - 0.5;
			setDuckPosition(pos);
		}, duckVelocity);

		return () => {
			clearInterval(interval);
		};
	}, [duckVelocity, duckDirection]);

	// swap direction at water boundaries
	useEffect(() => {
		if (duckPosition > 600) {
			setDuckDirection(DuckDirection.Right);
		} else if (duckPosition < 0) {
			setDuckDirection(DuckDirection.Left);
		}
	}, [duckPosition, duckDirection]);

	// choose new velocity
	useEffect(() => {
		const timeout = setTimeout(
			() => {
				setDuckVelocity(
					randomChoose(
						allVelocities.filter((i) => i !== duckVelocity),
					) as DuckVelocity,
				);
			},
			randomChoose([4000, 10000, 20000]),
		);

		return () => {
			clearTimeout(timeout);
		};
	}, [duckVelocity]);

	const duckTransform = useMemo(() => {
		const transforms: string[] = [
			duckDirection === DuckDirection.Left ? "scaleX(-1)" : "scaleX(1)",
			`translateX(${
				duckDirection === DuckDirection.Right ? "-" : ""
			}${duckPosition}px)`,
		];

		return transforms.join(" ");
	}, [duckDirection, duckPosition]);

	const duckImageSrc = useMemo(() => {
		if (duckVelocity === DuckVelocity.Stationary) {
			return DuckStatic;
		}

		return DuckWalk;
	}, [duckVelocity]);

	return (
		<>
			{showChat && <Chatbot onClose={() => setShowChat(false)} />}

			<div className="fixed bottom-0 left-0 h-10 w-full bg-blue-500/80 z-10" />
			<img
				src={duckImageSrc}
				className="fixed bottom-0 right-10 w-28 z-10 cursor-pointer"
				style={{
					transform: duckTransform,
				}}
				onClick={() => setShowChat(true)}
			/>
		</>
	);
}
