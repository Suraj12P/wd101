let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

let UserEntries = retrieveEntries();

let displayEntries = () => {
  const entries = retrieveEntries();
  const tableBody = document.getElementById("user-entries");

  tableBody.innerHTML = entries
    .map((entry) => {
      return `<tr>
        <td class='border px-4 py-2'>${entry.name}</td>
        <td class='border px-4 py-2'>${entry.email}</td>
        <td class='border px-4 py-2'>${entry.password}</td>
        <td class='border px-4 py-2'>${entry.dob}</td>
        <td class='border px-4 py-2'>${entry.acceptTerms}</td>
      </tr>`;
    })
    .join("\n");
};


let saveUserForm = (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dobInput = document.getElementById("dob");
  let acceptTerms = document.getElementById("acceptTerms").checked;

  const dobDate = new Date(dobInput.value);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  console.log(age)
  const monthDiff = today.getMonth() - dobDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dobDate.getDate())
  ) {
    age--;
  }

  if (age < 18 || age > 55) {
    dobInput.setCustomValidity("Age must be between 18 and 55.");
    dobInput.reportValidity();
    return;
  } else {
    dobInput.setCustomValidity("");
  }

  let entry = {
    name,
    email,
    password,
    dob: dobInput.value,
    acceptTerms,
  };

  UserEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(UserEntries));
  displayEntries();

  userForm.reset();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
