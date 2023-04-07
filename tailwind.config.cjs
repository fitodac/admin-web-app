/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./src/routes/**/*.{js,jsx,ts,tsx}',
		'index.html'
	],

	theme: {
		extend: {
			colors: {
				slate: {
					750: '#17243a'
				}
			}
		},
	},

	plugins: []
}
