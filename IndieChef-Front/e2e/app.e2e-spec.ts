import { IndieChefFrontPage } from './app.po';

describe('indie-chef-front App', () => {
  let page: IndieChefFrontPage;

  beforeEach(() => {
    page = new IndieChefFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
