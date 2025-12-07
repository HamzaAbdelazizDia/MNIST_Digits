// Data Storage
let currentUser = null;
let currentDigit = 0;
let digitSequence = [];
let sequenceIndex = 0;
let isDrawing = false;
let canvas, ctx;

// Admin credentials
const ADMIN_USERNAME = 'forsa';
const ADMIN_PASSWORD = 'forsa2025';

// Initialize data structures
function initializeData() {
    if (!localStorage.getItem('drawings')) {
        localStorage.setItem('drawings', JSON.stringify([]));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({}));
    }
}

// Get all drawings
function getDrawings() {
    return JSON.parse(localStorage.getItem('drawings') || '[]');
}

// Get users data
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '{}');
}

// Save drawing
function saveDrawing(username, digit, imageData) {
    const drawings = getDrawings();
    const users = getUsers();
    
    const drawing = {
        id: Date.now() + Math.random(),
        username: username,
        digit: digit,
        imageData: imageData,
        timestamp: new Date().toISOString()
    };
    
    drawings.push(drawing);
    localStorage.setItem('drawings', JSON.stringify(drawings));
    
    // Update user count
    if (!users[username]) {
        users[username] = { count: 0, joinedAt: new Date().toISOString() };
    }
    users[username].count += 1;
    localStorage.setItem('users', JSON.stringify(users));
    
    return drawing;
}

// Initialize canvas
function initCanvas() {
    canvas = document.getElementById('drawing-canvas');
    ctx = canvas.getContext('2d');
    
    // Set up drawing context
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);
}

// Drawing functions
function startDrawing(e) {
    isDrawing = true;
    const pos = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
    if (!isDrawing) return;
    
    const pos = getMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Get 28x28 image data
function get28x28ImageData() {
    // Create a temporary canvas for downsampling
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 28;
    tempCanvas.height = 28;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Draw scaled down version
    tempCtx.drawImage(canvas, 0, 0, 28, 28);
    
    // Get image data
    const imageData = tempCtx.getImageData(0, 0, 28, 28);
    const data = imageData.data;
    
    // Convert to grayscale array (0-255)
    const grayscale = [];
    for (let i = 0; i < data.length; i += 4) {
        // Calculate grayscale value (inverse because we draw black on white)
        const gray = 255 - Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
        grayscale.push(gray);
    }
    
    return grayscale;
}

// Digit sequence management
function generateDigitSequence() {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Fisher-Yates shuffle
    for (let i = digits.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    return digits;
}

function getNextDigit() {
    if (sequenceIndex >= digitSequence.length) {
        digitSequence = generateDigitSequence();
        sequenceIndex = 0;
    }
    return digitSequence[sequenceIndex++];
}

// UI Functions
function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    if (sectionName === 'leaderboard') {
        updateLeaderboard();
    }
}

function startDrawing() {
    const username = document.getElementById('username-input').value.trim();
    
    if (!username) {
        alert('Please enter your name!');
        return;
    }
    
    currentUser = username;
    digitSequence = generateDigitSequence();
    sequenceIndex = 0;
    
    document.getElementById('welcome-card').style.display = 'none';
    document.getElementById('drawing-interface').style.display = 'block';
    document.getElementById('current-user').textContent = username;
    
    updateUserCount();
    loadNextDigit();
}

function loadNextDigit() {
    currentDigit = getNextDigit();
    document.getElementById('digit-display').textContent = currentDigit;
    clearCanvas();
}

function updateUserCount() {
    const users = getUsers();
    const count = users[currentUser]?.count || 0;
    document.getElementById('user-count').textContent = count;
}

function submitDrawing() {
    // Check if canvas has content
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasContent = imageData.data.some(value => value < 255);
    
    if (!hasContent) {
        alert('Please draw something first!');
        return;
    }
    
    // Get 28x28 data
    const data28x28 = get28x28ImageData();
    
    // Save drawing
    saveDrawing(currentUser, currentDigit, data28x28);
    
    // Show success animation
    showSuccessAnimation();
    
    // Update count and load next digit
    updateUserCount();
    setTimeout(() => {
        loadNextDigit();
    }, 800);
}

function showSuccessAnimation() {
    const animation = document.getElementById('success-animation');
    animation.classList.add('show');
    
    setTimeout(() => {
        animation.classList.remove('show');
    }, 1000);
}

function logout() {
    currentUser = null;
    document.getElementById('welcome-card').style.display = 'block';
    document.getElementById('drawing-interface').style.display = 'none';
    document.getElementById('username-input').value = '';
}

// Leaderboard
function updateLeaderboard() {
    const users = getUsers();
    const leaderboardList = document.getElementById('leaderboard-list');
    
    // Convert to array and sort by count
    const sortedUsers = Object.entries(users)
        .map(([username, data]) => ({ username, count: data.count }))
        .sort((a, b) => b.count - a.count);
    
    if (sortedUsers.length === 0) {
        leaderboardList.innerHTML = '<p style="text-align: center; color: var(--text-gray); padding: 40px;">No entries yet. Be the first!</p>';
        return;
    }
    
    leaderboardList.innerHTML = sortedUsers.map((user, index) => {
        const rank = index + 1;
        let rankClass = '';
        let medal = '';
        
        if (rank === 1) {
            rankClass = 'top-1';
            medal = '<span class="medal">🥇</span>';
        } else if (rank === 2) {
            rankClass = 'top-2';
            medal = '<span class="medal">🥈</span>';
        } else if (rank === 3) {
            rankClass = 'top-3';
            medal = '<span class="medal">🥉</span>';
        }
        
        return `
            <div class="leaderboard-item ${rankClass}">
                <span class="leaderboard-rank">#${rank}</span>
                ${medal}
                <span class="leaderboard-name">${user.username}</span>
                <span class="leaderboard-score">${user.count} 🎨</span>
            </div>
        `;
    }).join('');
}

// Admin Functions
function showAdminLogin() {
    document.getElementById('admin-login-modal').style.display = 'block';
    document.getElementById('login-error').textContent = '';
}

function closeAdminLogin() {
    document.getElementById('admin-login-modal').style.display = 'none';
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
}

function adminLogin() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        closeAdminLogin();
        showAdminDashboard();
    } else {
        document.getElementById('login-error').textContent = 'Invalid credentials!';
    }
}

