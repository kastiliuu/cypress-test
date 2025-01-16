const selectors = {
    usernameInput: "//input[contains(@placeholder,'Username')]",
    passwordInput: "#password",
    loginButton: "#login-button",
    productText: 'Products',
    backpackProduct: 'Sauce Labs Backpack',
    addToCartButton: "//button[contains(@data-test,'add-to-cart-sauce-labs-backpack')]",
    cartBadge: "//span[@class='shopping_cart_badge']",
    cartLink: "//a[@class='shopping_cart_link']",
    inventoryItemPrice: "//div[@class='inventory_item_price']",
    removeButtonInCart: "//button[@class='btn btn_secondary btn_small cart_button'][contains(.,'Remove')]",
  };
  
  module.exports = selectors;
  