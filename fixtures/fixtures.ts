import { test as base } from '@playwright/test'
import { LoginPage, ProductsPage } from '../tests/pom.spec'
//import { LoginPage, ProductsPage } from './pom.spec'

type MyFixtures = {
  productsPage: ProductsPage
}

export const test = base.extend<MyFixtures>({
  productsPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    const productsPage = await loginPage.loginActions(process.env.STANDARD_USER!,process.env.PASSWORD!);
    await use(productsPage);
  },
})