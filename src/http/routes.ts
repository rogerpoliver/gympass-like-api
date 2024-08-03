import type { FastifyInstance } from "fastify";

import { authenticate } from "./controllers/authenticate.controller";
import { profile } from "./controllers/profile.controller";
import { register } from "./controllers/register.controller";
import { verifiyJwt } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", register);
	app.post("/sessions", authenticate);

	// Needs authentication
	app.get("/me", { onRequest: [verifiyJwt] }, profile);
}
