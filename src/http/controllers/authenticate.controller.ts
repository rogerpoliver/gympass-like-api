import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { InvalidCredentialsError } from "@/services/errors/invalid-credentials.error";
import { makeAuthenticateUseCase } from "@/services/factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticate = makeAuthenticateUseCase();
    const { user } = await authenticate.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: { sub: user.id },
      }
    );

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    return reply.status(500).send();
  }
}
