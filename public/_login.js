function onSignup() {
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let repassword = document.getElementById("repassword").value;
  if (!email || !username || !password || !repassword) return;
  
  const data = {
      id: 'register',
      method: 'signup',
      args: {email, username, password, repassword}
  };
  
  fetch('/class', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      if (data.success) {
        alert(data.message);
        window.location.href = '/';
      } else {
        alert(data.message);
      }
  })
  .catch(error => {
      alert('POST FAILED | ' + error);
  });
}



function onLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (!username || !password) return;
  
  const data = {
      id: 'register',
      method: 'login',
      args: {username, password}
  };
  
  fetch('/class', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      if (data.success) {
        alert(data.message);
        window.location.href = '/';
      } else {
        alert(data.message);
      }
  })
  .catch(error => {
      alert('POST FAILED | ' + error);
  });
}



var form = document.getElementById("loginForm");
function handleForm(event) { 
  onSignup();
  event.preventDefault();
} 
form.addEventListener('submit', handleForm);