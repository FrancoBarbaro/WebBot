import { exit } from "process";
import puppeteer from "puppeteer";

console.info("Hello there! I am WebBot");

const url = "https://www.bestbuy.com";
const product = "rtx 3070";

// Launch a browser
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized", "--window-size: 2560,1440"],
});

// Allow permissions for geolocation for the desired page
const context = browser.defaultBrowserContext();
await context.overridePermissions(url, ["geolocation"]);

// Navigate to the desired page
const page = await browser.newPage();
await page.setGeolocation({ latitude: 41, longitude: 74 });
await page.goto(url);

// Close pop-up
const popupCloseButton = await page.waitForSelector(
  'button[class*="c-close-icon"]'
);
await popupCloseButton.click();
await page.waitForTimeout(1000);
// Type into the search bar
const searchBar = await page.waitForSelector("#gh-search-input", {
  timeout: 10000,
});
await searchBar.type(product, { delay: 50 });
await page.waitForTimeout(500);
await page.keyboard.press("ArrowDown");
await page.keyboard.press("ArrowRight");
await page.keyboard.press("Enter");

// // Click on the searchbar again (focus was lost due to the pop-up)
// const searchBar2 = await page.waitForSelector("#gh-search-input", {
//   timeout: 10000,
// });
// // Check the text in the search bar and type again if it's empty
// const searchText = await searchBar2.evaluate(
//   (x) => x.value,
//   searchBar2.asElement()
// );
// if (searchText !== product) {
//   console.info("Typing again");
//   await searchBar2.type(product, { delay: 50 });
// } else {
//   console.info("Refocusing");

//   await searchBar2.focus();
// }

// Wait before finishing
await page.waitForTimeout(10000);
console.info("Goodbye, I am done!");
