import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

function loadTexture(path) {
    const texture = textureLoader.load(path);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    return texture;
}

const textures = {
    dirt: loadTexture('textures/dirt.png'),
    grass: loadTexture('textures/grass_carried.png'),
    grassSide: loadTexture('textures/grass_side_carried.png'),
    stone: loadTexture('textures/stone.png'),
    coalOre: loadTexture('textures/coal_ore.png'),
    ironOre: loadTexture('textures/iron_ore.png'),
    sand: loadTexture('textures/sand.png'),
    oakPlank: loadTexture('textures/planks_oak.png'),
    oakLog: loadTexture('textures/log_oak.png'),
    oakLogTop: loadTexture('textures/log_oak_top.png'),
    mossStone: loadTexture('textures/cobblestone_mossy.png'),
    glass: loadTexture('textures/glass_black.png'),
    mossBrick: loadTexture('textures/stonebrick_mossy.png'),
    redWool: loadTexture('textures/wool_colored_red.png'),
    whiteWool: loadTexture('textures/wool_colored_white.png'),
    farmland: loadTexture('textures/farmland_dry.png')
}

export const blocks = {
    empty: {
        id: 0,
        name: 'empty'
    },
    grass: {
        id: 1,
        name: 'grass',
        color: 0x559020,
        material: [
            new THREE.MeshPhongMaterial({map: textures.grassSide}), //right
            new THREE.MeshPhongMaterial({map: textures.grassSide}), //left
            new THREE.MeshPhongMaterial({map: textures.grass}), //top
            new THREE.MeshPhongMaterial({map: textures.dirt}), //bottom
            new THREE.MeshPhongMaterial({map: textures.grassSide}), //front
            new THREE.MeshPhongMaterial({map: textures.grassSide}), //back
        ]
    },
    dirt: {
        id: 2,
        name: 'dirt',
        color: 0x807020,
        material: new THREE.MeshPhongMaterial({map: textures.dirt})
    },
    stone: {
        id: 3,
        name: 'stone',
        color: 0x808080,
        scale: { x: 30, y: 30, z: 30},
        scarcity: 0.5,
        material: new THREE.MeshPhongMaterial({map: textures.stone})
    },
    coalOre: {
        id: 4,
        name: 'coalOre',
        color: 0x202020,
        scale: { x: 20, y: 20, z: 20},
        scarcity: 0.8,
        material: new THREE.MeshPhongMaterial({map: textures.coalOre})
    },
    ironOre: {
        id: 5,
        name: 'ironOre',
        color: 0x806060,
        scale: { x: 60, y: 60, z: 60},
        scarcity: 0.9,
        material: new THREE.MeshPhongMaterial({map: textures.ironOre})
    },
    sand: {
        id: 6,
        name: 'sand',
        material: new THREE.MeshPhongMaterial({map: textures.sand})
    },
    oakPlank: {
        id: 7,
        name: 'oakPlank',
        material: new THREE.MeshPhongMaterial({map: textures.oakPlank})
    },
    oakLog: {
        id: 8,
        name: 'oakLog',
        material: [
            new THREE.MeshPhongMaterial({map: textures.oakLog}), //right
            new THREE.MeshPhongMaterial({map: textures.oakLog}), //left
            new THREE.MeshPhongMaterial({map: textures.oakLogTop}), //top
            new THREE.MeshPhongMaterial({map: textures.oakLogTop}), //bottom
            new THREE.MeshPhongMaterial({map: textures.oakLog}), //front
            new THREE.MeshPhongMaterial({map: textures.oakLog}), //back
        ]
    },
    mossStone: {
        id: 9,
        name: 'mossStone',
        material: new THREE.MeshPhongMaterial({map: textures.mossStone})
    },
    mossBrick: {
        id: 10,
        name: 'mossBrick',
        material: new THREE.MeshPhongMaterial({map: textures.mossBrick})
    },
    glass: {
        id: 11,
        name: 'glass',
        material: new THREE.MeshPhongMaterial({map: textures.glass})
    },
    redWool: {
        id: 12,
        name: 'redWool',
        material: new THREE.MeshPhongMaterial({map: textures.redWool})
    },
    whiteWool: {
        id: 13,
        name: 'whiteWool',
        material: new THREE.MeshPhongMaterial({map: textures.whiteWool})
    },
    farmland: {
        id: 14,
        name: 'farmland',
        color: 0x559020,
        material: [
            new THREE.MeshPhongMaterial({map: textures.dirt}), //right
            new THREE.MeshPhongMaterial({map: textures.dirt}), //left
            new THREE.MeshPhongMaterial({map: textures.farmland}), //top
            new THREE.MeshPhongMaterial({map: textures.dirt}), //bottom
            new THREE.MeshPhongMaterial({map: textures.dirt}), //front
            new THREE.MeshPhongMaterial({map: textures.dirt}), //back
        ]
    }
}

export const resources = [
    blocks.stone,
    blocks.coalOre,
    blocks.ironOre
]