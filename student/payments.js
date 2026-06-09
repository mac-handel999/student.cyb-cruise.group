/**
 * CYB CRUISE GROUP — STUDENT PAYMENTS RENDERER
 */

function listenToLivePayments() {
    // Listens to the entire payments node in Firebase
    database.ref('payments').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        renderPaymentsForStudent(data);
    });
}

function renderPaymentsForStudent(data) {
    const container = document.getElementById('paymentsContainer');
    container.innerHTML = ""; // Clear existing view

    Object.entries(data).forEach(([taskId, task]) => {
        // Check if current student is in the 'paidStudents' list
        const isPaid = task.paidStudents && task.paidStudents[currentStudentReg];
        
        const card = document.createElement('div');
        card.className = 'payment-card';
        card.innerHTML = `
            <h3>${task.title}</h3>
            <div class="status-badge" style="color: ${isPaid ? '#06d6a0' : '#ff3333'}">
                ${isPaid ? '✅ PAYMENT VERIFIED' : '❌ PENDING PAYMENT'}
            </div>
            <small>Contact CR if status is incorrect.</small>
        `;
        container.appendChild(card);
    });
}

// Start listening when the page loads
document.addEventListener('DOMContentLoaded', listenToLivePayments);