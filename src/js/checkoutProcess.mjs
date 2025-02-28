import { alertMessage, removeAllAlerts, getLocalStorage, setLocalStorage } from "./utils.mjs";  
import { checkout } from "./externalServices.mjs";  

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
        this.calculateOrdertotal();
    },
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const itemNumElement = document.querySelector(this.outputSelector + " #num-items");
    const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");

    itemNumElement.innerHTML = this.list.length;

    // calculate the total amount of the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    summaryElement.innerText = "$" + this.itemTotal;
    
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    const shipping = document.querySelector(this.outputSelector + " #shipping-estimate");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");
    
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  },
  checkout: async function (form) {
    const json = formDataToJSON(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    // eslint-disable-next-line no-console
    console.log(json);
    try {
       const res = await checkout(json);
       // eslint-disable-next-line no-console
       console.log(res);
       setLocalStorage("so-cart", []);
       location.assign("/checkout/success.html");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
    }
  },
  
}

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    // eslint-disable-next-line no-console
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default checkoutProcess;