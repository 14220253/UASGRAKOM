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
renderer.toneMappingExposure =4;
renderer.toneMapping = THREE.toneMappingExposure;
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


function generateOBJ(urlOBJ, onLoad) {
    const loader = new OBJLoader();
    loader.load(
        urlOBJ,
        function (object) {
            object.traverse(function (node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            scene.add(object);
            if (onLoad) onLoad(object);  // Execute the callback with the loaded object
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened', error);
        }
    );
}

function generateGLTF(urlGLTF, onLoad) {
    const loader = new GLTFLoader();
    loader.load(
        urlGLTF,
        function (gltf) {
            const model = gltf.scene;
            model.traverse(function (node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            scene.add(model);
            if (onLoad) onLoad(model);  // Execute the callback with the loaded model
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened', error);
        }
    );
}

function generateMTL(pathFolderObject, MTLName, OBJName, onLoad) {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath(pathFolderObject);
    mtlLoader.load(MTLName, function (materials) {
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(pathFolderObject);
        objLoader.load(OBJName, function (object) {
            object.traverse(function (node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });

            if (onLoad) onLoad(object);
        });
    });
}
//object

//barrel1-5
for(let i = 8; i < 13; i+= 1.5){
    generateMTL("objectResources/barrel/", "Barrel.mtl", "Barrel.obj", function (barrel) {
        barrel.scale.setScalar(0.35);
        barrel.position.set(i, 0, 2);
        scene.add(barrel);
    });
}
let table;
generateGLTF("objectResources/candle/scene.gltf", (table1) => {
    table = table1;
    table.scale.setScalar(1.5);
    table.position.set(66, 63.4, 60);
    table.rotation.y = 3.16
    scene.add(table);
    
    const candlePointLight = new THREE.PointLight(0xFC7703, 0.55, 0, 1);
    candlePointLight.position.set(0.5, 1.6, -0.5);
    candlePointLight.castShadow = true;
    table.add(candlePointLight);
});

let flower;
generateGLTF("objectResources/flower/scene.gltf", (flower1) => {
    flower = flower1;
    flower.scale.setScalar(1);
    flower.position.set(71, 63.2, 68.5);
    flower.rotation.x = 0.5;
    scene.add(flower);
});

let candleTable;
generateGLTF("objectResources/bedCandle/scene.gltf", (candle1) => {
    candleTable = candle1;
    candleTable.scale.setScalar(0.005);
    candleTable.position.set(71, 64.6, 66.2);
    scene.add(candleTable);
    
    const candlePointLight = new THREE.PointLight(0xFFA703, 0.5, 0, 2);
    candlePointLight.position.set(0, 1, 0);
    candlePointLight.castShadow = true;
    candleTable.add(candlePointLight);
});
let candleBed;
generateGLTF("objectResources/bedCandle/scene.gltf", (candle2) => {
    candleBed = candle2;
    candleBed.scale.setScalar(0.005);
    candleBed.position.set(71, 64.6, 63);
    scene.add(candleBed);
    
    const candlePointLight = new THREE.PointLight(0xFFA703, 0.5, 0, 2);
    candlePointLight.position.set(0, 1, 0);
    candlePointLight.castShadow = true;
    candleBed.add(candlePointLight);
});

generateOBJ("objectResources/skeleton/SubTool-0-3517926.OBJ", (skeleton) => {
    skeleton.scale.setScalar( 0.5 );
    skeleton.position.set(73, 64.8, 61.5);
    skeleton.rotation.x = -Math.PI / 2;
    skeleton.rotation.y = 0; 
    skeleton.rotation.z = 0;
    scene.add(skeleton);
});


//skeleton & skeletonSpotLight
let skeleton;
generateOBJ("objectResources/skeleton/SubTool-0-3517926.OBJ", (skeleton1) => {
    skeleton = skeleton1;
    skeleton.scale.setScalar(0.5);
    skeleton.position.set(86, 2.2, 45);
    skeleton.rotation.y = 59.7;
    scene.add(skeleton);
});

let skeleton2;
generateOBJ("objectResources/skeleton/SubTool-0-3517926.OBJ", (skeleton1) => {
    skeleton2 = skeleton1;
    skeleton2.scale.setScalar(0.5);
    skeleton2.position.set(67, 2.2, 57.5);
    skeleton2.rotation.y = -Math.PI / 2;
    scene.add(skeleton2);
});

//coffin
generateGLTF("objectResources/coffin/scene.gltf", (coffin) => {
    coffin.scale.setScalar(0.015);
    coffin.position.set(73, 0.5, 69.5);
    scene.add(coffin);
});

//skeleton inside coffin
generateOBJ("objectResources/skeleton/SubTool-0-3517926.OBJ", (skeleton) => {
    skeleton.scale.setScalar( 0.5 );
    skeleton.position.set(72.6, 1.2, 69.5);
    skeleton.rotation.x = -Math.PI / 2;
    skeleton.rotation.y = 0; 
    skeleton.rotation.z = -Math.PI / 2;
    scene.add(skeleton);
});

//emeraldDoor
let emeraldDoor;
generateGLTF("objectResources/emeraldDoor/scene.gltf", (emeraldDoor1) => {
    emeraldDoor = emeraldDoor1;
    emeraldDoor.scale.setScalar(0.02);
    emeraldDoor.position.set(72.5, 5, 74.7);
    scene.add(emeraldDoor);
});


//prison cell door
let prisonCellDoor;
generateGLTF("objectResources/prisonCellDoor/scene.gltf", (prisonCellDoor1) => {
    prisonCellDoor = prisonCellDoor1;
    prisonCellDoor.scale.setScalar(1.6);
    prisonCellDoor.position.set(45, 0.5, 38);
    prisonCellDoor.rotation.y = Math.PI / 2;
    scene.add(prisonCellDoor);
});

//key
let key;
generateGLTF("objectResources/key/scene.gltf", (key1) => {
    key = key1;
    key.scale.setScalar(0.005);
    key.position.set(72.6, 1.8, 69);
    scene.add(key);
});

// //autopsy table
// generateGLTF("objectResources/autopsyTable/scene.gltf", (autopsyTable) => {
//     autopsyTable.scale.setScalar(1.5);
//     autopsyTable.position.set(25, 0.5, 5);
//     scene.add(autopsyTable);
// });

// //old lamp & old lamp spotlight
// generateGLTF("objectResources/oldLamp/scene.gltf", (oldLamp) => {
//     oldLamp.scale.setScalar(0.04);
//     oldLamp.position.set(27.75, 3.35, 5);
//     oldLamp.rotation.y = -Math.PI / 2;
//     scene.add(oldLamp);

//     const oldLampSpotlight = new THREE.SpotLight(0xFFFFFF, 50, 0, Math.PI/3.5, 0.1);
//     oldLampSpotlight.position.set(2, 10, 13);
//     oldLampSpotlight.castShadow = true;
//     oldLamp.add(oldLampSpotlight);

//     // const oldLampSpotlightHelper = new THREE.SpotLightHelper(oldLampSpotlight);
//     // scene.add(oldLampSpotlightHelper);

//     const oldLampSpotlightTarget = new THREE.Object3D();
//     oldLampSpotlightTarget.position.set(25, 0.5, 5); // Tentukan posisi target
//     scene.add(oldLampSpotlightTarget);
//     oldLampSpotlight.target = oldLampSpotlightTarget;

//     const oldLampPointLight = new THREE.PointLight(0xFFFFFF, 0.1, 0, 2);
//     oldLampPointLight.position.set(2, 9, 19);
//     oldLampPointLight.castShadow = true;
//     oldLamp.add(oldLampPointLight);

//     // const oldLampPointLightHelper = new THREE.PointLightHelper(oldLampPointLight, 1);
//     // scene.add(oldLampPointLightHelper);

//     // Adjust shadow settings
//     oldLampSpotlight.shadow.mapSize.width = 1024;
//     oldLampSpotlight.shadow.mapSize.height = 1024;
//     oldLampSpotlight.shadow.camera.near = 0.5;
//     oldLampSpotlight.shadow.camera.far = 500;
// });

// //horrorProps & horrorPropsSpotlight
// generateGLTF("objectResources/horrorProps/scene.gltf", (horrorProps) => {
//     horrorProps.scale.setScalar(0.06);
//     horrorProps.position.set(13, 0.5, 9.5);
//     horrorProps.rotation.y = Math.PI / 2;
//     scene.add(horrorProps);

//     //spotlight
//     const horrorPropsSpotlight = new THREE.SpotLight(0xFFFFFF, 50, 10, Math.PI/8, 0.1);
//     horrorPropsSpotlight.position.set(8, 49, -1);
//     horrorPropsSpotlight.castShadow = true;
//     horrorProps.add(horrorPropsSpotlight);

//     //spotlight target
//     const horrorPropsSpotlightTarget = new THREE.Object3D();
//     horrorPropsSpotlightTarget.position.set(0, 1, 2); // Tentukan posisi target
//     scene.add(horrorPropsSpotlightTarget);
//     horrorPropsSpotlight.target = horrorPropsSpotlightTarget;

//     // //spotlight helper
//     // const horrorPropsSpotlightHelper = new THREE.SpotLightHelper(horrorPropsSpotlight);
//     // scene.add(horrorPropsSpotlightHelper);

//     //Adjust shadow settings 
//     horrorPropsSpotlight.shadow.mapSize.width = 1024;
//     horrorPropsSpotlight.shadow.mapSize.height = 1024;
//     horrorPropsSpotlight.shadow.camera.near = 0.5;
//     horrorPropsSpotlight.shadow.camera.far = 500;
// });

//table
generateGLTF("objectResources/table/scene.gltf", (table) => {
    table.scale.setScalar(1);
    table.position.set(10, 0.5, 9);
    // table.rotation.y = Math.PI / 2;
    scene.add(table);
});

// //hangingCorpse
// for(let i = 2; i < 9; i+=3){
//     for(let j = 33; j < 50; j+=4){
//         generateGLTF("objectResources/corpse/scene.gltf", (hangingCorpse) => {
//             hangingCorpse.scale.setScalar(2);
//             hangingCorpse.position.set(j, 3.5, i); // z = 2, 5, 8 x = 33-55
//             hangingCorpse.rotation.y = Math.PI / 2;
//             hangingCorpse.rotation.z = -Math.PI / 2;
//             hangingCorpse.rotation.x = -Math.PI / 2;
//             scene.add(hangingCorpse);
//         });
//     }
// }

// emerald table
generateGLTF("objectResources/table/scene.gltf", (table) => {
    table.scale.setScalar(1.5);
    table.position.set(74.5, 0.5, 42.5);
    table.rotation.y = Math.PI / 2;
    // table.rotation.y = Math.PI / 2;
    scene.add(table);
});

//emerald
let emerald;
generateGLTF("objectResources/emerald/scene.gltf", (emerald1) => {
    emerald = emerald1;
    emerald.scale.setScalar(1);
    emerald.position.set(74.5, 2, 42.5);
    // table.rotation.y = Math.PI / 2;
    scene.add(emerald);
});

// //treasure
// generateGLTF("objectResources/treasureChest/scene.gltf", (treasure) => {
//     treasure.scale.setScalar(2);
//     treasure.position.set(55, 1.2, 37.8);
//     treasure.rotation.y = Math.PI;
//     scene.add(treasure);
// });

//pickupMessage
const pickupMessage = document.createElement('div');
pickupMessage.style.position = 'absolute';
pickupMessage.style.top = '50%';
pickupMessage.style.left = '50%';
pickupMessage.style.transform = 'translate(-50%, -50%)';
pickupMessage.style.color = 'white';
pickupMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
pickupMessage.style.padding = '10px';
pickupMessage.style.borderRadius = '5px';
pickupMessage.style.display = 'none';
pickupMessage.textContent = 'Press E to pick up';
document.body.appendChild(pickupMessage);

//unlockCellMessage
const unlockCellMessage = document.createElement('div');
unlockCellMessage.style.position = 'absolute';
unlockCellMessage.style.top = '50%';
unlockCellMessage.style.left = '50%';
unlockCellMessage.style.transform = 'translate(-50%, -50%)';
unlockCellMessage.style.color = 'white';
unlockCellMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
unlockCellMessage.style.padding = '10px';
unlockCellMessage.style.borderRadius = '5px';
unlockCellMessage.style.display = 'none';
unlockCellMessage.textContent = 'Press E to unlock';
document.body.appendChild(unlockCellMessage);

//unlockEmeraldDoorMessage
const unlockEmeraldDoorMessage = document.createElement('div');
unlockEmeraldDoorMessage.style.position = 'absolute';
unlockEmeraldDoorMessage.style.top = '50%';
unlockEmeraldDoorMessage.style.transform = 'translate(-50%, -50%)';
unlockEmeraldDoorMessage.style.color = 'white';
unlockEmeraldDoorMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
unlockEmeraldDoorMessage.style.padding = '10px';
unlockEmeraldDoorMessage.style.borderRadius = '5px';
unlockEmeraldDoorMessage.style.display = 'none';
unlockEmeraldDoorMessage.textContent = 'Press E to unlock';
document.body.appendChild(unlockEmeraldDoorMessage);

// longLamp and pointLights

//flickering light
let flickeringLight;

flickeringLight = new THREE.SpotLight(0xFFFFFF, 10, 10, Math.PI / 2, 0.1);
flickeringLight.position.set(80, 5.5, 42.5);
flickeringLight.castShadow = true;
scene.add(flickeringLight);

// spotlight target
const longLampSpotLightTargett = new THREE.Object3D();
longLampSpotLightTargett.position.set(80, 0, 42.5); // Tentukan posisi target
scene.add(longLampSpotLightTargett);
flickeringLight.target = longLampSpotLightTargett;

// const longLampSpotLightHelperr = new THREE.SpotLightHelper(flickeringLight);
// scene.add(longLampSpotLightHelperr);

flickeringLight.shadow.mapSize.width = 1024;
flickeringLight.shadow.mapSize.height = 1024;
flickeringLight.shadow.camera.near = 0.5;
flickeringLight.shadow.camera.far = 500;


let clock = new THREE.Clock();
let flickerSpeed = 10; // Increased speed for more noticeable flicker
let flickerIntensity = 20; // Adjusted intensity for noticeable effect

function updateFlickeringLight(light, time) {
    const flicker = Math.sin(time * flickerSpeed) * (flickerIntensity / 2) + (flickerIntensity / 2);
    light.intensity = flicker;
}

let flickeringLight2;
generateGLTF("objectResources/longLamp/scene.gltf", (longLamp) => { // putih
    longLamp.scale.setScalar(1);
    longLamp.position.set(67, 5.5, 57.5);
    longLamp.rotation.y = Math.PI / 2;
    longLamp.rotation.z = -Math.PI / 2;
    longLamp.rotation.x = -Math.PI / 2;
    scene.add(longLamp);

    flickeringLight2 = new THREE.SpotLight(0xFFFFFF, 30, 10, Math.PI / 5, 0.1);
    flickeringLight2.position.set(0, 0.1, 0);
    flickeringLight2.castShadow = true;
    longLamp.add(flickeringLight2);

    //spotlight target
    const longLampSpotLightTarget = new THREE.Object3D();
    longLampSpotLightTarget.position.set(0, 5, 0); // Tentukan posisi target
    longLamp.add(longLampSpotLightTarget);
    flickeringLight2.target = longLampSpotLightTarget;

    // const longLampSpotLightHelper = new THREE.SpotLightHelper(flickeringLight2);
    // scene.add(longLampSpotLightHelper);

    flickeringLight2.shadow.mapSize.width = 1024;
    flickeringLight2.shadow.mapSize.height = 1024;
    flickeringLight2.shadow.camera.near = 0.5;
    flickeringLight2.shadow.camera.far = 500;
});

// const longLampSpotLight = new THREE.SpotLight(0x0a5c47, 50, 10, Math.PI / 2, 0.1);
//     longLampSpotLight.position.set(15, 5.5, 5);
//     longLampSpotLight.castShadow = true;
//     scene.add(longLampSpotLight);

//     //spotlight target
//     const longLampSpotLightTarget = new THREE.Object3D();
//     longLampSpotLightTarget.position.set(15, 0, 5); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget);
//     longLampSpotLight.target = longLampSpotLightTarget;

//     // const longLampSpotLightHelper = new THREE.SpotLightHelper(longLampSpotLight);
//     // scene.add(longLampSpotLightHelper);

//     longLampSpotLight.shadow.mapSize.width = 1024;
//     longLampSpotLight.shadow.mapSize.height = 1024;
//     longLampSpotLight.shadow.camera.near = 0.5;
//     longLampSpotLight.shadow.camera.far = 500;

//     const longLampSpotLight1 = new THREE.SpotLight(0xad0707, 50, 10, Math.PI / 2, 0.1);
//     longLampSpotLight1.position.set(41, 5.5, 5);
//     longLampSpotLight1.castShadow = true;
//     scene.add(longLampSpotLight1);

//     //spotlight target
//     const longLampSpotLightTarget1 = new THREE.Object3D();
//     longLampSpotLightTarget1.position.set(41, 0, 5); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget1);
//     longLampSpotLight1.target = longLampSpotLightTarget1;

//     // const longLampSpotLightHelper1 = new THREE.SpotLightHelper(longLampSpotLight1);
//     // scene.add(longLampSpotLightHelper1);

//     longLampSpotLight1.shadow.mapSize.width = 1024;
//     longLampSpotLight1.shadow.mapSize.height = 1024;
//     longLampSpotLight1.shadow.camera.near = 0.5;
//     longLampSpotLight1.shadow.camera.far = 500;

//     const longLampSpotLight2 = new THREE.SpotLight(0xad0707, 10, 10, Math.PI / 2, 0.1);
//     longLampSpotLight2.position.set(60, 5.5, 5.5);
//     longLampSpotLight2.castShadow = true;
//     scene.add(longLampSpotLight2);

//     //spotlight target
//     const longLampSpotLightTarget2 = new THREE.Object3D();
//     longLampSpotLightTarget2.position.set(60, 0, 5.5); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget2);
//     longLampSpotLight2.target = longLampSpotLightTarget2;

//     // const longLampSpotLightHelper2 = new THREE.SpotLightHelper(longLampSpotLight2);
//     // scene.add(longLampSpotLightHelper2);

//     longLampSpotLight2.shadow.mapSize.width = 1024;
//     longLampSpotLight2.shadow.mapSize.height = 1024;
//     longLampSpotLight2.shadow.camera.near = 0.5;
//     longLampSpotLight2.shadow.camera.far = 500;

//     const longLampSpotLight3 = new THREE.SpotLight(0xad0707, 10, 10, Math.PI / 2, 0.1);
//     longLampSpotLight3.position.set(80, 5.5, 5.5);
//     longLampSpotLight3.castShadow = true;
//     scene.add(longLampSpotLight3);

//     //spotlight target
//     const longLampSpotLightTarget3 = new THREE.Object3D();
//     longLampSpotLightTarget3.position.set(80, 0, 5.5); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget3);
//     longLampSpotLight3.target = longLampSpotLightTarget3;

//     // const longLampSpotLightHelper3 = new THREE.SpotLightHelper(longLampSpotLight3);
//     // scene.add(longLampSpotLightHelper3);

//     longLampSpotLight3.shadow.mapSize.width = 1024;
//     longLampSpotLight3.shadow.mapSize.height = 1024;
//     longLampSpotLight3.shadow.camera.near = 0.5;
//     longLampSpotLight3.shadow.camera.far = 500;

//     const longLampSpotLight4 = new THREE.SpotLight(0xFFFFFF, 50, 10, Math.PI / 3, 0.1);
//     longLampSpotLight4.position.set(55, 5.5, 37.8);
//     longLampSpotLight4.castShadow = true;
//     scene.add(longLampSpotLight4);

//     //spotlight target
//     const longLampSpotLightTarget4 = new THREE.Object3D();
//     longLampSpotLightTarget4.position.set(55, 0, 37.8); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget4);
//     longLampSpotLight4.target = longLampSpotLightTarget4;

//     // const longLampSpotLightHelper4 = new THREE.SpotLightHelper(longLampSpotLight4);
//     // scene.add(longLampSpotLightHelper4);

//     longLampSpotLight4.shadow.mapSize.width = 1024;
//     longLampSpotLight4.shadow.mapSize.height = 1024;
//     longLampSpotLight4.shadow.camera.near = 0.5;
//     longLampSpotLight4.shadow.camera.far = 500;

//     const longLampSpotLight5 = new THREE.SpotLight(0x0a5c47, 30, 10, Math.PI / 2, 0.1);
//     longLampSpotLight5.position.set(55, 5.5, 15.5);
//     longLampSpotLight5.castShadow = true;
//     scene.add(longLampSpotLight5);

//     //spotlight target
//     const longLampSpotLightTarget5 = new THREE.Object3D();
//     longLampSpotLightTarget5.position.set(55, 0, 15.5); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget5);
//     longLampSpotLight5.target = longLampSpotLightTarget5;

//     // const longLampSpotLightHelper5 = new THREE.SpotLightHelper(longLampSpotLight5);
//     // scene.add(longLampSpotLightHelper5);

//     longLampSpotLight5.shadow.mapSize.width = 1024;
//     longLampSpotLight5.shadow.mapSize.height = 1024;
//     longLampSpotLight5.shadow.camera.near = 0.5;
//     longLampSpotLight5.shadow.camera.far = 500;

//     const longLampSpotLight6 = new THREE.SpotLight(0x0a5c47, 30, 10, Math.PI / 2, 0.1);
//     longLampSpotLight6.position.set(35, 5.5, 15.5);
//     longLampSpotLight6.castShadow = true;
//     scene.add(longLampSpotLight6);

//     //spotlight target
//     const longLampSpotLightTarget6 = new THREE.Object3D();
//     longLampSpotLightTarget6.position.set(35, 0, 15.5); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget6);
//     longLampSpotLight6.target = longLampSpotLightTarget6;

//     // const longLampSpotLightHelper6 = new THREE.SpotLightHelper(longLampSpotLight6);
//     // scene.add(longLampSpotLightHelper6);

//     longLampSpotLight6.shadow.mapSize.width = 1024;
//     longLampSpotLight6.shadow.mapSize.height = 1024;
//     longLampSpotLight6.shadow.camera.near = 0.5;
//     longLampSpotLight6.shadow.camera.far = 500;

//     const longLampSpotLight7 = new THREE.SpotLight(0x0a5c47, 30, 10, Math.PI / 2, 0.1);
//     longLampSpotLight7.position.set(55, 5.5, 25);
//     longLampSpotLight7.castShadow = true;
//     scene.add(longLampSpotLight7);

//     //spotlight target
//     const longLampSpotLightTarget7 = new THREE.Object3D();
//     longLampSpotLightTarget7.position.set(55, 0, 25); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget7);
//     longLampSpotLight7.target = longLampSpotLightTarget7;

//     // const longLampSpotLightHelper = new THREE.SpotLightHelper(longLampSpotLight);
//     // scene.add(longLampSpotLightHelper);

//     longLampSpotLight7.shadow.mapSize.width = 1024;
//     longLampSpotLight7.shadow.mapSize.height = 1024;
//     longLampSpotLight7.shadow.camera.near = 0.5;
//     longLampSpotLight7.shadow.camera.far = 500;

//     const longLampSpotLight8 = new THREE.SpotLight(0x0a5c47, 30, 10, Math.PI / 2, 0.1);
//     longLampSpotLight8.position.set(55, 5.5, 50);
//     longLampSpotLight8.castShadow = true;
//     scene.add(longLampSpotLight8);

//     //spotlight target
//     const longLampSpotLightTarget8 = new THREE.Object3D();
//     longLampSpotLightTarget8.position.set(55, 0, 50); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget8);
//     longLampSpotLight8.target = longLampSpotLightTarget8;

//     // const longLampSpotLightHelper8 = new THREE.SpotLightHelper(longLampSpotLight8);
//     // scene.add(longLampSpotLightHelper8);

//     longLampSpotLight8.shadow.mapSize.width = 1024;
//     longLampSpotLight8.shadow.mapSize.height = 1024;
//     longLampSpotLight8.shadow.camera.near = 0.5;
//     longLampSpotLight8.shadow.camera.far = 500;

//     const longLampSpotLight9 = new THREE.SpotLight(0x0a5c47, 10, 10, Math.PI / 2, 0.1);
//     longLampSpotLight9.position.set(70, 5.5, 37);
//     longLampSpotLight9.castShadow = true;
//     scene.add(longLampSpotLight9);

//     //spotlight target
//     const longLampSpotLightTarget9 = new THREE.Object3D();
//     longLampSpotLightTarget9.position.set(70, 0, 37); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget9);
//     longLampSpotLight9.target = longLampSpotLightTarget9;

//     // const longLampSpotLightHelper = new THREE.SpotLightHelper(longLampSpotLight);
//     // scene.add(longLampSpotLightHelper);

//     longLampSpotLight9.shadow.mapSize.width = 1024;
//     longLampSpotLight9.shadow.mapSize.height = 1024;
//     longLampSpotLight9.shadow.camera.near = 0.5;
//     longLampSpotLight9.shadow.camera.far = 500;

//     const longLampSpotLight10 = new THREE.SpotLight(0x0a5c47, 10, 10, Math.PI / 2, 0.1);
//     longLampSpotLight10.position.set(40, 5.5, 37);
//     longLampSpotLight10.castShadow = true;
//     scene.add(longLampSpotLight10);

//     //spotlight target
//     const longLampSpotLightTarget10 = new THREE.Object3D();
//     longLampSpotLightTarget10.position.set(40, 0, 37); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget10);
//     longLampSpotLight10.target = longLampSpotLightTarget10;

//     // const longLampSpotLightHelper = new THREE.SpotLightHelper(longLampSpotLight);
//     // scene.add(longLampSpotLightHelper);

//     longLampSpotLight10.shadow.mapSize.width = 1024;
//     longLampSpotLight10.shadow.mapSize.height = 1024;
//     longLampSpotLight10.shadow.camera.near = 0.5;
//     longLampSpotLight10.shadow.camera.far = 500;

//     const longLampSpotLight11 = new THREE.SpotLight(0x0a5c47, 30, 10, Math.PI / 2, 0.1);
//     longLampSpotLight11.position.set(72.5, 5.5, 78);
//     longLampSpotLight11.castShadow = true;
//     scene.add(longLampSpotLight11);

//     //spotlight target
//     const longLampSpotLightTarget11 = new THREE.Object3D();
//     longLampSpotLightTarget11.position.set(72.5, 0, 78); // Tentukan posisi target
//     scene.add(longLampSpotLightTarget11);
//     longLampSpotLight11.target = longLampSpotLightTarget11;

//     // const longLampSpotLightHelper = new THREE.SpotLightHelper(longLampSpotLight);
//     // scene.add(longLampSpotLightHelper);

//     longLampSpotLight11.shadow.mapSize.width = 1024;
//     longLampSpotLight11.shadow.mapSize.height = 1024;
//     longLampSpotLight11.shadow.camera.near = 0.5;
//     longLampSpotLight11.shadow.camera.far = 500;

// mirror
let geometry = new THREE.PlaneGeometry(5, 5);
let verticalMirror = new Reflector(geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0xc1cbcb
});
verticalMirror.position.set(87.8, 3, 4.25);
verticalMirror.rotation.y = -Math.PI / 4;
scene.add(verticalMirror);

// flashlight
const flashlight = new THREE.SpotLight(0xffffff, 100, 50, Math.PI / 8, 0.1);
flashlight.castShadow = true;
flashlight.shadow.mapSize.width = 1024;
flashlight.shadow.mapSize.height = 1024;
flashlight.shadow.camera.near = 0.5;
flashlight.shadow.camera.far = 500;
flashlight.shadow.bias = -0.0001;
flashlight.visible = false;
player.camera.add(flashlight);
player.camera.add(flashlight.target);
flashlight.target.position.z = -7;
flashlight.target.position.y = 0;


//render
let lastFlickerTime = 0;
let prevTime = performance.now();
const raycaster = new THREE.Raycaster();
const pickupDistance = 5; // Adjust as needed
let emeraldPickedUp = false;
let keyPickedUp = false;

function animate() {
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

    document.addEventListener("keydown", (event) => {
        if (event.key === "f") {
            flashlight.visible = !flashlight.visible;
        }
      });

      

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
            pickupMessage.style.display = 'block';
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

createUI(world, player);
animate();