document.addEventListener("DOMContentLoaded", function () {

  const userKey = "users";
  let editId = null;

  function getDatabase() {
    let data = localStorage.getItem(userKey);
    return data ? JSON.parse(data) : [];
  }

  function saveDatabase(db) {
    localStorage.setItem(userKey, JSON.stringify(db));
  }

  function loadUsers() {
    let db = getDatabase();
    bindTable(db);
  }

  function bindTable(users) {

    let table = document.getElementById("userTable");
    table.innerHTML = "";

    users.forEach(function (user) {

      let row = document.createElement("tr");
console.log(user);
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.website}</td>
        <td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode} </td>
        <td>${user.company.name}, ${user.company.catchPhrase}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>

        <td>
        <button class="btn btn-warning btn-sm editBtn">Edit</button>
        <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
        </td>`;

      row.querySelector(".editBtn").addEventListener("click", function () {

        document.getElementById("name").value = user.name;
        document.getElementById("website").value = user.website;
        // document.getElementById("address"),.value = .address;
        document.getElementById("company").value = user.company;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;

        editId = user.id;

      });

      row.querySelector(".deleteBtn").addEventListener("click", function () {

        let db = getDatabase();

        db = db.filter((u) => u.id !== user.id);

        saveDatabase(db);

        loadUsers();

      });

      table.appendChild(row);

    });

  }

  loadUsers();

  document.getElementById("btnSave").addEventListener("click", function () {

    let name = document.getElementById("name").value.trim();
    let website = document.getElementById("website").value.trim();
    let address = document.getElementById("address") .value.trim();
    let company = document.getElementById("company").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();

    let nameError = document.getElementById("nameError");
    let nameInput = document.getElementById("name");

    nameError.innerHTML = "";
    nameInput.classList.remove("error");

    let isValid = true;

    if (name === "") {

      nameError.innerHTML = "Enter your name";
      nameInput.classList.add("error");
      isValid = false;

    }

    if (!isValid) return;

    let db = getDatabase();

    if (editId !== null) {

      let index = db.findIndex((u) => u.id === editId);

      db[index] = {

        id: editId,
        name,
        website,
        address,
        company,
        email,
        phone

      };

      editId = null;

    } else {

      db.push({

        id: Date.now().toString(),
        name,
        website,
        address,
        company,
        email,
        phone

      });

    }

    saveDatabase(db);

    document.getElementById("name").value = "";
    document.getElementById("website").value = "";
    document.getElementById("address").value = "";
    document.getElementById("company").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    loadUsers();

  });

});