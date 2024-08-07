import type { FastifyInstance } from "fastify";

import { verifiyJwt } from "@/http/middlewares/verify-jwt";

import { create } from "./create.controller";
import { nearby } from "./nearby.controller";
import { search } from "./search.controller";

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifiyJwt);

	app.get("/gyms/search", search);
	app.get("/gyms/nearby", nearby);

	app.post("/gyms", create);
}
