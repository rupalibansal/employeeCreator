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
  await browser.close();
});

test("verify that the employee is created successfully", async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: "chrome",
  });
  const newPage: Page = await browser.newPage();
  await newPage.goto("http://localhost:5173/");
  await newPage.getByRole("button", { name: /Create Employee/i }).click();

  await newPage.getByLabel("First Name").fill("Tina");
  await newPage.getByLabel("Middle Name (if applicable)").fill("Gupta");
  await newPage.getByLabel("Last Name").fill("Bansal");
  await newPage.getByLabel("Email").fill("tina.bansal@luxethreads.com");
  await newPage.getByLabel("Phone Number").fill("0435080645");
  await newPage.getByLabel("Street Address").fill("123 Kate Street");
  await newPage.getByLabel("Suburb").fill("Melton");
  await newPage.getByLabel("Postal Code").fill("9999");
  // select locator from a dropdown
  await newPage
    .getByRole("combobox", { name: /State/i })
    .click()
    .then(() => newPage.click("text=Tasmania"));

  await newPage
    .getByRole("combobox", { name: /Department/i })
    .click()
    .then(() => newPage.click("text=Human Resources"));

  await newPage.fill('input[name="startDate"]', "2023-11-11");

  await newPage.getByRole("checkbox", { name: "Permanent" }).check();
  await newPage.getByRole("button", { name: /Create/i }).click();

  await newPage.screenshot({ path: `./screenshots/createEmployee.png` });

  await expect(
    newPage.getByRole("heading", { name: "Tina Bansal" }).first()
  ).toBeVisible();

  await newPage.waitForTimeout(10000);
  await browser.close();
});
