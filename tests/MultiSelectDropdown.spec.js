// @ts-check
import { test, expect } from '@playwright/test';
import * as path from 'path';

// NOTE: Ensure 'test_file.txt' exists in the location where your tests run!
// We will use the 'path' module for reliable file path resolution.

test('simple file upload verification', async ({ page }) => {
  // Define the file name and construct the absolute file path
  // Adjust 'tests/upload' to match the actual location of your file if necessary.
  const filePath = path.join(__dirname, 'test_file.txt');
  const fileName = 'test_file.txt';
  
  // 1. Navigate to the File Upload page
  await page.goto('https://the-internet.herokuapp.com/upload');

  // 2. Attach the file to the input field (#file-upload)
  // FIX: Provide the required selector (#file-upload) as the first argument.
  await page.setInputFiles('#file-upload', filePath);

  // 3. Click the Upload button (#file-submit)
  await page.click('#file-submit');

  // 4. Verify the success header
  await expect(page.locator('h3')).toHaveText('File Uploaded!');
  
  // 5. Verify the uploaded file name is displayed
  await expect(page.locator('#uploaded-files')).toContainText(fileName);
});
