const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const file = "requests.json";

app.use(express.json());
app.use(express.static("public"));

function getRequests() {
    if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
    return JSON.parse(fs.readFileSync(file));
}

function saveRequests(data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.get("/api/requests", (req, res) => {
    res.json(getRequests());
});

app.get("/api/requests/:id", (req, res) => {
    const requests = getRequests();
    const request = requests.find(r => r.id == req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
});

app.post("/api/requests", (req, res) => {
    const requests = getRequests();

    const newRequest = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    requests.push(newRequest);
    saveRequests(requests);
    res.json(newRequest);
});

app.put("/api/requests/:id", (req, res) => {
    const requests = getRequests();
    const index = requests.findIndex(r => r.id == req.params.id);

    if (index == -1) return res.status(404).json({ message: "Request not found" });

    requests[index] = {
        id: requests[index].id,
        name: req.body.name,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    saveRequests(requests);
    res.json(requests[index]);
});

app.delete("/api/requests/:id", (req, res) => {
    let requests = getRequests();
    const oldLength = requests.length;

    requests = requests.filter(r => r.id != req.params.id);

    if (requests.length == oldLength)
        return res.status(404).json({ message: "Request not found" });

    saveRequests(requests);
    res.json({ message: "Request deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
