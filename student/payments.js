/**
 * CYB CRUISE GROUP — STUDENT PAYMENTS VIEW (READ-ONLY)
 * Includes real-time progress metrics
 */

function renderPaymentsLayout(data) {
    const container = document.getElementById('paymentsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    const TOTAL_CLASS_SIZE = 241;

    Object.keys(data || {}).forEach(taskId => {
        const sheet = data[taskId];
        const students = sheet.paidStudents || {};
        
        // Metrics Calculation
        const paidCount = Object.keys(students).length;
        const pendingCount = TOTAL_CLASS_SIZE - paidCount;

        const card = document.createElement('div');
        card.style.cssText = "background: #050b14; color: #fff; padding: 20px; border-radius: 12px; border: 1px solid #1c2541; margin: 20px 0;";
        
        card.innerHTML = `
            <h3 style="color:#00d4ff; text-align:center;">${sheet.title}</h3>
            
            <div style="background:#050b14; padding:10px; border-radius:8px; margin-bottom:15px; text-align:center; border:1px solid #1c2541; font-size: 0.85rem;">
                <span style="margin:0 5px;">Total: <b>${TOTAL_CLASS_SIZE}</b></span> | 
                <span style="margin:0 5px; color:#00ff00;">Paid: <b>${paidCount}</b></span> | 
                <span style="margin:0 5px; color:#ff4444;">Pending: <b>${pendingCount}</b></span>
            </div>

            <table style="width:100%; border-collapse:collapse; color:#fff; margin-top:15px;">
                <thead>
                    <tr style="border-bottom: 2px solid #00d4ff; color:#00d4ff;">
                        <th style="text-align:left; padding: 10px;">Name</th>
                        <th style="padding: 10px;">Status</th>
                        <th style="padding: 10px;">Collection</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.keys(students).map(regNum => `
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
                    `).join('')}
                </tbody>
            </table>
        `;
        container.appendChild(card);
    });
}

// INIT: Only listener
document.addEventListener('DOMContentLoaded', () => {
    database.ref('payments').on('value', (s) => renderPaymentsLayout(s.val() || {}));
});
