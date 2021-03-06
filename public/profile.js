let user;

firebase.auth().onAuthStateChanged(function(newUser) {
  user = newUser;
  if (user) {
    const db = firebase.firestore();
    db.collection("profiles").doc(profile).onSnapshot(function(doc) {
      const profile = doc.data();
      if (profile) {
        document.getElementById('profileName').setAttribute('value', profile.name);
        document.getElementById('profileAge').setAttribute('value', profile.age);
        document.getElementById('profileMajor').setAttribute('value', profile.major);
      }
    });
  }
});

document.getElementById('saveProfile').addEventListener('click', function(ev) {
  const db = firebase.firestore();
  var docRef = db.collection('profiles').doc(profile);
  docRef.set({
    name: document.getElementById('profileName').value,
    age: document.getElementById('profileAge').value,
    major: document.getElementById('profileMajor').value,
  })
})

$("#saveProfile").click(function(){
  location.reload(true);
});
