fetch('/user', {
  method: 'POST',
  credentials: 'same-origin'
})
.then(response => response.json())
.then(data => {
  var username = data.username;
  if (username) {
    document.getElementById("username").innerHTML = username;
  } else {
    window.location.href = "/login";
  }
})
.catch(error => {
  alert('Error: ', error);
});
