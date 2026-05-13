window.onload = function () {

  let students = JSON.parse(localStorage.getItem("students")) || [];

  displayStudents();

  function addStudent() {
    let name = document.getElementById("name").value;
    let marks = document.getElementById("marks").value;

    if (name === "" || marks === "") {
      alert("Please enter all fields");
      return;
    }

    students.push({ name, marks });

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    document.getElementById("name").value = "";
    document.getElementById("marks").value = "";
  }

  function displayStudents() {
    let list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach((student, index) => {
      let grade = getGrade(student.marks);
      let li = document.createElement("li");
      li.innerHTML =
        student.name + " - " + student.marks + " ("+ grade +")" +
        ' <button onclick="deleteStudent(' + index + ')">Delete</button>';

      list.appendChild(li);
    });
    showAverage();
  }

  function deleteStudent(index) {
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
  }

  function getGrade(marks) {
   marks = Number(marks);

   if (marks >= 90) return "A";
   else if (marks >= 75) return "B";
   else if (marks >= 50) return "C";
   else return "Fail";
  }
   
  function showAverage() {
   let avgText = document.getElementById("average");

    if (students.length === 0) {
      avgText.innerText = "No students yet";
      return;
    }

    let total = 0;
    students.forEach(s => total += Number(s.marks));
    let avg = (total / students.length).toFixed(2);
    avgText.innerText = "Average Marks: " + avg;

  }
   
  // make functions accessible to HTML buttons
  window.addStudent = addStudent;
  window.deleteStudent = deleteStudent;
};