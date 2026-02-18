// ✅ GLOBAL FUNCTION (Console se call karne ke liye)
function setUserForm(name, age) {
  document.getElementById("name").value = name;
  document.getElementById("age").value = age;
}

//  LocalStorage se first user form me lane ke liye
function loadFirstUserToForm() {
  let data = localStorage.getItem("database");
  if (!data) return;

  let db = JSON.parse(data);

  if (db.users.length > 0) {
    document.getElementById("name").value = db.users[0].name;
    document.getElementById("age").value = db.users[0].age;
  }
}

document.addEventListener("DOMContentLoaded", function () {

  const userKey = "database";

  function getDatabase() {
    let data = localStorage.getItem(userKey);
    return data ? JSON.parse(data) : { users: [] };
  }

  function saveDatabase(db) {
    localStorage.setItem(userKey, JSON.stringify(db));
  }

  function loadUsers() {
    let db = getDatabase();
    let table = document.getElementById("userTable");
    table.innerHTML = "";

    db.users.forEach(function (user) {
      let row = `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
        </tr>
      `;
      table.innerHTML += row;
    });
  }

  loadUsers();

  document.getElementById("btnSave").addEventListener("click", function () {

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();

    if (name === "" || age === "") {
      alert("Please fill all fields");
      return;
    }

    let db = getDatabase();

    db.users.push({
      id: Date.now().toString(),
      name: name,
      age: age
    });

    saveDatabase(db);

    console.log("Saved Data:", db);

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";

    loadUsers();
  });

});
