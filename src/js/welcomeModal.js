export function showWelcomeModal() {
    localStorage.removeItem('visited');
    // Check if this is the first visit
    if (!localStorage.getItem('visited')) {
      // Create modal HTML
      const modalHTML = `
        <div class="welcome-modal">
          <div class="modal-content">
            <h2>Welcome to SleepOutside!</h2>
            <p>Register now for a chance to win our exclusive camping gear giveaway!</p>
            <ul>
              <li>🎒 Premium Backpack</li>
              <li>⛺ 4-Season Tent</li>
              <li>🛏️ Static Sleeping Bag</li>
            </ul>
            <p>Sign up today to enter the drawing!</p>
            <button id="closeModal">Continue to Site</button>
          </div>
        </div>
      `;
      
      // Add modal to the page
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      // Add event listener for closing modal
      document.getElementById('closeModal').addEventListener('click', () => {
        document.querySelector('.welcome-modal').remove();
      });
      
      // Set visited flag in localStorage
      localStorage.setItem('visited', true);
    }
}