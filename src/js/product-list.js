import productList from "./productList.mjs";
import { loadHeaderFooter, updateCartCount, getParam} from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

productList(".product-list", category);


// Call the updateCartCount function 
updateCartCount();