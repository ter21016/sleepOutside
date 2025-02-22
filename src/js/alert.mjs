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