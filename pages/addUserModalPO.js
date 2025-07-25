export class AddUserModalPO {
    constructor(page) {
        this.page=page;
        this.staticEmployeeNames = ['aaa aaa', 'Sobor  Ali'];
        this.userRoleDropdown=page.locator(`//label[normalize-space()='User Role']/ancestor::div[contains(@class, 'oxd-input-group')]//div[contains(@class, 'oxd-select-text--after')]`);
        this.employeeNameInput=page.getByRole('textbox', { name: 'Type for hints...' });
        this.listOfEmployeeName=page.locator(`//div[contains(@class, 'oxd-autocomplete-dropdown')]//span`);
        this.statusDropdown=page.locator(`//label[normalize-space()='Status']/ancestor::div[contains(@class, 'oxd-input-group')]//div[contains(@class, 'oxd-select-text--after')]`);
        this.usernameInput=page.locator(`//label[normalize-space()='Username']/ancestor::div[contains(@class, 'oxd-input-group')]//input[contains(@class, 'oxd-input')]`);
        this.passwordInput=page.locator(`//label[normalize-space()='Password']/ancestor::div[contains(@class, 'oxd-input-group')]//input[contains(@class, 'oxd-input')]`);
        this.confirmPasswordInput=page.locator(`//label[normalize-space()='Confirm Password']/ancestor::div[contains(@class, 'oxd-input-group')]//input[contains(@class, 'oxd-input')]`);
        this.saveButton=page.getByRole('button', { name: ' Save ' });
    }

    getUserRoleOption(role) {
        return this.page.getByRole('option', { name: role });
    }

    getStatusOption(status) {
        return this.page.getByRole('option', { name: status });
    }


    async fullUserFormAndSave(userRole, status, newUsername, newPassword) {
        this.userRole = userRole;
        this.status = status;
        await this.userRoleDropdown.click();
        await this.getUserRoleOption(userRole).click();
        await this.employeeNameInput.fill('A');
        await this.listOfEmployeeName.first().waitFor({ state: 'visible'});
        const employeeNames= await this.listOfEmployeeName.all();
        let emplFound = false;
        for (const ename of employeeNames) {
            if (this.staticEmployeeNames.includes((await ename.innerText()).trim())) {
                await ename.click();
                emplFound = true;
                break;
            }
        }
        if (!emplFound) {
            await (this.listOfEmployeeName.last()).click(); //Added fallback as names are different maximum times
        }
        await this.statusDropdown.click();
        await this.getStatusOption(status).click();
        await this.usernameInput.fill(newUsername);
        await this.passwordInput.fill(newPassword);
        await this.confirmPasswordInput.fill(newPassword);

        await this.saveButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}