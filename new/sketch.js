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

function setup() {
  let size = 600
  createCanvas(size,size)
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

  function mousePressed() {
  console.log(poses);
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
  
  
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
    
    const arrX = [ rightWrist.x, leftWrist.x];
      const averageX = arrX.reduce((a, b) => a + b, 0) / arrX.length;
    
    const arrY = [ rightWrist.y, leftWrist.y];
      const averageY = arrY.reduce((a, b) => a + b, 0) / arrY.length;
    
    ellipse(averageX, averageY, 20, 20);
    
  }
  
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
        fill(255, 0, 0);
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
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
