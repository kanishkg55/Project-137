status="";
video = "";
objects = [];

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_input = document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("Model loaded");
    status = true;
}

function draw()
{
    image(video,0,0,480,380);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects : " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(objects[i].label == object_input)
    {
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("status").innerHTML = object_input + " Found";
        object_input = window.speechSynthesis;
        SpeechSynthesisUtterance(object_input);
    }
    else{
        document.getElementById("status").innerHTML = object_input + " Not Found";
    }
}

function gotResults(error,results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}