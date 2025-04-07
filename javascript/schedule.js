// schedule.js

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

    const userNameElement = document.getElementById('userName');
    const userProfessionElement = document.getElementById('userProfession');

    if (userNameElement && userProfessionElement) {
        userNameElement.textContent = loginName;
        userProfessionElement.textContent = professionDisplay;
    } else {
        console.error("User name or profession element not found in DOM.");
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const currentDateElement = document.getElementById('current-date');
    const showFormBtn = document.getElementById('show-form-btn');
    const toggleFormBtn = document.getElementById('toggle-form-btn');
    const appointmentForm = document.getElementById('appointment-form');
    const newAppointmentForm = document.getElementById('new-appointment-form');
    const appointmentsList = document.getElementById('appointments-list');
    const previousVisitCheckbox = document.getElementById('previous-visit');
    const purposeGroup = document.getElementById('purpose-group');
    const purposeSelect = document.getElementById('purpose');

    let currentDate = new Date('2025-03-06');

    // Format date
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    currentDateElement.textContent = formatDate(currentDate);

    // Toggle form visibility
    showFormBtn.addEventListener('click', function() {
        appointmentForm.style.display = 'block';
        showFormBtn.style.display = 'none';
    });

    toggleFormBtn.addEventListener('click', function() {
        appointmentForm.style.display = 'none';
        showFormBtn.style.display = 'block';
    });

    // Show/hide purpose dropdown based on previous visit
    previousVisitCheckbox.addEventListener('change', function() {
        if (this.checked) {
            purposeGroup.style.display = 'block';
            purposeSelect.setAttribute('required', 'true');
        } else {
            purposeGroup.style.display = 'none';
            purposeSelect.removeAttribute('required');
            purposeSelect.value = '';
        }
    });

    // Handle form submission
    newAppointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const date = document.getElementById('appointment-date').value;
        const time = document.getElementById('appointment-time').value;
        const day = document.getElementById('appointment-day').value;
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const previousVisit = document.getElementById('previous-visit').checked;
        const purpose = previousVisit ? document.getElementById('purpose').value : 'New Visit';

        // Validation
        if (!date || !time || !day || !firstName || !lastName || !phone || !email || (previousVisit && !purpose)) {
            alert('Please fill in all required fields.');
            return;
        }

        // Create appointment object
        const appointment = {
            id: Date.now(),
            date,
            time,
            day,
            fullName: `${firstName} ${lastName}`,
            phone,
            email,
            previousVisit,
            purpose,
            status: 'Pending'
        };

        // Create appointment card
        const card = document.createElement('div');
        card.classList.add('appointment-card');
        card.innerHTML = `
            <div class="time">${time}</div>
            <div class="details">
                <h3>${appointment.fullName}</h3>
                <p>${appointment.purpose} - ${day}, ${formatDate(new Date(date))}</p>
                <span class="status ${appointment.status.toLowerCase()}">${appointment.status}</span>
            </div>
        `;

        // Add to appointments list
        appointmentsList.insertBefore(card, appointmentsList.children[1]); // Insert after the "Add" button

        // Reset form and hide it
        newAppointmentForm.reset();
        purposeGroup.style.display = 'none';
        purposeSelect.removeAttribute('required');
        appointmentForm.style.display = 'none';
        showFormBtn.style.display = 'block';
    });

    // Display user info
    displayUserInfo();
});