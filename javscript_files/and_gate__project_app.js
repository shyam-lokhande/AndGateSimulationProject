var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
canvas.addEventListener("click", mouseclick, false);
var and_gate = new Geometry.AndGate(new Geometry.Point(400, 300), 15, context);
//all Circle Geometries
var circle1 = new Geometry.Circle(new Geometry.Point(300, 250), 30, "grey", context); //First Input
var circle2 = new Geometry.Circle(new Geometry.Point(300, 350), 30, "grey", context); //Second Input
var circle3 = new Geometry.Circle(new Geometry.Point(450, 300), 25, "grey", context); //Outer Gate Circle
var circle4 = new Geometry.Circle(new Geometry.Point(470, 300), 5, "yellow", context); //Inner Gate Circle
//connections
var connect1 = new Geometry.connect(300, 250, 370, 295, "grey", context);
var connect2 = new Geometry.connect(300, 350, 370, 305, "grey", context);
var connect3 = new Geometry.connect(415, 300, 450, 300, "grey", context);
//Texts
var IgnitionText = new Geometry.Text("Ignition ON", 240, 220);
var WiperText = new Geometry.Text("Wiper ON", 240, 320);
var FirstInputText = new Geometry.Text("OFF", 283, 257);
var SecondInputText = new Geometry.Text("OFF", 283, 357);
//Verticle Rectangle for wiper
var rect = new Geometry.Rectangle(new Geometry.Point(500, 250), 5, 120, context);
//wipers lines
var wiper1 = new Geometry.line(500, 280, 582, 280, context);
var wiper2 = new Geometry.line(500, 340, 582, 340, context);
var first_input = "off";
var second_input = "off";
function redraw() {
    connect1.draw();
    connect2.draw();
    connect3.draw();
    and_gate.draw();
    circle1.draw();
    circle2.draw();
    circle3.draw();
    circle4.draw();
    rect.draw();
    wiper1.draw();
    wiper2.draw();
    IgnitionText.Draw();
    WiperText.Draw();
    FirstInputText.Draw();
    SecondInputText.Draw();
}
redraw();
function mouseclick(e) {
    var side_space = canvas.getBoundingClientRect();
    if (circle1.isinside(new Geometry.Point(e.clientX - side_space.x, e.clientY - side_space.y))) {
        if (first_input == "off") {
            circle1.colour = "green";
            connect1.colour = "green";
            first_input = "on";
            FirstInputText.text = "ON";
            CheckConditionToRotate();
        }
        else {
            circle1.colour = "grey";
            connect1.colour = "grey";
            first_input = "off";
            FirstInputText.text = "OFF";
            CheckConditionToRotate();
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        redraw();
    }
    else if (circle2.isinside(new Geometry.Point(e.clientX - side_space.x, e.clientY - side_space.y))) {
        if (second_input == "off") {
            circle2.colour = "green";
            connect2.colour = "green";
            second_input = "on";
            SecondInputText.text = "ON";
            CheckConditionToRotate();
        }
        else if (second_input == "on") {
            circle2.colour = "grey";
            connect2.colour = "grey";
            second_input = "off";
            SecondInputText.text = "OFF";
            CheckConditionToRotate();
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        redraw();
    }
    if (first_input == "on" && second_input == "on") {
        circle3.colour = "green";
        redraw();
    }
    else if (first_input == "off" || second_input == "off") {
        circle3.colour = "grey";
        redraw();
    }
    else if (first_input == "off" && second_input == "off") {
        redraw();
    }
}
function CheckConditionToRotate() {
    if (first_input == "on" && second_input == "on") {
        connect3.colour = "green";
        circle4.Rotate(circle3.center, circle3.radius);
        wiper1.SwiperSetOn();
        wiper2.SwiperSetOn();
        window.requestAnimationFrame(CheckConditionToRotate);
    }
    else if (first_input == "off" || second_input == "off") {
        connect3.colour = "grey";
    }
}
//# sourceMappingURL=and_gate__project_app.js.map