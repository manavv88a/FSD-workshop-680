const form = document.getElementById("requestForm");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const id = document.getElementById("requestId").value;

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value
    };

    if (id) {
        await fetch("/api/requests/" + id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
    } else {
        await fetch("/api/requests", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
    }

    resetForm();
    loadRequests();
});

async function loadRequests() {
    const response = await fetch("/api/requests");
    const requests = await response.json();

    const list = document.getElementById("requestList");
    list.innerHTML = "";

    requests.forEach(r => {
        list.innerHTML += `
            <div class="request">
                <b>Name:</b> ${r.name}<br>
                <b>Email:</b> ${r.email}<br>
                <b>Category:</b> ${r.category}<br>
                <b>Description:</b> ${r.description}<br>
                <b>Priority:</b> ${r.priority}<br>
                <button onclick="editRequest(${r.id})">Edit</button>
                <button class="delete" onclick="deleteRequest(${r.id})">Delete</button>
            </div>
        `;
    });
}

async function editRequest(id) {
    const response = await fetch("/api/requests/" + id);
    const r = await response.json();

    document.getElementById("requestId").value = r.id;
    document.getElementById("name").value = r.name;
    document.getElementById("email").value = r.email;
    document.getElementById("category").value = r.category;
    document.getElementById("description").value = r.description;
    document.getElementById("priority").value = r.priority;

    document.getElementById("submitBtn").innerText = "Update Request";
    document.getElementById("cancelBtn").style.display = "inline-block";
}

async function deleteRequest(id) {
    await fetch("/api/requests/" + id, {
        method: "DELETE"
    });

    loadRequests();
}

function resetForm() {
    form.reset();
    document.getElementById("requestId").value = "";
    document.getElementById("submitBtn").innerText = "Submit Request";
    document.getElementById("cancelBtn").style.display = "none";
}

loadRequests();
