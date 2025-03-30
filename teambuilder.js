document.addEventListener("DOMContentLoaded", function() {
    // Dummy data: 3 players per position with images and dummy stats
    const playersData = {
        PG: [
            { name: "Stephen Curry", image: "images/players/lebron.png", stats: "PPG: 30, APG: 6" },
            { name: "Chris Paul", image: "images/players/lebron.png", stats: "PPG: 16, APG: 9" },
            { name: "Russell Westbrook", image: "images/players/lebron.png", stats: "PPG: 22, APG: 8" }
        ],
        SG: [
            { name: "Klay Thompson", image: "images/players/lebron.png", stats: "PPG: 20, APG: 3" },
            { name: "Bradley Beal", image: "images/players/lebron.png", stats: "PPG: 25, APG: 4" },
            { name: "Devin Booker", image: "images/players/lebron.png", stats: "PPG: 27, APG: 5" }
        ],
        SF: [
            { name: "LeBron James", image: "images/players/lebron.png", stats: "PPG: 27, APG: 7" },
            { name: "Kevin Durant", image: "images/players/lebron.png", stats: "PPG: 29, APG: 5" },
            { name: "Kawhi Leonard", image: "images/players/lebron.png", stats: "PPG: 24, APG: 4" }
        ],
        PF: [
            { name: "Giannis Antetokounmpo", image: "images/players/lebron.png", stats: "PPG: 28, RPG: 11" },
            { name: "Anthony Davis", image: "images/players/lebron.png", stats: "PPG: 24, RPG: 10" },
            { name: "Draymond Green", image: "images/players/lebron.png", stats: "PPG: 8, RPG: 7" }
        ],
        C: [
            { name: "Joel Embiid", image: "images/players/lebron.png", stats: "PPG: 26, RPG: 12" },
            { name: "Nikola Jokic", image: "images/players/lebron.png", stats: "PPG: 24, RPG: 10" },
            { name: "Bam Adebayo", image: "images/players/lebron.png", stats: "PPG: 18, RPG: 9" }
        ]
    };

    // Track current selection
    let currentPosition = null;
    let selectedPlayer = null;
    const team = {}; // Will hold assigned players by position (e.g., { PG: {...}, ... })

    // DOM Elements
    const positions = document.querySelectorAll('.position');
    const playersList = document.querySelector('.players-list');
    const playerPreview = document.getElementById('playerPreview');
    const addToTeamBtn = document.getElementById('addToTeam');
    const saveTeamBtn = document.getElementById('saveTeam');

    // Initially disable the Save Team button
    saveTeamBtn.disabled = true;

    // Initialize each position box with "POS: N/A" text
    positions.forEach(box => {
        const pos = box.getAttribute('data-pos');
        box.innerHTML = `${pos}: N/A`;
        box.addEventListener('click', function() {
            currentPosition = pos;
            // Highlight the selected position
            positions.forEach(p => p.classList.remove('active'));
            box.classList.add('active');

            // Populate available players for the clicked position
            populatePlayersList(playersData[pos]);
            // Clear previous selection preview and disable the add button
            playerPreview.innerHTML = "";
            addToTeamBtn.disabled = true;
        });
    });

    // Populate available players for a given position
    function populatePlayersList(players) {
        playersList.innerHTML = "";
        players.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player';
            playerDiv.innerHTML = `<img src="${player.image}" alt="${player.name}" class="player-thumb"> ${player.name}`;
            playerDiv.addEventListener('click', () => {
                selectedPlayer = player;
                showPlayerPreview(player);
            });
            playersList.appendChild(playerDiv);
        });
        // Adjust the display to grid to prevent players from stacking on top of each other
    }

    // Display player details in the preview section
    function showPlayerPreview(player) {
        playerPreview.innerHTML = `
            <img src="${player.image}" alt="${player.name}" class="player-preview-img">
            <h3>${player.name}</h3>
            <p>${player.stats}</p>
        `;
        addToTeamBtn.disabled = false;
    }

    // Handle adding a selected player to the team at the selected position
    addToTeamBtn.addEventListener('click', function() {
        if (currentPosition && selectedPlayer) {
            // Update the corresponding position box
            const posBox = document.querySelector(`.position[data-pos="${currentPosition}"]`);
            posBox.innerHTML = `${currentPosition}: <img src="${selectedPlayer.image}" alt="${selectedPlayer.name}" class="player-thumb"> ${selectedPlayer.name}`;
            posBox.dataset.assigned = 'true';
            team[currentPosition] = selectedPlayer;
            // Reset preview and disable the add button
            playerPreview.innerHTML = "";
            addToTeamBtn.disabled = true;
            // Remove active highlight from the position box
            posBox.classList.remove('active');
            currentPosition = null;
            selectedPlayer = null;
            // Clear available players list
            playersList.innerHTML = "";
            // Check if all positions are filled before enabling Save Team
            checkTeamCompletion();
        }
    });

    // Enable Save Team only when every required position has a player
    function checkTeamCompletion() {
        const requiredPositions = ["PG", "SG", "SF", "PF", "C"];
        const filled = requiredPositions.every(pos => team.hasOwnProperty(pos));
        saveTeamBtn.disabled = !filled;
    }
});
