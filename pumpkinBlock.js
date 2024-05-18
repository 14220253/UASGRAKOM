import * as THREE from 'three';

export class PumpkinBlock {
    constructor(blockSize) {
        this.geometry = this.createGeometry(blockSize, blockSize, blockSize);
        this.material = this.createMaterial(
        '../resources/pumpkinBlock/pumpkinSide.webp',
        '../resources/pumpkinBlock/pumpkinTop.webp');
        this.object = this.createObject(this.geometry, this.material);
        this.object.castShadow = true;
        this.object.receiveShadow = true;
        return this.object;
    }

    createGeometry(xSize, ySize, zSize) {
        const pumpkinBlockGeometry = new THREE.BoxGeometry(xSize, ySize, zSize);
        return pumpkinBlockGeometry;
    }

    createMaterial(pathSide, pathTop) {
        const pumpkinBlockMaterialArray = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kanan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kiri
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathTop) }), // atas
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // bawah
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // depan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }) // belakang
        ];
        return pumpkinBlockMaterialArray;
    }

    createObject(geometry, material) {
        const pumpkinBlock = new THREE.Mesh(geometry, material);
        return pumpkinBlock;
    }
}
