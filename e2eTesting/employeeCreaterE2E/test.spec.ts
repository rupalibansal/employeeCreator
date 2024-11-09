import { test, expect, Browser, Page } from "@playwright/test";
import { webkit, chromium, firefox } from "@playwright/test";

test("verify the title of the page", async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: "chrome",
  });
  const newPage: Page = await browser.newPage();
  await newPage.goto("http://localhost:5173/");
  const title = await newPage.title();
  console.log("Title:", title);
  await newPage.screenshot({ path: `./screenshots/title.png` });
  await expect(title).toEqual("Employee Creator");
  await newPage.waitForTimeout(10000);
  browser.close();
});
