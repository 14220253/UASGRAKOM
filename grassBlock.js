import * as THREE from 'three';

export class GrassBlock {
    constructor(blockSize) {
        this.geometry = this.createGeometry(blockSize, blockSize, blockSize);
        this.material = this.createMaterial(
        '/THREEProject/resources/grassBlock/side.jpg',
        '/THREEProject/resources/grassBlock/top.jpg',
        '/THREEProject/resources/grassBlock/bottom.jpg');
        this.object = this.createObject(this.geometry, this.material);
        this.object.castShadow = true;
        this.object.receiveShadow = true;
        return this.object;
    }

    createGeometry(xSize, ySize, zSize) {
        const dirtBlockGeometry = new THREE.BoxGeometry(xSize, ySize, zSize);
        return dirtBlockGeometry;
    }

    createMaterial(pathSide, pathTop, pathBottom) {
        const dirtBoxMaterialArray = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kanan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kiri
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathTop) }), // atas
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathBottom) }), // bawah
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // depan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }) // belakang
        ];
        return dirtBoxMaterialArray;
    }

    createObject(geometry, material) {
        const dirtBlock = new THREE.Mesh(geometry, material);
        return dirtBlock;
    }
}
