import { test, expect } from '@fixtures/base';
import { HomePage } from '@pages/home-page';
import { getNextDayOfWeek } from '@utils/getNextDayOfWeek';

let homePage: HomePage;
test.describe('Choose date, time & guests form', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('TC-001 - operating hours: checking available slot on closed day informs client that restaurant is closed', async ({
    page,
  }) => {
    await homePage.goto();
    await homePage.dateInput.fill(getNextDayOfWeek('monday'));
    await expect(page.getByText('The restaurant is closed on this day.')).toBeVisible();
    await expect(homePage.checkAvailabilityButton).toBeDisabled();
  });
  test('TC-002 - operating hours: outside of schedule are not available for selection', async ({
    page,
  }) => {
    await homePage.goto();
    const timeOption = page.getByRole('option', { name: '01:00' });
    await expect(timeOption).not.toBeAttached();
  });
});
