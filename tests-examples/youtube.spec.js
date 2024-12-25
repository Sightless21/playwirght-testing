// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("Youtube test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.youtube.com");

    // set auth cookies to bypass login
    await page.context().addCookies([
      {
        name: "SID",
        value: "your_sid_cookie_value",
        domain: ".youtube.com",
        path: "/",
        httpOnly: true,
        secure: true,
      },
      {
        name: "HSID",
        value: "your_hsid_cookie_value",
        domain: ".youtube.com",
        path: "/",
        httpOnly: true,
        secure: true,
      },
      // Add other necessary cookies here
    ]);

    // Reload the page to apply cookies
    await page.reload();
  });
  const email = ["Firstsecondd45@gmail.com", "moodeang"];
  const password = ["ffonline1324"];

  test("input field should be display as data that user enter", async ({
    page,
  }) => {
    const signInBT = await page.getByText(/sign in/i);
    await signInBT.click();
    await page.waitForTimeout(2000);

    // Input email and password
    const emailInput = await page.getByRole("textbox", {
      name: /Email or phone/i,
    });

    const nextBT = await page.getByText(/next/i);

    await emailInput.click();
    await emailInput.fill(email[0]);

    await nextBT.click();
    await page.waitForTimeout(2000);

    // Continue to password page
    const passwordInput = await page.getByRole("textbox", {
      name: /Enter your password/i,
    });
    const nextBT2 = await page.getByText(/next/i);
    await passwordInput.fill(password[0]);
    await nextBT2.click();

    test("should display the user profile", async ({ page }) => {
      // Check if the user profile is visible
      const userProfile = await page.getByRole("button", { name: /account/i });
      await expect(userProfile).toBeVisible();
    });
  });
});
