
/*
En esta version se mejoraron varias cosas:
1- Se usaron variables de entorno para los datos de login se tuvo que instalar mediante "npm install dotenv"
el cual es un modulo para cargar variables de entorno mediante arvhivo .env
2- Se crear el arvhivo .env donde se agregan las variables de entorno
3- Se reemplazan las credenciales hardcodeadas por las variables de entorno
agrego algo*/

import {test,expect} from '@playwright/test';
import { LoginPage, ProductsPage, CartPage, CheckOutInfoPage, CheckOutOverviewPage, CheckoutCompletePage } from './pom.spec';

test.describe('Regression Tests', ()=>{
    let loginPage : LoginPage
    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page)
        await loginPage.navigate()
    })
    test('Successful Login', async({page})=>{
       // const loginPage = new LoginPage(page)
       // await loginPage.navigate()
        await loginPage.loginActions(process.env.STANDARD_USER!,process.env.PASSWORD!) 
        await loginPage.assertLoginSuccessful();      

    })

    test('Locked user Login', async({page})=>{
       // const loginPage = new LoginPage(page)
       // await loginPage.navigate()
        await loginPage.loginActions(process.env.LOCKED_USER!,process.env.PASSWORD!)
        await loginPage.assertLoginUserBlocked()
    })

    test('Add a product and checkout', async({page})=>{
       // const loginPage = new LoginPage(page)
       // await loginPage.navigate()
        const productsPage = await loginPage.loginActions(process.env.STANDARD_USER!,process.env.PASSWORD!)
        
       //const productsPage = new ProductsPage(page)
        await productsPage.addProductToCart()
        await productsPage.assertCartCount()
        const yourCartPage = await productsPage.goToCart()
        
        //const yourCartPage = new CartPage(page)
        await yourCartPage.cartAssert()
        const checkOutInfo = await yourCartPage.checkOut()
        
        //const checkOutInfo = new CheckOutInfoPage(page)
        await checkOutInfo.checkOutInfoAssert()
        await checkOutInfo.fillData('Juan','Perez','122358')
        const checkOutOverview = await checkOutInfo.continueToOverview()

        //const checkOutOverview = new CheckOutOverviewPage(page)
        await checkOutOverview.checkOutOverviewAssert()
        const checkOutComplete = await checkOutOverview.goToFinish()       
        
        //const checkOutComplete = new CheckoutCompletePage(page)
        await checkOutComplete.checkOutCompleteAssert()
        await checkOutComplete.backHome()

    })
})