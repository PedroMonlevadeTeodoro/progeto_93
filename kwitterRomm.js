const firebaseConfig = {
    apiKey: "AIzaSyDU8ET7vIkQQ4QaypVY64S5nXjUUXZY0g0",
    authDomain: "aula93-410f4.firebaseapp.com",
    databaseURL: "https://aula93-410f4-default-rtdb.firebaseio.com",
    projectId: "aula93-410f4",
    storageBucket: "aula93-410f4.appspot.com",
    messagingSenderId: "299392529327",
    appId: "1:299392529327:web:53d4be8ca43c62c8ffb55a"
  };
firebase.initializeApp(firebaseConfig)
userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom()
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose : "adicionar nome de sala"
  });

    localStorage.setItem("roomName", roomName);
    
    window.location = "kwitterPage.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}