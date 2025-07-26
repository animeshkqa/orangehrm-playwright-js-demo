import { test, expect } from '@playwright/test';
import { LoginPagePO } from "../pages/loginPagePO.js";
import { DashboardPagePO } from "../pages/dashboardPagePO.js";
import { MyInfoPage } from "../pages/myInfoPagePO.js";
import { readKeyValueSheet } from '../utils/readExcel.js'
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
let myInfoPO;

test.beforeAll(async({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    loginPO = new LoginPagePO(page);
    dashboardPO = new DashboardPagePO(page);
    myInfoPO = new MyInfoPage(page);

    await loginPO.init();
    await loginPO.gotoHomePage();
    await loginPO.performLogin(username, password);

    await dashboardPO.navigateToMyInfoPage();
    await expect(myInfoPO.licenseExpiryDate).toBeVisible();
})

test.afterAll(async() => {
    await page.close();
})

test('My Info Date Picker Test', async() => {
    const dataFilePath = './data/sitTestData.xlsx';
    const sheetName = 'myInfoDate';
    const dateObj = await readKeyValueSheet(dataFilePath, sheetName);
    const date = dateObj.date;

    const actualSelectedDate = await myInfoPO.selectLicenseExpiryDate(date);
    await expect(actualSelectedDate).toEqual(String(date));
})