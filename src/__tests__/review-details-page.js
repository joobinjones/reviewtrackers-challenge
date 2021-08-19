import puppeteer from "puppeteer";
import { setDefaultOptions } from "expect-puppeteer";
import fs from "fs";
import {} from "firebase/app";
import faker from "faker";
import { getDoc, updateDoc } from "firebase/firestore";
import reviews from "../api/reviews.json";
const fsPromises = fs.promises;
const baseURL = process.env.BASE_URL || "http://localhost:3000/";

jest.mock("firebase/app");
jest.mock("firebase/firestore");

// const onPageConsole = (msg) =>
//   Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
//     console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
//   );

describe("Load /reviews/:reviewId", () => {
  let page;
  let browser;

  beforeAll(async () => {
    await getDoc.mockResolvedValue({ data: () => ({ reviews }) });
    await fsPromises.mkdir("./.screenshots", { recursive: true });
    setDefaultOptions({ timeout: 10000 });
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    // page.on("console", onPageConsole);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${baseURL}reviews/${reviews[3].id}`, { waitUntil: "load" });
  });

  afterAll(async () => {
    await browser.close();
  });

  test(`Should contain details for ID ${reviews[3].id}`, async () => {
    await expect(page).toMatch(reviews[3].content);
  });

  test("Should accept and save one reply", async () => {
    const reply = "Thanks for the review.";
    await page.type("textarea", reply);
    await page.click("button[type=submit]");
    await expect(page).toMatch(reply);
  });

  test("Should go back to /reviews when the back button is clicked", async () => {
    // start on 4th review's page
    await page.click("button[type=button]");
    // review 1 should be visible if the button works
    await expect(page).toMatch(reviews[0].author);
  });

  test("should allow user to edit and submit replies when edit button is clicked", async () => {
    const reply = faker.lorem.sentence();
    // click edit button
    await page.click("button[testId=editReply]");
    // type new reply
    await page.type("textarea", faker.lorem.sentence());
    // click submit
    await page.click("button[type=submit]");
    // it should still be there after submit is clicked
    await expect(page).toMatch(reply);
  });
});
