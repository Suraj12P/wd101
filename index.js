let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

let UserEntries = retrieveEntries();

let displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTerms}</td>`;

      return `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
    })
    .join("\n");

  const table = `<div class="flex justify-center">
    <table class='table-auto w-[900px] items-center border'>
        <tr>
            <th class='px-4 py-2'>Name</th>
            <th class='px-4 py-2'>Email</th>
            <th class='px-4 py-2'>Password</th>
            <th class='px-4 py-2'>Dob</th>
            <th class='px-4 py-2'>Accept Terms?</th>
        </tr>
        ${tableEntries}
    </table>
</div>`;

  document.getElementById("user-entries").innerHTML = table;
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

  userForm.reset(); // Clear the form after submission
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
