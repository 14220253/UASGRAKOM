import * as THREE from 'three';

export class Block {
    constructor(xSize, ySize , zSize , sideTexture, faceTexture = null, topTexture = null, botTexture = null) {
        this.geometry = this.createGeometry(xSize, ySize, zSize);

        if (faceTexture && topTexture && botTexture) {
            this.material = this.createMaterial4Texture(sideTexture, faceTexture, topTexture, botTexture);
        } else if (topTexture && botTexture) {
            this.material = this.createMaterial3Texture(sideTexture, topTexture, botTexture);
        } else if (faceTexture){
            this.material = this.createMaterial2Texture(sideTexture, faceTexture);
        } else {
            this.material = this.createMaterial1Texture(sideTexture);
        }

        this.object = this.createObject(this.geometry, this.material);
        this.object.castShadow = true;
        this.object.receiveShadow = true;
        return this.object;
    }

    createGeometry(xSize, ySize, zSize) {
        const geometry = new THREE.BoxGeometry(xSize, ySize, zSize);
        return geometry;
    }

    applyTextureRepeat(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20); // Set repeat scale to make textures smaller
    }

    createMaterial1Texture(pathSide) { // 1 texture material
        const texture = new THREE.TextureLoader().load(pathSide);
        this.applyTextureRepeat(texture);

        const material = new THREE.MeshPhongMaterial({ map: texture });

        return [material, material, material, material, material, material];
    }

    createMaterial2Texture(pathSide, pathFace) { // 2 texture material
        const sideTexture = new THREE.TextureLoader().load(pathSide);
        this.applyTextureRepeat(sideTexture);

        const faceTexture = new THREE.TextureLoader().load(pathFace);
        this.applyTextureRepeat(faceTexture);

        const materialArray = [
            new THREE.MeshPhongMaterial({ map: sideTexture }), // kanan
            new THREE.MeshPhongMaterial({ map: sideTexture }), // kiri
            new THREE.MeshPhongMaterial({ map: sideTexture }), // atas
            new THREE.MeshPhongMaterial({ map: sideTexture }), // bawah
            new THREE.MeshPhongMaterial({ map: faceTexture }), // depan
            new THREE.MeshPhongMaterial({ map: sideTexture })  // belakang
        ];
        return materialArray;
    }

    createMaterial3Texture(pathSide, pathTop, pathBot) { // 3 texture material
        const sideTexture = new THREE.TextureLoader().load(pathSide);
        this.applyTextureRepeat(sideTexture);

        const topTexture = new THREE.TextureLoader().load(pathTop);
        this.applyTextureRepeat(topTexture);

        const botTexture = new THREE.TextureLoader().load(pathBot);
        this.applyTextureRepeat(botTexture);

        const materialArray = [
            new THREE.MeshPhongMaterial({ map: sideTexture }), // kanan
            new THREE.MeshPhongMaterial({ map: sideTexture }), // kiri
            new THREE.MeshPhongMaterial({ map: topTexture }),  // atas
            new THREE.MeshPhongMaterial({ map: botTexture }),  // bawah
            new THREE.MeshPhongMaterial({ map: sideTexture }), // depan
            new THREE.MeshPhongMaterial({ map: sideTexture })  // belakang
        ];
        return materialArray;
    }

    createMaterial4Texture(pathSide, pathFace, pathTop, pathBot) { // 4 texture material
        const sideTexture = new THREE.TextureLoader().load(pathSide);
        this.applyTextureRepeat(sideTexture);

        const faceTexture = new THREE.TextureLoader().load(pathFace);
        this.applyTextureRepeat(faceTexture);

        const topTexture = new THREE.TextureLoader().load(pathTop);
        this.applyTextureRepeat(topTexture);

        const botTexture = new THREE.TextureLoader().load(pathBot);
        this.applyTextureRepeat(botTexture);

        const materialArray = [
            new THREE.MeshPhongMaterial({ map: sideTexture }), // kanan
            new THREE.MeshPhongMaterial({ map: sideTexture }), // kiri
            new THREE.MeshPhongMaterial({ map: topTexture }),  // atas
            new THREE.MeshPhongMaterial({ map: botTexture }),  // bawah
            new THREE.MeshPhongMaterial({ map: faceTexture }), // depan
            new THREE.MeshPhongMaterial({ map: sideTexture })  // belakang
        ];
        return materialArray;
    }

    createObject(geometry, material) {
        const block = new THREE.Mesh(geometry, material);
        return block;
    }
}

