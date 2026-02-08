import {Locator, Page,expect} from '@playwright/test';

export class LoginPage{

    private readonly page : Page
    private readonly userNameInput : Locator
    private readonly passwordInput : Locator
    private readonly loginButton : Locator
    private readonly productsTitle : Locator
    private readonly errorBannerLogin : Locator
    constructor(page : Page){
        this.page = page
        this.userNameInput = page.locator('[name="user-name"]')
        this.passwordInput = page.locator('[name="password"]')
        this.loginButton = page.locator('#login-button')
        this.productsTitle = page.locator(".title")
        this.errorBannerLogin = page.locator('div.error-message-container')
    }

    async navigate(){
        await this.page.goto(process.env.URL1!)
    }

    async loginActions(userName: string, passWord: string) : Promise<ProductsPage>{        
        //await this.page.fill('[name="user-name"]',userName)
        //await this.page.fill('input[name="password"]',passWord)
        //await this.page.click('#login-button')
        await this.userNameInput.fill(userName)
        await this.passwordInput.fill(passWord)
        await this.loginButton.click()
        return new ProductsPage(this.page)
        
    }

    async assertLoginSuccessful() {
    //const landingLocator = this.page.locator(".title")
    await expect(this.productsTitle).toBeVisible();
    }

    async assertLoginUserBlocked(){
        //const errorLocator =  this.page.locator('div.error-message-container')
        await expect(this.errorBannerLogin).toContainText('Epic sadface: Sorry')
    }
}

export class ProductsPage{
    private readonly page: Page
    private readonly addBackPackButton : Locator
    private readonly shoppingCartBadge : Locator
    constructor(page:Page){
        this.page = page
        this.addBackPackButton = page.locator('#add-to-cart-sauce-labs-backpack')
        this.shoppingCartBadge = page.locator('span.shopping_cart_badge')
    }

    async addProductToCart(){
        await this.addBackPackButton.click()
           
    }
    async assertCartCount(){
        await expect(this.shoppingCartBadge).toContainText('1')     

    }
    async goToCart() : Promise<CartPage> {
        await this.shoppingCartBadge.click()
        return new CartPage(this.page)
    }

}

export class CartPage{
    private readonly page:Page
    private readonly cartPageTitle : Locator
    private readonly checkOutButton : Locator
    constructor(page:Page){
        this.page = page
        this.cartPageTitle = page.locator('.title')
        this.checkOutButton = page.getByRole('button', { name: 'Checkout' })
    }

    async cartAssert(){
        await expect(this.cartPageTitle).toBeVisible() 
    }
    
    async checkOut() : Promise<CheckOutInfoPage>{
        await this.checkOutButton.click()
        return new CheckOutInfoPage(this.page)
    }
}

export class CheckOutInfoPage{
    private page: Page
    private readonly checkOutTittle : Locator
    private readonly firstName : Locator
    private readonly lastName : Locator
    private readonly postalCode : Locator
    private readonly continueButton : Locator
    constructor(page:Page){
        this.page = page
        this.checkOutTittle = page.locator('.title')
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.postalCode = page.locator('#postal-code')
        this.continueButton = page.locator('#continue')
    }

    async checkOutInfoAssert(){
        await expect(this.checkOutTittle).toBeVisible()
    }

    async fillData(firstName:string, lastName: string, zipCode:string){
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.postalCode.fill(zipCode)
    }

    async continueToOverview() : Promise <CheckOutOverviewPage>{
        await this.continueButton.click()
        return new CheckOutOverviewPage(this.page)
    }

}

export class CheckOutOverviewPage{
    private page: Page
    private checkOutTitle : Locator
    private finishButton : Locator
    constructor(page:Page){
        this.page = page
        this.checkOutTitle = page.locator('.title')
        this.finishButton = page.locator('#finish')
    }

    async checkOutOverviewAssert(){
        await expect(this.checkOutTitle).toBeVisible()
    }

    async goToFinish() : Promise <CheckoutCompletePage>{
        await this.finishButton.click()
        return new CheckoutCompletePage(this.page)
    }

}

export class CheckoutCompletePage{
    private page:Page
    private readonly checkOutCompleteTitle : Locator
    private readonly backHomeButton : Locator
    constructor(page:Page){
        this.page = page
        this.checkOutCompleteTitle = page.locator('.title')
        this.backHomeButton = page.locator('#back-to-products')
    }

    async checkOutCompleteAssert(){
        await expect(this.checkOutCompleteTitle).toBeVisible()
    }

    async backHome(){
        await this.backHomeButton.click()
    }
}

    
