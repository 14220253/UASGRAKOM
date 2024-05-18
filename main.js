import * as THREE from "three"
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GrassBlock } from './grassBlock.js';
import { PumpkinBlock } from './pumpkinBlock.js';
import { JackOLanternBlock } from './jackOLanternBlock.js';
import { OakLeavesBlock } from './oakLeavesBlock.js';
import { OakLogBlock } from './oakLogBlock.js';
import { OakTree } from './oakTree.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-5, 1, 0);
camera.lookAt(0, 0, 0);
const controls = new PointerLockControls(camera, renderer.domElement);


const objects = [];
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let sprint = false;
var headBobTimer = 0;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();
const blocker = document.getElementById( 'blocker' );
const instructions = document.getElementById( 'instructions' );

var deltaFOV = 0.2;


instructions.addEventListener( 'click', function () {

    controls.lock();

} );

controls.addEventListener( 'lock', function () {

    instructions.style.display = 'none';
    blocker.style.display = 'none';

} );

controls.addEventListener( 'unlock', function () {

    blocker.style.display = 'block';
    instructions.style.display = '';

} );

scene.add( controls.getObject() );

const onKeyDown = function ( event ) {

    switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;

        case 'Space':
            if ( canJump === true ) velocity.y += 30; //jump distance
            canJump = false;
            break;

        case 'ShiftLeft':
            sprint = true;  
            break;
    }

};

const onKeyUp = function ( event ) {

    switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;

        case 'ShiftLeft':
            sprint = false;
            break;
    }

};

const onWindowResize = function() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );
window.addEventListener( 'resize', onWindowResize );

raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );


// var planeGeo = new THREE.PlaneGeometry(400, 400);
// var planeMat = new THREE.MeshPhongMaterial({color: 0x777777, side:THREE.DoubleSide});
// var plane = new THREE.Mesh(planeGeo, planeMat);
// scene.add(plane);
// plane.rotation.set(Math.PI/2, 0, 0);
// plane.position.set(0, 0, 0);

// plane.castShadow = true;
// plane.receiveShadow = true;

// var sunGeo = new THREE.SphereGeometry(1, 10, 10);
// var sunMaterial = new THREE.MeshPhongMaterial({color: 0xffff33});
// var sun = new THREE.Mesh(sunGeo, sunMaterial);
// scene.add(sun);
// sun.position.set(5, 5, 0)
// sun.scale.set(0.5, 0.5,0.5);
// sun.castShadow = true;
// sun.receiveShadow = true;

// var earthGeo = new THREE.SphereGeometry(1, 10, 10);
// var earthMaterial = new THREE.MeshPhongMaterial({color: 0x33ff33});
// var earth = new THREE.Mesh(earthGeo, earthMaterial);
// sun.add(earth);
// earth.position.set(5, 0, 0);
// earth.scale.set(0.8, 0.8,0.8);
// // earth.rotation.x += 0.3;
// earth.castShadow = true;
// earth.receiveShadow = true;

// var moonGeo = new THREE.SphereGeometry(1, 10, 10);
// var moonMaterial = new THREE.MeshPhongMaterial({color: 0x555555});
// var moon = new THREE.Mesh(moonGeo, moonMaterial);
// earth.add(moon);
// moon.position.set(5, 0, 0)
// moon.scale.set(0.6, 0.6, 0.6);

// moon.castShadow = true;
// moon.receiveShadow = true;

// var ambientLight = new THREE.AmbientLight(0xFF6666);
// scene.add(ambientLight);

// var hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.5);
// scene.add(hemisphereLight);

// var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
// directionalLight.position.set(5, 4, 5);
// directionalLight.target.position.set(5, 0, 0);
// scene.add(directionalLight);
// scene.add(directionalLight.target);
// directionalLight.castShadow = true;
// var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);

// var pointLight = new THREE.PointLight(0xFFFFF1, 150);
// sun.add(pointLight);

// var spotLight = new THREE.SpotLight(0xFF1111, 200, 1000, 15, 0);
// moon.add(spotLight);

// new MTLLoader()
// 	.setPath( 'resources/Satellite/' )
// 	.load( 'Satelite.mtl', function ( materials ) {

// 		materials.preload();

// 		new OBJLoader()
// 			.setMaterials( materials )
// 			.setPath( 'resources/Satellite/' )
// 			.load( 'Satelite.obj', function ( object ) {

// 				earth.add( object );
				
// 				object.castShadow = true;
// 				object.receiveShadow = true;
// 				object.scale.set(0.1, 0.1, 0.1);
// 				object.position.set(-3, 0, 0);

				
// 				object.traverse( function ( child ) {
// 					if ( child.isMesh ) {
// 						child.castShadow = true;
// 						child.receiveShadow = true;
// 					}
// 				} );

