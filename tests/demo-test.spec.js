const { test, expect } = require("@playwright/test");
const exp = require("constants");
const { skip } = require("node:test");

// Saucedemo UI
test.describe("Saucedemo test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
  });
  //
  const email = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user",
  ];
  const password = ["secret_sauce"];

  // TC-001
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

  // TC-002
  test("Should show an error message if log in without an email and password", async ({
    page,
  }) => {
    const loginButton = await page.$("#login-button");
    await loginButton.click();
    await expect(
      page.getByRole("heading", { name: /epic sadface: username is required/i })
    ).toBeVisible();
  });

  // TC-003
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

  // TC-004
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

// Youtube
test.describe.only("Youtube test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.youtube.com/watch?v=ZHgyQGoeaB0");
  });

  // TC-005
  test.skip("should be able to click next video", async ({ page }) => {
    await page.waitForTimeout(3000);
    const initialVideoUrl = await page.url();
    const initialVideiTitle = await page
      .getByRole("heading", {
        name: "[Review] Light Shop (Spoiler Alert!)",
        exact: true,
      })
      .locator("yt-formatted-string")
      .textContent();
    console.log(initialVideiTitle);
    console.log(initialVideoUrl);
    await page.keyboard.press("Shift+N");

    // Wait for the URL to change Logic
    try {
      await page.waitForFunction(
        (url) => window.location.href !== url,
        initialVideoUrl,
        { timeout: 5000 } // wait no longer 5 second
      );
    } catch (error) {
      console.log(
        "Timeout waiting for URL to change, using fallback timeout..."
      );
      await page.waitForTimeout(1000);
    }
    // Validate the video URL or title has changed
    const newVideoUrl = page.url();
    console.log(newVideoUrl);
    await expect(newVideoUrl).not.toBe(initialVideoUrl);
  });

  // TC-006
  test.skip("Should be able to click full screen button ", async ({ page }) => {
    await page.waitForLoadState("networkidle"); // Wait for the page to be fully loaded

    const fullScreenButton = await page.getByRole("button", {
      name: "Full screen (f)",
    });
    await fullScreenButton.click();
  });

  // TC-007
  test.skip("should be able to search ", async ({ page }) => {
    await page.waitForLoadState("networkidle"); // Wait for the page to be fully loaded

    const searchInput = await page.getByRole("combobox", { name: "Search" });
    await searchInput.fill("league of legends");
    await searchInput.press("Enter");

    const definitionLink = [
      "https://www.youtube.com/results?search_query=league+of+legends",
      "https://www.youtube.com/c/leagueoflegends",
    ];
    await page.waitForTimeout(3000);
    expect(
      await page.goto(
        definitionLink[0]
      )
    );
    await page.waitForTimeout(3000);
    await page
      .getByRole("link", {
        name: "League of Legends tooltip Verified @leagueoflegends•15.6M subscribers Recently",
      })
      .click();
    expect(await page.goto(definitionLink[1]));
  });

  // TC-008
  test.skip('Should showing the channel information', async ({page}) => {
    await page.waitForTimeout(3000);
    const channelLink = await page.getByRole('link', { name: 'Goldfish Fan' })
    await channelLink.click();
    expect(await page.goto('https://www.youtube.com/@GoldfishFan7'))
  });

  // TC-009
  test.skip('After press like icon in video are increased total like count', async ({page}) => {
    await page.waitForTimeout(3000);
    const likeButton = await page.getByRole('button', { name: /like this video along with /i })
    await likeButton.click();
  });

  // TC-010
  test('After press dislike icon in video are increased total dislike count', async ({page}) => {
    await page.waitForTimeout(3000);
    const dislikeButton = await page.getByRole('button', { name: 'Dislike this video' })
    await dislikeButton.click();
  });
});
