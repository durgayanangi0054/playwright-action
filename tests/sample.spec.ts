import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ItemsList} from '../pages/ItemsList';

test.describe('login test',  async()=>{

  test.describe.configure({ retries: 2 });

test('SauceDemo E2E', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const itemList = new ItemsList(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

    expect(await loginPage.getHomePageLogo()).toBe('Swag Labs');

    await itemList.addToCart('Sauce Labs Backpack','Add to cart');


  await page.locator('#shopping_cart_container').click();

  await expect(page.locator('.inventory_item_name')).toHaveCount(1);
});
})

test.describe.configure({retries : 2})

test('login test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const itemList = new ItemsList(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

    expect(await loginPage.getHomePageLogo()).toBe('Swag Labs');

    await itemList.addToCart('Sauce Labs Backpack','Add to cart');


  await page.locator('#shopping_cart_container').click();

  await expect(page.locator('.inventory_item_name')).toHaveCount(11);
});


test('api', async ({request}) => {


  const response = await request.get('https://restful-booker.herokuapp.com/booking/1 ');
  const body = await response.json();
   console.log(body)
  console.log(body.firstname)

});