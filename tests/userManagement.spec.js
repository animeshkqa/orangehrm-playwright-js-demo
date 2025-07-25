import { test, expect } from '@playwright/test';
import { LoginPagePO } from "../pages/loginPagePO.js";
import { DashboardPagePO } from "../pages/dashboardPagePO.js";
import { AdminPagePO } from "../pages/adminPagePO.js";
import { AddUserModalPO } from '../pages/addUserModalPO.js';
import { readColumnWiseKeyValueSheet } from '../utils/readExcel.js';
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
let adminPO;
let adminUserModalPO;

test.beforeAll(async({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    loginPO = new LoginPagePO(page);
    dashboardPO = new DashboardPagePO(page);
    adminPO = new AdminPagePO(page);
    adminUserModalPO = new AddUserModalPO(page);

    await loginPO.init();
    await loginPO.gotoHomePage();
    await loginPO.performLogin(username, password);

    await dashboardPO.navigateToAdminPage();
    await expect(adminPO.adminUMHeader).toBeVisible();
})

test.afterAll(async() => {
    await page.close();
})

test('TC01_ADMIN_pVE Check count of existing users from table', async() => {
    const actualRowCount = await adminPO.countTableRow();
    const expectedRowCount = await adminPO.getTabRowCountFromText();
    expect(actualRowCount).toBe(expectedRowCount);
})

test('TC02_ADMIN_pVE Add User and check existence in table', async() => {
    const dataFilePath = './data/sitTestData.xlsx';
    const sheetName = 'addSingleUser';
    const multipleUserData = await readColumnWiseKeyValueSheet(dataFilePath, sheetName);

    for (const record of multipleUserData) {
        await adminPO.openAddUserModal();
        await adminUserModalPO.fullUserFormAndSave(
            record.userRole,
            record.status,
            record.newUsername,
            record.newPassword
        );
        const userNameList = await adminPO.getListOfUsername();
        await expect.soft(userNameList.includes(record.newUsername)).toBeTruthy();
    }
})

test('TC03_ADMIN_pVE Delete User and check existence in table', async() => {
    const dataFilePath = './data/sitTestData.xlsx';
    const sheetName = 'addSingleUser';
    const multipleUserData = await readColumnWiseKeyValueSheet(dataFilePath, sheetName);

    for (const record of multipleUserData) {
        await adminPO.deleteAddedUser(record.newUsername);
        const userNameList = await adminPO.getListOfUsername();
        await expect.soft(userNameList.includes(record.newUsername)).toBeFalsy();
    }
})