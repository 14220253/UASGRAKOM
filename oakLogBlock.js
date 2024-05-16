import * as THREE from 'three';

export class OakLogBlock {
    constructor(blockSize) {
        this.geometry = this.createGeometry(blockSize, blockSize, blockSize);
        this.material = this.createMaterial(
        '/THREEProject/resources/oakLogBlock/oakLogSide.webp',
        '/THREEProject/resources/oakLogBlock/oakLogTopBottom.webp');
        this.object = this.createObject(this.geometry, this.material);
        this.object.castShadow = true;
        this.object.receiveShadow = true;
        return this.object;
    }

    createGeometry(xSize, ySize, zSize) {
        const geometry = new THREE.BoxGeometry(xSize, ySize, zSize);
        return geometry;
    }

    createMaterial(pathSide, pathTopBottom) {
        const materialArray = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kanan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kiri
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathTopBottom) }), // atas
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathTopBottom) }), // bawah
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // depan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }) // belakang
        ];
        return materialArray;
    }

    createObject(geometry, material) {
        const objectResult = new THREE.Mesh(geometry, material);
        return objectResult;
    }
}
