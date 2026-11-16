# SauceDemo Test Plan

## Application Overview

Plan for https://www.saucedemo.com covering login behavior and the authenticated shopping journey. Login scenarios start with a fresh context and do not set cookies. Every non-login scenario must create a fresh browser context, set the SauceDemo session cookie with `await context.addCookies([{ name: 'session-username', value: 'standard_user', domain: 'www.saucedemo.com', path: '/' }])`, and navigate directly to the needed page; do not perform UI login in those tests. This cookie was verified to open `/inventory.html` directly. Fresh contexts keep cart and other browser state isolated between scenarios.

## Test Scenarios

### 1. Login

**Seed:** `tests\seed.spec.ts`

#### 1.1. Standard user can log in

**File:** `tests\sauce-demo\login.spec.ts`

**Steps:**
  1. Start a fresh browser context without the session-username cookie and open https://www.saucedemo.com.
    - expect: The Swag Labs login form is visible.
  2. Enter standard_user and secret_sauce, then submit Login.
    - expect: The browser navigates to /inventory.html.
    - expect: The Products heading and six inventory products are visible.

#### 1.2. Invalid credentials are rejected

**File:** `tests\sauce-demo\login.spec.ts`

**Steps:**
  1. Start a fresh browser context without the session-username cookie and open https://www.saucedemo.com.
    - expect: The login form is visible.
  2. Enter an invalid username and password, then submit Login.
    - expect: An authentication error is displayed.
    - expect: The user remains on the login page.

#### 1.3. Locked-out user cannot log in

**File:** `tests\sauce-demo\login.spec.ts`

**Steps:**
  1. Start a fresh browser context without the session-username cookie and open https://www.saucedemo.com.
    - expect: The login form is visible.
  2. Enter locked_out_user and secret_sauce, then submit Login.
    - expect: The locked-out error message is displayed.
    - expect: The user remains on the login page.

### 2. Catalog and product details

**Seed:** `tests\seed.spec.ts`

#### 2.1. Inventory displays products and sorting works

**File:** `tests\sauce-demo\catalog.spec.ts`

**Steps:**
  1. Create a fresh browser context, set the session-username cookie with context.addCookies, and navigate directly to /inventory.html.
    - expect: The Products page loads without showing the login form.
    - expect: Six products are shown, each with a name, description, price, and Add to cart button.
  2. Select Name (Z to A), then Price (low to high), then Price (high to low) from Sort products.
    - expect: Names are sorted descending after selecting Name (Z to A).
    - expect: Prices are sorted ascending and then descending for the corresponding price options.

#### 2.2. Product details show the selected item

**File:** `tests\sauce-demo\catalog.spec.ts`

**Steps:**
  1. Create a fresh browser context, set the session-username cookie with context.addCookies, and navigate directly to /inventory.html.
    - expect: The inventory page is displayed without login.
  2. Open the Sauce Labs Backpack details, verify its name, description, and $29.99 price, then choose Back to products.
    - expect: The detail page corresponds to Sauce Labs Backpack.
    - expect: Back to products returns to /inventory.html.

### 3. Cart and checkout

**Seed:** `tests\seed.spec.ts`

#### 3.1. Add and remove products in the cart

**File:** `tests\sauce-demo\cart.spec.ts`

**Steps:**
  1. Create a fresh browser context, set the session-username cookie with context.addCookies, and navigate directly to /inventory.html.
    - expect: The inventory page is displayed without login.
  2. Add Sauce Labs Backpack to the cart and open the cart.
    - expect: The cart badge shows 1.
    - expect: The cart contains Sauce Labs Backpack with quantity 1.
  3. Remove Sauce Labs Backpack from the cart.
    - expect: The cart is empty and the cart badge is not shown.

#### 3.2. Continue shopping preserves cart contents

**File:** `tests\sauce-demo\cart.spec.ts`

**Steps:**
  1. Create a fresh browser context, set the session-username cookie with context.addCookies, and navigate directly to /inventory.html.
    - expect: The inventory page is displayed without login.
  2. Add Sauce Labs Backpack, open the cart, and select Continue Shopping.
    - expect: The user returns to the inventory page.
    - expect: The cart badge still shows 1.

#### 3.3. Checkout requires customer information

**File:** `tests\sauce-demo\checkout.spec.ts`

**Steps:**
  1. Create a fresh browser context, set the session-username cookie with context.addCookies, navigate directly to /inventory.html, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: Checkout: Your Information is displayed with First Name, Last Name, and Zip/Postal Code fields.
  2. Leave all fields blank and select Continue.
    - expect: An error indicates that First Name is required.
    - expect: The user remains on the information step.

#### 3.4. Cancel checkout returns to the cart

**File:** `tests\sauce-demo\checkout.spec.ts`

**Steps:**
  1. Create a fresh browser context, set the session-username cookie with context.addCookies, navigate directly to /inventory.html, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: Checkout: Your Information is displayed.
  2. Select Cancel.
    - expect: The user returns to the cart and the Backpack remains in the cart.

#### 3.5. Complete checkout and verify order total

**File:** `tests\sauce-demo\checkout.spec.ts`

**Steps:**
  1. Create a fresh browser context, set the session-username cookie with context.addCookies, navigate directly to /inventory.html, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: Checkout: Your Information is displayed.
  2. Enter Test, User, and 10001 in the required customer fields and select Continue.
    - expect: Checkout: Overview is displayed.
    - expect: The item total is $29.99, tax is $2.40, and total is $32.39.
  3. Select Finish.
    - expect: Checkout: Complete! is displayed with the Thank you for your order! confirmation.
    - expect: The cart is empty.

### 4. Navigation and session controls

**Seed:** `tests\seed.spec.ts`

#### 4.1. Menu logout ends the authenticated session

**File:** `tests\sauce-demo\navigation.spec.ts`

**Steps:**
  1. Create a fresh browser context, set the session-username cookie with context.addCookies, and navigate directly to /inventory.html.
    - expect: The inventory page is displayed without login.
  2. Open the menu and choose Logout.
    - expect: The login page is displayed.
    - expect: The session-username cookie is removed or no longer authorizes access.
  3. Navigate directly to /inventory.html.
    - expect: The user is redirected to the login page with an unauthenticated access message.
