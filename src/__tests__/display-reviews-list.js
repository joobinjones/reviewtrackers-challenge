import puppeteer from "puppeteer";
import { setDefaultOptions } from "expect-puppeteer";
import fs from "fs";
import {} from "firebase/app";
import { getDoc } from "firebase/firestore";
import reviews from "../api/reviews.json";
const fsPromises = fs.promises;
const baseURL = process.env.BASE_URL || "http://localhost:3000/";

jest.mock("firebase/app");
jest.mock("firebase/firestore");

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("Load the home page /reviews", () => {
  let page;
  let browser;

  beforeAll(async () => {
    await fsPromises.mkdir("./.screenshots", { recursive: true });
    setDefaultOptions({ timeout: 1000 });
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.on("console", onPageConsole);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${baseURL}reviews`, { waitUntil: "load" });
  });

  afterAll(async () => {
    await browser.close();
  });

  test("should display list of reviews", async () => {
    getDoc.mockResolvedValue({ data: () => ({ reviews }) });
    await expect(page).toMatch(reviews[0].author);
  });
});
