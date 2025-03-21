// Data for the phone tracker
const phoneDetails = {
    phoneNumber: "",
    city: "New Delhi",
    region: "Delhi",
    device: "",
    imei: "123456789012345",
    otp: ["123456", "654321"],
    recentCalls: ["+91-9876543210", "+91-9988776655"],
    towerInfo: "Tower ID: 1234, Signal Strength: -80 dBm",
    ipdr: "IP Address: 192.168.1.1, Data Usage: 1.5 GB"
};

// Array of random phone brands and models
const phoneBrands = {
    "Samsung": ["Galaxy S21", "Galaxy Note 20", "Galaxy A52"],
    "Apple": ["iPhone 13", "iPhone 12", "iPhone SE"],
    "Xiaomi": ["Mi 11", "Redmi Note 10", "Poco X3"],
    "OnePlus": ["OnePlus 9", "OnePlus 8T", "OnePlus Nord"],
    "Oppo": ["Find X3", "Reno 6", "A54"]
};

// Function to get a random element from an array
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate details and display them in the dashboard
function generateDetails() {
    const phoneNumberInput = document.getElementById("phoneNumber").value.trim();

    if (!phoneNumberInput) {
        alert("Please enter a phone number to track.");
        return;
    }

    // Update the phone details
    phoneDetails.phoneNumber = phoneNumberInput;
    phoneDetails.device = `${getRandomElement(Object.keys(phoneBrands))} ${getRandomElement(phoneBrands[getRandomElement(Object.keys(phoneBrands))])}`;

    // Update the dashboard with generated data
    const dashboard = document.getElementById("dashboard");
    dashboard.innerHTML = `
        <div class="card">
            <h2>Phone Details</h2>
            <p><strong>Phone Number:</strong> <span class="value">${phoneDetails.phoneNumber}</span></p>
            <p><strong>Device:</strong> <span class="value">${phoneDetails.device}</span></p>
            <p><strong>IMEI:</strong> <span class="value">${phoneDetails.imei}</span></p>
        </div>
        <div class="card">
            <h2>Location Information</h2>
            <p><strong>City:</strong> <span class="value">${phoneDetails.city}</span></p>
            <p><strong>Region:</strong> <span class="value">${phoneDetails.region}</span></p>
        </div>
        <div class="card">
            <h2>Recent OTPs</h2>
            <p><strong>Recent OTPs:</strong></p>
            <ul>
                ${phoneDetails.otp.map(otp => `<li class="value">${otp}</li>`).join('')}
            </ul>
        </div>
        <div class="card">
            <h2>Recent Calls</h2>
            <p><strong>Recent Calls:</strong></p>
            <ul>
                ${phoneDetails.recentCalls.map(call => `<li class="value">${call}</li>`).join('')}
            </ul>
        </div>
        <div class="card">
            <h2>Tower Information</h2>
            <p><strong>Tower Info:</strong> <span class="value">${phoneDetails.towerInfo}</span></p>
        </div>
        <div class="card">
            <h2>IPDR</h2>
            <p><strong>IPDR:</strong> <span class="value">${phoneDetails.ipdr}</span></p>
        </div>
        <div class="map" id="map"></div>
    `;

    // Initialize the map with OpenStreetMap
    if (!window.L) {
        console.error("Leaflet library not found. Make sure to include the Leaflet library.");
        return;
    }

    const map = L.map('map').setView([28.6139, 77.2090], 12); // Default to New Delhi coordinates
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([28.6139, 77.2090]).addTo(map).bindPopup('Your Device Location').openPopup();
}

// Event listener for the phone number input field to trigger generation
document.getElementById("phoneNumber").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        generateDetails();
    }
});
