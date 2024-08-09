import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe("Search Gyms (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to search gyms by title", async () => {
		const { token } = await createAndAuthenticateUser(app);

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "JavaScript Gym",
				description: null,
				phone: null,
				latitude: -27.2114002,
				longitude: -49.6398757,
			});

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "GoLang Gym",
				description: null,
				phone: null,
				latitude: -23.2114002,
				longitude: -39.6398757,
			});

		const response = await request(app.server)
			.get("/gyms/search")
			.query({ query: "GoLang" })
			.set("Authorization", `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({ title: "GoLang Gym" }),
		]);
	});
});
