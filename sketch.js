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
let size = 200

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
  drawKeypoints();
  drawSkeleton();
  selectImage();
  
  

  
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  // for (let i = 0; i < poses.length; i++) {
     // For each pose detected, loop through all the keypoints
  if (poses.length > 0) {
    let pose = poses[0].pose;
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
    let skeleton = poses[0].skeleton;
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

    // Create a pink ellipse for the nose
    fill(213, 0, 143);
    let nose = pose["nose"];

    // Create a yellow ellipse for the right eye
    let rightWrist = pose["rightWrist"];

    // Create a yellow ellipse for the right eye;
    let leftWrist = pose["leftWrist"];
    
    let leftHip = pose["leftHip"];
    
    let rightHip = pose["rightHip"];
    
    
//     const arrX = [nose.x, rightWrist.x, leftWrist.x, rightHip.x, leftHip.x];
//       const averageX = arrX.reduce((a, b) => a + b, 0) / arrX.length;
    
//     const arrY = [nose.y, rightWrist.y, leftWrist.y, rightHip.y, leftHip.y];
//       const averageY = arrY.reduce((a, b) => a + b, 0) / arrY.length;
    
    // const arrX = [ rightWrist.x, leftWrist.x];
      // const averageX = arrX.reduce((a, b) => a + b, 0) / arrX.length;
    // 
    // const arrY = [ rightWrist.y, leftWrist.y];
      // const averageY = arrY.reduce((a, b) => a + b, 0) / arrY.length;
    
    // Tallness
    let a = domain(normalize(rightWrist.y))
    //size 
    let b = domain(gap(rightWrist.x,leftWrist.x))
    //roundess
    let c = domain(normalize(nose.x))
    let abc
    abc = [a,b,c]
    // console.log(abc.join('-')+'.jpg')
    // console.log(a,normalize(rightWrist.y)*10)
    let testImage = document.getElementById("test-image");
    testImage.src = './newimage/'+abc.join('-')+'.jpg'
  }
}

function gap (x,y){
  let output;
  output = Math.abs(normalize(x)- normalize(y));
  return output;
}

function normalize (arr){
  let output;
  output = arr/size;
  // output = (Math.round((arr/ size)*10))/10; 
  // if (output > 1) {
    // output = 1
  // } else if (output < 0){
    // output = 0 
  // }
  return output;

}

function domain(arr){
  let output
  let interval = 10
  let ulimit = interval - 1;
  output = Math.floor(arr * interval)
  if (output> ulimit) {
    output = ulimit;
  } else if (output < 0) {
    output = 0;
  }
  return output
}

// let up =  aa * 0 +  bb* 157.2 + cc * 157.2;
// let side =  aa * 92 +  bb* 0 + cc * 184;
// var r = document.querySelector(':root');
// 
  // r.style.setProperty('--up', String(up)+"px");
  // r.style.setProperty('--side', String(side)+"px");
// 
// console.log(String(up)+"px")