import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector, token) {
  try {
    const orders = await getOrders(token);
    console.log("Orders from API:", orders);
    const parent = document.querySelector(`${selector} .order-body`);
    parent.innerHTML = orders.map(orderTemplate).join("");
  } catch (err) {
    console.error("Error loading orders:", err);
  }
}

function orderTemplate(order) {
  
  if (!order?.id) {
    console.error("Invalid order data:", order);
    return "";
  }

  return `<tr><td>${order.id}</td>
  <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
  <td>${order.items?.length || 0}</td>
  <td>${
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(order.orderTotal ?? 0)
  }</td></tr>`;
}
