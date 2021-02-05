describe('/transactions', () => {
  it('returns ok json response', async () => {
    const { body, status } = await global.testRequest.get('/transactions');
    expect(status).toBe(200);

    expect(body).toEqual({ ok: 'ok' });
  });
});
