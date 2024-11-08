import { test, expect, Browser, Page } from "@playwright/test";
import { webkit, chromium, firefox } from "@playwright/test";

test("verify the title of the page", async () => {
  const browser: Browser = await firefox.launch({ headless: false });
  const newPage: Page = await browser.newPage();
  await newPage.goto("http://localhost:5173/");
  const title = await newPage.title();
  await expect(newPage).toHaveTitle(title);
});
