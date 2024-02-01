import { router } from "https://deno.land/x/rutt@0.2.0/mod.ts";
import type { Routes } from "https://deno.land/x/rutt@0.2.0/mod.ts";

const routes: Routes = {};
const version = "0.0.2";

const db = await Deno.openKv();

// DEV
// db.delete(["data"]);

if (!(await db.get(["data"])).value) {
	await db.set(
		["data", "models"],
		[{"name":"RMSDXLOrion","url":"https://civitai.com/api/download/models/288024","on":[],"rating":0},{"name":"MagMix","url":"https://civitai.com/api/download/models/306220","on":[],"rating":0}]
	);
	await db.set(
		["data", "loras"],
		[
{'name':'SchoolDress.safetensors','url':'https://civitai.com/api/download/models/301533?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'FloralDress.safetensors','url':'https://civitai.com/api/download/models/286157?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'PokingNipples.safetensors','url':'https://civitai.com/api/download/models/203711?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'VelvetCropTop.safetensors','url':'https://civitai.com/api/download/models/279189?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'BlackPajamasDress.safetensors','url':'https://civitai.com/api/download/models/279230?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'BlackLeatherShorts.safetensors','url':'https://civitai.com/api/download/models/279208?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'SeeThrough_Nightgown.safetensors','url':'https://civitai.com/api/download/models/252290?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'SweaterPencilSkirt.safetensors','url':'https://civitai.com/api/download/models/239644?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'Beauty.safetensors','url':'https://civitai.com/api/download/models/211209?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'FaceLove.safetensors','url':'https://civitai.com/api/download/models/92758','on':[3],'rating':0},
{'name':'Windowsill.safetensors','url':'https://civitai.com/api/download/models/193789','on':[3],'rating':0},
{'name':'GirlLivingAlone.safetensors','url':'https://civitai.com/api/download/models/264865?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'ForestLight.safetensors','url':'https://civitai.com/api/download/models/127699?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'Trees.safetensors','url':'https://civitai.com/api/download/models/307012','on':[3],'rating':0},
{'name':'EtherealChiffon.safetensors','url':'https://civitai.com/api/download/models/163075','on':[3],'rating':0},
{'name':'AsianCasual.safetensors','url':'https://civitai.com/api/download/models/71767','on':[3],'rating':0},
{'name':'DatingAttireV6.safetensors','url':'https://civitai.com/api/download/models/228470?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'DatingAttireV5.safetensors','url':'https://civitai.com/api/download/models/207675?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'DatingAttireV4.safetensors','url':'https://civitai.com/api/download/models/189285?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'DatingAttireV3.safetensors','url':'https://civitai.com/api/download/models/181812?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'DatingAttireV2.safetensors','url':'https://civitai.com/api/download/models/159298?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'DatingAttireV1.safetensors','url':'https://civitai.com/api/download/models/156890?type=Model&format=SafeTensor','on':[3],'rating':0},
{'name':'Tennis.safetensors','url':'https://civitai.com/api/download/models/65659','on':[3],'rating':0},
{'name':'SDXLAsianBeauties.safetensors','url':'https://civitai.com/api/download/models/136869?type=Model&format=SafeTensor','on':[3],'rating':0},
]
	);
	await db.set(
		["data", "presetCommands"],
		[{ name: "webui", desc: `cd /home/studio-lab-user/sagemaker-studiolab-notebooks/Fooocus; sed "s/minimum=0.1, maximum=1.0/minimum=0.0, maximum=1.0/" webui.py -i`, on: [3] }, {name:"preset", desc: `cd /home/studio-lab-user/sagemaker-studiolab-notebooks/Fooocus/presets; sed "s#https://huggingface.co/lllyasviel/fav_models/resolve/main/fav/juggernautXL_v8Rundiffusion.safetensors#https://civitai.com/api/download/models/288024?token=9b4b80f2f77161b8636ace0a06f35a61#" default.json -i; sed "s#juggernautXL_v8Rundiffusion.safetensors#RMSDXLOrion.safetensors#" default.json -i`, on: [3] }],
	);

	await db.set(["data", "ngrok"], "2biGLq0E2b1dNYNP33kN0IjYYZh_7sV8HTNKuQHnmPnJ3di9K");
	await db.set(["data", "civit"], "9b4b80f2f77161b8636ace0a06f35a61");
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
