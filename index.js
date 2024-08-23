//import * as THREE from "three";
//import { OrbitControls } from 'jsm/controls/OrbitControls.js';
//import { OBJLoader } from "jsm/loaders/OBJLoader.js";
import * as THREE from "./three.module.js"
import { OrbitControls } from './OrbitControls.js';
import { OBJLoader } from "./OBJLoader.js";

import getLayer from './getLayer.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 500;
const renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  alpha: true,
});
//renderer.setSize(w, h);
renderer.setSize(w, h - 50);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function init(geometry) {
  const material = new THREE.MeshStandardMaterial({
    matcap: new THREE.TextureLoader().load('./skull.jpg'),
    // transparent: true,
    // opacity: 0.5
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const sunlight = new THREE.DirectionalLight(0xffffff);
  sunlight.position.y = 2;
  scene.add(sunlight);

  const filllight = new THREE.DirectionalLight(0x88ccff);
  filllight.position.x = 1;
  filllight.position.y = -2;
  scene.add(filllight);

  // Sprites BG
  const gradientBackground = getLayer({
    hue: 0.6,
    numSprites: 8,
    opacity: 0.2,
    radius: 10,
    size: 24,
    z: -10.5,
  });
  scene.add(gradientBackground);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

const loader = new OBJLoader();

loader.load("./dist/Skullobj.obj", (obj) => init(obj.children[0].geometry));
loader.load("./dist/Skullobj.obj", (obj) => init(obj.children[1].geometry));
loader.load("./dist/Skullobj.obj", (obj) => init(obj.children[2].geometry));
loader.load("./dist/Skullobj.obj", (obj) => init(obj.children[3].geometry));
loader.load("./dist/Skullobj.obj", (obj) => init(obj.children[4].geometry));
loader.load("./dist/Skullobj.obj", (obj) => init(obj.children[5].geometry));
loader.load("./dist/Skullobj.obj", (obj) => init(obj.children[6].geometry));


function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);

function saveImage() {
  renderer.render(scene, camera);
  let imgData = renderer.domElement.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.setAttribute("href", imgData);
  link.setAttribute("target", "_blank");
  link.setAttribute("download", "canvas.png");
  link.click();
} 

document.getElementById("saveImage").addEventListener("click", saveImage);

//window.addEventListener("keydown", (evt) => {
//  if (evt.key === "s") {
//    saveImage();
//  }
//  });
