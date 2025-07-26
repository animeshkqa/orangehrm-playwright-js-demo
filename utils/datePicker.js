export async function pickDateYyyyDdMm(page, date, yearDropdownXpath, monthDropdownXpath, dateTableXpath) {
    const monthMap = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    };

    try {
        date = String(date);

        const year = date.slice(0, 4);
        const day = date.slice(4, 6);
        const month = date.slice(6, 8);
        const monthStr = monthMap[month];

        await yearDropdownXpath.click();
        await page.getByText(`${year}`, { exact: true }).click();

        await monthDropdownXpath.click();
        await page.getByText(`${monthStr}`).click();

        await dateTableXpath.getByText(`${parseInt(day)}`, { exact: true }).click();

    } catch (e) {
        console.log('Date Picker Error:', e.message);
    }
}