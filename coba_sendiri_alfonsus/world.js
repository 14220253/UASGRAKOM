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
            magnitude: 0.03,
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

    constructor(size = {width: 128, height: 128}) { // 128 128
        super();
        this.size = size;
        blocks.glass.material.transparent = true;
    }

    generate() {
        const rng = new RNG(this.params.seed);

        // tinggi(y) wallnya dibuat 10, kalo floor tingginya(y) dibuat 0
        this.InitializeTerrain();
        

        // this.generateResources(rng);
        this.generateTerrain(rng);
        this.generateHouse();
        this.generateTrees(rng);
        this.generateClouds(rng);
        this.generateDungeon();
        
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

    generateDungeon() {
        for (let x = 5; x <= 55; x++) {
            for (let z = 0; z <= 0; z++) {
                for (let y = 0; y <= 5; y++) { // 1
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 5; x <= 5; x++) {
            for (let z = 0; z <= 10; z++) {
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

        for (let x = 18; x <= 18; x++) {
            for (let z = 10; z <= 20; z++) {
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
            for (let z = 10; z <= 38; z++) {
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
                for (let y = 0; y <= 5; y++) { // 14
                    this.setBlockId(x,y,z, 3);
                }
            }
        }



        for (let x = 73; x <= 79; x++) {
            for (let z = 45; z <= 45; z++) {
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

        for (let x = 73; x <= 79; x++) {
            for (let z = 60; z <= 60; z++) {
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

        for (let x = 65; x <= 80; x++) {
            for (let z = 81; z <= 81; z++) {
                for (let y = 0; y <= 5; y++) { // 22
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

        for (let x = 37; x <= 37; x++) {
            for (let z = 21; z <= 60; z++) {
                for (let y = 0; y <= 5; y++) { // kotak bawah kiri
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 18; x <= 37; x++) {
            for (let z = 21; z <= 21; z++) {
                for (let y = 0; y <= 5; y++) { // kotak bawah kiri
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

        for (let x = 64; x <= 64; x++) {
            for (let z = 60; z <= 81; z++) {
                for (let y = 0; y <= 5; y++) { // ruang bawahnya atas kanan
                    this.setBlockId(x,y,z, 3);
                }
            }
        }

        for (let x = 37; x <= 64; x++) {
            for (let z = 60; z <= 60; z++) {
                for (let y = 0; y <= 5; y++) { // ruang bawahnya atas kanan
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

        for(let y = 6; y <= 53; y++) {
            for(let z = 66; z  <= 69; z++) {
                this.setBlockId(64, y, z, 3);
            }
        }
        for(let y = 6; y <= 53; y++) {
            for(let z = 66; z  <= 69; z++) {
                this.setBlockId(66, y, z, 3);
            }
        }
        for(let y = 6; y <= 53; y++) {
            this.setBlockId(65, y, 69, 3);
        }
        for(let y = 6; y <= 53; y++) {
            this.setBlockId(65, y, 66, 3);
        }
        
        for(let y = 3; y <= 61; y++) {
            this.setBlockId(65, y, 67, 0);
        }
        for(let y = 3; y <= 61; y++) {
            this.setBlockId(65, y, 68, 0);
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
                    //reserved space
                    if ((x > this.size.width/2 - 24 && x < this.size.width/2 + 24) && (z > this.size.width/2 - 24 && z < this.size.width/2 + 24)) {
                        if (y == 63) {
                            this.setBlockId(x,y,z, blocks.grass.id)
                        }
                        else if (y < 63 && y > 50) {
                            this.setBlockId(x,y,z, blocks.dirt.id)
                        }
                        else if (y > 56 || y < 51) {
                            this.setBlockId(x,y,z, blocks.empty.id)
                        }
                    }
                    else {
                        //else
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
                if (!((x > this.size.width/2 - 24 && x < this.size.width/2 + 24) && (z > this.size.width/2 - 24 && z < this.size.width/2 + 24))) {
                    if (rng.random() < this.params.trees.frequency) {
                        this.generateTreeTrunk(x, z, rng);
                    }
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

    generateHouse() {
        let arr = [51,57 + 7,50,10,
            51,58 + 7,50,10,
            51,59 + 7,50,10,
            51,59 + 7,51,10,
            51,57 + 7,52,10,
            51,58 + 7,52,10,
            51,59 + 7,52,10,
            51,57 + 7,49,9,
            51,57 + 7,48,9,
            51,57 + 7,47,9,
            51,57 + 7,53,9,
            51,57 + 7,54,9,
            51,57 + 7,55,9,
            51,58 + 7,49,11,
            51,58 + 7,48,11,
            51,58 + 7,47,7,
            51,58 + 7,53,11,
            51,58 + 7,54,11,
            51,58 + 7,55,7,
            51,59 + 7,49,7,
            51,59 + 7,48,7,
            51,59 + 7,47,7,
            51,59 + 7,53,7,
            51,59 + 7,54,7,
            51,59 + 7,55,7,
            51,60 + 7,47,7,
            51,60 + 7,48,7,
            51,60 + 7,49,7,
            51,60 + 7,50,7,
            51,60 + 7,51,7,
            51,60 + 7,52,7,
            51,60 + 7,53,7,
            51,60 + 7,54,7,
            51,60 + 7,55,7,
            51,57 + 7,46,8,
            51,58 + 7,46,8,
            51,59 + 7,46,8,
            51,60 + 7,46,8,
            51,57 + 7,56,8,
            51,58 + 7,56,8,
            51,59 + 7,56,8,
            51,60 + 7,56,8,
            51,61 + 7,46,9,
            51,61 + 7,47,9,
            51,61 + 7,48,9,
            51,61 + 7,49,9,
            51,61 + 7,50,9,
            51,61 + 7,51,9,
            51,61 + 7,52,9,
            51,61 + 7,53,9,
            51,61 + 7,54,9,
            51,61 + 7,55,9,
            51,61 + 7,56,9,
            52,61 + 7,46,9,
            52,61 + 7,47,9,
            52,61 + 7,48,9,
            52,61 + 7,49,9,
            52,61 + 7,50,9,
            52,61 + 7,51,9,
            52,61 + 7,52,9,
            52,61 + 7,53,9,
            52,61 + 7,54,9,
            52,61 + 7,55,9,
            52,61 + 7,56,9,
            53,61 + 7,46,9,
            53,61 + 7,47,9,
            53,61 + 7,48,9,
            53,61 + 7,49,9,
            53,61 + 7,50,9,
            53,61 + 7,51,9,
            53,61 + 7,52,9,
            53,61 + 7,53,9,
            53,61 + 7,54,9,
            53,61 + 7,55,9,
            53,61 + 7,56,9,
            54,61 + 7,46,9,
            54,61 + 7,47,9,
            54,61 + 7,48,9,
            54,61 + 7,49,9,
            54,61 + 7,50,9,
            54,61 + 7,51,9,
            54,61 + 7,52,9,
            54,61 + 7,53,9,
            54,61 + 7,54,9,
            54,61 + 7,55,9,
            54,61 + 7,56,9,
            55,61 + 7,46,9,
            55,61 + 7,47,9,
            55,61 + 7,48,9,
            55,61 + 7,49,9,
            55,61 + 7,50,9,
            55,61 + 7,51,9,
            55,61 + 7,52,9,
            55,61 + 7,53,9,
            55,61 + 7,54,9,
            55,61 + 7,55,9,
            55,61 + 7,56,9,
            56,61 + 7,46,9,
            56,61 + 7,47,9,
            56,61 + 7,48,9,
            56,61 + 7,49,9,
            56,61 + 7,50,9,
            56,61 + 7,51,9,
            56,61 + 7,52,9,
            56,61 + 7,53,9,
            56,61 + 7,54,9,
            56,61 + 7,55,9,
            56,61 + 7,56,9,
            57,61 + 7,46,9,
            57,61 + 7,47,9,
            57,61 + 7,48,9,
            57,61 + 7,49,9,
            57,61 + 7,50,9,
            57,61 + 7,51,9,
            57,61 + 7,52,9,
            57,61 + 7,53,9,
            57,61 + 7,54,9,
            57,61 + 7,55,9,
            57,61 + 7,56,9,
            58,61 + 7,46,9,
            58,61 + 7,47,9,
            58,61 + 7,48,9,
            58,61 + 7,49,9,
            58,61 + 7,50,9,
            58,61 + 7,51,9,
            58,61 + 7,52,9,
            58,61 + 7,53,9,
            58,61 + 7,54,9,
            58,61 + 7,55,9,
            58,61 + 7,56,9,
            59,61 + 7,46,9,
            59,61 + 7,47,9,
            59,61 + 7,48,9,
            59,61 + 7,49,9,
            59,61 + 7,50,9,
            59,61 + 7,51,9,
            59,61 + 7,52,9,
            59,61 + 7,53,9,
            59,61 + 7,54,9,
            59,61 + 7,55,9,
            59,61 + 7,56,9,
            60,61 + 7,46,9,
            60,61 + 7,47,9,
            60,61 + 7,48,9,
            60,61 + 7,49,9,
            60,61 + 7,50,9,
            60,61 + 7,51,9,
            60,61 + 7,52,9,
            60,61 + 7,53,9,
            60,61 + 7,54,9,
            60,61 + 7,55,9,
            60,61 + 7,56,9,
            61,61 + 7,46,9,
            61,61 + 7,47,9,
            61,61 + 7,48,9,
            61,61 + 7,49,9,
            61,61 + 7,50,9,
            61,61 + 7,51,9,
            61,61 + 7,52,9,
            61,61 + 7,53,9,
            61,61 + 7,54,9,
            61,61 + 7,55,9,
            61,61 + 7,56,9,
            62,61 + 7,46,9,
            62,61 + 7,47,9,
            62,61 + 7,48,9,
            62,61 + 7,49,9,
            62,61 + 7,50,9,
            62,61 + 7,51,9,
            62,61 + 7,52,9,
            62,61 + 7,53,9,
            62,61 + 7,54,9,
            62,61 + 7,55,9,
            62,61 + 7,56,9,
            63,61 + 7,46,9,
            63,61 + 7,47,9,
            63,61 + 7,48,9,
            63,61 + 7,49,9,
            63,61 + 7,50,9,
            63,61 + 7,51,9,
            63,61 + 7,52,9,
            63,61 + 7,53,9,
            63,61 + 7,54,9,
            63,61 + 7,55,9,
            63,61 + 7,56,9,
            64,61 + 7,46,9,
            64,61 + 7,47,9,
            64,61 + 7,48,9,
            64,61 + 7,49,9,
            64,61 + 7,50,9,
            64,61 + 7,51,9,
            64,61 + 7,52,9,
            64,61 + 7,53,9,
            64,61 + 7,54,9,
            64,61 + 7,55,9,
            64,61 + 7,56,9,
            65,61 + 7,46,9,
            65,61 + 7,47,9,
            65,61 + 7,48,9,
            65,61 + 7,49,9,
            65,61 + 7,50,9,
            65,61 + 7,51,9,
            65,61 + 7,52,9,
            65,61 + 7,53,9,
            65,61 + 7,54,9,
            65,61 + 7,55,9,
            65,61 + 7,56,9,
            52,57 + 7,46,9,
            53,57 + 7,46,9,
            54,57 + 7,46,9,
            55,57 + 7,46,9,
            56,57 + 7,46,9,
            57,57 + 7,46,9,
            58,57 + 7,46,9,
            59,57 + 7,46,9,
            60,57 + 7,46,9,
            61,57 + 7,46,9,
            62,57 + 7,46,9,
            63,57 + 7,46,9,
            64,57 + 7,46,9,
            65,57 + 7,46,8,
            65,58 + 7,46,8,
            65,59 + 7,46,8,
            65,60 + 7,46,8,
            52,58 + 7,46,7,
            53,58 + 7,46,7,
            54,58 + 7,46,7,
            55,58 + 7,46,11,
            56,58 + 7,46,11,
            57,58 + 7,46,11,
            58,58 + 7,46,7,
            59,58 + 7,46,7,
            60,58 + 7,46,7,
            61,58 + 7,46,7,
            62,58 + 7,46,7,
            63,58 + 7,46,7,
            64,58 + 7,46,7,
            52,59 + 7,46,7,
            53,59 + 7,46,7,
            54,59 + 7,46,7,
            55,59 + 7,46,7,
            56,59 + 7,46,7,
            57,59 + 7,46,7,
            58,59 + 7,46,7,
            59,59 + 7,46,7,
            60,59 + 7,46,7,
            61,59 + 7,46,7,
            62,59 + 7,46,7,
            63,59 + 7,46,7,
            64,59 + 7,46,7,
            52,60 + 7,46,7,
            53,60 + 7,46,7,
            54,60 + 7,46,7,
            55,60 + 7,46,7,
            56,60 + 7,46,7,
            57,60 + 7,46,7,
            58,60 + 7,46,7,
            59,60 + 7,46,7,
            60,60 + 7,46,7,
            61,60 + 7,46,7,
            62,60 + 7,46,7,
            63,60 + 7,46,7,
            64,60 + 7,46,7,
            52,57 + 7,56,9,
            53,57 + 7,56,9,
            54,57 + 7,56,9,
            55,57 + 7,56,9,
            56,57 + 7,56,9,
            57,57 + 7,56,9,
            58,57 + 7,56,9,
            59,57 + 7,56,9,
            60,57 + 7,56,9,
            61,57 + 7,56,9,
            62,57 + 7,56,9,
            63,57 + 7,56,9,
            64,57 + 7,56,9,
            65,57 + 7,56,8,
            65,58 + 7,56,8,
            65,59 + 7,56,8,
            65,60 + 7,56,8,
            52,58 + 7,56,7,
            53,58 + 7,56,7,
            54,58 + 7,56,7,
            55,58 + 7,56,7,
            56,58 + 7,56,7,
            57,58 + 7,56,7,
            58,58 + 7,56,7,
            59,58 + 7,56,7,
            60,58 + 7,56,7,
            61,58 + 7,56,7,
            62,58 + 7,56,7,
            63,58 + 7,56,7,
            64,58 + 7,56,7,
            52,59 + 7,56,7,
            53,59 + 7,56,7,
            54,59 + 7,56,7,
            55,59 + 7,56,7,
            56,59 + 7,56,7,
            57,59 + 7,56,7,
            58,59 + 7,56,7,
            59,59 + 7,56,7,
            60,59 + 7,56,7,
            61,59 + 7,56,7,
            62,59 + 7,56,7,
            63,59 + 7,56,7,
            64,59 + 7,56,7,
            52,60 + 7,56,7,
            53,60 + 7,56,7,
            54,60 + 7,56,7,
            55,60 + 7,56,7,
            56,60 + 7,56,7,
            57,60 + 7,56,7,
            58,60 + 7,56,7,
            59,60 + 7,56,7,
            60,60 + 7,56,7,
            61,60 + 7,56,7,
            62,60 + 7,56,7,
            63,60 + 7,56,7,
            64,60 + 7,56,7,
            65,57 + 7,47,9,
            65,57 + 7,48,9,
            65,57 + 7,49,9,
            65,57 + 7,50,9,
            65,57 + 7,51,9,
            65,57 + 7,52,9,
            65,57 + 7,53,9,
            65,57 + 7,54,9,
            65,57 + 7,55,9,
            65,58 + 7,47,7,
            65,58 + 7,48,11,
            65,58 + 7,49,11,
            65,58 + 7,50,7,
            65,58 + 7,51,7,
            65,58 + 7,52,7,
            65,58 + 7,53,11,
            65,58 + 7,54,11,
            65,58 + 7,55,7,
            65,59 + 7,47,7,
            65,59 + 7,48,7,
            65,59 + 7,49,7,
            65,59 + 7,50,7,
            65,59 + 7,51,7,
            65,59 + 7,52,7,
            65,59 + 7,53,7,
            65,59 + 7,54,7,
            65,59 + 7,55,7,
            65,60 + 7,47,7,
            65,60 + 7,48,7,
            65,60 + 7,49,7,
            65,60 + 7,50,7,
            65,60 + 7,51,7,
            65,60 + 7,52,7,
            65,60 + 7,53,7,
            65,60 + 7,54,7,
            65,60 + 7,55,7,
            64,57 + 7,51,9,
            63,57 + 7,51,9,
            62,57 + 7,51,9,
            61,57 + 7,51,9,
            60,57 + 7,51,9,
            60,57 + 7,50,9,
            60,57 + 7,49,9,
            60,57 + 7,47,9,
            64,58 + 7,51,7,
            63,58 + 7,51,7,
            62,58 + 7,51,7,
            61,58 + 7,51,7,
            60,58 + 7,51,7,
            60,58 + 7,50,7,
            60,58 + 7,49,7,
            60,58 + 7,47,7,
            64,59 + 7,51,7,
            63,59 + 7,51,7,
            62,59 + 7,51,7,
            61,59 + 7,51,7,
            60,59 + 7,51,7,
            60,59 + 7,50,7,
            60,59 + 7,49,7,
            60,59 + 7,47,7,
            64,60 + 7,51,10,
            63,60 + 7,51,10,
            62,60 + 7,51,10,
            61,60 + 7,51,10,
            60,60 + 7,51,10,
            60,60 + 7,50,10,
            60,60 + 7,49,10,
            60,60 + 7,47,10,
            60,59 + 7,48,7,
            60,60 + 7,48,10,
            64,57 + 7,47,13,
            63,57 + 7,47,13,
            64,57 + 7,48,12,
            63,57 + 7,48,12,
            64,57 + 7,49,12,
            63,57 + 7,49,12,
            61,57 + 7,50,8,
            63,57 + 7,53,7,
            63,57 + 7,54,7,
            62,57 + 7,53,7,
            62,57 + 7,54,7,
            61,57 + 7,53,7,
            61,57 + 7,54,7,
            52,56 + 7,54,0,
            52,56 + 7,55,0,
            53,56 + 7,54,0,
            53,56 + 7,55,0,
            53,55 + 7,54,0,
            53,55 + 7,55,0,
            54,56 + 7,54,0,
            54,56 + 7,55,0,
            54,55 + 7,54,0,
            54,55 + 7,55,0,
            54,54 + 7,54,0,
            54,54 + 7,55,0,
            55,56 + 7,54,0,
            55,56 + 7,55,0,
            55,55 + 7,54,0,
            55,55 + 7,55,0,
            55,54 + 7,54,0,
            55,54 + 7,55,0,
            55,53 + 7,54,0,
            55,53 + 7,55,0,]

        for (let i = 53; i > 3; i--) {
            arr.push(54, i, 54, 0);
            arr.push(54, i, 55, 0);
        }
        for (let z = 46; z <= 56; z++) {
            for(let x = 40; x <= 50; x++) {
                arr.push(x, 56, z, 14);
            }
        }
        for (let i = 0; i < arr.length; i+= 4) {
            this.setBlockId(arr[i] + 10, arr[i + 1], arr[i + 2] + 13, arr[i + 3]);
        }
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