// 		} );
// 	} );

// var mixer
// const loader = new FBXLoader();
// loader.load( 'resources/animation/Falling.fbx', function ( object ) {
// 	mixer = new THREE.AnimationMixer( object );
// 	const action = mixer.clipAction( object.animations[ 0 ] );
// 	action.play();
// 	object.traverse( function ( child ) {
// 		if ( child.isMesh ) {
// 			child.castShadow = true;
// 			child.receiveShadow = true;
// 		}
// 	} );
// 	object.castShadow = true;
// 	object.receiveShadow = true;
// 	object.position.set(-3, 0, -3)
// 	object.scale.set(0.05, 0.05, 0.05);
// 	earth.add( object );
// } );


var arm = new THREE.BoxGeometry(1, 1, 5);
var armMaterial = new THREE.MeshPhongMaterial({color: 0xDFA98F});
armMaterial.depthTest = true;
var arm = new THREE.Mesh(arm, armMaterial);
camera.add(arm);
arm.position.set(1.5, -1, -1)
arm.rotateX(0.7);
arm.rotateY(-0.1);
arm.scale.set(0.4, 0.4, 0.4);

// dirt block
const dirtBlockObject = new GrassBlock(1);
dirtBlockObject.position.x = 0;
scene.add(dirtBlockObject);

// pumpkin block
const pumpkinBlockObject = new PumpkinBlock(1);
pumpkinBlockObject.position.x = 2;
scene.add(pumpkinBlockObject);

// jackOLantern block
const jackOLanternBlockObject = new JackOLanternBlock(1);  
jackOLanternBlockObject.position.x = 4;
scene.add(jackOLanternBlockObject);

// oakLeaves block
const oakLeavesBlockObject = new OakLeavesBlock(1);
oakLeavesBlockObject.position.x = 6;
scene.add(oakLeavesBlockObject);

// oakLog block
const oakLogBlockObject = new OakLogBlock(1);
oakLogBlockObject.position.x = 8;
scene.add(oakLogBlockObject);

// oakTree
const oakTreeObject = new OakTree(1, 2);
oakTreeObject.position.x = 10;
// scene.add(oakTreeObject); 


// floor
const floorGeometry = new THREE.BoxGeometry(40, 1, 20);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x291010});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1;
floor.receiveShadow = true;
scene.add(floor);


// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-15, 20, -15);
directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
scene.add(directionalLight.target);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


// var clock = new THREE.Clock();
function animate() {
    renderer.render(scene, camera);
    // sun.rotation.y += 0.01;
    // earth.rotation.y += 0.05;

	// const delta = clock.getDelta();

	// if ( mixer ) mixer.update( delta );



    const time = performance.now();

    //movement
    if ( controls.isLocked === true ) {

        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;

        const intersections = raycaster.intersectObjects( objects, false );

        const onObject = intersections.length > 0;

        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        //jump fall speed
        velocity.y -= 9.8 * 10.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        //left right
        if (!sprint) {
            if ( moveForward || moveBackward ) velocity.z -= direction.z * 100.0 * delta;
            if ( moveLeft || moveRight ) velocity.x -= direction.x * 100.0 * delta;
            
            if (camera.fov > 75)
                camera.fov -= deltaFOV;
                camera.updateProjectionMatrix();   
        } 
        else {
            if ( moveForward || moveBackward ) velocity.z -= direction.z * 250.0 * delta;
            if ( moveLeft || moveRight ) velocity.x -= direction.x * 250.0 * delta;

            if (camera.fov < 85)
            camera.fov += deltaFOV;
            camera.updateProjectionMatrix();   
        }

        //collision dengan floor
        if ( onObject === true ) {

            velocity.y = Math.max( 0, velocity.y );
            canJump = true;

        }

        controls.moveRight( - velocity.x * delta / 2);
        controls.moveForward( - velocity.z * delta / 2);
        //headbob
        // if (moveForward || moveBackward || moveLeft || moveRight) {
        //     headBobTimer += delta;
        //     camera.position.y += Math.max(0, Math.sin(headBobTimer) / 10);
        // }
        // else {
        //     headBobTimer = 0;
        //     camera.position.y = 1.1;
        // }

        controls.getObject().position.y += ( velocity.y * delta ); // new behavior

        //minimal y distance from ground
        if ( controls.getObject().position.y < 1.1 ) {

            velocity.y = 0;
            controls.getObject().position.y = 1.1;

            canJump = true;
        }

    }

    prevTime = time;

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);