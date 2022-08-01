let textArea = document.getElementById("task");
let added = document.querySelector("#added");
let toastLive = document.getElementById("liveToast");
let listDOM = document.getElementById("list");
let liTasks = document.getElementsByTagName("li");
let taskStore = [];
let button1 = document.getElementsByClassName("button1");


function locStor() {
    for (let i = 0; i < liTasks.length; i++) {
        taskStore.push(liTasks[i].innerText);
    }
    localStorage.setItem("TaskList", JSON.stringify(taskStore));
}

locStor();

function newElement() {
    if (textArea.value.trim()) {
        added.classList.remove("text-danger")
        added.classList.add("text-success");
        added.innerText = "Listeye Eklendi.";

        const listEl = document.createElement("li");
        listEl.setAttribute("onclick", "done(this)");

        listEl.innerHTML = ` ${textArea.value} <button type="button" onclick="deleteLi(this)" class="btn-close float-end" aria-label="Close"></button>`;
        listDOM.appendChild(listEl);
        localStorage.clear();
        taskStore = [];
        locStor();
    } else {
        added.classList.remove("text-success")
        added.classList.add("text-danger");
        added.innerText = "Listeye Boş Ekleme Yapamazsınız!";
    }

    const toast = new bootstrap.Toast(toastLive);
    toast.show();
    textArea.value = "";
}

function done(li) {
    li.classList.toggle("checked");
}

function deleteLi(li) {
    li.parentNode.remove();
    localStorage.clear();
    taskStore = [];
    locStor();
}

function chooseAll() {
    for (let i = 0; i < liTasks.length; i++) {
        liTasks[i].classList.add("checked");
    }
}

function deleteAll() {
    if (confirm("Hepsini Silmek İstediğinizden Emin Misiniz?")) {
        while (listDOM.firstElementChild != null) {
            listDOM.removeChild(listDOM.firstElementChild);
        }

        localStorage.clear();

        textArea.value = "";

    }
}


