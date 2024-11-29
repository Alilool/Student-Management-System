// DOM Elements
const input = document.getElementById("input");
const add = document.getElementById("add");
const reverse = document.getElementById("revers");
const sortByName = document.getElementById("sortByName");
const error = document.getElementById("error");
let studentsList = document.getElementById("students");
const graduateFilter = document.getElementById("graduetedStu");
const unGraduateFilter = document.getElementById("unGraduetedStu");
const showAll = document.getElementById("showAll");
const search = document.getElementById("search");


// Data and Variables
let students = [];
let finalId = 10000;

// Add a new student
function newStudent() {
    if (/^[A-Za-z\s'-]{3,}$/.test(input.value)) {
        finalId++;
        createStudent();
        createElement(finalId, input.value);
        input.value = "";
        error.style.display = "none";
    } else {
        error.style.display = "block";
    }
}

// Event Listeners
add.addEventListener("click", newStudent);

document.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        newStudent()
    };
});

reverse.addEventListener("click", () => {
    studentsList.innerHTML = "";
    students.reverse();
    students.forEach(student => createElement(student.Id, student.Name, student.graduated));
});

sortByName.addEventListener("click", () => {
    studentsList.innerHTML = "";
    students.sort((a, b) => a.Name.toLowerCase().localeCompare(b.Name.toLowerCase()));
    students.forEach(student => createElement(student.Id, student.Name, student.graduated));
});

graduateFilter.addEventListener("click", () => {
    studentsList.innerHTML = "";
    students.forEach(student => {
        if (student.graduated) {
            createElement(student.Id, student.Name, student.graduated)
        }
    })
});

unGraduateFilter.addEventListener("click", () => {
    studentsList.innerHTML = "";
    students.forEach(student => {
        if (!student.graduated) {
            createElement(student.Id, student.Name, student.graduated)
        }
    })
});

showAll.addEventListener("click", () => {
    studentsList.innerHTML = "";
    students.forEach(student => {
        createElement(student.Id, student.Name, student.graduated)
    })
});


search.addEventListener("input", () => {
    studentsList.innerHTML = ""
    let searchText = search.value.toLowerCase()
    students.forEach(student => {
        if (searchText == student.Name.toLowerCase()) {
            createElement(student.Id, student.Name, student.graduated)
        }
    })

})

// Create student DOM element
function createElement(Id, name, graduated) {
    let studentElement = document.createElement("li");
    let studentInfo = document.createElement("p");
    let studentButtons = document.createElement("div");
    studentInfo.textContent = `${Id} - ${name}`;
    studentElement.appendChild(studentInfo);
    studentButtons.appendChild(graduateButton(name));
    studentButtons.appendChild(removeButton(name));
    studentElement.appendChild(studentButtons);

    if (graduated) {
        studentInfo.classList.add("studentInfo");
        studentButtons.firstChild.textContent = "Ungraduate";
    }

    studentsList.appendChild(studentElement);
}

// Remove button functionality
function removeButton(name) {
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.id = "remove";

    removeButton.addEventListener("click", () => {
        removeButton.closest("li").remove();
        let index = students.findIndex(student => student.Name === name);
        if (index !== -1) {
            students.splice(index, 1);
        };
    });

    return removeButton;
}

// Graduate button functionality
function graduateButton(name) {
    let graduateButton = document.createElement("button");
    graduateButton.textContent = "Graduate";
    graduateButton.id = "graduate";

    graduateButton.addEventListener("click", () => {
        let info = graduateButton.closest("li").firstChild;
        let index = students.findIndex(student => student.Name === name);

        if (info.classList.contains("studentInfo")) {
            info.classList.remove("studentInfo");
            graduateButton.textContent = "Graduate";
            if (index !== -1) students[index].graduated = false;
        } else {
            info.classList.add("studentInfo");
            graduateButton.textContent = "Ungraduate";
            if (index !== -1) students[index].graduated = true;
        }
    });

    return graduateButton;
}

// Add student to the list
function createStudent() {
    students.push({
        Name: input.value,
        Id: finalId,
        graduated: false,
    });
}
