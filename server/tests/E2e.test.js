it(`/GET tokens`, () => {
    return app
      .inject({
        method: 'GET',
        url: '/api/transactions',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
      });
  });
   
  afterAll(async () => {
    await app.close();
  });