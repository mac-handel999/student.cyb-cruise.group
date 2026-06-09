function listenToUpdates() {
    database.ref('updates').on('value', (snapshot) => {
        const updates = snapshot.val() || {};
        const feed = document.getElementById('updatesFeed');
        feed.innerHTML = Object.values(updates).reverse().map(item => `
            <div class="update-card">
                <h3>${item.heading}</h3>
                <p>${item.content}</p>
                <small>${item.date}</small>
            </div>
        `).join('');
    });
}