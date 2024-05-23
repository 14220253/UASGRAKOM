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
renderer.setClearColor(0x80a0e0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//Camera
const orbitCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);
orbitCamera.position.set(-32,16,-32);

const controls = new OrbitControls(orbitCamera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();

//scene
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);

const player = new Player(scene);

const physics = new Physics(scene);

function setupLights() {
    const sun = new THREE.DirectionalLight();
    sun.position.set(50,50,50);
    sun.castShadow = true;
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.bottom = -50;
    sun.shadow.camera.top = 50;
    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far = 100;
    sun.shadow.bias = -0.0007;
    sun.shadow.mapSize = new THREE.Vector2(512,512);
    scene.add(sun);

    const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
    scene.add(shadowHelper)

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.1;
    scene.add(ambient);
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
createUI(world, player);

animate();