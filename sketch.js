// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let ctx;
let size = 200;

function setup() {
  
  var canvas = createCanvas(size,size);
  canvas.parent('webcam');
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}


  function mousePressed() {
  console.log(poses);
}

function draw() {
  translate(width,0); // move to far corner
  scale(-1.0,1.0);    // flip x-axis backwards
  image(video, 0, 0, width, height); //video on canvas, position, dimensions
  // scale(-1.0,1.0);
  // We can call both functions to draw all keypoints and the skeletons
  midSelector();
  drawKeypoints();
  drawSkeleton();
  selectImage();
  // testdraw()
   
}

let list = [];
let mid;
function midSelector (){
  let list = [];
  let listTest = [];
  for (let i = 0; i < poses.length; i += 1) {
    let noYou = poses[i].pose.nose.x;
    let central = Math.pow((noYou-(size/2)),2)
    list.push(central)
    listTest.push(noYou)
  }
  const indexFinder = (element) => element == Math.min(...list);
  // console.log(list,listTest,Math.min(...list),list.findIndex(indexFinder));
  mid = list.findIndex(indexFinder);
}

// test
function testdraw () {
 // Loop through all the poses detected
 for (let i = 0; i < poses.length; i += 1) {
  // For each pose detected, loop through all the keypoints
  for (let j = 0; j < poses[i].pose.keypoints.length; j += 1) {
    let keypoint = poses[i].pose.keypoints[j];
    // Only draw an ellipse is the pose probability is bigger than 0.2
    if (keypoint.score > 0.2) {
      fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}


// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  // for (let i = 0; i < poses.length; i++) {
     // For each pose detected, loop through all the keypoints
  if (poses.length > 0) {
    let pose = poses[mid].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(0, 255, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  if (poses.length > 0) {
    let skeleton = poses[mid].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(0, 255, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function selectImage(){
  if (poses.length > 0) {
    let pose = poses[0].pose;

    let nose = pose["nose"];

    let rightWrist = pose["rightWrist"];

    let leftWrist = pose["leftWrist"];
    
    let leftHip = pose["leftHip"];
    
    let rightHip = pose["rightHip"];
    
    // Tallness
    let a = normalize(rightWrist.y)
    //size 
    let b = gap(rightWrist.x,leftWrist.x)
    //roundess
    let c = inbetween(normalize(nose.x),normalize(leftWrist.x),normalize(rightWrist.x),b)
    let abc
    abc = [domain(a),domain(b),domain(c)]
    // console.log(abc.join('-')+'.jpg')
    // console.log(domain(c))
    let testImage = document.getElementById("test-image");
    testImage.src = './newimage/'+abc.join('-')+'.jpg'
    moveDot(c,b,domain(a));
    layerColor(domain(a))
  }
}
let interval = 10
let ulimit = interval - 1

function gap (x,y){
  let output;
  output = Math.abs(normalize(x)- normalize(y));
  return output;
}

function inbetween(center,leftHand,rightHand,gap){
  let output;
  let ab;
  ab = center - leftHand
  
  if (ab>0){
    output = 0
  }else{
    output = Math.abs(center - leftHand)/gap;
  }
  return output;
}

function normalize (arr){
  let output;
  output = arr/size;
  return output;
}

function domain(arr){
  let output
  output = Math.floor(arr * interval)
  if (output> ulimit) {
    output = ulimit;
  } else if (output < 0) {
    output = 0;
  }
  return output
}

function moveDot (a,b,c){
  function correct(arr){
    let output = arr
    if (output> interval/10) {
      output = interval/10;
    } else if (output < 0) {
      output = 0;
    }
    return output
  }
  let x = correct(a)*100
  let y = correct(b)*100
  let z = c*10
  var r = document.querySelector(':root');
  
    r.style.setProperty('--y', String(y)+"%");
    r.style.setProperty('--x', String(x)+"%");
    r.style.setProperty('--z', String(z)+"px");
}

function layerColor(z) {
  let layer = "l"+String(z);
  let array = ["l0","l1","l2","l3","l4","l5","l6","l7","l8","l9"];
  const index = array.indexOf(layer);
if (index > -1) { // only splice array when item is found
  array.splice(index, 1); // 2nd parameter means remove one item only
}

for (var i = 0; i < array.length; i++) {
   var yeet = document.getElementById(array[i]);
   yeet.classList.remove("selectColor");  
}

var element = document.getElementById(layer);
element.classList.add("selectColor");
  
  
}