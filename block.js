import * as THREE from 'three';

export class Block {
    constructor(blockSize, sideTexture, faceTexture = null, topTexture = null, botTexture = null) {
        this.geometry = this.createGeometry(blockSize, blockSize, blockSize);

        if (faceTexture && topTexture && botTexture) {
            this.material = this.createMaterial4Texture(sideTexture, faceTexture, topTexture, botTexture);
        } else if (topTexture && botTexture) {
            this.material = this.createMaterial3Texture(sideTexture, topTexture, botTexture);
        } else if (faceTexture){
            this.material = this.createMaterial2Texture(sideTexture, faceTexture);
        }
        else{
            this.material = this.createMaterial1Texture(sideTexture);
        }

        this.object = this.createObject(this.geometry, this.material);
        this.object.castShadow = true;
        this.object.receiveShadow = true;
        return this.object;
    }

    createGeometry(xSize, ySize, zSize) {
        const Geometry = new THREE.BoxGeometry(xSize, ySize, zSize);
        return Geometry;
    }

    createMaterial1Texture(pathSide) { // 1 texture material
        const MaterialArray = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kanan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kiri
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // atas
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // bawah
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // depan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }) // belakang
        ];
        return MaterialArray;
    }

    createMaterial2Texture(pathSide, pathFace) { // 2 texture material
        const MaterialArray = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kanan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kiri
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // atas
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // bawah
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathFace) }), // depan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }) // belakang
        ];
        return MaterialArray;
    }

    createMaterial3Texture(pathSide, pathTop, pathBot) { // 3 texture material
        const MaterialArray = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kanan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kiri
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathTop) }), // atas
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathBot) }), // bawah
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // depan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }) // belakang
        ];
        return MaterialArray;
    }

    createMaterial4Texture(pathSide, pathFace, pathTop, pathBot) { // 4 texture material
        const MaterialArray = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kanan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }), // kiri
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathTop) }), // atas
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathBot) }), // bawah
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathFace) }), // depan
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(pathSide) }) // belakang
        ];
        return MaterialArray;
    }

    createObject(geometry, material) {
        const block = new THREE.Mesh(geometry, material);
        return block;
    }
}
