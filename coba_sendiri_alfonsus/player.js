import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

export class Player {
    radius = 0.5;
    height = 1.75;
    jumpSpeed = 9;
    maxSpeed = 10;
    multiplier = 1;
    onGround = false;
    headTilted = false;
    input = new THREE.Vector3();
    velocity = new THREE.Vector3();
    #worldVelocity = new THREE.Vector3();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
    controls = new PointerLockControls(this.camera, document.body);
    cameraHelper = new THREE.CameraHelper(this.camera);
   

    constructor(scene) {
        this.cameraHelper.visible = false;
        this.camera.position.set(32, 64, 32);
        scene.add(this.camera);
        scene.add(this.cameraHelper);

        document.addEventListener('keydown', this.onkeyDown.bind(this));
        document.addEventListener('keyup', this.onkeyUp.bind(this));

        this.boundsHelper = new THREE.Mesh(
            new THREE.CylinderGeometry(this.radius, this.radius, this.height, 16),
            new THREE.MeshBasicMaterial({wireframe: true})
        );
        this.boundsHelper.visible = false;
        scene.add(this.boundsHelper);
    }

    /**
     * Checks if the player is close to a given object
     * @param {THREE.Object3D} object 
     * @param {number} threshold 
     * @returns {boolean}
     */
    isCloseTo(object, threshold = 20) {
        const distance = this.position.distanceTo(object.position);
        return distance < threshold;
    }

    distance(object) {
        const distance = this.position.distanceTo(object.position);
        return distance;
    }

    /**
     * Returns the velocity of the player in world coordinates
     * @returns {THREE.Vector3}
     */
    get worldVelocity() {
        this.#worldVelocity.copy(this.velocity);
        this.#worldVelocity.applyEuler(new THREE.Euler(0, this.camera.rotation.y, 0));
        return this.#worldVelocity;
    }

    /**
     * Applies a change in velocity dv that is specified in the world frame
     * @param {THREE.Vector3} dv 
     */
    applyWorldDeltaVelocity(dv) {
        dv.applyEuler(new THREE.Euler(0, -this.camera.rotation.y, 0));
        this.velocity.add(dv);
    }

    applyInputs(dt) {
        if (this.controls.isLocked) {
            this.velocity.x = this.input.x;
            this.velocity.z = this.input.z;
            this.controls.moveRight(this.velocity.x * dt);
            this.controls.moveForward(this.velocity.z * dt);
            this.position.y += this.velocity.y * dt;
            document.getElementById('player-position').innerHTML = this.toString();
        }
    }

    /**
     * Update the position of the player's bounding cylinder helper
     */
    updateBoundsHelper() {
        this.boundsHelper.position.copy(this.position);
        this.boundsHelper.position.y -= this.height / 2;
    }

    /**
     * Returns the current world position of the player
     * @type {THREE.Vector3}
     */
    get position() {
        return this.camera.position;
    }

    /**
     * Event handler for keydown event
     * @param {KeyboardEvent} event 
     */
    onkeyDown(event) {
        if (!this.controls.isLocked) {
            this.controls.lock();
        }

        switch(event.code) {
            case 'KeyW':
                this.input.z = this.maxSpeed * this.multiplier;
                break;
            case 'KeyA':
                this.input.x = -this.maxSpeed * this.multiplier;
                break;
            case 'KeyS':
                this.input.z = -this.maxSpeed * this.multiplier;
                break;
            case 'KeyD':
                this.input.x = this.maxSpeed * this.multiplier;
                break; 
            case 'KeyQ':
                if (!this.headTilted) {
                    this.camera.rotateZ(0.7);
                    this.headTilted = true;
                }
                break; 
            case 'KeyT':
                if (!this.headTilted) {
                    this.camera.rotateZ(-0.7);
                    this.headTilted = true;
                }
                break; 
            case 'KeyZ':
                this.camera.zoom = 10;
                break; 
            case 'ShiftLeft':
                this.multiplier = 0.5;
                break; 
            case 'AltLeft':
                this.multiplier = 2;
                break; 
            case 'KeyR':
                this.position.set(64,100,64);
                this.velocity.set(0,0,0);
                break; 
            case 'Space':
                if (this.onGround) {
                    this.velocity.y += this.jumpSpeed;
                }   
                break;       
        }
    }
    
    /**
     * Event handler for keyup event
     * @param {KeyboardEvent} event 
     */
    onkeyUp(event) {
        switch(event.code) {
            case 'KeyW':
                this.input.z = 0;
                break;
            case 'KeyA':
                this.input.x = 0;
                break;
            case 'KeyS':
                this.input.z = 0;
                break;
            case 'KeyD':
                this.input.x = 0;
                break;     
            case 'KeyQ':
                this.camera.rotateZ(-0.7);
                this.headTilted = false;
                break; 
            case 'KeyT':
                this.camera.rotateZ(0.7);
                this.headTilted = false;
                break; 
            case 'KeyZ':
                this.camera.zoom = 1;
                break; 
            case 'ShiftLeft':
                this.multiplier = 1;
                break;        
            case 'AltLeft':
                this.multiplier = 1;
                this.camera.fov += 50;
                break; 
        }
    }


    toString() {
        let str = '';
        str += `X: ${this.position.x.toFixed(3)} `;
        str += `Y: ${this.position.y.toFixed(3)} `;
        str += `Z: ${this.position.z.toFixed(3)} `;
        return str;
    }
}