import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to search nearby gyms", async () => {
		const { token } = await createAndAuthenticateUser(app);

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "Near Gym",
				latitude: -27.2114002,
				longitude: -49.6398757,
				description: null,
				phone: null,
			});

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "Far Gym",
				latitude: -28.2114002,
				longitude: -50.6398757,
				description: null,
				phone: null,
			});

		const response = await request(app.server)
			.get("/gyms/nearby")
			.query({ latitude: -27.2114002, longitude: -49.6398757 })
			.set("Authorization", `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({ title: "Near Gym" }),
		]);
	});
});
