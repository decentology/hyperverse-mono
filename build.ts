import pack from './package.json';
import { readJson } from 'fs-extra';
import { spawn } from 'child_process';
import glob from 'tiny-glob';
import chalk from 'chalk';
const { workspaces } = pack;

(async () => {
	const packages = await glob('./packages/*/package.json');
	const packageNames = (await Promise.all(packages.map(async (file) => await readJson(file))))
		.filter((p) => !p.private)
		.map((p) => p.name);
	console.log(packageNames);
	const turboBuildCmd = `--color=always turbo run build --no-deps ${packageNames
		.map((n) => `--scope=${n}`)
		.join(' ')} ${process.argv.slice(2).join(' ')}`;
	console.log(chalk.green(turboBuildCmd));

	const cmd = spawn('npx', turboBuildCmd.split(' '), {
		stdio: 'inherit',
		env: { ...process.env, FORCE_COLOR: '1' },
	});
	// cmd.stdout.pipe(process.stdout);
	cmd.on('data', (data) => {
		console.log(data.toString());
	});
})();
