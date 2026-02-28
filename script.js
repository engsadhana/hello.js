document.addEventListener("DOMContentLoaded", function () {

  const userKey = "users";
  let editId = null;

  function getDatabase() {
    let data = localStorage.getItem(userKey);
    return data ? JSON.parse(data) : { users: [] };
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

      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>
          <button class="btn btn-sm btn-secondary editBtn">Edit</button>
          <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
        </td>
      `;

      // EDIT
      row.querySelector(".editBtn").addEventListener("click", function () {

        document.getElementById("name").value = user.name;
        document.getElementById("age").value = user.age;

        editId = user.id;
      });

      // DELETE
      row.querySelector(".deleteBtn").addEventListener("click", function () {
        let db = getDatabase();
        db.users = db.users.filter(u => u.id !== user.id);
        saveDatabase(db);
        loadUsers();
      });

      table.appendChild(row);
    });
  }

  loadUsers();

  // SAVE
  document.getElementById("btnSave").addEventListener("click", function () {

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();

    let nameError = document.getElementById("nameError");
    let ageError = document.getElementById("ageError");

    nameError.innerHTML = "";
    ageError.innerHTML = "";

    let isValid = true;

    if (name === "") {
      nameError.innerHTML = "Enter your name";
      isValid = false;
    }

    if (age === "") {
      ageError.innerHTML = "Enter your age";
      isValid = false;
    }

    if (!isValid) return;

    let db = getDatabase();

    if (editId !== null) {
      let userIndex = db.users.findIndex(u => u.id === editId);
      db.users[userIndex] = {
        id: editId,
        name: name,
        age: age
      };
      editId = null;
    } else {
      db.users.push({
        id: Date.now().toString(),
        name: name,
        age: age
      });
    }

    saveDatabase(db);

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";

    loadUsers();
  });

});