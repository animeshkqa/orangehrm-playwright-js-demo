import { readKeyValueSheet } from '../utils/readExcel.js';

export class DashboardPagePO {
    constructor() {
        this.dataFilePath = './data/sitTestData.xlsx';
        this.urlData = {};
    }

    async init() {
        const sheetName = 'url';
        this.urlData = await readKeyValueSheet(this.dataFilePath, sheetName);
    }

    getDashboardUrl() {
        return this.urlData.dashboardPage;
    }
}
