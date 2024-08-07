import type { FastifyInstance } from "fastify";

import { verifiyJwt } from "@/http/middlewares/verify-jwt";

import { authenticate } from "./authenticate.controller";
import { profile } from "./profile.controller";
import { register } from "./register.controller";

export async function userRoutes(app: FastifyInstance) {
	app.post("/users", register);
	app.post("/sessions", authenticate);

	// Needs authentication
	app.get("/me", { onRequest: [verifiyJwt] }, profile);
}
