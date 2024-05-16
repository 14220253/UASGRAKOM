import * as THREE from "three"
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-5, 0, 0);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,0);
controls.update();

var sunGeo = new THREE.SphereGeometry(1, 10, 10);
var sunMaterial = new THREE.MeshPhongMaterial({color: 0xffff33});
var sun = new THREE.Mesh(sunGeo, sunMaterial);
scene.add(sun);
sun.position.set(5, 0, 0)
sun.scale.set(0.5, 0.5,0.5);
sun.castShadow = true;
sun.receiveShadow = true;

var earthGeo = new THREE.SphereGeometry(1, 10, 10);
var earthMaterial = new THREE.MeshPhongMaterial({color: 0x33ff33});
var earth = new THREE.Mesh(earthGeo, earthMaterial);
sun.add(earth);
earth.position.set(5, 0, 0);
earth.scale.set(0.8, 0.8,0.8);
// earth.rotation.x += 0.3;
earth.castShadow = true;
earth.receiveShadow = true;

var moonGeo = new THREE.SphereGeometry(1, 10, 10);
var moonMaterial = new THREE.MeshPhongMaterial({color: 0x555555});
var moon = new THREE.Mesh(moonGeo, moonMaterial);
earth.add(moon);
moon.position.set(5, 0, 0)
moon.scale.set(0.6, 0.6, 0.6);

moon.castShadow = true;
moon.receiveShadow = true;

var planeGeo = new THREE.PlaneGeometry(40, 40);
var planeMat = new THREE.MeshPhongMaterial({coolor: 0x777777, side:THREE.DoubleSide});
var plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(plane);
plane.rotation.set(Math.PI/2, 0, 0);
plane.position.set(0, -3, 0);

plane.castShadow = true;
plane.receiveShadow = true;

// var ambientLight = new THREE.AmbientLight(0xFF6666);
// scene.add(ambientLight);

// var hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.5);
// scene.add(hemisphereLight);

var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
directionalLight.position.set(5, 4, 5);
directionalLight.target.position.set(5, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);
directionalLight.castShadow = true;
var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

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

var clock = new THREE.Clock();
function animate() {
    renderer.render(scene, camera);
    sun.rotation.y += 0.01;
    earth.rotation.y += 0.05;

	// const delta = clock.getDelta();
	// if ( mixer ) mixer.update( delta );

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);