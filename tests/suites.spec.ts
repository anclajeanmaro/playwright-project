import { test, expect } from '@playwright/test'

test.describe("Regression Suite", ()=>{
    test.beforeEach(async({page}) =>{
        await page.goto('https://www.saucedemo.com/')
    })

    test('Succesful Login validation', async ({ page }) => {    
        await expect(page).toHaveTitle('Swag Labs')
        const userNameLocator = await page.getByRole('textbox', { name: 'Username' })
        const passwordLocator = await page.getByRole('textbox', { name: 'Password' })
        const loginBtnLocator = await page.getByRole('button')
        await userNameLocator.fill('standard_user')
        await passwordLocator.fill('secret_sauce')
        await loginBtnLocator.click()
        //await page.fill('[name="user-name"]','standard_user')
        //await page.fill('input[name="password"]','secret_sauce')
        //await page.click('#login-button')
        const mainLandingLocator = await page.getByText('Products')
        await expect(mainLandingLocator).toContainText("Products")
        //expect(await mainLandingLocator.isVisible()).toBeTruthy

        //const username = page.getByRole('textbox', { name: 'Username' })
        //const password = page.getByRole('textbox', { name: 'Password' })
        //const loginButton = page.getByRole('button')

        //await username.fill('standard_user')
    })
    
    test("Locked user Login", async({page})=>{        
        const userNameLocator = await page.getByRole('textbox', { name: 'Username' })
        const passwordLocator = await page.getByRole('textbox', { name: 'Password' })
        const loginBtnLocator = await page.getByRole('button')
        await userNameLocator.fill('locked_out_user')
        await passwordLocator.fill('secret_sauce')
        await loginBtnLocator.click()

        const errorLocator =  await page.locator('div.error-message-container')
        await expect(errorLocator).toContainText('Epic sadface: Sorry')

    })

    test("Add a product and checkout", async({page})=>{
        const userNameLocator = await page.getByRole('textbox', { name: 'Username' })
        const passwordLocator = await page.getByRole('textbox', { name: 'Password' })
        const loginBtnLocator = await page.getByRole('button')
        await userNameLocator.fill('standard_user')
        await passwordLocator.fill('secret_sauce')
        await loginBtnLocator.click()
        const addTocartBtnLocator = await page.locator('#add-to-cart-sauce-labs-backpack')
        await addTocartBtnLocator.click()
        const shoppingCartLocator = await page.getByText('1', { exact: true })
        await expect(shoppingCartLocator).toContainText('1')
        await shoppingCartLocator.click()
        const cartTitleLocator = await page.getByText('Your Cart', { exact: true })
        await expect(cartTitleLocator).toContainText('Your Cart')
        const checkOutBtnLocator =  await page.getByRole('button', { name: 'Checkout' })
        await checkOutBtnLocator.click()
        
        const nameCheckOutLocator =  await page.getByRole('textbox', { name: 'First Name' })
        const lastNameCheckOutLocator = await page.getByRole('textbox', { name: 'Last Name' })
        const zipCodeCheckOutLocator = await page.getByRole('textbox', { name: 'Zip/Postal Code' })
        const conitnueBtnLocator = await page.locator('#continue')

        await nameCheckOutLocator.fill('AnyName')
        await lastNameCheckOutLocator.fill('AnyLastName')
        await zipCodeCheckOutLocator.fill('112225')
        await conitnueBtnLocator.click()

        const finishBtnLocator = await page.getByRole('button', { name: 'Finish' })

        await finishBtnLocator.click()
        const thankYouLocator = await page.getByRole('heading', { name: 'Thank you for your order!' })
        await expect(thankYouLocator).toContainText('Thank you for your order!')
        const backHomeBtnLocator = await page.getByRole('button', { name: 'Back Home' })
        await backHomeBtnLocator.click()

    })

    /*test.afterAll(async({page})=> {
        const allMenuLocator = await page.getByRole('button', { name: 'Open Menu' })
        await allMenuLocator.click()
        const logOutLocator =  await page.getByRole('link', { name: 'Logout' })
        await logOutLocator.click()
        
        
    })*/

})