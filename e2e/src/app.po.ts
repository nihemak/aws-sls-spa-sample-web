import { browser, by, element } from 'protractor';
import { promise } from 'selenium-webdriver';

export class AppPage {
  // tslint:disable-next-line:promise-function-async
  navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  // tslint:disable-next-line:promise-function-async
  getParagraphText(): promise.Promise<string> {
    return element(by.css('app-root h1'))
      .getText();
  }
}
