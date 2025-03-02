/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#20202c",
				lighterGray: "#444459",
				purple: "#5246ff",
				darkGreen: "#719230",
				lightGreen: "#B6CF6A",
				cream: "#FFFFBF",
				yellow: "#FFD044",
				orange: "#FE9E38",
				brown: "#563400",
				darkBrown: "#1A1101",
			},
			plugins: [],
		},
	},
};
