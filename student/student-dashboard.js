/**
 * CYB CRUISE GROUP — STUDENT DASHBOARD ENGINE
 * UPDATED: Direct Firebase Implementation (No API Server)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Dashboard UI listeners
    initializeFirebaseListeners();

    const closeBtn = document.getElementById('closeAdminBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            window.location.href = '/Home.html';
        });
    }
});


function initializeFirebaseListeners() {
    // Ensure 'db' is available (global Firebase object)
    // We attach listeners to the paths where your data lives
    const paths = ['attendance', 'submissions', 'payments'];

    paths.forEach(path => {
        database.ref(path).on('value', (snapshot) => {
            const data = snapshot.val() || {};
            const count = Object.keys(data).length;
            
            // Map the paths to the IDs in your HTML
            const idMap = {
                'attendance': 'attCount',
                'submissions': 'subCount',
                'payments': 'payCount'
            };

            const element = document.getElementById(idMap[path]);
            if (element) {
                element.textContent = count;
                updateTotalTasks();
            }
        });
    });
}

function updateTotalTasks() {
    const att = parseInt(document.getElementById('attCount').textContent) || 0;
    const sub = parseInt(document.getElementById('subCount').textContent) || 0;
    const pay = parseInt(document.getElementById('payCount').textContent) || 0;
    
    document.getElementById('totalTasksCount').textContent = `${att + sub + pay} Active Tasks`;
}