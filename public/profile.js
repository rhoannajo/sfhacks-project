let user;

firebase.auth().onAuthStateChanged(function(newUser) {
  user = newUser;
  if (user) {
    const db = firebase.database();
    db.collection("customers").doc(user.id).onSnapshot(function(doc) {
      const cust = doc.data();
      if (cust) {
        document.getElementById('customerName').setAttribute('value', cust.name);
        document.getElementById('customerMajor').setAttribute('value', cust.major);
        document.getElementById('customerBio').setAttribute('value', cust.bio);
      }
      document.getElementById('customerEmail').innerText = user.email;
    });
  }
});

document.getElementById('saveProfile').addEventListener('click', function(ev) {
  const db = firebase.database();
  var docRef = db.collection('customers').doc(user.id);
  docRef.set({
    name: document.getElementById('customerName').value,
    major: document.getElementById('customerMajor').value,
    bio: document.getElementById('customerBio').value,
    email: user.email,
  })
})
