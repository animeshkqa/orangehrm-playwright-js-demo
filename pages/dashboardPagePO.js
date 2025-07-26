import { readKeyValueSheet } from '../utils/readExcel.js';

export class DashboardPagePO {
    constructor(page) {
        this.page = page;
        this.dataFilePath = './data/sitTestData.xlsx';
        this.urlData = {};
        this.adminTab = page.locator(`//span[text()='Admin']`);
        this.myInfoTab = page.locator(`//span[text()='My Info']`);
    }

    async init() {
        const sheetName = 'url';
        this.urlData = await readKeyValueSheet(this.dataFilePath, sheetName);
    }

    getDashboardUrl() {
        return this.urlData.dashboardPage;
    }

    async navigateToAdminPage() {
        await this.adminTab.click();
    }

    async navigateToMyInfoPage() {
        await this.myInfoTab.click();
    }
}
