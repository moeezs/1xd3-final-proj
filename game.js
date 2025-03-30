document.addEventListener('DOMContentLoaded', () => {
    let offense = true; // Start on offense
    const stateLabel = document.getElementById('stateLabel');
    const offenseOptions = document.getElementById('offense-options');
    const defenseOptions = document.getElementById('defense-options');
    const resultText = document.getElementById('resultText');
  
    // Function to update UI based on game state (offense/defense)
    function updateUI() {
      if (offense) {
        stateLabel.textContent = 'Offense';
        offenseOptions.style.display = 'flex';
        defenseOptions.style.display = 'none';
        // Set dummy ball possession for offense
        document.getElementById('ballPossession').textContent = 'Stephen Curry';
      } else {
        stateLabel.textContent = 'Defense';
        offenseOptions.style.display = 'none';
        defenseOptions.style.display = 'flex';
        // Set dummy ball possession for defense (opponent)
        document.getElementById('ballPossession').textContent = 'Joel Embiid';
      }
      resultText.textContent = 'Choose an action';
    }
  
    updateUI();
  
    // Add event listeners to all action buttons
    document.querySelectorAll('.action-options button').forEach(button => {
      button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const chanceText = button.querySelector('.chance').textContent;
        // Parse the percentage value from the chance text
        const chance = parseInt(chanceText.replace(/\D/g, ''));
        // Dummy simulation: success if random value is less than chance
        const success = Math.random() * 100 < chance;
        resultText.textContent = `Action: ${action.toUpperCase()} - ${success ? 'Success!' : 'Failed.'}`;
  
        // Dummy toggle: After an action, switch state for demonstration
        offense = !offense;
        updateUI();
      });
    });
  });
  