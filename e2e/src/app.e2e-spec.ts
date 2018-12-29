import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo()
      .catch((error: any) => {
        console.warn(error);
      });
    expect(page.getParagraphText())
      .toEqual('Welcome to aws-sls-spa-sample-web!')
      .catch((error: any) => {
        console.warn(error);
      });
  });
});
