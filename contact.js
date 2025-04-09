const form = document.getElementById("contact-form");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    confirmation.textContent = "Please fill all required fields.";
    confirmation.style.color = "red";
    return;
  }

  const contact = { name, email, subject, message, date: new Date().toLocaleString() };

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  form.reset();
  confirmation.textContent = "Message saved locally!";
  confirmation.style.color = "limegreen";
});
