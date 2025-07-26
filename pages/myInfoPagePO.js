import { pickDateYyyyDdMm } from '../utils/datePicker.js';

export class MyInfoPage {
    constructor(page) {
        this.page = page;
        this.licenseExpiryDate = page.locator(`(//input[@placeholder='yyyy-dd-mm'])[1]`);
        this.yearDropdownXpath = page.locator(`//li[@class='oxd-calendar-selector-year']`);
        this.monthDropdownXpath = page.locator(`//li[@class='oxd-calendar-selector-month']`);
        this.dateTableXpath = page.locator(`//div[@class='oxd-calendar-dates-grid']`);
    }

    async selectLicenseExpiryDate(date) {
        await this.licenseExpiryDate.waitFor({ state: 'visible', timeout: 5000 });
        await this.licenseExpiryDate.click();
        await pickDateYyyyDdMm(this.page, date, this.yearDropdownXpath, this.monthDropdownXpath, this.dateTableXpath);

        return (await this.licenseExpiryDate.inputValue()).replace(/-/g, '');
    }
}