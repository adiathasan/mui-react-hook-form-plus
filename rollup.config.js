import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				exports: 'named',
				sourcemap: true,
				strict: false,
			},
		],
		plugins: [typescript({ objectHashIgnoreUnknownHack: true }), postcss({ modules: true })],
		external: [
			'react',
			'react-dom',
			'react-hook-form',
			'@mui/material/TextField',
			'@mui/material/Grid',
			'@mui/material',
			'@mui/x-date-pickers',
			'@mui/material/Slider',
		],
	},
];
