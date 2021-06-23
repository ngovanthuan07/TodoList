var courseApi = "https://60cec7504a030f0017f66961.mockapi.io/newapi/news";

function start() {
  getCourses(renderCourses);
}

start();

function getCourses(callback) {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
// create
function createCourse(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(courseApi, options)
    .then(function (response) {
      response.json();
    })
    .then(callback);
}
// delete
function handleDeleteCourse(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(courseApi + "/" + id, options)
    .then(function (response) {
      response.json();
    })
    .then(() => {
      var courseItem = document.querySelector(".course-item-" + id);
      if (courseItem) {
        courseItem.remove();
      }
    });
}

// render
function renderCourses(courses) {
  var listCourseBlock = document.querySelector("#list-courses");
  var htmls = courses.map((course) => {
    return `
      <li class="course-item-${course.id}">
        <h4>${course.name}</h4>
        <p>${course.description}</p>
        <button onclick = handleDeleteCourse(${course.id})>Delete</button>
      <li>
    `;
  });
  listCourseBlock.innerHTML = htmls.join("");
}

function handleCreateForm() {
  var createBtn = document.querySelector("#create");

  createBtn.onclick = function () {
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    var formData = {
      name: name,
      description: description,
    };

    createCourse(formData, function () {
      getCourses(renderCourses);
    });
  };
}
handleCreateForm();
