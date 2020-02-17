import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display "Sign in" in appbar (non-authorized)', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Sign in');
  });
});
