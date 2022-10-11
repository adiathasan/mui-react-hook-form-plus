import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export function createRollupConfig(options, callback) {
	const name = options.name;
	// A file with the extension ".mjs" will always be treated as ESM, even when pkg.type is "commonjs" (the default)
	// https://nodejs.org/docs/latest/api/packages.html#packages_determining_module_system
	const extName = options.format === 'esm' ? 'mjs' : 'js';
	const outputName = 'dist/' + [name, options.format, extName].join('.');

	const config = {
		input: options.input,
		external: ['react', 'react-hook-form', '@mui/material', '@mui/x-date-pickers'],
		output: {
			file: outputName,
			format: options.format,
			name: 'MuiReactHookFormPlus',
			sourcemap: true,
			globals: {
				react: 'React',
				'react-hook-form': 'ReactHookForm',
				'@mui/material': 'Material',
				'@mui/x-date-pickers': 'xDatePickers',
			},
			exports: 'named',
		},
		plugins: [
			external(),
			typescript({
				tsconfig: options.tsconfig,
				clean: true,
				exclude: ['**/__tests__', '**/*.test.ts'],
			}),
			options.format === 'umd' &&
				commonjs({
					include: /\/node_modules\//,
				}),
			sourcemaps(),
			options.format !== 'esm' &&
				terser({
					output: { comments: false },
					compress: {
						drop_console: true,
					},
				}),
		].filter(Boolean),
	};

	return callback ? callback(config) : config;
}
