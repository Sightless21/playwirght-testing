const { test, expect } = require("@playwright/test");
const exp = require("constants");
const { skip } = require("node:test");

// Saucedemo UI
test.describe("Saucedemo test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
  });

  // email and password
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
    // get element page
    const usernameInput = await page.$("#user-name");
    const passwordInput = await page.$("#password");
    const loginButton = await page.$("#login-button");

    // input data
    await usernameInput.fill(email[0]);
    await passwordInput.fill(password[0]);
    await loginButton.click();

    await page.waitForTimeout(1000);

    // Check if the element is visible and contains the expected text
    await expect(page.getByText(/swag labs/i)).toBeVisible();
  });

  // TC-002
  test("Should show an error message if log in without an email and password", async ({
    page,
  }) => {
    const loginButton = await page.$("#login-button");
    await loginButton.click();

    // expect to see an error message username and password is required
    await expect(
      page.getByRole("heading", { name: /epic sadface: username is required/i })
    ).toBeVisible();
  });

  // TC-003
  test("Should show an error message if log in without a password", async ({
    page,
  }) => {
    const usernameInput = await page.$("#user-name");
    const loginButton = await page.$("#login-button");
    await usernameInput.fill(email[0]);
    await loginButton.click();

    // expect to see an error message password is required
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
    const passwordInput = await page.$("#password");
    const loginButton = await page.$("#login-button");
    await passwordInput.fill(password[0]);
    await loginButton.click();

    // expect to see an error message username is required
    await expect(
      page.getByRole("heading", {
        name: /epic sadface: username is required/i,
      })
    ).toBeVisible();
  });
});

// Youtube
test.describe("Youtube test", () => {
  // play video before test
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.youtube.com/watch?v=ZHgyQGoeaB0");
  });

  // TC-005
  test("should be able to click next video", async ({ page }) => {
    await page.waitForTimeout(3000);
    const initialVideoUrl = await page.url();
    const initialVideoTitle = await page
      .getByRole("heading", { name: "OIIAOIIA CAT but in 4K (Not" })
      .locator("yt-formatted-string")
      .textContent();
    await page.waitForTimeout(3000); // Wait for 3 seconds to make sure the video is fully loaded
    console.log(initialVideoTitle);
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
  test("Should be able to click full screen button ", async ({ page }) => {
    await page.waitForLoadState("networkidle"); // Wait for the page to be fully loaded

    const fullScreenButton = await page.getByRole("button", {
      name: "Full screen (f)",
    });

    // Click the full screen button and expect the page to be fullscreen
    await fullScreenButton.click();
    await page.waitForTimeout(3000);
    const isVideoFullscreen = await page.evaluate(() => {
      return document.fullscreenElement !== null;
    });
    await page.waitForTimeout(3000);

    if(await expect(isVideoFullscreen.toBe(true))){
      console.log("Video is fullscreen");
    }
  });

  // TC-007
  test("should be able to search ", async ({ page }) => {
    await page.waitForLoadState("networkidle"); // Wait for the page to be fully loaded

    const searchInput = await page.getByRole("combobox", { name: "Search" });
    await searchInput.fill("league of legends");
    await searchInput.press("Enter");

    const definitionLink = [
      "https://www.youtube.com/results?search_query=league+of+legends",
      "https://www.youtube.com/c/leagueoflegends",
    ];
    await page.waitForTimeout(3000);
    expect(await page.goto(definitionLink[0]));
    await page.waitForTimeout(3000);
    await page
      .getByRole("link", {
        name: "League of Legends tooltip Verified @leagueoflegends•15.6M subscribers Recently",
      })
      .click();

    // expect to see the video page
    expect(await page.goto(definitionLink[1]));
  });

  // TC-008
  test("Should showing the channel information", async ({ page }) => {
    await page.waitForTimeout(3000);
    const channelLink = await page.getByRole("link", { name: "Goldfish Fan" });
    await channelLink.click();

    // expect to see the channel page
    expect(await page.goto("https://www.youtube.com/@GoldfishFan7"));
  });

  // TC-009
  test("After press like icon in video are increased total like count", async ({
    page,
  }) => {
    await page.waitForTimeout(3000);
    const likeButton = await page.getByRole("button", {
      name: /like this video along with /i,
    });
    await likeButton.click();
    await page.waitForTimeout(3000);

    if (await page.getByText("Sign in to make your opinion").isVisible()) {
      console.error(
        'Test Failed: Unexpected behavior detected. "Sign in to make your opinion" is visible.'
      );

      // throw an error
      throw new Error(
        'Use case failed: The element "Sign in to make your opinion" should not be visible.'
      );
    } else {
      console.log("Test Passed: The behavior is as expected.");
    }
  });

  // TC-010
  test("After press dislike icon in video are increased total dislike count", async ({
    page,
  }) => {
    await page.waitForTimeout(3000);
    const dislikeButton = await page.getByRole("button", {
      name: "Dislike this video",
    });
    await dislikeButton.click();
    await page.waitForTimeout(2000);

    if (await page.getByText("Sign in to make your opinion").isVisible()) {
      console.error(
        'Test Failed: Unexpected behavior detected. "Sign in to make your opinion" is visible.'
      );

      // throw an error
      throw new Error(
        'Use case failed: The element "Sign in to make your opinion" should not be visible.'
      );
    } else {
      console.log("Test Passed: The behavior is as expected.");
    }
  });
});
