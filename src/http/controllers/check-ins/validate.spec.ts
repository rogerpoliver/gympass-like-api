import exp from "constants";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Check-ins Validate (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to validade a check-ins", async () => {
		const { token } = await createAndAuthenticateUser(app);

		const user = await prisma.user.findFirstOrThrow();

		const gym = await prisma.gym.create({
			data: {
				title: "JavaScript Gym",
				latitude: -27.2114002,
				longitude: -49.6398757,
				description: null,
				phone: null,
			},
		});

		let checkIn = await prisma.checkIn.create({
			data: {
				gym_id: gym.id,
				user_id: user.id,
			},
		});

		const response = await request(app.server)
			.patch(`/check-ins/${checkIn.id}/validate`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				latitude: -27.2114002,
				longitude: -49.6398757,
			});

		expect(response.statusCode).toEqual(204);

		checkIn = await prisma.checkIn.findUniqueOrThrow({
			where: {
				id: checkIn.id,
			},
		});

		expect(checkIn.validated_at).toEqual(expect.any(Date));
	});
});
