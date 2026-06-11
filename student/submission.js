/**
 * CYB CRUISE GROUP — STUDENT SUBMISSIONS VIEW (READ-ONLY)
 */

// 1. RENDER LOGIC (READ-ONLY)
function renderSubmissionsLayout(data) {
    const container = document.getElementById('submissionContainer');
    if (!container) return;
    container.innerHTML = '';
    
    const TOTAL_STUDENTS = 241;
    const slots = data || {};

    Object.keys(slots).forEach(taskId => {
        const slot = slots[taskId];
        const students = slot.students || {};
        const submittedCount = Object.keys(students).length;
        const pendingCount = TOTAL_STUDENTS - submittedCount;

        const card = document.createElement('div');
        card.style.cssText = "background: #050b14; color: #fff; padding: 20px; border-radius: 12px; border: 1px solid #1c2541; margin: 20px 0;";

        card.innerHTML = `
            <h3 style="color:#00d4ff; text-align:center;">${slot.title}</h3>
            <div style="font-size: 0.9rem; margin-bottom:15px; color:#cbd5e1; text-align:center; border-top: 1px solid #1c2541; padding-top: 10px;">
                Submitted: <b>${submittedCount}</b> | Pending: <b>${pendingCount}</b> | Total: <b>${TOTAL_STUDENTS}</b>
            </div>

            <table style="width:100%; margin-top:15px; border-collapse:collapse; color:#cbd5e1;">
                <thead>
                    <tr style="border-bottom: 2px solid #1c2541; color:#00d4ff;">
                        <th style="text-align:left;">Name</th><th>Reg Number</th><th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.values(students).map(s => `
                        <tr style="border-bottom: 1px solid #0c1524;">
                            <td style="padding:8px 0;">${s.name}</td>
                            <td>${s.regNumber}</td>
                            <td>${s.timestamp}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        container.appendChild(card);
    });
}

// 2. INIT: Listener ONLY
document.addEventListener('DOMContentLoaded', () => {
    // We listen to the same database path
    database.ref('management/submissions').on('value', (snapshot) => {
        renderSubmissionsLayout(snapshot.val());
    });
});
