import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { World } from "./world.js";
import Stats from 'three/addons/libs/stats.module.js';
import { createUI } from "./ui.js";
import { Player } from "./player.js";
import Physics from "./physics.js";

const stats = new Stats();
document.body.append(stats.dom);

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); //0x80a0e0
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//Camera
const orbitCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);
orbitCamera.position.set(64,100,64);

const controls = new OrbitControls(orbitCamera, renderer.domElement);
controls.target.set(50, 64, 50);
controls.update();

//scene
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);

const player = new Player(scene);

const physics = new Physics(scene);

function setupLights() {
    const moon = new THREE.DirectionalLight(0x6666dd, 0.7);
    moon.position.set(125,125,125);
    moon.castShadow = true;
    moon.shadow.camera.left = -100;
    moon.shadow.camera.right = 100;
    moon.shadow.camera.bottom = -100;
    moon.shadow.camera.top = 100;
    moon.shadow.camera.near = 0.1;
    moon.shadow.camera.far = 200;
    moon.shadow.bias = -0.0007;
    moon.shadow.mapSize = new THREE.Vector2(512,512);
    scene.add(moon);

    const shadowHelper = new THREE.CameraHelper(moon.shadow.camera);
    shadowHelper.visible = false;
    scene.add(shadowHelper)
    scene.shadowHelper = shadowHelper;

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.02;
    scene.add(ambient);

    const hemiLight = new THREE.HemisphereLight(0x222222, 0x000000, 0.4); 
    scene.add(hemiLight);
}

//render
let prevTime = performance.now();
function animate() {
    let currentTime = performance.now();
    let dt = (currentTime - prevTime) / 1000;
    requestAnimationFrame(animate);
    
    physics.update(dt, player, world);
    renderer.render(scene, player.controls.isLocked ? player.camera : orbitCamera);
    stats.update();

    prevTime = currentTime;
}

window.addEventListener("resize", () =>{
    orbitCamera.aspect = window.innerWidth/window.innerHeight;
    orbitCamera.updateProjectionMatrix();
    player.camera.aspect = window.innerWidth/window.innerHeight;
    player.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

setupLights();
createUI(world, player, scene);

animate();