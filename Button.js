class Button extends EventEmitter {
    click() {
        console.log("/n call button click event");
        this; emit("click");

    }
    mouseover() {
        console.log("/n call button mouseover event");
        this.emit("mouseover");
        return;
        {
            res.send(data);
        }
    }

}