export class LightGreyStainedGlassBlock {
    constructor(xSize, ySize , zSize , sideTexture, faceTexture = null, topTexture = null, botTexture = null) {
        this.geometry = this.createGeometry(xSize, ySize, zSize);

        if (faceTexture && topTexture && botTexture) {
            this.material = this.createMaterial4Texture(sideTexture, faceTexture, topTexture, botTexture);
        } else if (topTexture && botTexture) {
            this.material = this.createMaterial3Texture(sideTexture, topTexture, botTexture);
        } else if (faceTexture){
            this.material = this.createMaterial2Texture(sideTexture, faceTexture);
        } else {
            this.material = this.createMaterial1Texture(sideTexture);
        }

        this.object = this.createObject(this.geometry, this.material);
        this.object.castShadow = true;
        this.object.receiveShadow = true;
        return this.object;
    }

    createGeometry(xSize, ySize, zSize) {
        const geometry = new THREE.BoxGeometry(xSize, ySize, zSize);
        return geometry;
    }

    applyTextureRepeat(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20); // Set repeat scale to make textures smaller
    }

    createMaterial1Texture(pathSide) { // 1 texture material
        const texture = new THREE.TextureLoader().load(pathSide);
        this.applyTextureRepeat(texture);

        const material = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            opacity: 0.5 // Adjust this value to control the transparency
        });

        return [material, material, material, material, material, material];
    }

    createMaterial2Texture(pathSide, pathFace) { // 2 texture material
        const sideTexture = new THREE.TextureLoader().load(pathSide);
        this.applyTextureRepeat(sideTexture);

        const faceTexture = new THREE.TextureLoader().load(pathFace);
        this.applyTextureRepeat(faceTexture);

        const materialArray = [
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 }), // kanan
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 }), // kiri
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 }), // atas
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 }), // bawah
            new THREE.MeshPhongMaterial({ map: faceTexture, transparent: true, opacity: 0.5 }), // depan
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 })  // belakang
        ];
        return materialArray;
    }

    createMaterial3Texture(pathSide, pathTop, pathBot) { // 3 texture material
        const sideTexture = new THREE.TextureLoader().load(pathSide);
        this.applyTextureRepeat(sideTexture);

        const topTexture = new THREE.TextureLoader().load(pathTop);
        this.applyTextureRepeat(topTexture);

        const botTexture = new THREE.TextureLoader().load(pathBot);
        this.applyTextureRepeat(botTexture);

        const materialArray = [
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 }), // kanan
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 }), // kiri
            new THREE.MeshPhongMaterial({ map: topTexture, transparent: true, opacity: 0.5 }),  // atas
            new THREE.MeshPhongMaterial({ map: botTexture, transparent: true, opacity: 0.5 }),  // bawah
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 }), // depan
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 })  // belakang
        ];
        return materialArray;
    }

    createMaterial4Texture(pathSide, pathFace, pathTop, pathBot) { // 4 texture material
        const sideTexture = new THREE.TextureLoader().load(pathSide);
        this.applyTextureRepeat(sideTexture);

        const faceTexture = new THREE.TextureLoader().load(pathFace);
        this.applyTextureRepeat(faceTexture);

        const topTexture = new THREE.TextureLoader().load(pathTop);
        this.applyTextureRepeat(topTexture);

        const botTexture = new THREE.TextureLoader().load(pathBot);
        this.applyTextureRepeat(botTexture);

        const materialArray = [
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 }), // kanan
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 }), // kiri
            new THREE.MeshPhongMaterial({ map: topTexture, transparent: true, opacity: 0.5 }),  // atas
            new THREE.MeshPhongMaterial({ map: botTexture, transparent: true, opacity: 0.5 }),  // bawah
            new THREE.MeshPhongMaterial({ map: faceTexture, transparent: true, opacity: 0.5 }), // depan
            new THREE.MeshPhongMaterial({ map: sideTexture, transparent: true, opacity: 0.5 })  // belakang
        ];
        return materialArray;
    }

    createObject(geometry, material) {
        const block = new THREE.Mesh(geometry, material);
        return block;
    }
}
