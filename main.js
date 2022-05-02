function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}
function setup(){
    canvas = createCanvas(500,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function classifyCanvas(){
    classifier.classify(canvas,gotResults)
}
function clearCanvas(){
    background("white");
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('label').innerHTML= 'Label: '+ results[0].label;
        document.getElementById('confidence').innerHTML= 'Confidence: '+ (results[0].confidence * 100).toFixed(2)+"%";

        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);

    }
}
function draw(){
    strokeWeight(5);
    stroke("black");
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}