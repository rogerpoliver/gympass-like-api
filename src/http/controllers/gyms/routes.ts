import type { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

import { create } from "./create.controller";
import { nearby } from "./nearby.controller";
import { search } from "./search.controller";

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJwt);

	app.get("/gyms/search", search);
	app.get("/gyms/nearby", nearby);

	app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
