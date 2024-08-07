import type { FastifyInstance } from "fastify";

import { verifiyJwt } from '@/http/middlewares/verify-jwt';

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifiyJwt);
	
}
