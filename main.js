import * as THREE from "three"
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { Block } from './block.js';

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

// floor
const floorGeometry = new THREE.BoxGeometry(40, 1, 20);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x291010});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.receiveShadow = true;
scene.add(floor);

// ukuran block awal 0.3

const block1 = new Block(5, 0.3, 2.5, '../resources/mossyStoneBrickBlock/mossyStoneBrickBlock.webp');
block1.rotation.x = Math.PI/2;
block1.position.x = -3.3;
block1.position.y = 1;
block1.position.z = -1;
floor.add(block1);

const block2 = new Block(5, 0.3, 2.5, '../resources/mossyStoneBrickBlock/mossyStoneBrickBlock.webp');
block2.rotation.x = Math.PI/2;
block2.position.x = -3.3;
block2.position.y = 1;
block2.position.z = 1.35;
floor.add(block2);

const block3 = new Block(2.5, 0.3, 2.5, '../resources/mossyStoneBrickBlock/mossyStoneBrickBlock.webp');
block3.rotation.x = Math.PI/2;
block3.rotation.z = Math.PI/2;
block3.position.x = -5.65;
block3.position.y = 1;
block3.position.z = 0.2;
floor.add(block3);

const block4 = new Block(5, 5, 0.3, '../resources/mossyStoneBrickBlock/mossyStoneBrickBlock.webp'); // atap
block4.rotation.x = Math.PI/2;
block4.position.x = -3.3;
block4.position.y = 2.4;
block4.position.z = -1;
floor.add(block4);

const block4_2 = new Block(5, 5, 0.3, '../resources/mossyStoneBrickBlock/mossyStoneBrickBlock.webp'); // atap
block4_2.rotation.x = Math.PI/2;
block4_2.position.x = -3.3;
block4_2.position.y = 2.4;
block4_2.position.z = -6;
floor.add(block4_2);

const block4_3 = new Block(5, 5, 0.3, '../resources/mossyStoneBrickBlock/mossyStoneBrickBlock.webp'); // atap
block4_3.rotation.x = Math.PI/2;
block4_3.position.x = 1.7;
block4_3.position.y = 2.4;
block4_3.position.z = -1;
floor.add(block4_3);

const block4_4 = new Block(5, 5, 0.3, '../resources/mossyStoneBrickBlock/mossyStoneBrickBlock.webp'); // atap
block4_4.rotation.x = Math.PI/2;
block4_4.position.x = 1.7;
block4_4.position.y = 2.4;
block4_4.position.z = -6;
floor.add(block4_4);

const onRedstoneLampBlock = new Block(0.3, 0.3, 0.3, '../resources/onRedstoneLampBlock/onRedstoneLampBlock.webp');
onRedstoneLampBlock.position.y = 1.65;
onRedstoneLampBlock.position.z = 0.3;
onRedstoneLampBlock.position.x = 0;
const onRedstoneLampBlockPointLight = new THREE.PointLight(0xffffff, 1, 3, 2);
onRedstoneLampBlockPointLight.position.z = 0;
function onRedstoneLampBlockPointLightFlickerLight() {
    onRedstoneLampBlockPointLight.intensity = 1 + Math.random() * 5;  // Random intensity between 1 and 1.5
}
onRedstoneLampBlock.add(onRedstoneLampBlockPointLight);
const onRedstoneLampBlockPointLightHelper = new THREE.PointLightHelper(onRedstoneLampBlockPointLight, 1);
scene.add(onRedstoneLampBlockPointLightHelper);
block4_4.add(onRedstoneLampBlock);

const block5 = new Block(5, 0.3, 2.5, '../resources/mossyStoneBrickBlock/mossyStoneBrickBlock.webp');
block5.rotation.x = Math.PI/2;
block5.rotation.z = Math.PI/2;
block5.position.x = -0.94;
block5.position.y = 1;
block5.position.z = -2.3;
floor.add(block5);

// --------------------------------------------//------------------------------------------------------

const block6 = new Block(4, 0.3, 2.5, '../resources/mossyStoneBrickBlock/mossyStoneBrickBlock.webp');
block6.rotation.x = Math.PI/2;
block6.rotation.z = Math.PI/2;
block6.position.x = 0.3;
block6.position.y = 1;
block6.position.z = -1.8;
floor.add(block6);

const block7 = new Block(4, 0.3, 2.5, '../resources/mossyStoneBrickBlock/mossyStoneBrickBlock.webp');
block7.rotation.x = Math.PI/2;
block7.position.x = 1;
block7.position.y = 1;
block7.position.z = -4.95;
floor.add(block7);




// torch 

new MTLLoader()
					.setPath( 'resources/torch/' )
					.load( 'Torch.mtl', function ( materials ) {

						materials.preload();

						new OBJLoader()
							.setMaterials( materials )
							.setPath( 'resources/torch/' )
							.load( 'Torch.obj', function ( object ) {
                                object.position.x = -2.16;
                                object.position.y = 0.4;
                                object.position.z = -0.4;
                                object.scale.set(0.1, 0.1, 0.1);
                                object.rotation.x = -Math.PI/2;
                                object.rotation.z = 150;
                                object.receiveShadow = true;
                                object.castShadow = true;
                                const torchPointLight = new THREE.PointLight(0xfca519, 1, 0, 2);
                                object.add(torchPointLight);
                                torchPointLight.position.y = 2;
                                torchPointLight.position.x = 0.7;
                                // const torchPointLightHelper = new THREE.PointLightHelper(torchPointLight, 1, 0xffffff);
                                // scene.add(torchPointLightHelper);
								block1.add( object );
							});
					} );

// directional light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
// directionalLight.position.set(-15, 20, -15);
// directionalLight.target.position.set(0, 0, 0);
// directionalLight.castShadow = true;
// scene.add(directionalLight);
// scene.add(directionalLight.target);
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);

// ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);


// var clock = new THREE.Clock();
function animate() {
    onRedstoneLampBlockPointLightFlickerLight();
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
        if (moveForward || moveBackward || moveLeft || moveRight) {
            headBobTimer += delta;
            camera.position.y += Math.sin(headBobTimer) / 10;
        }
        else {
            headBobTimer = 0;
            camera.position.y = 1.1;
        }

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