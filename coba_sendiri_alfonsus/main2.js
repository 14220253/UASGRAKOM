import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { World } from "./world.js";
import Stats from 'three/addons/libs/stats.module.js';
import { createUI } from "./ui.js";
import { Player } from "./player.js";
import Physics from "./physics.js";
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
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
let lastFlickerTime = 0;
let prevTime = performance.now();
const raycaster = new THREE.Raycaster();
const pickupDistance = 5; // Adjust as needed
let emeraldPickedUp = false;
let keyPickedUp = false;
function animate() {
    const delta = clock.getDelta();
	if ( mixer ) mixer.update( delta );

    if(emeraldPickedUp){
        document.getElementById('image-box1').style.backgroundImage = "url('objectResources/emerald/emerald.png')";
    }
    else{
        document.getElementById('image-box1').style.backgroundImage = 'none';
    }
    if(keyPickedUp){
        document.getElementById('image-box2').style.backgroundImage = "url('objectResources/key/key.png')";
    }
    else{
        document.getElementById('image-box2').style.backgroundImage = 'none';
    }
    let currentTime = performance.now();
    let dt = (currentTime - prevTime) / 1000;
    requestAnimationFrame(animate);

    physics.update(dt, player, world);
    if (skeleton && player.isCloseTo(skeleton)) {
        skeleton.visible = false;
    }
    if (skeleton2 && player.isCloseTo(skeleton2)) {
        skeleton2.visible = false;
    }
    const elapsedTime = clock.getElapsedTime();
    if (flickeringLight) {
        updateFlickeringLight(flickeringLight, elapsedTime);
    }

    if (flickeringLight2) {
        if (elapsedTime - lastFlickerTime > 2) {
            flickeringLight2.intensity = flickeringLight2.intensity === 30 ? 0 : 30;
            lastFlickerTime = elapsedTime;
        }
    }

    // Raycasting to detect if player is looking at the emerald
    raycaster.setFromCamera({ x: 0, y: 0 }, player.camera);
    const intersects = raycaster.intersectObject(emerald, true);

    if (emerald && player.isCloseTo(emerald, 5)) {
        let distance = player.distance(emerald);
        if (intersects.length > 0 && distance <= pickupDistance) {
            unlockCellMessage.style.display = 'block';
                document.addEventListener('keydown', function(event) {
                    if (event.key === 'e' || event.key === 'E') {
                        // Perform action to pick up the emerald
                        emerald.visible = false; // Make emerald disappear
                        emeraldPickedUp = true; // Set flag to true indicating emerald is picked up
                        pickupMessage.style.display = 'none'; // Hide pickup message
                    }
                });
        } else {
            pickupMessage.style.display = 'none';
        }
    }
    else {
        pickupMessage.style.display = 'none'; 
    }

    const keyintersects = raycaster.intersectObject(key, true);

    if (key && player.isCloseTo(key, 5)) {
        let distance = player.distance(key);
        if (keyintersects.length > 0 && distance <= pickupDistance) {
            pickupMessage.style.display = 'block';
                document.addEventListener('keydown', function(event) {
                    if (event.key === 'e' || event.key === 'E') {
                        // Perform action to pick up the emerald
                        key.visible = false; // Make emerald disappear
                        keyPickedUp = true; // Set flag to true indicating emerald is picked up
                        pickupMessage.style.display = 'none'; // Hide pickup message
                    }
                });
        } else {
            pickupMessage.style.display = 'none';
        }
    }
    else {
        pickupMessage.style.display = 'none'; 
    }

    const cellintersects = raycaster.intersectObject(prisonCellDoor, true);

    if (prisonCellDoor && player.isCloseTo(prisonCellDoor, 5)) {
        let distance = player.distance(prisonCellDoor);
        if (cellintersects.length > 0 && distance <= pickupDistance) {
            unlockCellMessage.style.display = 'block';
            if(!keyPickedUp){
                unlockCellMessage.textContent = 'Need a key to unlock';
            }
            else{
                unlockCellMessage.textContent = 'Press E to unlock';
                document.addEventListener('keydown', function(event) {
                    if (event.key === 'e' || event.key === 'E') {
                        // Perform action to pick up the emerald
                        prisonCellDoor.visible = false; // Make emerald disappear
                        unlockCellMessage.style.display = 'none'; // Hide pickup message
                    }
                });
            }
        } else {
            unlockCellMessage.style.display = 'none';
        }
    }
    else {
        unlockCellMessage.style.display = 'none'; 
    }

    const emeraldDoorintersects = raycaster.intersectObject(emeraldDoor, true);

    if (emeraldDoor && player.isCloseTo(emeraldDoor, 5)) {
        let distance = player.distance(emeraldDoor);
        if (emeraldDoorintersects.length > 0 && distance <= pickupDistance) {
            unlockEmeraldDoorMessage.style.display = 'block';
            if(!emeraldPickedUp){
                unlockEmeraldDoorMessage.textContent = 'Need an emerald to unlock';
            }
            else{
                unlockEmeraldDoorMessage.textContent = 'Press E to unlock';
                document.addEventListener('keydown', function(event) {
                    if (event.key === 'e' || event.key === 'E') {
                        // Perform action to pick up the emerald
                        emeraldDoor.visible = false; // Make emerald disappear
                        unlockEmeraldDoorMessage.style.display = 'none'; // Hide pickup message
                    }
                });
            }
        } else {
            unlockEmeraldDoorMessage.style.display = 'none';
        }
    }
    else {
        unlockCellMessage.style.display = 'none'; 
    }


    //item rotation
    emerald.rotation.y += 0.1;
    key.rotation.y += 0.1;

    renderer.render(scene, player.controls.isLocked ? player.camera : orbitCamera);
    stats.update();

    prevTime = currentTime;
}

window.addEventListener("resize", () => {
    orbitCamera.aspect = window.innerWidth / window.innerHeight;
    orbitCamera.updateProjectionMatrix();
    player.camera.aspect = window.innerWidth / window.innerHeight;
    player.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

setupLights();
createUI(world, player, scene);

animate();