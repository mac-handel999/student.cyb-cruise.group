/**
 * CYB CRUISE GROUP — STUDENT DASHBOARD ENGINE
 * SECURED: Read-only access to matrix nodes
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch data from the API endpoint (The server.js proxy we discussed)
    // This replaces 'loadAdminMatrix()' which was for admins only
    fetchStudentData();

    // 2. Simple navigation for students
    const closeBtn = document.getElementById('closeAdminBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            window.location.href = '/Home.html';
        });
    }
});


// student-dashboard.js
async function fetchStudentData() {
  try {
    const response = await fetch('/api/dashboard-metrics');
     const db = await response.json();

        // Safe access: Use optional chaining or defaults if nodes are empty
        const countAtt = db.attendance ? Object.keys(db.attendance).length : 0;
        const countSub = db.submissions ? Object.keys(db.submissions).length : 0;
        const countPay = db.payments ? Object.keys(db.payments).length : 0;


         // Render metrics to UI
        document.getElementById('attCount').textContent = countAtt;
        document.getElementById('subCount').textContent = countSub;
        document.getElementById('payCount').textContent = countPay;
        document.getElementById('totalTasksCount').textContent = `${countAtt + countSub + countPay} Active Tasks`;


    if (!response.ok) {
      // Handle specific HTTP errors (like 403 Restricted)
      if (response.status === 403) throw new Error("Access restricted");
      throw new Error(`Server error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    // Check if the user is offline vs a logical error
    const message = !navigator.onLine ? "Offline" : error.message;
    console.error(`Dashboard Fetch Error: ${message}`);

     // Set metrics to 0 if data load fails
        ['attCount', 'subCount', 'payCount'].forEach(id => {
            document.getElementById(id).textContent = "0";
        });
  }
}


