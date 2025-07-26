export class AdminPagePO {
    constructor(page) {
        this.page = page;
        this.adminUMHeader=page.locator(`//h6[text()='User Management']`);
        this.userRecTableRows=page.locator(`//div[contains(@class, "oxd-table-body")]//div[contains(@class, "oxd-table-row")]`);
        this.userRecTableRowsUsername=page.locator(`//div[contains(@class, "oxd-table-body")]//div[contains(@class, "oxd-table-row")]/div[2]/div`);
        this.tabRecTxt=page.locator(`//span[contains(@class, 'oxd-text') and contains(normalize-space(), 'Records Found')]`);
        this.addUserButton=page.locator(`//button[normalize-space()='Add']`);
    }

    async countTableRow() {
        await this.userRecTableRows.first().waitFor({ state: 'visible', timeout: 5000 });
        return await this.userRecTableRows.count();
    }

    async getTabRowCountFromText() {
        const text = await this.tabRecTxt.innerText();
        const numStr = text.match(/\d+/);
        return (numStr ? parseInt(numStr[0]) : 0);
    }

    async openAddUserModal() {
        await this.addUserButton.click();
    }

    async getListOfUsername() {
        await this.userRecTableRows.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForLoadState('networkidle');

        const unames = [];
        const userNameList = await this.userRecTableRowsUsername.all();
        for (const uname of userNameList) {
            let unameActual = (await uname.innerText()).trim();
            unames.push(unameActual);
        }
        return unames;
    }

    async deleteAddedUser(expectedUsername) {
        await this.userRecTableRows.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForLoadState('networkidle');

        const totalRows = await this.userRecTableRows.count();

        for (let i = 0; i < totalRows; i++) {
            const usernameCell = this.page.locator(`//div[contains(@class, "oxd-table-body")]//div[@class='oxd-table-card'][${i + 1}]/div/div[2]/div`);
            const delButton = this.page.locator(`//div[contains(@class, "oxd-table-body")]//div[@class='oxd-table-card'][${i + 1}]/div`).getByRole(`button`).first();

            const text = (await usernameCell.innerText()).trim();

            if (text === expectedUsername) {
                await delButton.click();
                const confirmDelButton = await this.page.locator(`//button[normalize-space()='Yes, Delete']`);
                await confirmDelButton.click();
                return true;
            }
        }

        throw new Error(`Username "${expectedUsername}" not found in table.`);
    }

}