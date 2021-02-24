
objects = [];
status = "";
hello = 1;
names = "";

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}

function modelLoaded() {
  status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  names = document.getElementById("name").value;
  hello = 1;
  video.play();
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }else{
    console.log(results);
    objects = results;
  }
}

function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

         
          if(objects[i].label == names)
          {
            video.stop();
            //objectDetector.detect(gotResult);
            if (hello == 1){
                synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(names + "Found");
            synth.speak(utterThis);
            hello = hello + 1;
            }
            document.getElementById("object_status").innerHTML = names + " Found";
          }
          else
          {
            document.getElementById("object_status").innerHTML = names + " Not Found";
          }          
         }
      }
}