// import productList from "./productList.mjs";

// productList(".product-list", "tents");

import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

productList("#product-container", "tents-category");