function showAdminDashboard() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById('admin-section').classList.add('active');
    
    updateAdminDashboard();
}

function updateAdminDashboard() {
    const drawings = getDrawings();
    const users = getUsers();
    
    // Update metrics
    document.getElementById('total-drawings').textContent = drawings.length;
    document.getElementById('total-users').textContent = Object.keys(users).length;
    
    const avgPerUser = Object.keys(users).length > 0 
        ? (drawings.length / Object.keys(users).length).toFixed(1)
        : 0;
    document.getElementById('avg-per-user').textContent = avgPerUser;
    
    // Update digit distribution
    const digitCounts = {};
    for (let i = 0; i < 10; i++) {
        digitCounts[i] = 0;
    }
    
    drawings.forEach(drawing => {
        digitCounts[drawing.digit] = (digitCounts[drawing.digit] || 0) + 1;
    });
    
    const maxCount = Math.max(...Object.values(digitCounts), 1);
    
    const digitBars = document.getElementById('digit-bars');
    digitBars.innerHTML = Object.entries(digitCounts).map(([digit, count]) => {
        const percentage = (count / maxCount) * 100;
        return `
            <div class="digit-bar">
                <span class="digit-label">Digit ${digit}:</span>
                <div class="bar-container">
                    <div class="bar-fill" style="width: ${percentage}%">
                        ${count}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Update entries table
    updateEntriesTable(drawings);
    
    // Add filter functionality
    document.getElementById('user-filter').oninput = function(e) {
        const filterValue = e.target.value.toLowerCase();
        const filtered = drawings.filter(d => 
            d.username.toLowerCase().includes(filterValue)
        );
        updateEntriesTable(filtered);
    };
}

function updateEntriesTable(drawings) {
    const tableContainer = document.getElementById('entries-table');
    
    if (drawings.length === 0) {
        tableContainer.innerHTML = '<p style="text-align: center; color: var(--text-gray); padding: 20px;">No entries found.</p>';
        return;
    }
    
    // Sort by timestamp descending (newest first)
    const sortedDrawings = [...drawings].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    tableContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Digit</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                ${sortedDrawings.map((drawing, index) => `
                    <tr>
                        <td>${sortedDrawings.length - index}</td>
                        <td>${drawing.username}</td>
                        <td><strong style="color: #ff6b35; font-size: 1.2rem;">${drawing.digit}</strong></td>
                        <td>${new Date(drawing.timestamp).toLocaleString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function adminLogout() {
    showSection('draw');
}

function exportData() {
    const drawings = getDrawings();
    const users = getUsers();
    
    const exportData = {
        drawings: drawings,
        users: users,
        exportDate: new Date().toISOString(),
        totalDrawings: drawings.length,
        totalUsers: Object.keys(users).length
    };
    
    // Create downloadable JSON file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `mnist-data-export-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Also create CSV for easier analysis
    exportCSV(drawings);
}

function exportCSV(drawings) {
    let csv = 'ID,Username,Digit,Timestamp,ImageData\n';
    
    drawings.forEach((drawing, index) => {
        const imageDataStr = drawing.imageData.join(';');
        csv += `${index + 1},"${drawing.username}",${drawing.digit},"${drawing.timestamp}","${imageDataStr}"\n`;
    });
    
    const csvBlob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(csvBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `mnist-data-export-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Initialize on load
window.onload = function() {
    initializeData();
    initCanvas();
    
    // Close modal on click outside
    window.onclick = function(event) {
        const modal = document.getElementById('admin-login-modal');
        if (event.target === modal) {
            closeAdminLogin();
        }
    };
    
    // Allow Enter key for login
    document.getElementById('admin-password').onkeypress = function(e) {
        if (e.key === 'Enter') {
            adminLogin();
        }
    };
    
    document.getElementById('username-input').onkeypress = function(e) {
        if (e.key === 'Enter') {
            startDrawing();
        }
    };
};
