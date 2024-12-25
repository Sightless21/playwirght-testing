const { test, expect } = require("@playwright/test");
const exp = require("constants");
const { skip } = require("node:test");

test.describe("Saucedemo test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
  });
  const email = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user",
  ];
  const password = ["secret_sauce"];

  test("input field should be display as data that user enter", async ({
    page,
  }) => {
    // const humburger = await page.getByRole("button",{name : /open menu/i })
    // const logOut = await page.getByRole('link',{name : /logout/i })
    const usernameInput = await page.$("#user-name");
    const passwordInput = await page.$("#password");
    const loginButton = await page.$("#login-button");

    await usernameInput.fill(email[0]);
    await passwordInput.fill(password[0]);
    await loginButton.click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/swag labs/i)).toBeVisible();
  });

  test("Should show an error message if log in without an email and password", async ({
    page,
  }) => {
    const loginButton = await page.$("#login-button");
    await loginButton.click();
    await expect(
      page.getByRole("heading", { name: /epic sadface: username is required/i })
    ).toBeVisible();
  });

  test("Should show an error message if log in without a password", async ({
    page,
  }) => {
    // Test implementation
    const usernameInput = await page.$("#user-name");
    const loginButton = await page.$("#login-button");
    await usernameInput.fill(email[0]);
    await loginButton.click();
    await expect(
      page.getByRole("heading", {
        name: /epic sadface: password is required/i,
      })
    ).toBeVisible();
  });

  test("Should show an error message if log in without an email", async ({
    page,
  }) => {
    // Test implementation
    const passwordInput = await page.$("#password");
    const loginButton = await page.$("#login-button");
    await passwordInput.fill(password[0]);
    await loginButton.click();
    await expect(
      page.getByRole("heading", {
        name: /epic sadface: username is required/i,
      })
    ).toBeVisible();
  });
});

test.describe("Youtube test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.youtube.com/watch?v=7n6xIjTuewE");
  });

  test("should be able to click next video", async ({ page }) => {
    await page.waitForTimeout(5500);
    const video = await page.locator(
      "#movie_player > div:nth-child(1) > video"
    );
    await video.hover({modifiers: ["Shift+N"]});
    await page.waitForTimeout(3000);

    const nextVideo = await page.getByRole("heading", {
      name: /black and white y2k neon led lights heart background \|\| 1 hour looped hd/i,
    });

    await expect(nextVideo).toBeVisible();
  });
});
