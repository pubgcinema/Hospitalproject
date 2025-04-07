document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const loginName = document.getElementById('loginName').value.trim();
    const password = document.getElementById('password').value.trim();
    const profession = document.getElementById('profession').value.trim();

    // Basic validation
    if (!loginName || !password || !profession) {
        alert('Please fill in all fields.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Optionally, validate profession (if it's a dropdown with specific options)
    const validProfessions = ['general_practitioner', 'specialist', 'nurse']; // Example valid professions
    if (!validProfessions.includes(profession.toLowerCase())) {
        alert('Please select a valid profession.');
        return;
    }

    // Store login details in localStorage
    localStorage.setItem('loginName', loginName);
    localStorage.setItem('profession', profession.toLowerCase());

    // Redirect to patients.html with URL parameters
    window.location.href = `patients.html?loginName=${encodeURIComponent(loginName)}&profession=${encodeURIComponent(profession)}`;
});