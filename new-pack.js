import { writeFileSync, mkdirSync, readdirSync } from 'fs';
import { randomUUID } from 'crypto';
import callerCallsite from "caller-callsite";



const fName = process.env.npm_config_fname ?? 'new-pack';
const pName = process.env.npm_config_pname ?? 'new-pack';
const pDesc = process.env.npm_config_pdesc ?? '1.0.0';
const pEntry = process.env.npm_config_pentry ?? 'index.js';
const pModules = [...(process.env.npm_config_pmodules ?? 'su')];
const pVersion = process.env.npm_config_pver ?? 'b';

const charToModule = {
	n: {
		"module_name": "@minecraft/server-net",
		"version": "1.0.0-beta"
	},
	a: {
		"module_name": "@minecraft/server-admin",
		"version": "1.0.0-beta"
	},
	u: {
		"module_name": "@minecraft/server-ui",
		"version": (pVersion === 'b') ? "1.0.0-beta" : [0, 1, 0]
	},
	g: {
		"module_name": "@minecraft/server-gametest",
		"version": "1.0.0-beta"
	},
	s: {
		"module_name": "@minecraft/server",
		"version": (pVersion === 'b') ? "1.1.0-beta" : (pVersion === 'p') ? "1.1.0-beta" : (pVersion === 's') ? "1.0.0" : [0, 1, 0]
	}
};
console.log(JSON.stringify({ fName, pName, pDesc, pEntry }));
const path = {
	/**
	 * @method resolveRelativeFromAbsolute resolves a relative path from an absolute path
	 * @param {String} relitivePath relative path
	 * @param {String} absolutePath absolute path
	 * @param {String} split default?= '/', the path of the filePath to be split wth 
	 * @param {RegExp} replace default?= /[\/|\\]/g, the regex or string to replace the filePath's splits with 
	 * @returns {String} resolved absolutePath 
	 */
	resolveRelativeFromAbsolute(relitivePath, absolutePath, split = '/', replace = /[\/|\\]/g) {
		relitivePath = relitivePath.replaceAll(replace, split).split(split);
		absolutePath = absolutePath.replaceAll(replace, split).split(split);
		const numberOfBacks = relitivePath.filter(file => file === '..').length;
		return [...absolutePath.slice(0, -(numberOfBacks + 1)), ...relitivePath.filter(file => file !== '..' && file !== '.')].join(split);
	},
	/**
	 * @method parseRelitiveFromFunction
	 * @param {String} relitivePath 
	 * @param {Number} depth 
	 * @returns {String} resolved absolutePath 
	 */
	parseRelitiveFromFunction(relitivePath) {

		const absolutePath = callerCallsite().getFileName().replaceAll('\\', '/').replaceAll('file:///', '');
		return this.resolveRelativeFromAbsolute(relitivePath, absolutePath);
	}
};
export default path;



let isFolder = false;
const folders = readdirSync(path.parseRelitiveFromFunction('../development_behavior_packs'));
let i = -1;
folders.forEach(folderName => {
	if (!folderName.includes(fName)) return;
	i = Number(folderName.match(/\d+/) ?? 0) + 1;
});
const pathFolder = path.parseRelitiveFromFunction(`./${fName}${(i < 0) ? '' : `(${i})`}/`);
mkdirSync(pathFolder);
const manifest = {
	"format_version": 2,
	"header": {
		"name": pName,
		"description": pDesc,
		"uuid": randomUUID({ disableEntropyCache: true }),
		"version": [
			1,
			0,
			0
		],
		"min_engine_version": [
			1,
			13,
			0
		]
	},
	"modules": [
		{
			"type": "data",
			"uuid": randomUUID({ disableEntropyCache: true }),
			"version": [
				1,
				0,
				0
			]
		},
		{
			"type": "script",
			"language": "javascript",
			"uuid": randomUUID({ disableEntropyCache: true }),
			"entry": pEntry,
			"version": "1.0.0-beta"
		}
	],
	"dependencies": [
		...pModules.map(char => charToModule[char])
	],
	"capabilities": [
		"script_eval"
	]
};

writeFileSync(`${pathFolder}manifest.json`, JSON.stringify(manifest, null, 4));
mkdirSync(`${pathFolder}scripts/`);
writeFileSync(`${pathFolder}scripts/${pEntry}`, '');

writeFileSync(`${pathFolder}package.json`, JSON.stringify({
	"type": "module"
}));
