import { test, expect } from '@playwright/test';

test('Upload single file.', async ({ page }) => {

   const fileName = 'testfile1.pdf';
   const filePath = 'tests/Upload-file/testfile1.pdf';


  await page.goto('https://the-internet.herokuapp.com/upload');


  await page.locator('#file-upload').setInputFiles(filePath);

  await page.locator('#file-submit').click()
//assertion 

  await expect(page.locator('h3')).toHaveText('File Uploaded!')
// verify file is displayed 
  await expect(page.locator('#uploaded-files')).toContainText(fileName);


// New just to check the difference 
  await expect(page.locator('h4')).toHaveText('File Uploaded!')
// verify file is displayed 
  await expect(page.locator('#uploaded')).toContainText(fileName);



})