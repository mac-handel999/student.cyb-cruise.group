/**
 * CYB CRUISE GROUP — STUDENT SELF-ATTENDANCE PORTAL
 * Allows students to search and log their attendance.
 */

let classList = [];

// 1. Load class list for searching
async function loadClassList() {
    try {
        const response = await fetch('/class-list.enc');
        const encodedData = await response.text();
        classList = JSON.parse(atob(encodedData));
    } catch (e) { console.error("Class list unavailable."); }
}

// 2. RENDER LOGIC (Interactive but no administrative "Delete" or "Wipe" buttons)
function renderAttendanceLayout(data) {
    const container = document.getElementById('attendanceContainer');
    if (!container) return;
    container.innerHTML = '';
    
    const TOTAL_CLASS_SIZE = 241;

    Object.keys(data || {}).forEach(taskId => {
        const sheet = data[taskId];
        const students = sheet.students || {};
        const presentCount = Object.keys(students).length;
        const absentCount = TOTAL_CLASS_SIZE - presentCount;

        const card = document.createElement('div');
        card.style.cssText = "background: #050b14; color: #fff; padding: 20px; border-radius: 12px; border: 1px solid #1c2541; margin: 20px auto; max-width: 600px;";
        
        card.innerHTML = `
            <h3 style="color:#00d4ff; text-align:center;">${sheet.title}</h3>
            
            <div style="background:#0c1524; padding:10px; border-radius:8px; margin:15px 0; text-align:center; border:1px solid #1c2541; font-size: 0.9rem;">
                Total: <b>${TOTAL_CLASS_SIZE}</b> | Present: <b style="color:#00ff00;">${presentCount}</b> | Absent: <b style="color:#ff4444;">${absentCount}</b>
            </div>
            
            <input type="text" placeholder="Search your name/reg to sign in..." onkeyup="filterStudents(this, '${taskId}')" 
                   style="width: 90%; padding: 10px; background: #0c1524; border: 1px solid #1c2541; border-radius: 8px; color: white; display:block; margin: 0 auto;">
            
            <div id="filterResults-${taskId}" style="margin: 10px 0;"></div>
            
            <div style="text-align: left; border-top: 1px solid #1c2541; padding-top: 10px; margin-top: 10px;">
                <h4 style="color:#cbd5e1;">Logged (${presentCount}):</h4>
                ${Object.values(students).map(s => `
                    <div style="padding: 5px 0; border-bottom: 1px solid #0c1524; font-size: 0.9rem;">
                        ${s.name} <span style="color:#00d4ff;">(${s.regNumber})</span>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. SEARCH & ADD LOGIC
function filterStudents(input, taskId) {
    const query = input.value.toLowerCase();
    const resultsDiv = document.getElementById(`filterResults-${taskId}`);
    resultsDiv.innerHTML = '';
    if (query.length < 2) return;

    classList.filter(s => s.name.toLowerCase().includes(query) || (s.regNumber && s.regNumber.includes(query)))
        .forEach(s => {
            resultsDiv.innerHTML += `
                <div style="background:#1c2541; padding:5px; margin:2px; display:flex; justify-content:space-between; border-radius:4px;">
                    ${s.name} (${s.regNumber})
                    <button onclick="addStudent('${taskId}', '${s.regNumber}', '${s.name}')" style="background:#00d4ff; border:2px solid red; padding:6px; color:#fff; border-radius:6px; cursor:pointer;">Add</button>
                </div>
            `;
        });
}

function addStudent(taskId, reg, name) {
    database.ref(`attendance/${taskId}/students/${reg}`).set({ regNumber: reg, name: name });
}

// 4. INIT
document.addEventListener('DOMContentLoaded', () => {
    loadClassList();
    database.ref('attendance').on('value', (s) => renderAttendanceLayout(s.val() || {}));
});
