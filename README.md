# Playwright JavaScript E2E Test Automation Framework
This project provides a robust and scalable end-to-end test automation framework built with **Playwright** and **JavaScript (ES Modules)**. It's designed for clarity and maintainability, using the **Page Object Model (POM)** and supporting **data-driven testing** with **ExcelJS**.

### Key Features
* **Modern JavaScript:** Uses ES Modules, ensuring a modern and clean codebase.
* **Page Object Model:** Organizes tests for better reusability and easier maintenance.
* **Data-Driven Testing:** Seamlessly pulls test data from Excel files using **ExcelJS**.
* **Comprehensive Reports:** Generates detailed HTML reports for every test run using playwright's built in html repoter.
* **CI/CD Ready:** Configured for effortless integration with CI/CD pipelines like Jenkins.

### Project Structure
```text
orangehrm-playwright-js-framework/
├── config/          # Playwright configuration
├── data/            # Excel test data
├── pages/           # Page Object classes
├── reports/         # Different Reports
├── tests/           # Test specifications
├── utils/           # Utility files (e.g., Excel reader)
├── .gitignore
├── package.json
└── README.md
```

### Environment Variables

This project uses a `.env` file to manage environment-specific configurations like credentials. A template `.env.example`, is mentioned below.

To get started, simply follow these steps:

1.  Create a new file named **`.env`** in the project's root directory.
2.  Fill the contents of **`.env`** with actual credentials.

**`.env.example`**
```text
APP_USERNAME=myuser
APP_PASSWORD=mypassword
```

### Getting Started

#### Prerequisites
* Node.js (v18 or newer)
* Playwright

#### Setup
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/animeshkqa/orangehrm-playwright-js-demo.git
    cd orangehrm-playwright-js-demo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

---

### Running Tests

This project includes predefined scripts in `package.json` for easy test execution.

1.  **Run all tests in headless mode:**
    ```bash
    npm run test
    ```

2.  **Run tests in headed mode (browser UI visible):**
    ```bash
    npm run test:headed
    ```

3.  **View the last test report:**
    ```bash
    npm run test:report
    ```

### Data-Driven Testing with Excel

Test data is stored in data/sitTestData.xlsx and can be dynamically read into the tests.
Example:

**`sitTestData.xlsx`**
| Page Name | URL Path |
| :--- | :--- |
| `loginPage` | `/web/index.php/auth/login` |
| `dashboardPage` | `/web/index.php/dashboard/index` |

This data are stored in **`url`** worksheet and can be dynamically fetched to construct full URLs, ensuring the tests are resilient to URL changes. For example, `gotoHomePage()` function could use this data to navigate to the correct login page.
