import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Check-ins history (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to list the check-ins history", async () => {
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

		await prisma.checkIn.createMany({
			data: [
				{
					gym_id: gym.id,
					user_id: user.id,
				},
				{
					gym_id: gym.id,
					user_id: user.id,
				},
			],
		});

		const response = await request(app.server)
			.get("/check-ins/history")
			.set("Authorization", `Bearer ${token}`)
			.send({
				latitude: -27.2114002,
				longitude: -49.6398757,
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body.checkIns).toEqual([
			expect.objectContaining({
				gym_id: gym.id,
				user_id: user.id,
			}),
			expect.objectContaining({
				gym_id: gym.id,
				user_id: user.id,
			}),
		]);
	});
});
