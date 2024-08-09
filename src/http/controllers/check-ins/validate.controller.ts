import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeValidateCheckInsUseCase } from "@/services/factories/make-validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
	const validateCheckInParamsSchema = z.object({
		checkInId: z.string().uuid(),
	});

	const { checkInId } = validateCheckInParamsSchema.parse(request.params);

	const validateCheckIn = makeValidateCheckInsUseCase();

	await validateCheckIn.execute({
		checkInId,
	});

	return reply.status(204).send();
}
