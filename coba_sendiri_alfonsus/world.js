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
        },
        trees: {
            trunk: {
                minHeight: 4,
                maxHeight: 7
            },
            canopy: {
                minRadius: 2,
                maxRadius: 4,
                density: 0.7
            },
            frequency: 0.01,
        },
        clouds: {
            scale: 40,
            density: 0.3,
        }
    };

    constructor(size = {width: 128, height: 128}) {
        super();
        this.size = size;
    }

    generate() {
        const rng = new RNG(this.params.seed);

        this.InitializeTerrain();
        // this.generateResources(rng);
        this.generateTerrain(rng);
        this.generateTrees(rng);
        this.generateClouds(rng);
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

    generateTreeTrunk(x, z, rng){
        const minH = this.params.trees.trunk.minHeight;
        const maxH = this.params.trees.trunk.maxHeight;
        const h = Math.round(minH + (maxH - minH) * rng.random());

        for (let y = 0; y < this.size.height; y++) {
            const block = this.getBlock(x,y,z);
            if (block && block.id === blocks.grass.id) {
                for (let treeY = y + 1; treeY <= y + h; treeY++) {
                    this.setBlockId(x, treeY, z, blocks.tree.id);
                }
                this.generateTreeCanopy(x, y + h, z, rng);
                break;
            }
        }
    }
    
    generateTreeCanopy(centerX, centerY, centerZ, rng) {
        const minR = this.params.trees.canopy.minRadius;
        const maxR = this.params.trees.canopy.maxRadius;
        const r = Math.round(minR + (maxR - minR) * rng.random());

        for (let x = -r; x <= r; x++) {
            for (let y = -r; y <= r; y++) {
                for (let z = -r; z <= r; z++) {
                    if (x*x + y*y + z*z > r*r) continue;

                    const block = this.getBlock(centerX + x, centerY + y, centerZ + z);
                    if (block && block.id !== blocks.empty.id) continue;

                    if (rng.random() < this.params.trees.canopy.density) {
                        this.setBlockId(centerX + x, centerY + y, centerZ + z, blocks.leaves.id);
                    }
                }
            }
        }
    }

    generateTrees(rng) {
        for (let x = 0; x < this.size.width; x++) {
            for (let z = 0; z < this.size.width; z++) {
                if (rng.random() < this.params.trees.frequency) {
                    this.generateTreeTrunk(x, z, rng);
                }
            }
        }
    }

    /**
     * Creates clouds
     * @param {RNG} rng 
     */
    generateClouds(rng) {
        const simplex = new SimplexNoise(rng);

        for (let x = 0; x < this.size.width; x++) {
            for (let z = 0; z< this.size.width; z++) {
                const value = (simplex.noise(
                    (this.position.x + x) / this.params.clouds.scale,
                    (this.position.z + z) / this.params.clouds.scale,
                ) + 1) * 0.5;

                if (value < this.params.clouds.density) {
                    this.setBlockId(x, this.size.height - 1, z, blocks.cloud.id);
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