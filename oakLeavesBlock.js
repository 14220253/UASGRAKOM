import * as THREE from 'three';

export class OakLeavesBlock {
    constructor(blockSize) {
        this.geometry = this.createGeometry(blockSize, blockSize, blockSize);
        this.material = this.createMaterial(
        '/THREEProject/resources/oakLeavesBlock/Oak_Leaves_(carried_texture)_BE1.webp');
        this.object = this.createObject(this.geometry, this.material);
        this.object.castShadow = true;
        this.object.receiveShadow = true;
        return this.object;
    }

    createGeometry(xSize, ySize, zSize) {
        const oakLeavesBlockGeometry = new THREE.BoxGeometry(xSize, ySize, zSize);
        return oakLeavesBlockGeometry;
    }

    createMaterial(pathSide) {
        const oakLeavesBlockMaterialArray = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kanan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kiri
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // atas
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // bawah
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // depan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }) // belakang
        ];
        return oakLeavesBlockMaterialArray;
    }

    createObject(geometry, material) {
        const oakLeavesBlock = new THREE.Mesh(geometry, material);
        return oakLeavesBlock;
    }
}
