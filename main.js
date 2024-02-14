

function setup() {
    canvas = createCanvas(640, 420)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()

}
function start() {
    objectdetecter = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "model is loading"

}
status = ""
objects = []
function draw() {
    image(video, 0, 0, 640, 420)
    if (status) {
item=document.getElementById("Object").value


        objectdetecter.detect(video, gotresult)

        for (i = 0; i < objects.length; i++) {
if (item==objects[i].label) {
    document.getElementById("isfound").innerHTML="item found"
}
            percent = floor(objects[i].confidence * 100)
            fill("red")
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            stroke("blue")
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}
function modelLoaded() {
    console.log("model loaded");
    status = true
    document.getElementById("status").innerHTML = "model loaded"
    objectdetecter.detect(video, gotresult)
}

function gotresult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        objects = result
    }
}