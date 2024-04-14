import { scaleLinear } from "d3-scale";
import { area, curveBasis } from "d3-shape";
import { useEffect, useMemo, useState } from "react";
import { randomChoose } from "../data/randomUtil";

const width = 1000;
const height = 50;
const complexity = 5;

export default function Wave() {
	const [randomCoords, setCoords] = useState<number[]>([1]);
	useEffect(() => {
		const interval = setInterval(() => {
			const newCoords: number[] = [];
			for (let i = 1; i < 10; i++) {
				newCoords.push(randomChoose([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
			}
			setCoords(newCoords);
		}, 100);
		return () => clearInterval(interval);
	}, []);

	const scaleX = scaleLinear()
		.domain([0, complexity - 1])
		.range([0, width]);

	const scaleY = scaleLinear().domain([0, 10]).range([0, height]);

	const areaGenerator = area()
		.x((d, i) => {
			return scaleX(i);
		})
		.y1((d) => {
			return scaleY(d);
		});

	const d = areaGenerator.curve(curveBasis).y0(height)(randomCoords);

	const roundedD = d!
		.split(/M|Z/)
		.filter((d) => d)[0]
		.split(",")
		.map((d) => {
			if (d.indexOf("C") !== -1) {
				return d
					.split("C")
					.map((n) => Math.round(n * 10) / 10)
					.join("C");
			} else if (d.indexOf("L") !== -1) {
				return d
					.split("L")
					.map((n) => Math.round(n * 10) / 10)
					.join("L");
			} else {
				return Math.round(d);
			}
		});

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
			<path
				fill={"#5020ff"}
				fillOpacity={0.6}
				d={"M" + roundedD.join(",") + "Z"}
				className="transition-all"
			/>
		</svg>
	);
}
