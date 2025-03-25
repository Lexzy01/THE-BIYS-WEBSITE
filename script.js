// Initialize users in local storage if not already set
if (!localStorage.getItem('users')) {
    const users = {
        lexzy: 'password1',
        pely: 'password2',
        icezee: 'password3',
        praise: 'password4',
        hatedvylan: 'password5'
    };
    localStorage.setItem('users', JSON.stringify(users));
}

// Initialize chat messages in local storage if not already set
if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify([]));
}

// Initialize updates in local storage if not already set
if (!localStorage.getItem('updates')) {
    localStorage.setItem('updates', JSON.stringify([]));
}

// Initialize hangouts in local storage if not already set
if (!localStorage.getItem('hangouts')) {
    localStorage.setItem('hangouts', JSON.stringify([]));
}

// Initialize last seen timestamps in local storage if not already set
if (!localStorage.getItem('lastSeen')) {
    localStorage.setItem('lastSeen', JSON.stringify({}));
}

// Initialize theme preference
if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
}

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    // Apply theme on page load
    document.body.classList.add(localStorage.getItem('theme') === 'light' ? 'light-mode' : '');

    // Check login state
    function checkLoginState() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser && window.location.pathname !== '/index.html') {
            window.location.href = 'index.html';
        } else if (loggedInUser) {
            const userDisplay = document.getElementById('user-display');
            if (userDisplay) {
                userDisplay.textContent = `Logged in as ${loggedInUser}`;
            }
            // Welcome alert on home page
            if (window.location.pathname === '/home.html' && !localStorage.getItem('welcomeShown')) {
                alert(`Welcome back, ${loggedInUser}!`);
                localStorage.setItem('welcomeShown', 'true');
            }
        }
    }
    checkLoginState();

    // Update last seen timestamp
    function updateLastSeen() {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            const lastSeen = JSON.parse(localStorage.getItem('lastSeen')) || {};
            lastSeen[user] = new Date().toLocaleTimeString();
            localStorage.setItem('lastSeen', JSON.stringify(lastSeen));
        }
    }

    // Load last seen timestamps
    function loadLastSeen() {
        const lastSeenBox = document.getElementById('last-seen');
        const lastSeenProfile = document.getElementById('last-seen-profile');
        const lastSeen = JSON.parse(localStorage.getItem('lastSeen')) || {};
        const users = JSON.parse(localStorage.getItem('users')) || {};

        // Only manipulate lastSeenBox if it exists
        if (lastSeenBox) {
            lastSeenBox.innerHTML = '';
            Object.keys(users).forEach(user => {
                const timestamp = lastSeen[user] || 'Never';
                lastSeenBox.innerHTML += `<p><strong>${user}</strong> was last seen at ${timestamp}</p>`;
            });
        }

        // Only manipulate lastSeenProfile if it exists
        if (lastSeenProfile) {
            const user = localStorage.getItem('loggedInUser');
            const timestamp = lastSeen[user] || 'Never';
            lastSeenProfile.textContent = `You were last seen at ${timestamp}`;
        }
    }

    // Load chat messages
    function loadChat() {
        const chatBox = document.getElementById('chat-box');
        if (chatBox) {
            const messages = JSON.parse(localStorage.getItem('messages')) || [];
            chatBox.innerHTML = '';
            messages.forEach(msg => {
                chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text} <small>(${msg.timestamp})</small></p>`;
            });
            chatBox.scrollTop = chatBox.scrollHeight;
        }
        loadLastSeen();
    }

    // Load updates
    function loadUpdates() {
        const updatesBox = document.getElementById('updates-box');
        if (updatesBox) {
            const updates = JSON.parse(localStorage.getItem('updates')) || [];
            updatesBox.innerHTML = '';
            if (updates.length === 0) {
                updatesBox.innerHTML = '<p>No updates yet—post something!</p>';
            } else {
                updates.forEach(update => {
                    updatesBox.innerHTML += `<p><strong>${update.user}:</strong> ${update.text} <small>(${update.timestamp})</small></p>`;
                });
            }
            updatesBox.scrollTop = updatesBox.scrollHeight;
        }
    }

    // Load hangouts
    function loadHangouts() {
        const hangoutsBox = document.getElementById('hangouts-box');
        if (hangoutsBox) {
            const hangouts = JSON.parse(localStorage.getItem('hangouts')) || [];
            hangoutsBox.innerHTML = '';
            if (hangouts.length === 0) {
                hangoutsBox.innerHTML = '<p>No hangouts planned—let’s set one up!</p>';
            } else {
                hangouts.forEach(hangout => {
                    hangoutsBox.innerHTML += `<p><strong>${hangout.user}</strong> planned: ${hangout.activity} at ${hangout.location} on ${hangout.date} <small>(${hangout.timestamp})</small></p>`;
                });
            }
            hangoutsBox.scrollTop = hangoutsBox.scrollHeight;
        }
    }

    // Load user-specific data for profile
    function loadUserData() {
        const userMessagesBox = document.getElementById('user-messages');
        const userUpdatesBox = document.getElementById('user-updates');
        const loggedInUser = localStorage.getItem('loggedInUser');

        if (userMessagesBox) {
            const messages = JSON.parse(localStorage.getItem('messages')) || [];
            userMessagesBox.innerHTML = '';
            const userMessages = messages.filter(msg => msg.user === loggedInUser);
            if (userMessages.length === 0) {
                userMessagesBox.innerHTML = '<p>You haven’t sent any messages yet.</p>';
            } else {
                userMessages.forEach(msg => {
                    userMessagesBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text} <small>(${msg.timestamp})</small></p>`;
                });
            }
        }

        if (userUpdatesBox) {
            const updates = JSON.parse(localStorage.getItem('updates')) || [];
            userUpdatesBox.innerHTML = '';
            const userUpdates = updates.filter(update => update.user === loggedInUser);
            if (userUpdates.length === 0) {
                userUpdatesBox.innerHTML = '<p>You haven’t posted any updates yet.</p>';
            } else {
                userUpdates.forEach(update => {
                    userUpdatesBox.innerHTML += `<p><strong>${update.user}:</strong> ${update.text} <small>(${update.timestamp})</small></p>`;
                });
            }
        }
        loadLastSeen();
    }

    // Grab buttons
    const buttons = document.querySelectorAll('.action-btn');
    console.log('Buttons found:', buttons.length);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked:', button.id);

            // Home buttons (home.html)
            if (button.textContent === 'Say Yo') {
                alert('Yo, it’s The Boys!');
            } else if (button.textContent === 'Crew Vibes') {
                alert('Best crew, best vibes.');
            } else if (button.textContent === 'Boys Only') {
                alert('The Boys rule this spot!');
            }

            // Chat (chat.html)
            else if (button.id === 'send-btn') {
                const input = document.getElementById('chat-input');
                if (input && input.value) {
                    if (input.value.length > 200) {
                        alert('Message too long! Keep it under 200 characters.');
                        return;
                    }
                    const user = localStorage.getItem('loggedInUser');
                    const messages = JSON.parse(localStorage.getItem('messages')) || [];
                    const timestamp = new Date().toLocaleTimeString();
                    messages.push({
                        user: user,
                        text: input.value,
                        timestamp: timestamp
                    });
                    localStorage.setItem('messages', JSON.stringify(messages));
                    input.value = '';
                    updateLastSeen();
                    loadChat();
                    loadUserData();
                }
            } else if (button.id === 'refresh-chat-btn') {
                loadChat();
            } else if (button.id === 'clear-chat-btn') {
                if (confirm('Are you sure you want to clear the chat?')) {
                    localStorage.setItem('messages', JSON.stringify([]));
                    loadChat();
                    loadUserData();
                }
            }

            // Updates (updates.html)
            else if (button.id === 'post-update-btn') {
                const input = document.getElementById('update-input');
                if (input && input.value) {
                    const user = localStorage.getItem('loggedInUser');
                    const updates = JSON.parse(localStorage.getItem('updates')) || [];
                    const timestamp = new Date().toLocaleTimeString();
                    updates.push({
                        user: user,
                        text: input.value,
                        timestamp: timestamp
                    });
                    localStorage.setItem('updates', JSON.stringify(updates));
                    input.value = '';
                    updateLastSeen();
                    loadUpdates();
                    loadUserData();
                }
            }

            // Hangouts (hangouts.html)
            else if (button.id === 'plan-hangout-btn') {
                const dateInput = document.getElementById('hangout-date');
                const locationInput = document.getElementById('hangout-location');
                const activityInput = document.getElementById('hangout-activity');
                if (dateInput && locationInput && activityInput && dateInput.value && locationInput.value && activityInput.value) {
                    const user = localStorage.getItem('loggedInUser');
                    const hangouts = JSON.parse(localStorage.getItem('hangouts')) || [];
                    const timestamp = new Date().toLocaleTimeString();
                    hangouts.push({
                        user: user,
                        date: dateInput.value,
                        location: locationInput.value,
                        activity: activityInput.value,
                        timestamp: timestamp
                    });
                    localStorage.setItem('hangouts', JSON.stringify(hangouts));
                    dateInput.value = '';
                    locationInput.value = '';
                    activityInput.value = '';
                    updateLastSeen();
                    loadHangouts();
                } else {
                    alert('Please fill in all fields to plan a hangout.');
                }
            }

            // Profile (profile.html)
            else if (button.id === 'change-password-btn') {
                const newPassword = document.getElementById('new-password').value;
                const user = localStorage.getItem('loggedInUser');
                if (newPassword) {
                    const users = JSON.parse(localStorage.getItem('users')) || {};
                    users[user] = newPassword;
                    localStorage.setItem('users', JSON.stringify(users));
                    document.getElementById('profile-message').textContent = 'Password changed successfully! Please log in again.';
                    setTimeout(() => {
                        localStorage.removeItem('loggedInUser');
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    document.getElementById('profile-message').textContent = 'Please enter a new password.';
                }
            }

            // Theme Toggle
            else if (button.id === 'theme-toggle') {
                console.log('Theme toggle clicked');
                const currentTheme = localStorage.getItem('theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                localStorage.setItem('theme', newTheme);
                document.body.classList.toggle('light-mode');
            }

            // Login (index.html)
            else if (button.id === 'login-btn') {
                console.log('Login button clicked');
                const username = document.getElementById('username').value.toLowerCase();
                const password = document.getElementById('password').value;
                const users = JSON.parse(localStorage.getItem('users')) || {};
                console.log('Users in localStorage:', users);
                console.log('Attempting login with:', username, password);
                if (users[username] && users[username] === password) {
                    localStorage.setItem('loggedInUser', username);
                    localStorage.removeItem('welcomeShown');
                    document.getElementById('message').textContent = 'Logged in! Heading to The Boys...';
                    setTimeout(() => { window.location.href = 'home.html'; }, 1000);
                } else {
                    document.getElementById('message').textContent = 'Invalid username or password.';
                }
            }

            // Sign Up (index.html)
            else if (button.id === 'signup-btn') {
                const username = document.getElementById('username').value.toLowerCase();
                const password = document.getElementById('password').value;
                const users = JSON.parse(localStorage.getItem('users')) || {};
                if (users[username]) {
                    document.getElementById('message').textContent = 'Username already exists.';
                } else {
                    users[username] = password;
                    localStorage.setItem('users', JSON.stringify(users));
                    document.getElementById('message').textContent = 'Signed up! Now login.';
                }
            }
        });
    });

    // Load chat, updates, hangouts, and user data on page load
    if (document.getElementById('chat-box')) {
        loadChat();
    }
    if (document.getElementById('updates-box')) {
        loadUpdates();
    }
    if (document.getElementById('hangouts-box')) {
        loadHangouts();
    }
    if (document.getElementById('user-messages') || document.getElementById('user-updates')) {
        loadUserData();
    }

    // Logout (separate event listener since it's not an action-btn)
    const logout = document.getElementById('logout');
    if (logout) {
        logout.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default link behavior
            console.log('Logout clicked');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('welcomeShown');
            window.location.href = 'index.html';
        });
    }
});