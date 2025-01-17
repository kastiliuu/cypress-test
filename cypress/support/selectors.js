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
    checkoutButton: "//button[contains(@data-test,'checkout')]",
    continueCheckoutButton: "//input[contains(@data-test,'continue')]",
    finishCheckoutButton: "//button[contains(@data-test,'finish')]",
    
    // Adicionando o novo XPath para o botão de cancelamento
    cancelCheckoutButton: "//button[@class='btn btn_secondary back btn_medium cart_cancel_link'][contains(.,'Cancel')]",
    
    // Outros XPaths que você está usando no código
    backToProductsButton: "//button[@class='btn btn_secondary back btn_medium'][contains(.,'Continue Shopping')]",
  };
  
  module.exports = selectors;
  