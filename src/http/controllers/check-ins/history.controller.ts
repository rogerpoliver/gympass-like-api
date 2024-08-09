import { z } from "zod";

import { makeFetchUserCheckInsHistoryUseCase } from "@/services/factories/make-fetch-user-check-ins-history-use-case";

import type { FastifyReply, FastifyRequest } from "fastify";

export async function history(request: FastifyRequest, reply: FastifyReply) {
	const checkInHistoryQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	});

	const { page } = checkInHistoryQuerySchema.parse(request.query);
	const fetchCheckInHistory = makeFetchUserCheckInsHistoryUseCase();

	const { checkIns } = await fetchCheckInHistory.execute({
		userId: request.user.sub,
		page,
	});

	return reply.status(201).send({ checkIns });
}
