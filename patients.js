// Function to display user info in the profile card
function displayUserInfo() {
    let loginName = localStorage.getItem('loginName') || 'Guest';
    let profession = localStorage.getItem('profession') || 'Unknown Role';

    // Log current localStorage values for debugging
    console.log("localStorage loginName:", localStorage.getItem('loginName'));
    console.log("localStorage profession:", localStorage.getItem('profession'));

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    loginName = decodeURIComponent(urlParams.get('loginName') || loginName);
    profession = decodeURIComponent(urlParams.get('profession') || profession);

    // Log URL parameters for debugging
    console.log("URL loginName:", urlParams.get('loginName'));
    console.log("URL profession:", urlParams.get('profession'));

    // Format profession display
    const professionDisplay = profession === 'general_practitioner' 
        ? 'General Practitioner' 
        : profession.charAt(0).toUpperCase() + profession.slice(1);

    // Update DOM elements
    const userNameElement = document.getElementById('userName');
    const userProfessionElement = document.getElementById('userProfession');

    if (userNameElement && userProfessionElement) {
        userNameElement.textContent = loginName;
        userProfessionElement.textContent = professionDisplay;
    } else {
        console.error("User name or profession element not found in DOM.");
    }
}




// Function to display user info in the profile card
function displayUserInfo() {
    let loginName = localStorage.getItem('loginName') || 'Guest';
    let profession = localStorage.getItem('profession') || 'Unknown Role';

    const urlParams = new URLSearchParams(window.location.search);
    loginName = decodeURIComponent(urlParams.get('loginName') || loginName);
    profession = decodeURIComponent(urlParams.get('profession') || profession);

    const professionDisplay = profession === 'general_practitioner' 
        ? 'General Practitioner' 
        : profession.charAt(0).toUpperCase() + profession.slice(1);

    document.getElementById('userName').textContent = loginName;
    document.getElementById('userProfession').textContent = professionDisplay;
}

// Toggle the form visibility
document.getElementById("toggle-form-btn").addEventListener("click", function () {
    const form = document.getElementById("patient-form");
    if (form.style.display === "none") {
        form.style.display = "block";
        this.textContent = "-";
    } else {
        form.style.display = "none";
        this.textContent = "+";
    }
});

// Add patient logic
document.getElementById("add-patient-btn").addEventListener("click", function () {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const respiratoryRate = document.getElementById("respiratory-rate").value.trim();
    const temperature = document.getElementById("temperature").value.trim();
    const heartRate = document.getElementById("heart-rate").value.trim();
    const diagnosis = document.getElementById("diagnosis").value.trim() || 'Problem Diagnosis';

    if (!firstName || !lastName || !age || !gender || !respiratoryRate || !temperature || !heartRate) {
        alert("Please fill out all required fields.");
        return;
    }

    const patient = {
        id: Date.now(),
        fullName: `${firstName} ${lastName}`,
        age,
        gender,
        respiratoryRate,
        temperature,
        heartRate,
        dob: 'August 23, 1996', // Default DOB for demo
        contact: '(415) 555-1234',
        emergency: '(415) 555-5678',
        insurance: 'Sunrise Health Assurance',
        diagnoses: [diagnosis],
        labResults: 'Normal'
    };

    const patientList = document.getElementById("patients-list");
    const li = document.createElement("li");
    li.textContent = patient.fullName;
    li.classList.add("patient");
    li.dataset.patientInfo = JSON.stringify(patient);

    li.addEventListener("click", function () {
        document.querySelectorAll(".patient").forEach(p => p.classList.remove("active"));
        this.classList.add("active");
        const selectedPatient = JSON.parse(this.dataset.patientInfo); // Ensure we parse the patient data
        displayPatientDetails(selectedPatient);
    });

    patientList.appendChild(li);

    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("respiratory-rate").value = "";
    document.getElementById("temperature").value = "";
    document.getElementById("heart-rate").value = "";
    document.getElementById("diagnosis").value = "";

    document.getElementById("patient-form").style.display = "none";
    document.getElementById("toggle-form-btn").textContent = "+";
});

// Display patient details
function displayPatientDetails(patient) {
    // Update patient details in the right sidebar
    document.getElementById("display-name").textContent = patient.fullName;
    document.getElementById("display-dob").textContent = `Date of Birth: ${patient.dob}`;
    document.getElementById("display-gender").textContent = `Gender: ${patient.gender}`;
    document.getElementById("display-contact").textContent = `Contact: ${patient.contact}`;
    document.getElementById("display-emergency").textContent = `Emergency Contact: ${patient.emergency}`;
    document.getElementById("display-insurance").textContent = `Insurance Provider: ${patient.insurance}`;
    document.getElementById("lab-results").textContent = patient.labResults;

    // Update vital stats in diagnosis history
    const respiratoryHistory = document.getElementById("display-respiratory-history");
    const temperatureHistory = document.getElementById("display-temperature-history");
    const heartRateHistory = document.getElementById("display-heart-rate-history");

    if (respiratoryHistory && temperatureHistory && heartRateHistory) {
        respiratoryHistory.textContent = `${patient.respiratoryRate} bpm`;
        temperatureHistory.textContent = `${patient.temperature}°F`;
        heartRateHistory.textContent = `${patient.heartRate} bpm`;
    } else {
        console.error("One or more vital stat elements not found in Diagnosis History.");
    }

    // Update diagnosis list in the right sidebar
    const diagnosisList = document.getElementById("diagnosis-list");
    if (diagnosisList) {
        diagnosisList.innerHTML = '';
        patient.diagnoses.forEach(diag => {
            const li = document.createElement("li");
            li.textContent = diag;
            diagnosisList.appendChild(li);
        });
    } else {
        console.error("Diagnosis list element not found.");
    }

    // Update chart
    updateChart(patient);
}

// Chart.js setup for Blood Pressure
function updateChart(patient) {
    const ctx = document.getElementById('bloodPressureChart').getContext('2d');
    if (window.myChart) window.myChart.destroy();

    // Sample data (you can replace with patient-specific data)
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024'],
            datasets: [
                {
                    label: 'Systolic',
                    data: [160, 155, 150, 145, 140, 135],
                    borderColor: '#ff6384',
                    fill: false
                },
                {
                    label: 'Diastolic',
                    data: [90, 88, 85, 82, 80, 78],
                    borderColor: '#36a2eb',
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Show all information toggle
document.getElementById('show-all-btn').addEventListener('click', () => {
    const details = document.querySelectorAll('.patient-details p');
    details.forEach(p => p.style.display = p.style.display === 'none' ? 'block' : 'none');
});

// Call displayUserInfo on page load
window.onload = function() {
    displayUserInfo();
};





