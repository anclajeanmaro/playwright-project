import { test } from "../fixtures/fixtures"
//import {CartPage, CheckOutInfoPage, CheckOutOverviewPage, CheckoutCompletePage} from './pom.spec'

test('Add a product and checkout', async ({ productsPage }) => {
  await productsPage.addProductToCart();
  await productsPage.assertCartCount();

  const yourCartPage = await productsPage.goToCart();
  await yourCartPage.cartAssert();

  const checkOutInfo = await yourCartPage.checkOut();
  await checkOutInfo.checkOutInfoAssert();
  await checkOutInfo.fillData('Juan', 'Perez', '122358');

  const checkOutOverview = await checkOutInfo.continueToOverview();
  await checkOutOverview.checkOutOverviewAssert();

  const checkOutComplete = await checkOutOverview.goToFinish();
  await checkOutComplete.checkOutCompleteAssert();
  await checkOutComplete.backHome();
});
