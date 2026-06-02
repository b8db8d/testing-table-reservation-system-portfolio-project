// for portfolio purposes, instead of adding users to the .env file, login data are in data/test-users.ts
import { test as setup } from '@playwright/test';
import { LoginPage } from '@pages/login-page';
import loginData from '@data/test-users';

const managerFile = '.auth/manager.json';

setup('authenticate as admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(loginData.manager);
  await page.context().storageState({ path: managerFile });
});

const staffFile = '.auth/staff.json';

setup('authenticate as staff', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(loginData.staff);
  await page.context().storageState({ path: staffFile });
});
