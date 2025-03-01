// Your web app's Firebase configuration
const firebaseConfig = window.FIREBASE_CONFIG;

// Verify configuration is present
if (!firebaseConfig?.apiKey) {
    console.error('Firebase configuration is missing or invalid:', firebaseConfig);
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Initialize Firebase only if we have the API key
        if (!firebaseConfig?.apiKey) {
            throw new Error('Firebase API key is not configured');
        }
        console.log('Initializing Firebase with config:', {
            authDomain: firebaseConfig.authDomain,
            projectId: firebaseConfig.projectId
        });
        
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        console.log('Firebase initialized successfully');
        
        // Test Firestore connection
        try {
            await db.collection('test').doc('test').get();
            console.log('Firestore connection test successful');
        } catch (error) {
            console.error('Firestore connection test failed:', error);
        }
        
        // Visitor Counter
        const visitorCountRef = db.collection('stats').doc('visitors');
        const visitorCountElement = document.getElementById('visitor-count');
        console.log('Attempting to access visitor count document');
        
        // Create the document if it doesn't exist
        visitorCountRef.get().then((doc) => {
            console.log('Retrieved visitor document:', doc.exists ? 'exists' : 'does not exist');
            if (!doc.exists) {
                console.log('Creating new visitor count document');
                return visitorCountRef.set({ count: 0 });
            }
            return Promise.resolve(doc);
        }).then((doc) => {
            console.log('Current visitor count:', doc.data()?.count);
            // Then increment the counter
            console.log('Incrementing visitor count');
            return visitorCountRef.update({
                count: firebase.firestore.FieldValue.increment(1)
            });
        }).then(() => {
            console.log('Getting updated count');
            return visitorCountRef.get();
        }).then((doc) => {
            const count = doc.data()?.count;
            console.log('New visitor count:', count);
            // Animate the visitor count from 0 to the current value
            visitorCountElement.textContent = '0'; // Set initial value
            animateNumber(visitorCountElement, 0, count, 2000, ",");
        }).catch((error) => {
            console.error("Error in visitor counter flow:", error);
            visitorCountElement.textContent = 'Error loading count';
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
                const likes = doc.data()?.likes || 0;
                // Animate the likes count
                countSpan.textContent = '0';
                animateNumber(countSpan, 0, likes, 1500, "");
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
                        // Animate to the new likes count
                        const currentLikes = parseInt(countSpan.textContent) || 0;
                        animateNumber(countSpan, currentLikes, updatedDoc.data().likes, 1000, "");
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