export async function showAlertFromJson() {
    try {
      const response = await fetch("/json/alerts.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const alerts = await response.json();
  
      if (alerts.length > 0) {
        const alertList = document.createElement("section");
        alertList.className = "alert-list";
  
        alerts.forEach(alert => {
          const alertItem = document.createElement("p");
          alertItem.textContent = alert.message;
          alertItem.style.backgroundColor = alert.background;
          alertItem.style.color = alert.color;
          alertList.appendChild(alertItem);
        });
  
        const mainElement = document.querySelector("main");
        mainElement.prepend(alertList);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching alerts:", error);
    }
}

/*export function showAlert(message, background = "info", color = "white") {
    const alertContainer = document.createElement("div");
    alertContainer.className = `alert`;
    alertContainer.textContent = message;
    alertContainer.style.backgroundColor = background;
    alertContainer.style.color = color;
  
    document.body.appendChild(alertContainer);
  
    // Automatically hide the alert after 5 seconds
    setTimeout(() => {
      hideAlert(alertContainer);
    }, 5000);
}
  
export function hideAlert(alertElement) {
    if (alertElement) {
      alertElement.remove();
    }
}*/