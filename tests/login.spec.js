import { test, expect } from '@playwright/test';
import { LoginPagePO } from "../pages/loginPagePO.js";
import { DashboardPagePO } from '../pages/dashboardPagePO.js';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.APP_USERNAME;
const password = process.env.APP_PASSWORD;

if (!username || !password) {
    throw new Error('USERNAME and PASSWORD must be set in .env file');
}

let page;
let loginPO;
let dashboardPO;

test.beforeEach(async({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    loginPO = new LoginPagePO(page);
    dashboardPO = new DashboardPagePO(page);
})

test.afterEach(async() => {
    await page.close();
})

test('TC01_LOGIN_pVE Home Page URL Check', async()=> {
    await loginPO.init();
    await dashboardPO.init();

    await loginPO.gotoHomePage();
    await loginPO.performLogin(username, password);

    await expect(page).toHaveURL(dashboardPO.getDashboardUrl(), { timeout: 15000 });
})

test('TC02_LOGIN_nVE Wrong Credentials Password', async()=> {
    await loginPO.init();
    await dashboardPO.init();

    await loginPO.gotoHomePage();
    await loginPO.performLogin(username, 'RandomPasswordXYZ');

    await expect(loginPO.invalidCredentialMsg).toBeVisible();
})

test('TC03_LOGIN_nVE Wrong Credentials Complete', async()=> {
    await loginPO.init();
    await dashboardPO.init();

    await loginPO.gotoHomePage();
    await loginPO.performLogin('RandomUser', 'RandomPasswordXYZ');

    await expect(loginPO.invalidCredentialMsg).toBeVisible();
})