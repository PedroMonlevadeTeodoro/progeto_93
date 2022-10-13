const firebaseConfig = {
    apiKey: "AIzaSyDU8ET7vIkQQ4QaypVY64S5nXjUUXZY0g0",
    authDomain: "aula93-410f4.firebaseapp.com",
    projectId: "aula93-410f4",
    storageBucket: "aula93-410f4.appspot.com",
    messagingSenderId: "299392529327",
    appId: "1:299392529327:web:53d4be8ca43c62c8ffb55a"
  };
  firebase.initializeApp(firebaseConfig);
  function send(){
    msg=document.getElementById("msg").value 
    firebase.database().ref(roomName).push({
        name:userName,
        message:msg,
        like: 0
    })
    document.getElementById("msg").value=""
  }
  function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebaseMessageId = childKey;
    messageData = childData;

    console.log(firebaseMessageId)
    console.log(firebaseMessageData)
    name=messageData["name"]
    message=messageData["message"]
    like=messageData["like"]
    nameWithTag="<h4> "+ name +"<img class='user_tick' src='tick.png'> </h4>";
    menssageWithTag="<h4 class='message_h4'>" + message + "</h4>"
    like_button="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>"
    spanWithTag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>"
    row=spanWithTag+like_button+menssageWithTag+nameWithTag
    document.getElementById("output").innerHTML+=row
  }
})
  })
}
getData()
function updateLike(messageId){
buttonId=messageId
likes=document.getElementById(buttonId).value
updateLikes=Number(likes)+1
firebase.database().ref(roomName).child(messageId).update({
  like: updateLikes
})
}
function logout(){
  localStorage.removeItem("userName")
  localStorage.removeItem("roomName")
  window.location.replace("index.html")
}