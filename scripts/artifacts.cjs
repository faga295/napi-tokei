// @ts-nocheck
const path = require("path");
const fs = require("fs");
const assert = require("assert");

// Generates binding packages based on artifacts.
// Note: it's dedicated to work with pnpm workspaces.

const CpuToNodeArch = {
	x86_64: "x64",
	aarch64: "arm64",
	i686: "ia32",
	armv7: "arm"
};

const NodeArchToCpu = {
	x64: "x86_64",
	arm64: "aarch64",
	ia32: "i686",
	arm: "armv7"
};

const SysToNodePlatform = {
	linux: "linux",
	freebsd: "freebsd",
	darwin: "darwin",
	windows: "win32"
};

const AbiToNodeLibc = {
	gnu: "glibc",
	musl: "musl"
};

const UniArchsByPlatform = {
	darwin: ["x64", "arm64"]
};

/**
 * A triple is a specific format for specifying a target architecture.
 * Triples may be referred to as a target triple which is the architecture for the artifact produced, and the host triple which is the architecture that the compiler is running on.
 * The general format of the triple is `<arch><sub>-<vendor>-<sys>-<abi>` where:
 *   - `arch` = The base CPU architecture, for example `x86_64`, `i686`, `arm`, `thumb`, `mips`, etc.
 *   - `sub` = The CPU sub-architecture, for example `arm` has `v7`, `v7s`, `v5te`, etc.
 *   - `vendor` = The vendor, for example `unknown`, `apple`, `pc`, `nvidia`, etc.
 *   - `sys` = The system name, for example `linux`, `windows`, `darwin`, etc. none is typically used for bare-metal without an OS.
 *   - `abi` = The ABI, for example `gnu`, `android`, `eabi`, etc.
 */
function parseTriple(rawTriple) {
	const triple = rawTriple.endsWith("eabi")
		? `${rawTriple.slice(0, -4)}-eabi`
		: rawTriple;
	const triples = triple.split("-");
	let cpu;
	let sys;
	let abi = null;
	if (triples.length === 4) {
		[cpu, , sys, abi = null] = triples;
	} else if (triples.length === 3) {
		[cpu, , sys] = triples;
	} else {
		[cpu, sys] = triples;
	}
	const platformName = SysToNodePlatform[sys] ?? sys;
	const arch = CpuToNodeArch[cpu] ?? cpu;
	return {
		platform: platformName,
		arch,
		abi,
		platformArchABI: abi
			? `${platformName}-${arch}-${abi}`
			: `${platformName}-${arch}`,
		raw: rawTriple
	};
}

const ARTIFACTS = path.resolve(__dirname, "../artifacts");
const NPM = path.resolve(__dirname, "../npm");


const bindings = fs
	.readdirSync(ARTIFACTS, {
		withFileTypes: true
	})
	.filter(item => item.isDirectory())
	.map(item => path.join(ARTIFACTS, item.name));


for (const binding of bindings) {
	// bindings-x86_64-unknown-linux-musl
	let files = fs.readdirSync(binding);
	assert(files.length === 1, `Expected only one file in ${binding}`);

	let file = files[0];
	assert(path.extname(file) === ".node", `Expected .node file in ${binding}`);
	let binary = fs.readFileSync(path.join(binding, file));

	let name = path.basename(binding);
	assert(name.startsWith("bindings-"));

	// x86_64-unknown-linux-musl
	const {
		// linux, darwin, win32
		platform,
		// x64, arm64
		arch,
		// musl, gnu, null
		abi,
		// linux-x64-musl
		platformArchABI
	} = parseTriple(name.slice(9));
	assert(
		file.split(".")[1] == platformArchABI,
		`Binding is not matched with triple (expected: tokei-core.${platformArchABI}.node, got: ${file})`
	);

	// <absolute-path-to-npm>/linux-x64-musl
	const output = path.join(NPM, platformArchABI);
	
	const pkgJson = require(path.resolve(
		output,
		"./package.json"
	));
	
	fs.writeFileSync(`${output}/${pkgJson.main}`, binary);
}