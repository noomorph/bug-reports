describe('Dummy App', () => {
  it('should have welcome screen', async () => {
    await device.launchApp({ newInstance: true });
    await expect(element(by.text('Welcome to React Native!'))).toBeVisible();
  });
});
