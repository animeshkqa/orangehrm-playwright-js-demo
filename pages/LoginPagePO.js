import { readKeyValueSheet } from '../utils/readExcel.js';

export class LoginPagePO {
    constructor(page) {
        this.page=page;
        this.dataFilePath = './data/sitTestData.xlsx';
        this.urlData = {};
        this.userbox=page.locator(`//input[@placeholder='Username']`);
        this.passwordbox=page.locator(`//input[@placeholder='Password']`);
        this.loginButton=page.locator(`//button[@type='submit']`);
        this.invalidCredentialMsg=page.locator(`//p[text()='Invalid credentials']`);
    }

    async init() {
        const sheetName = 'url';
        this.urlData = await readKeyValueSheet(this.dataFilePath, sheetName);
    }

    async gotoHomePage() {
        if (!this.urlData.loginPage) {
            throw new Error('URL data not loaded. Call init() first.');
        }

        await this.page.goto(this.urlData.loginPage);
        await this.page.waitForLoadState('networkidle');
    }

    async performLogin(username, password) {
        await this.userbox.fill(username);
        await this.passwordbox.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}