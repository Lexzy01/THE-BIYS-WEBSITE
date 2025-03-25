// Firebase setup
const auth = firebase.auth();
const db = firebase.firestore();

// Check login state
auth.onAuthStateChanged(user => {
    if (!user && window.location.pathname !== '/index.html') {
        window.location.href = 'index.html'; // Redirect to login if not logged in
    }
});

// Grab buttons
const buttons = document.querySelectorAll('.action-btn');
console.log('Buttons found:', buttons.length);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Home buttons (home.html)
        if (button.textContent === 'Say Yo') alert('Yo, it’s The Boys!');
        else if (button.textContent === 'Crew Vibes') alert('Best crew, best vibes.');
        else if (button.textContent === 'Boys Only') alert('The Boys rule this spot!');

        // Chat (chat.html)
        else if (button.id === 'send-btn') {
            const input = document.getElementById('chat-input');
            if (input && input.value) {
                const user = auth.currentUser;
                db.collection('messages').add({
                    user: user.email.split('@')[0], // Username from email
                    text: input.value,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                input.value = '';
            }
        }

        // Login (index.html)
        else if (button.id === 'login-btn') {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            auth.signInWithEmailAndPassword(`${username}@theboys.com`, password)
                .then(() => {
                    document.getElementById('message').textContent = 'Logged in! Heading to The Boys...';
                    setTimeout(() => { window.location.href = 'home.html'; }, 1000);
                })
                .catch(err => document.getElementById('message').textContent = err.message);
        }
        else if (button.id === 'signup-btn') {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            auth.createUserWithEmailAndPassword(`${username}@theboys.com`, password)
                .then(() => {
                    document.getElementById('message').textContent = 'Signed up! Now login.';
                })
                .catch(err => document.getElementById('message').textContent = err.message);
        }
    });
});

// Live chat updates with timestamps
if (document.getElementById('chat-box')) {
    db.collection('messages')
        .orderBy('timestamp')
        .onSnapshot(snapshot => {
            const chatBox = document.getElementById('chat-box');
            chatBox.innerHTML = '';
            snapshot.forEach(doc => {
                const msg = doc.data();
                const time = msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString() : 'Just now';
                chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text} <small>(${time})</small></p>`;
            });
            chatBox.scrollTop = chatBox.scrollHeight;
        });
}

// Logout
const logout = document.getElementById('logout');
if (logout) {
    logout.addEventListener('click', () => {
        auth.signOut().then(() => window.location.href = 'index.html');
    });
}