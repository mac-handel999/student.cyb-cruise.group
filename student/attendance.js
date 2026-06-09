function listenToLiveAttendance() {
    database.ref('attendance').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        renderAttendanceForStudent(data);
    });
}

function renderAttendanceForStudent(data) {
    const container = document.getElementById('attendanceContainer');
    container.innerHTML = ""; // Clear existing

    Object.entries(data).forEach(([taskId, task]) => {
        const isSigned = task.students && task.students[currentStudentReg];
        
        container.innerHTML += `
            <div class="card">
                <h3>${task.title}</h3>
                <button ${isSigned ? 'disabled' : ''} onclick="submitSelfAttendance('${taskId}')">
                    ${isSigned ? '✅ SIGNED' : '🚀 SIGN ATTENDANCE'}
                </button>
            </div>
        `;
    });
}