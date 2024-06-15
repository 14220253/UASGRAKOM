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
    
    //fog
    // scene.fog = new THREE.Fog(0x000000, 0.5, 10);


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

//skeleton & skeletonSpotLight
generateOBJ("objectResources/skeleton/SubTool-0-3517926.OBJ", (skeleton) => {
    skeleton.scale.setScalar( 0.5 );
    skeleton.position.set(86, 2.2, 51);
    skeleton.rotation.y = 59.7;
    scene.add( skeleton );
    // Create the spotlight
    const skeletonSpotLight = new THREE.SpotLight(0xFF0000, 50, 0, Math.PI / 6, 0.1);
    skeletonSpotLight.position.set(0, 5, 0);
    skeletonSpotLight.decay = 2; // Set the light decay
    skeletonSpotLight.castShadow = true;
    const spotLightTarget = new THREE.Object3D();
    spotLightTarget.position.set(86, 0, 51); // Position the target directly below the light
    scene.add(spotLightTarget);
    skeletonSpotLight.target = spotLightTarget;
    // Adjust shadow settings
    skeletonSpotLight.shadow.mapSize.width = 1024;
    skeletonSpotLight.shadow.mapSize.height = 1024;
    skeletonSpotLight.shadow.camera.near = 0.5;
    skeletonSpotLight.shadow.camera.far = 500;
    // Add the spotlight and its helper to the scene
    skeleton.add(skeletonSpotLight);

    // const skeletonSpotLightHelper = new THREE.SpotLightHelper(skeletonSpotLight);
    // scene.add(skeletonSpotLightHelper);
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

//floating shelves

//prison cell door
generateGLTF("objectResources/prisonCellDoor/scene.gltf", (prisonCellDoor) => {
    prisonCellDoor.scale.setScalar(1.6);
    prisonCellDoor.position.set(45, 0.5, 38);
    prisonCellDoor.rotation.y = Math.PI / 2;
    scene.add(prisonCellDoor);
});

//autopsy table
generateGLTF("objectResources/autopsyTable/scene.gltf", (autopsyTable) => {
    autopsyTable.scale.setScalar(1.5);
    autopsyTable.position.set(25, 0.5, 5);
    scene.add(autopsyTable);
});

//old lamp & old lamp spotlight
generateGLTF("objectResources/oldLamp/scene.gltf", (oldLamp) => {
    oldLamp.scale.setScalar(0.04);
    oldLamp.position.set(27.75, 3.35, 5);
    oldLamp.rotation.y = -Math.PI / 2;
    scene.add(oldLamp);

    const oldLampSpotlight = new THREE.SpotLight(0xFFFFFF, 50, 0, Math.PI/3.5, 0.1);
    oldLampSpotlight.position.set(2, 10, 13);
    oldLampSpotlight.castShadow = true;
    oldLamp.add(oldLampSpotlight);

    // const oldLampSpotlightHelper = new THREE.SpotLightHelper(oldLampSpotlight);
    // scene.add(oldLampSpotlightHelper);

    const spotlightTarget = new THREE.Object3D();
    spotlightTarget.position.set(25, 0.5, 5); // Tentukan posisi target
    scene.add(spotlightTarget);
    oldLampSpotlight.target = spotlightTarget;

    const oldLampPointLight = new THREE.PointLight(0xFFFFFF, 0.1, 0, 2);
    oldLampPointLight.position.set(2, 9, 19);
    oldLampPointLight.castShadow = true;
    oldLamp.add(oldLampPointLight);

    // const oldLampPointLightHelper = new THREE.PointLightHelper(oldLampPointLight, 1);
    // scene.add(oldLampPointLightHelper);

    // Adjust shadow settings
    oldLampSpotlight.shadow.mapSize.width = 1024;
    oldLampSpotlight.shadow.mapSize.height = 1024;
    oldLampSpotlight.shadow.camera.near = 0.5;
    oldLampSpotlight.shadow.camera.far = 500;
});

//horrorProps & horrorPropsSpotlight
generateGLTF("objectResources/horrorProps/scene.gltf", (horrorProps) => {
    horrorProps.scale.setScalar(0.06);
    horrorProps.position.set(13, 0.5, 9.5);
    horrorProps.rotation.y = Math.PI / 2;
    scene.add(horrorProps);

    //spotlight
    const horrorPropsSpotlight = new THREE.SpotLight(0xFFFFFF, 50, 10, Math.PI/8, 0.1);
    horrorPropsSpotlight.position.set(8, 49, -1);
    horrorPropsSpotlight.castShadow = true;
    horrorProps.add(horrorPropsSpotlight);

    //spotlight target
    const horrorPropsSpotlightTarget = new THREE.Object3D();
    horrorPropsSpotlightTarget.position.set(0, 1, 2); // Tentukan posisi target
    scene.add(horrorPropsSpotlightTarget);
    horrorPropsSpotlight.target = horrorPropsSpotlightTarget;

    //spotlight helper
    const horrorPropsSpotlightHelper = new THREE.SpotLightHelper(horrorPropsSpotlight);
    scene.add(horrorPropsSpotlightHelper);

    // //pointlight
    // const horrorPropsPointLight = new THREE.PointLight(0xFFFFFF, 10, 0, 2);
    // horrorPropsPointLight.position.set(8, 49, -2);
    // horrorPropsPointLight.castShadow = true;
    // oldLamp.add(horrorPropsPointLight);

    // //pointlight helper
    // const horrorPropsPointlightHelper = new THREE.PointLightHelper(horrorPropsPointLight);
    // scene.add(horrorPropsPointlightHelper);

    //Adjust shadow settings
    horrorPropsSpotlight.shadow.mapSize.width = 1024;
    horrorPropsSpotlight.shadow.mapSize.height = 1024;
    horrorPropsSpotlight.shadow.camera.near = 0.5;
    horrorPropsSpotlight.shadow.camera.far = 500;
});

//table
generateGLTF("objectResources/table/scene.gltf", (table) => {
    table.scale.setScalar(1);
    table.position.set(10, 0.5, 9);
    // table.rotation.y = Math.PI / 2;
    scene.add(horrorProps);
});

// longLamp and pointLights
generateGLTF("objectResources/longLamp/scene.gltf", (longLamp) => {
    longLamp.scale.setScalar(1);
    longLamp.position.set(15, 5.5, 5);
    longLamp.rotation.y = Math.PI / 2;
    longLamp.rotation.z = -Math.PI / 2;
    longLamp.rotation.x = -Math.PI / 2;
    scene.add(longLamp);

    const longLampSpotLight = new THREE.SpotLight(0x0a5c47, 50, 10, Math.PI/2, 0.1);
    longLampSpotLight.position.set(0, 0.1, 0);
    longLampSpotLight.castShadow = true;
    longLamp.add(longLampSpotLight);

    //spotlight target
    const longLampSpotLightTarget = new THREE.Object3D();
    longLampSpotLightTarget.position.set(0, 5, 0); // Tentukan posisi target
    longLamp.add(longLampSpotLightTarget);
    longLampSpotLight.target = longLampSpotLightTarget;

    const longLampSpotLightHelper = new THREE.SpotLightHelper(longLampSpotLight);
    scene.add(longLampSpotLightHelper);

    longLampSpotLight.shadow.mapSize.width = 1024;
    longLampSpotLight.shadow.mapSize.height = 1024;
    longLampSpotLight.shadow.camera.near = 0.5;
    longLampSpotLight.shadow.camera.far = 500;
});

generateGLTF("objectResources/longLamp/scene.gltf", (longLamp) => {
    longLamp.scale.setScalar(1);
    longLamp.position.set(41, 5.5, 5);
    longLamp.rotation.y = Math.PI / 2;
    longLamp.rotation.z = -Math.PI / 2;
    longLamp.rotation.x = -Math.PI / 2;
    scene.add(longLamp);

    const longLampSpotLight = new THREE.SpotLight(0xad0707, 50, 10, Math.PI/2, 0.1); 
    longLampSpotLight.position.set(0, 0.1, 0);
    longLampSpotLight.castShadow = true;
    longLamp.add(longLampSpotLight);

    //spotlight target
    const longLampSpotLightTarget = new THREE.Object3D();
    longLampSpotLightTarget.position.set(0, 5, 0); // Tentukan posisi target
    longLamp.add(longLampSpotLightTarget);
    longLampSpotLight.target = longLampSpotLightTarget;

    const longLampSpotLightHelper = new THREE.SpotLightHelper(longLampSpotLight);
    scene.add(longLampSpotLightHelper);

    longLampSpotLight.shadow.mapSize.width = 1024;
    longLampSpotLight.shadow.mapSize.height = 1024;
    longLampSpotLight.shadow.camera.near = 0.5;
    longLampSpotLight.shadow.camera.far = 500;
});

//hangingCorpse
for(let i = 2; i < 9; i+=3){
    for(let j = 33; j < 50; j+=4){
        generateGLTF("objectResources/corpse/scene.gltf", (hangingCorpse) => {
            hangingCorpse.scale.setScalar(2);
            hangingCorpse.position.set(j, 3.5, i); // z = 2, 5, 8 x = 33-55
            hangingCorpse.rotation.y = Math.PI / 2;
            hangingCorpse.rotation.z = -Math.PI / 2;
            hangingCorpse.rotation.x = -Math.PI / 2;
            scene.add(hangingCorpse);
        });
    }
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