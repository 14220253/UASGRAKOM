import * as THREE from "three";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";
import { RNG } from "./rng.js";
import { blocks, resources } from './blocks.js'

const geometry = new THREE.BoxGeometry();

export class World extends THREE.Group {
    /**
     * @type {{
     * id: number,
     * instanceId: number
     * }[][][]}
     */
    data = [];

    params = {
        seed: 0,
        terrain: {
            scale: 30,
            magnitude: 0.05,
            offset: 0.5
        }
    };

    constructor(size = {width: 128, height: 128}) { // 128 128
        super();
        this.size = size;
    }

    generate() {
        const rng = new RNG(this.params.seed);

        // tinggi(y) wallnya dibuat 10, kalo floor tingginya(y) dibuat 0
        this.InitializeTerrain();
        for (let x = 5; x <= 55; x++) {
            for (let z = 0; z <= 0; z++) {
                for (let y = 0; y <= 5; y++) { // 1
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 5; x <= 5; x++) {
            for (let z = 0; z <= 40; z++) {
                for (let y = 0; y <= 5; y++) { // 2
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 30; x <= 30; x++) {
            for (let z = 0; z <= 10; z++) {
                for (let y = 0; y <= 5; y++) { // 3
                    this.setBlockId(x,y,z, 3);
                }
            }
        }


        for (let x = 5; x <= 18; x++) {
            for (let z = 10; z <= 10; z++) {
                for (let y = 0; y <= 5; y++) { // 4
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 21; x <= 40; x++) {
            for (let z = 10; z <= 10; z++) {
                for (let y = 0; y <= 5; y++) { // 5
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 43; x <= 55; x++) {
            for (let z = 10; z <= 10; z++) {
                for (let y = 0; y <= 5; y++) { // 6
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 55; x <= 55; x++) {
            for (let z = 0; z <= 4; z++) {
                for (let y = 0; y <= 5; y++) { // 7
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 55; x <= 55; x++) {
            for (let z = 7; z <= 10; z++) {
                for (let y = 0; y <= 5; y++) { // 8
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 55; x <= 90; x++) {
            for (let z = 2; z <= 2; z++) {
                for (let y = 0; y <= 5; y++) { // 9
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 55; x <= 77; x++) {
            for (let z = 9; z <= 9; z++) {
                for (let y = 0; y <= 5; y++) { // 10
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 80; x <= 82; x++) {
            for (let z = 9; z <= 9; z++) {
                for (let y = 0; y <= 5; y++) { // 11
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 82; x <= 82; x++) {
            for (let z = 10; z <= 40; z++) {
                for (let y = 0; y <= 5; y++) { // 12
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 73; x <= 73; x++) {
            for (let z = 10; z <= 28; z++) {
                for (let y = 0; y <= 5; y++) { // 13
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 74; x <= 81; x++) {
            for (let z = 25; z <= 25; z++) {
                for (let y = 0; y <= 5; y++) { // 14
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 74; x <= 81; x++) {
            for (let z = 40; z <= 40; z++) {
                for (let y = 0; y <= 5; y++) { // 15
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 73; x <= 73; x++) {
            for (let z = 37; z <= 55; z++) {
                for (let y = 0; y <= 5; y++) { // 16
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 72; x <= 72; x++) {
            for (let z = 55; z <= 55; z++) {
                for (let y = 0; y <= 5; y++) { // 16#1/2
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 71; x <= 71; x++) {
            for (let z = 55; z <= 60; z++) {
                for (let y = 0; y <= 5; y++) { // 16#2
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 73; x <= 79; x++) {
            for (let z = 50; z <= 50; z++) {
                for (let y = 0; y <= 5; y++) { // 17
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 80; x <= 80; x++) {
            for (let z = 45; z <= 80; z++) {
                for (let y = 0; y <= 5; y++) { // 18
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 90; x <= 90; x++) {
            for (let z = 2; z <= 55; z++) {
                for (let y = 0; y <= 5; y++) { // 19
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 80; x <= 90; x++) {
            for (let z = 55; z <= 55; z++) {
                for (let y = 0; y <= 5; y++) { // 20
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 71; x <= 76; x++) {
            for (let z = 60; z <= 60; z++) {
                for (let y = 0; y <= 5; y++) { // 21
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 2; x <= 80; x++) {
            for (let z = 81; z <= 81; z++) {
                for (let y = 0; y <= 5; y++) { // 22
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 27; x <= 27; x++) {
            for (let z = 68; z <= 80; z++) {
                for (let y = 0; y <= 5; y++) { // 23
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 27; x <= 37; x++) {
            for (let z = 68; z <= 68; z++) {
                for (let y = 0; y <= 5; y++) { // 24
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 37; x <= 37; x++) {
            for (let z = 53; z <= 68; z++) {
                for (let y = 0; y <= 5; y++) { // 25
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 38; x <= 50; x++) {
            for (let z = 55; z <= 55; z++) {
                for (let y = 0; y <= 5; y++) { // 26
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 53; x <= 70; x++) {
            for (let z = 55; z <= 55; z++) {
                for (let y = 0; y <= 5; y++) { // 27
                    this.setBlockId(x,y,z, 3);
                }
            }
        }


        for (let x = 37; x <= 37; x++) {
            for (let z = 21; z <= 50; z++) {
                for (let y = 0; y <= 5; y++) { // 32
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 37; x <= 55; x++) {
            for (let z = 21; z <= 21; z++) {
                for (let y = 0; y <= 5; y++) { // 33
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 58; x <= 73; x++) {
            for (let z = 21; z <= 21; z++) {
                for (let y = 0; y <= 5; y++) { // 34
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 5; x <= 37; x++) {
            for (let z = 21; z <= 80; z++) {
                for (let y = 0; y <= 5; y++) { // kotak bawah kiri
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        

        for (let x = 10; x <= 18; x++) {
            for (let z = 47; z <= 73; z++) {
                for (let y = 0; y <= 5; y++) { // kotak bawah kanan
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 17; x <= 21; x++) {
            for (let z = 55; z <= 68; z++) {
                for (let y = 0; y <= 5; y++) { // kotak bawah kanan#2
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 45; x <= 65; x++) {
            for (let z = 30; z <= 30; z++) {
                for (let y = 0; y <= 5; y++) { // ruang utama/tengah
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 45; x <= 65; x++) {
            for (let z = 46; z <= 46; z++) {
                for (let y = 0; y <= 5; y++) { // ruang utama/tengah#2
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 65; x <= 65; x++) {
            for (let z = 31; z <= 46; z++) {
                for (let y = 0; y <= 5; y++) { // ruang utama/tengah#3
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 45; x <= 45; x++) {
            for (let z = 31; z <= 36; z++) {
                for (let y = 0; y <= 5; y++) { // ruang utama/tengah#4
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 45; x <= 45; x++) {
            for (let z = 40; z <= 46; z++) {
                for (let y = 0; y <= 5; y++) { // ruang utama/tengah#5
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 76; x <= 76; x++) {
            for (let z = 66; z <= 75; z++) {
                for (let y = 0; y <= 5; y++) { // ruang atas kanan
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 69; x <= 69; x++) {
            for (let z = 66; z <= 75; z++) {
                for (let y = 0; y <= 5; y++) { // ruang atas kanan#2
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 70; x <= 75; x++) {
            for (let z = 66; z <= 66; z++) {
                for (let y = 0; y <= 5; y++) { // ruang atas kanan#3
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 70; x <= 71; x++) {
            for (let z = 75; z <= 75; z++) {
                for (let y = 0; y <= 5; y++) { // ruang atas kanan#4
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 74; x <= 75; x++) {
            for (let z = 75; z <= 75; z++) {
                for (let y = 0; y <= 5; y++) { // ruang atas kanan#5
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 44; x <= 64; x++) {
            for (let z = 60; z <= 68; z++) {
                for (let y = 0; y <= 5; y++) { // ruang bawahnya atas kanan
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 28; x <= 28; x++) {
            for (let z = 5; z <= 5; z++) {
                for (let y = 1; y <= 2; y++) { // bawahnya oldLamp
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 0; x <= 90; x++) {
            for (let z = 0; z <= 90; z++) {
                for (let y = 0; y <= 0; y++) { // floor
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 0; x <= 90; x++) {
            for (let z = 0; z <= 90; z++) {
                for (let y = 6; y <= 6; y++) { // ceiling
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        // this.generateResources(rng);
        // this.generateTerrain(rng);
        this.generateMeshes();
    }

    /**
     * initializing the world terrain data
     */
    InitializeTerrain() {
        this.data = [];
        for (let x = 0; x < this.size.width; x++) {
            const slice = [];
            for (let y = 0; y < this.size.height; y++) {
                const row = [];
                for (let z = 0; z < this.size.width; z++) {
                    row.push({
                        id: blocks.empty.id,
                        instanceId: null
                    });
                }
                slice.push(row);
            }
            this.data.push(slice);
        }
    }

    generateResources(rng) {
        const simplex = new SimplexNoise(rng);
        resources.forEach(resource => {
            for (let x = 0; x < this.size.width; x++) {
                for (let y = 0; y < this.size.height; y++) {
                    for (let z = 0; z < this.size.width; z++) {
                        const value = simplex.noise3d(
                            x / resource.scale.x, 
                            y / resource.scale.y, 
                            z / resource.scale.z);
                        if (value > resource.scarcity) {
                            this.setBlockId(x,y,z, resource.id);
                        }
                    }
                }
            }
        });
        
    }

    generateTerrain(rng) {
        const simplex = new SimplexNoise(rng);
        for (let x = 0; x < this.size.width; x++) {
            for (let z = 0; z < this.size.width; z++) {

                //Compute noise value at this x,y location
                const value = simplex.noise(
                    x / this.params.terrain.scale,
                    z / this.params.terrain.scale
                );

                //Scale noise based on magnitude and offset
                const scaledNoise = this.params.terrain.offset +
                    this.params.terrain.magnitude * value;

                //Compute the height at this x,z location
                let height = Math.floor(this.size.height * scaledNoise);
                
                //Clamp height between 0 and max height
                height = Math.max(0, Math.min(height, this.size.height - 1));

                //Fill in all blocks at or below the terrain height
                for (let y = 0; y <= this.size.height; y++) {
                    if (y > 55 && y < height && this.getBlock(x,y,z).id === blocks.empty.id) {
                        this.setBlockId(x,y,z, blocks.dirt.id);
                    } else if (y === height) {
                        this.setBlockId(x,y,z,blocks.grass.id);
                    } else if (y > height) {
                        this.setBlockId(x,y,z,blocks.empty.id);
                    }
                }
            }
        }
    }

    generateMeshes() {
        this.clear();

        const maxCount = this.size.width * this.size.width * this.size.height;

        //create a lookup table where the key is the block id
        const meshes = {};
        Object.values(blocks)
        .filter(blockType => blockType.id !== blocks.empty.id)
        .forEach(blockType => {
            const mesh = new THREE.InstancedMesh(geometry, blockType.material, maxCount);
            mesh.name = blockType.name;
            mesh.count = 0;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            meshes[blockType.id] = mesh;
        })

        

        const matrix = new THREE.Matrix4();
        for (let x = 0; x < this.size.width; x++) {
            for (let y = 0; y < this.size.height; y++) {
                for (let z = 0; z < this.size.width; z++) {
                    const blockId = this.getBlock(x,y,z).id;
                    if (blockId === blocks.empty.id) continue;

                    const mesh = meshes[blockId];
                    const instanceId = mesh.count;

                    if (!this.isBlockObscured(x,y,z)) {
                        matrix.setPosition(x, y, z);
                        mesh.setMatrixAt(instanceId, matrix);
                        this.setBlockInstanceId(x,y,z,instanceId);
                        mesh.count++;
                    }
                }
            }
        }

        this.add(...Object.values(meshes));
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{id: number, instanceId: number}}
     */
    getBlock(x,y,z) {
        if (this.inBounds(x,y,z)) {
            return this.data[x][y][z];
        } else {
            return null;
        }
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} id 
     */
    setBlockId(x,y,z,id) {
        if (this.inBounds(x,y,z)) {
            this.data[x][y][z].id = id;
        }
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} instanceId 
     */
    setBlockInstanceId(x,y,z,instanceId) {
        if(this.inBounds(x,y,z)) {
            this.data[x][y][z].instanceId = instanceId;
        }
    }

    /**
     * Checks if the (x,y,z) coordinates are within bounds
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {boolean}
     */
    inBounds(x,y,z) {
        if (x >= 0 && x < this.size.width &&
            y >= 0 && y < this.size.height &&
            z >= 0 && z < this.size.width
        ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * returns true if this block is completely hidden by other blocks
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {boolean}
     */
    isBlockObscured(x,y,z) {
        const up = this.getBlock(x, y + 1, z) ?.id ?? blocks.empty.id;
        const down = this.getBlock(x, y - 1, z) ?.id ?? blocks.empty.id;
        const left = this.getBlock(x + 1, y, z) ?.id ?? blocks.empty.id;
        const right = this.getBlock(x - 1, y, z) ?.id ?? blocks.empty.id;
        const forward = this.getBlock(x, y, z + 1) ?.id ?? blocks.empty.id;
        const back = this.getBlock(x, y, z - 1) ?.id ?? blocks.empty.id;

        //If any of the block's sides is exposed, it is not obscured
        if (up === blocks.empty.id ||
            down === blocks.empty.id ||
            left === blocks.empty.id ||
            right === blocks.empty.id ||
            forward === blocks.empty.id ||
            back === blocks.empty.id
        ) {
            return false;
        } else {
            return true;
        }
    }
}