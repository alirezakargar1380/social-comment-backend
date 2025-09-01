import { Injectable } from '@nestjs/common';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { UpdateInstagramDto } from './dto/update-instagram.dto';
import puppeteer from 'puppeteer';
import * as sharp from 'sharp';

@Injectable()
export class InstagramService {
  async checkPageExist(username = "alireza_kargarr") {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // آدرس صفحه اینستاگرام
    const url = `https://www.instagram.com/${username}/`;

    await page.goto(url, { waitUntil: "networkidle2" });

    const title = await page.title();
    console.log(title);

    return title.includes("not found") ? false : true
  }

  async captureInstagram(username = "alireza_kargarr") {
    let cropOptions = { left: 0, top: 60, width: 800, height: 450 }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // آدرس صفحه اینستاگرام
    const url = `https://www.instagram.com/${username}/`;

    await page.goto(url, { waitUntil: "networkidle2" });

    // 
    await page.waitForSelector("#splash-screen", { hidden: true });

    // Wait until the text disappears
    await page.evaluate((btnText) => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const btn = buttons.find(b => b.innerText.trim() === btnText);
      if (btn) btn.click();
    }, "Allow all cookies");

    // second way
    // document.querySelector('[role=dialog]')

    await new Promise((resolve) => setTimeout(resolve, 2000))

    // گرفتن اسکرین‌شات کامل از صفحه
    const screenshotPath = "screenshot32.png";
    await page.screenshot({ path: screenshotPath, fullPage: true });

    await browser.close();

    // کراپ کردن با sharp
    const outputPath = "cropped.png";
    await sharp(screenshotPath)
      .extract(cropOptions) // { left, top, width, height }
      .toFile(outputPath);

    // console.log("✅ تصویر کراپ‌شده ذخیره شد:", outputPath);
  }
}
