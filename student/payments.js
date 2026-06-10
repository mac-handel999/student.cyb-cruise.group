/**
 * CYB CRUISE GROUP — STUDENT PAYMENTS VIEW (READ-ONLY)
 */

function renderPaymentsLayout(data) {
    const container = document.getElementById('paymentsContainer');
    if (!container) return;
    container.innerHTML = '';

    Object.keys(data).forEach(taskId => {
        const sheet = data[taskId];
        const students = sheet.paidStudents || {};

        const card = document.createElement('div');
        card.style.cssText = "background: #050b14; color: #fff; padding: 20px; border-radius: 12px; border: 1px solid #1c2541; margin: 20px 0;";
        
        // Dynamic generation of student rows
        const studentRows = Object.keys(students).map(regNum => `
            <tr style="border-bottom: 1px solid #1c2541;">
                <td style="padding: 10px;">${students[regNum].name}<br><small style="color:#666;">${regNum}</small></td>
                <td style="padding: 10px;"><span style="background:#008000; padding:2px 5px; border-radius:4px; font-size:0.7rem;">PAID</span></td>
                <td style="padding: 10px;">
                    <span style="display:inline-block; padding:4px 8px; border-radius:4px; font-size:0.8rem; 
                          background:${students[regNum].collected ? '#008000' : '#800020'};">
                        ${students[regNum].collected ? 'COLLECTED' : 'NOT COLLECTED'}
                    </span>
                </td>
            </tr>
        `).join('');

        card.innerHTML = `
            <h3 style="color:#00d4ff; text-align:center;">${sheet.title}</h3>
            <table style="width:100%; border-collapse:collapse; color:#fff; margin-top:15px;">
                <thead>
                    <tr style="border-bottom: 2px solid #00d4ff; color:#00d4ff;">
                        <th style="text-align:left;">Name</th><th>Status</th><th>Collection</th>
                    </tr>
                </thead>
                <tbody>
                    ${studentRows}
                </tbody>
            </table>
        `;
        container.appendChild(card);
    });
}

// INIT: Only listener
document.addEventListener('DOMContentLoaded', () => {
    // We only attach the listener. No fetch('/class-list.enc') needed here.
    database.ref('payments').on('value', (s) => renderPaymentsLayout(s.val() || {}));
});
