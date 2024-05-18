import * as THREE from 'three';

export class JackOLanternBlock {
    constructor(blockSize) {
        this.geometry = this.createGeometry(blockSize, blockSize, blockSize);
        this.material = this.createMaterial(
        '../resources/jackOLanternBlock/jackOLanternSide.webp',
        '../resources/jackOLanternBlock/jackOLanternTop.webp',
        '../resources/jackOLanternBlock/jackOLanternFace.webp');
        this.object = this.createObject(this.geometry, this.material);
        this.object.castShadow = true;
        this.object.receiveShadow = true;
        return this.object;
    }

    createGeometry(xSize, ySize, zSize) {
        const jackOLanternBlockGeometry = new THREE.BoxGeometry(xSize, ySize, zSize);
        return jackOLanternBlockGeometry;
    }

    createMaterial(pathSide, pathTop, pathFace) {
        const jackOLanternBlockMaterialArray = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kanan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kiri
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathTop) }), // atas
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // bawah
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathFace) }), // depan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }) // belakang
        ];
        return jackOLanternBlockMaterialArray;
    }

    createObject(geometry, material) {
        const jackOLanternBlock = new THREE.Mesh(geometry, material);
        return jackOLanternBlock;
    }
}
