// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo_5A2lc-Qx6D6i7EC1lUxnX_j2BOuKjo",
  authDomain: "ethanshahbazdotcom.firebaseapp.com",
  projectId: "ethanshahbazdotcom",
  storageBucket: "ethanshahbazdotcom.firebasestorage.app",
  messagingSenderId: "1027880222115",
  appId: "1:1027880222115:web:3f8c75167d110cbeeeee16",
  measurementId: "G-NDF9C5NDHX"
};

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        
        // Visitor Counter
        const visitorCountRef = db.collection('stats').doc('visitors');
        
        // Create the document if it doesn't exist
        visitorCountRef.get().then((doc) => {
            if (!doc.exists) {
                visitorCountRef.set({ count: 0 });
            }
            // Then increment the counter
            visitorCountRef.update({
                count: firebase.firestore.FieldValue.increment(1)
            }).then(() => {
                return visitorCountRef.get();
            }).then((doc) => {
                document.getElementById('visitor-count').textContent = `Visitor #${doc.data().count}`;
            }).catch((error) => {
                console.error("Error updating visitor count:", error);
            });
        });
        
        // Like System
        const likeButtons = document.querySelectorAll('.like-button');
        
        likeButtons.forEach(button => {
            const projectId = button.dataset.project;
            const countSpan = button.querySelector('.like-count');
            const projectRef = db.collection('projects').doc(projectId);
            
            // Get initial likes
            projectRef.get().then((doc) => {
                if (!doc.exists) {
                    console.log('Creating document for:', projectId);
                    return projectRef.set({ likes: 0 });
                }
                return doc;
            }).then((doc) => {
                console.log('Likes for', projectId, ':', doc.data()?.likes);
                countSpan.textContent = doc.data()?.likes || 0;
            }).catch((error) => {
                console.error("Error getting likes for", projectId, ":", error);
            });
            
            // Handle likes
            button.addEventListener('click', async function(e) {
                e.preventDefault();
                console.log('Like button clicked for:', projectId);
                
                if (localStorage.getItem(`liked-${projectId}`) !== 'true') {
                    try {
                        await projectRef.update({
                            likes: firebase.firestore.FieldValue.increment(1)
                        });
                        
                        const updatedDoc = await projectRef.get();
                        console.log('Updated likes for', projectId, ':', updatedDoc.data().likes);
                        countSpan.textContent = updatedDoc.data().likes;
                        button.classList.add('liked');
                        localStorage.setItem(`liked-${projectId}`, 'true');
                    } catch (error) {
                        console.error("Error updating likes for", projectId, ":", error);
                    }
                }
            });
            
            // Check if previously liked
            if (localStorage.getItem(`liked-${projectId}`) === 'true') {
                button.classList.add('liked');
            }
        });
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
}); 