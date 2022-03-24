const {request} = require("undici");

const tokenStructure = {
    _id: expect.any(String),
    meterNumber: expect.any(Number),
    token: expect.any(Number),
    status: expect.any(String),
    amount: expect.any(Number),
    purchaseDate: expect.any(String),
    expiryDate: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    "__v": expect.any(Number) 

};


describe("Tokens CRUD", () => {
    describe("GET /api/tokens", () => {
        it("Should return all tokens", async () => {
            const { statusCode, body, headers } = await request(
                `http://localhost:6000/api/tokens`
            );
            const {data} = await body.json();
            // console.log(data);

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );
            expect(statusCode).toBe(200);

            for (const tokens of data) {
                expect(tokens).toMatchObject(tokenStructure);
            }
        });
    });

    describe("GET /api/tokens/by-meter/:meter", () => {

        it("Should return a token on success ", async () => {
            const { statusCode, body, headers } = await request(
                `http://localhost:6000/api/tokens/by-meter/343432`
            );

            const {data} = await body.json();

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );

            expect(statusCode).toBe(200);

            expect(data.meterNumber).toEqual(343432)
        })


        it("Should return 404 on non existing meter ", async () => {
            const { statusCode, body, headers } = await request(
                `http://localhost:6000/api/tokens/by-meter/343431`
            );

            const response = await body.json();

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );

            expect(statusCode).toBe(404);
            expect(response.error).toEqual('Meter not found')
        })
    })
});