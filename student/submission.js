function listenToLiveSubmissions() {
    database.ref('management/submissions').on('value', (snapshot) => {
        renderSubmissionsForStudent(snapshot.val() || {});
    });
}

function submitSelfAssignment(taskId) {
    database.ref(`management/submissions/${taskId}/students/${currentStudentReg}`).set({
        regNumber: currentStudentReg,
        name: currentStudentName,
        timestamp: new Date().toLocaleTimeString()
    });
}