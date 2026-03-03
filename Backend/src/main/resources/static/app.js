const API_URL = "http://localhost:8080/todos";

function loadTodos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("todoList");
            list.innerHTML = "";

            data.forEach(todo => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${todo.title}
                    <button onclick="deleteTodo(${todo.id})">Delete</button>
                `;
                list.appendChild(li);
            });
        });
}

function addTodo() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) return;

    fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            completed: false
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("POST failed");
            }
            return response.json();
        })
        .then(() => {
            input.value = "";
            loadTodos();
        })
        .catch(error => console.error("Error:", error));
}

function deleteTodo(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    }).then(() => loadTodos());
}

loadTodos();