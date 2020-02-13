const puppeteer = require('puppeteer');

const homeUrl = 'https://github.com/login?return_to=%2Fkyle11235';
const name = 'xxx';
const password = 'xxx';
const timeout = 120 * 1000;

(async () => {
  
  // browser -> process, it has a single BrowserContext used by default
  // BrowserContext -> private window with independent session/cache
  const browser = await puppeteer.launch(
    {
        headless: false, // show browser
        devtools: true,  // open devtool
        // slowMo: 100, // slow down
    }
  );

  const page = await browser.newPage(); // creates a page in the default browser context

  // open console log of page
  // page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  // finish condition, page navigation(goto/forward/back...) is considered to be successful after all events have been fired
  const waitUntil = [
      'load', // default event is load
      'domcontentloaded', 
      'networkidle0', // no more than 0 network connections for at least 500 ms -> all requests finish downloading
  ];
  let d1, d2;

  // - open login page
  console.log('- open login page');
  d1 = new Date();
  await page.goto(homeUrl, {
    timeout: timeout,
    waitUntil: waitUntil
  });
  d2 = new Date();
  console.log((d2.getTime() - d1.getTime()) / 1000);

  // - refresh login page
  d1 = new Date();
  console.log('- refresh login page');
  await page.reload(
    {
      waitUntil: waitUntil
    }
  );
  d2 = new Date();
  console.log((d2.getTime() - d1.getTime()) / 1000);

  // - login -> home page
  console.log('- login begin');
  d1 = new Date();
  const txtName = await page.$('#login_field'); // page.$ -> document.querySelector('css selector'), return class: ElementHandle
  await txtName.type(name, {delay: 20});
  const txtPassword = await page.$('#password', {delay: 20});
  await txtPassword.type(password);

  let btnOk = await page.$('input[name="commit"]'); // -> document.querySelector('input[name="commit"]')
  
  await Promise.all([
      btnOk.click(),
      page.waitForNavigation()  
  ]);
  console.log('- login success');
  d2 = new Date();
  console.log((d2.getTime() - d1.getTime()) / 1000);

  // - refresh home page
  console.log('- refresh home page');
  d1 = new Date();
  await page.reload(
    {
      waitUntil: waitUntil
    }
  );
  d2 = new Date();
  console.log((d2.getTime() - d1.getTime()) / 1000);

  // - open report page
  console.log('- click report page');
  d1 = new Date();
  let btnReport = await page.$('span[title="app"]'); // -> document.querySelector('span[title="app"]')
  
  await Promise.all([
      btnReport.click(),
      page.waitForNavigation()  
  ]);
  console.log('- open report page success');
  d2 = new Date();
  console.log((d2.getTime() - d1.getTime()) / 1000);

  // - refresh report page  
  d1 = new Date();
  console.log('- refresh report page');
  await page.reload(
    {
      waitUntil: waitUntil
    }
  );
  d2 = new Date();
  console.log((d2.getTime() - d1.getTime()) / 1000);

  // await browser.close();
})();

// api document -> https://github.com/puppeteer/puppeteer/blob/v2.1.1/docs/api.md

// install nodejs higher than v7.6.0, e.g. v10.16.3
// npm install puppeteer@2.1.1
// node index.js
