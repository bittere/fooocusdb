import { router } from "https://deno.land/x/rutt@0.2.0/mod.ts";
import type { Routes } from "https://deno.land/x/rutt@0.2.0/mod.ts";

const routes: Routes = {};
const version = "0.0.1";

const db = await Deno.openKv();

// DEV
db.delete(["data"]);

if (!(await db.get(["data"])).value) {
	await db.set(
		["data", "models"],
		[
			{ name: "test", url: "test", on: [1, 2, 3, 5], rating: 0 },
			{ name: "test", url: "test", on: [1, 2, 3, 5], rating: 0 },
		],
	);
	await db.set(
		["data", "loras"],
		[{ name: "test", url: "test", on: [1, 2, 3, 5], rating: 0 }],
	);
	await db.set(
		["data", "presetCommands"],
		[{ name: "test", desc: "test", on: [1, 2, 3, 5] }],
	);

	await db.set(["data", "ngrok"], "ngroktokenhere");
	await db.set(["data", "civit"], "civittokenhere");
}

routes["/"] = () => {
	return new Response(JSON.stringify({ version }));
};

routes["/list/models"] = async () => {
	const models = (await db.get(["data", "models"])).value;
	return new Response(JSON.stringify({ models }));
};

routes["/list/loras"] = async () => {
	const loras = (await db.get(["data", "loras"])).value;
	return new Response(JSON.stringify({ loras }));
};

routes["/list/presetCommands"] = async () => {
	const presetCommands = (await db.get(["data", "presetCommands"])).value;
	return new Response(JSON.stringify({ presetCommands }));
};

routes["/list/ngrok"] = async () => {
	const ngrok = (await db.get(["data", "ngrok"])).value;
	return new Response(JSON.stringify({ ngrok }));
};

routes["/list/civit"] = async () => {
	const civit = (await db.get(["data", "civit"])).value;
	return new Response(JSON.stringify({ civit }));
};

routes["/update/models"] = async (req) => {
	const body = await req.json();
	await db.set(["data", "models"], body.models);

	let models = (await db.get(["data", "models"])).value;

	if (models.length === undefined) models = [];
	return new Response(JSON.stringify({ models }));
};

routes["/update/loras"] = async (req) => {
	const body = await req.json();
	await db.set(["data", "loras"], body.loras);

	let loras = (await db.get(["data", "loras"])).value;

	if (loras.length === undefined) loras = [];
	return new Response(JSON.stringify({ loras }));
};

routes["/update/presetCommands"] = async (req) => {
	const body = await req.json();
	await db.set(["data", "presetCommands"], body.presetCommands);

	let presetCommands = (await db.get(["data", "presetCommands"])).value;

	if (presetCommands.length === undefined) presetCommands = [];
	return new Response(JSON.stringify({ presetCommands }));
};

routes["/update/ngrok"] = async (req) => {
	const body = await req.json();
	await db.set(["data", "ngrok"], body.ngrok);

	const ngrok = (await db.get(["data", "ngrok"])).value;
	return new Response(JSON.stringify({ ngrok }));
};

routes["/update/civit"] = async (req) => {
	const body = await req.json();
	await db.set(["data", "civit"], body.civit);

	const civit = (await db.get(["data", "civit"])).value;
	return new Response(JSON.stringify({ civit }));
};

routes["/update/ui"] = async () => {
	return new Response(await Deno.readTextFile("./update.html"), {
		headers: {
			"Content-Type": "text/html",
		},
	});
};

Deno.serve(router(routes));
