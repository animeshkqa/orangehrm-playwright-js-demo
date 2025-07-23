import { test, expect } from '@playwright/test';
import { LoginPagePO } from "../pages/LoginPagePO.js";
import { DashboardPagePO } from '../pages/DashboardPagePO.js';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

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
    dashboardPO = new DashboardPagePO();
})

test.afterEach(async() => {
    await page.close();
})

test('Home Page URL Check', async()=> {
    await loginPO.init();
    await dashboardPO.init();

    await loginPO.gotoHomePage();
    await loginPO.performLogin(username, password);

    await expect(page).toHaveURL(dashboardPO.getDashboardUrl(), { timeout: 15000 });
})