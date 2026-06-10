/**
 * Renders the submission data into the HTML containers
 * @param {Object} submissionsData - The object from Firebase
 */
function renderSubmissionsForStudent(submissionsData) {
    const container = document.getElementById('submissionContainer');
    const selfWrapper = document.getElementById('selfSubmissionWrapper');
    
    // Clear existing content
    container.innerHTML = '';
    selfWrapper.innerHTML = '<h3>YOUR ACTIVE SUBMISSION STATUS:</h3>';

    // Loop through each task in the database
    Object.keys(submissionsData).forEach(taskId => {
        const task = submissionsData[taskId];
        const studentSubmitted = task.students && task.students[currentStudentReg];

        // Create the Card HTML
        const cardHTML = `
            <div class="sub-card" style="margin-bottom:15px; padding:15px; border:1px solid #00d4ff; border-radius:8px;">
                <h4>${task.title || taskId}</h4>
                <p>Status: ${studentSubmitted ? '✅ Submitted' : '❌ Pending'}</p>
                ${!studentSubmitted ? 
                    `<button onclick="submitSelfAssignment('${taskId}')" class="sub-btn">Submit Now</button>` : 
                    `<small>Submitted at: ${task.students[currentStudentReg].timestamp}</small>`
                }
            </div>
        `;

        // Logic to categorize: Show everything in container, highlights in selfWrapper
        container.innerHTML += cardHTML;
        
        if (studentSubmitted) {
            selfWrapper.innerHTML += `<p>✅ ${task.title || taskId} - Submitted</p>`;
        }
    });
}