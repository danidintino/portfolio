
function validate() {
  const warnings = document.getElementsByClassName("warning");
  let i = 0;
  while(i < warnings.length) {
    warnings[i].remove();
  }

  let valid = true;

  const fname = document.forms["info-form"]["fname"].value;
  const lname = document.forms["info-form"]["lname"].value;
  const email = document.forms["info-form"]["email"].value;
  const animal = document.forms["info-form"]["animal"].value;
  const language = document.forms["info-form"]["language"].value;

  const submitButton = document.forms["info-form"].querySelector('[type="submit"]');

  if (fname == "") {
    createWarning("First name is required");
    valid = false;
  }
  if (lname == "") {
    createWarning("Last name is required");
    valid = false
  }
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.length == 0 || !email.match(emailRegex)) {
    createWarning("Email is invalid");
    valid = false
  }
  return valid;
}

function createWarning(message){
  const node = document.createElement("div");
  node.className = "warning";
  node.innerHTML = `${message}`;
  document.body.appendChild(node);
}