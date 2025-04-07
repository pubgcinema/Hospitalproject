// Get user details from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const loginName = decodeURIComponent(urlParams.get('loginName') || 'Dr. Jose Simmons');
const profession = decodeURIComponent(urlParams.get('profession') || 'General Practitioner');

// Update dashboard with user details
document.getElementById('userName').textContent = loginName;
document.getElementById('userProfession').textContent = profession === 'general_practitioner' ? 'General Practitioner' : profession;