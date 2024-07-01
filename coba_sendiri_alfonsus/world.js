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
        blocks.glass.material.transparent = true;
    }

    generate() {
        const rng = new RNG(this.params.seed);

        // tinggi(y) wallnya dibuat 10, kalo floor tingginya(y) dibuat 0
        this.InitializeTerrain();
        // for (let x = 5; x <= 55; x++) {
        //     for (let z = 0; z <= 0; z++) {
        //         for (let y = 0; y <= 5; y++) { // 1
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 5; x <= 5; x++) {
        //     for (let z = 0; z <= 40; z++) {
        //         for (let y = 0; y <= 5; y++) { // 2
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 30; x <= 30; x++) {
        //     for (let z = 0; z <= 10; z++) {
        //         for (let y = 0; y <= 5; y++) { // 3
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }


        // for (let x = 5; x <= 18; x++) {
        //     for (let z = 10; z <= 50; z++) {
        //         for (let y = 0; y <= 5; y++) { // 4
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 21; x <= 40; x++) {
        //     for (let z = 10; z <= 10; z++) {
        //         for (let y = 0; y <= 5; y++) { // 5
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 43; x <= 55; x++) {
        //     for (let z = 10; z <= 10; z++) {
        //         for (let y = 0; y <= 5; y++) { // 6
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 55; x <= 55; x++) {
        //     for (let z = 0; z <= 4; z++) {
        //         for (let y = 0; y <= 5; y++) { // 7
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 55; x <= 55; x++) {
        //     for (let z = 7; z <= 10; z++) {
        //         for (let y = 0; y <= 5; y++) { // 8
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 55; x <= 90; x++) {
        //     for (let z = 2; z <= 2; z++) {
        //         for (let y = 0; y <= 5; y++) { // 9
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 55; x <= 77; x++) {
        //     for (let z = 9; z <= 9; z++) {
        //         for (let y = 0; y <= 5; y++) { // 10
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 80; x <= 82; x++) {
        //     for (let z = 9; z <= 9; z++) {
        //         for (let y = 0; y <= 5; y++) { // 11
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 82; x <= 82; x++) {
        //     for (let z = 10; z <= 40; z++) {
        //         for (let y = 0; y <= 5; y++) { // 12
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 73; x <= 73; x++) {
        //     for (let z = 10; z <= 28; z++) {
        //         for (let y = 0; y <= 5; y++) { // 13
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 74; x <= 81; x++) {
        //     for (let z = 25; z <= 25; z++) {
        //         for (let y = 0; y <= 5; y++) { // 14
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 73; x <= 81; x++) {
        //     for (let z = 25; z <= 40; z++) {
        //         for (let y = 0; y <= 5; y++) { // 15
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 73; x <= 79; x++) {
        //     for (let z = 45; z <= 60; z++) {
        //         for (let y = 0; y <= 5; y++) { // 15
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 73; x <= 73; x++) {
        //     for (let z = 37; z <= 55; z++) {
        //         for (let y = 0; y <= 5; y++) { // 16
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 72; x <= 72; x++) {
        //     for (let z = 55; z <= 55; z++) {
        //         for (let y = 0; y <= 5; y++) { // 16#1/2
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 71; x <= 71; x++) {
        //     for (let z = 55; z <= 60; z++) {
        //         for (let y = 0; y <= 5; y++) { // 16#2
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 73; x <= 79; x++) {
        //     for (let z = 50; z <= 60; z++) {
        //         for (let y = 0; y <= 5; y++) { // 17
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 80; x <= 80; x++) {
        //     for (let z = 45; z <= 80; z++) {
        //         for (let y = 0; y <= 5; y++) { // 18
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 90; x <= 90; x++) {
        //     for (let z = 2; z <= 55; z++) {
        //         for (let y = 0; y <= 5; y++) { // 19
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 80; x <= 90; x++) {
        //     for (let z = 55; z <= 55; z++) {
        //         for (let y = 0; y <= 5; y++) { // 20
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 71; x <= 76; x++) {
        //     for (let z = 60; z <= 60; z++) {
        //         for (let y = 0; y <= 5; y++) { // 21
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 2; x <= 80; x++) {
        //     for (let z = 81; z <= 81; z++) {
        //         for (let y = 0; y <= 5; y++) { // 22
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 27; x <= 27; x++) {
        //     for (let z = 68; z <= 80; z++) {
        //         for (let y = 0; y <= 5; y++) { // 23
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 27; x <= 37; x++) {
        //     for (let z = 68; z <= 68; z++) {
        //         for (let y = 0; y <= 5; y++) { // 24
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 37; x <= 37; x++) {
        //     for (let z = 53; z <= 68; z++) {
        //         for (let y = 0; y <= 5; y++) { // 25
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 38; x <= 50; x++) {
        //     for (let z = 55; z <= 55; z++) {
        //         for (let y = 0; y <= 5; y++) { // 26
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 53; x <= 70; x++) {
        //     for (let z = 55; z <= 55; z++) {
        //         for (let y = 0; y <= 5; y++) { // 27
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }


        // for (let x = 37; x <= 37; x++) {
        //     for (let z = 21; z <= 50; z++) {
        //         for (let y = 0; y <= 5; y++) { // 32
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 37; x <= 55; x++) {
        //     for (let z = 21; z <= 21; z++) {
        //         for (let y = 0; y <= 5; y++) { // 33
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 58; x <= 73; x++) {
        //     for (let z = 21; z <= 21; z++) {
        //         for (let y = 0; y <= 5; y++) { // 34
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 5; x <= 37; x++) {
        //     for (let z = 21; z <= 80; z++) {
        //         for (let y = 0; y <= 5; y++) { // kotak bawah kiri
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        

        // for (let x = 10; x <= 18; x++) {
        //     for (let z = 47; z <= 73; z++) {
        //         for (let y = 0; y <= 5; y++) { // kotak bawah kanan
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 17; x <= 21; x++) {
        //     for (let z = 55; z <= 68; z++) {
        //         for (let y = 0; y <= 5; y++) { // kotak bawah kanan#2
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 45; x <= 65; x++) {
        //     for (let z = 30; z <= 30; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang utama/tengah
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 45; x <= 65; x++) {
        //     for (let z = 46; z <= 46; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang utama/tengah#2
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 65; x <= 65; x++) {
        //     for (let z = 31; z <= 46; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang utama/tengah#3
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 45; x <= 45; x++) {
        //     for (let z = 31; z <= 36; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang utama/tengah#4
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 45; x <= 45; x++) {
        //     for (let z = 40; z <= 46; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang utama/tengah#5
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 76; x <= 76; x++) {
        //     for (let z = 66; z <= 75; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang atas kanan
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 69; x <= 69; x++) {
        //     for (let z = 66; z <= 75; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang atas kanan#2
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 70; x <= 75; x++) {
        //     for (let z = 66; z <= 66; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang atas kanan#3
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 70; x <= 71; x++) {
        //     for (let z = 75; z <= 75; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang atas kanan#4
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 74; x <= 75; x++) {
        //     for (let z = 75; z <= 75; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang atas kanan#5
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 30; x <= 64; x++) {
        //     for (let z = 60; z <= 80; z++) {
        //         for (let y = 0; y <= 5; y++) { // ruang bawahnya atas kanan
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 28; x <= 28; x++) {
        //     for (let z = 5; z <= 5; z++) {
        //         for (let y = 1; y <= 2; y++) { // bawahnya oldLamp
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 0; x <= 90; x++) {
        //     for (let z = 0; z <= 90; z++) {
        //         for (let y = 0; y <= 0; y++) { // floor
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // for (let x = 0; x <= 90; x++) {
        //     for (let z = 0; z <= 90; z++) {
        //         for (let y = 6; y <= 6; y++) { // ceiling
        //             this.setBlockId(x,y,z, 3);
        //         }
        //     }
        // }

        // this.generateResources(rng);
        this.generateTerrain(rng);
        this.generateHouse();
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
                    //reserved space
                        // if (this.getBlock(x,y,z) != blocks.oakPlank){
                            if ((x > this.size.width/2 - 24 && x < this.size.width/2 + 24) && (z > this.size.width/2 - 24 && z < this.size.width/2 + 24)) {
                                if (y == 56) {
                                    this.setBlockId(x,y,z, blocks.grass.id)
                                }
                                else if (y < 56) {
                                    this.setBlockId(x,y,z, blocks.dirt.id)
                                }
                                else if (y > 56) {
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
                    // }
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
        let arr = [51,57,50,10,
            51,58,50,10,
            51,59,50,10,
            51,59,51,10,
            51,57,52,10,
            51,58,52,10,
            51,59,52,10,
            51,57,49,9,
            51,57,48,9,
            51,57,47,9,
            51,57,53,9,
            51,57,54,9,
            51,57,55,9,
            51,58,49,11,
            51,58,48,11,
            51,58,47,7,
            51,58,53,11,
            51,58,54,11,
            51,58,55,7,
            51,59,49,7,
            51,59,48,7,
            51,59,47,7,
            51,59,53,7,
            51,59,54,7,
            51,59,55,7,
            51,60,47,7,
            51,60,48,7,
            51,60,49,7,
            51,60,50,7,
            51,60,51,7,
            51,60,52,7,
            51,60,53,7,
            51,60,54,7,
            51,60,55,7,
            51,57,46,8,
            51,58,46,8,
            51,59,46,8,
            51,60,46,8,
            51,57,56,8,
            51,58,56,8,
            51,59,56,8,
            51,60,56,8,
            51,61,46,9,
            51,61,47,9,
            51,61,48,9,
            51,61,49,9,
            51,61,50,9,
            51,61,51,9,
            51,61,52,9,
            51,61,53,9,
            51,61,54,9,
            51,61,55,9,
            51,61,56,9,
            52,61,46,9,
            52,61,47,9,
            52,61,48,9,
            52,61,49,9,
            52,61,50,9,
            52,61,51,9,
            52,61,52,9,
            52,61,53,9,
            52,61,54,9,
            52,61,55,9,
            52,61,56,9,
            53,61,46,9,
            53,61,47,9,
            53,61,48,9,
            53,61,49,9,
            53,61,50,9,
            53,61,51,9,
            53,61,52,9,
            53,61,53,9,
            53,61,54,9,
            53,61,55,9,
            53,61,56,9,
            54,61,46,9,
            54,61,47,9,
            54,61,48,9,
            54,61,49,9,
            54,61,50,9,
            54,61,51,9,
            54,61,52,9,
            54,61,53,9,
            54,61,54,9,
            54,61,55,9,
            54,61,56,9,
            55,61,46,9,
            55,61,47,9,
            55,61,48,9,
            55,61,49,9,
            55,61,50,9,
            55,61,51,9,
            55,61,52,9,
            55,61,53,9,
            55,61,54,9,
            55,61,55,9,
            55,61,56,9,
            56,61,46,9,
            56,61,47,9,
            56,61,48,9,
            56,61,49,9,
            56,61,50,9,
            56,61,51,9,
            56,61,52,9,
            56,61,53,9,
            56,61,54,9,
            56,61,55,9,
            56,61,56,9,
            57,61,46,9,
            57,61,47,9,
            57,61,48,9,
            57,61,49,9,
            57,61,50,9,
            57,61,51,9,
            57,61,52,9,
            57,61,53,9,
            57,61,54,9,
            57,61,55,9,
            57,61,56,9,
            58,61,46,9,
            58,61,47,9,
            58,61,48,9,
            58,61,49,9,
            58,61,50,9,
            58,61,51,9,
            58,61,52,9,
            58,61,53,9,
            58,61,54,9,
            58,61,55,9,
            58,61,56,9,
            59,61,46,9,
            59,61,47,9,
            59,61,48,9,
            59,61,49,9,
            59,61,50,9,
            59,61,51,9,
            59,61,52,9,
            59,61,53,9,
            59,61,54,9,
            59,61,55,9,
            59,61,56,9,
            60,61,46,9,
            60,61,47,9,
            60,61,48,9,
            60,61,49,9,
            60,61,50,9,
            60,61,51,9,
            60,61,52,9,
            60,61,53,9,
            60,61,54,9,
            60,61,55,9,
            60,61,56,9,
            61,61,46,9,
            61,61,47,9,
            61,61,48,9,
            61,61,49,9,
            61,61,50,9,
            61,61,51,9,
            61,61,52,9,
            61,61,53,9,
            61,61,54,9,
            61,61,55,9,
            61,61,56,9,
            62,61,46,9,
            62,61,47,9,
            62,61,48,9,
            62,61,49,9,
            62,61,50,9,
            62,61,51,9,
            62,61,52,9,
            62,61,53,9,
            62,61,54,9,
            62,61,55,9,
            62,61,56,9,
            63,61,46,9,
            63,61,47,9,
            63,61,48,9,
            63,61,49,9,
            63,61,50,9,
            63,61,51,9,
            63,61,52,9,
            63,61,53,9,
            63,61,54,9,
            63,61,55,9,
            63,61,56,9,
            64,61,46,9,
            64,61,47,9,
            64,61,48,9,
            64,61,49,9,
            64,61,50,9,
            64,61,51,9,
            64,61,52,9,
            64,61,53,9,
            64,61,54,9,
            64,61,55,9,
            64,61,56,9,
            65,61,46,9,
            65,61,47,9,
            65,61,48,9,
            65,61,49,9,
            65,61,50,9,
            65,61,51,9,
            65,61,52,9,
            65,61,53,9,
            65,61,54,9,
            65,61,55,9,
            65,61,56,9,
            52,57,46,9,
            53,57,46,9,
            54,57,46,9,
            55,57,46,9,
            56,57,46,9,
            57,57,46,9,
            58,57,46,9,
            59,57,46,9,
            60,57,46,9,
            61,57,46,9,
            62,57,46,9,
            63,57,46,9,
            64,57,46,9,
            65,57,46,8,
            65,58,46,8,
            65,59,46,8,
            65,60,46,8,
            52,58,46,7,
            53,58,46,7,
            54,58,46,7,
            55,58,46,11,
            56,58,46,11,
            57,58,46,11,
            58,58,46,7,
            59,58,46,7,
            60,58,46,7,
            61,58,46,7,
            62,58,46,7,
            63,58,46,7,
            64,58,46,7,
            52,59,46,7,
            53,59,46,7,
            54,59,46,7,
            55,59,46,7,
            56,59,46,7,
            57,59,46,7,
            58,59,46,7,
            59,59,46,7,
            60,59,46,7,
            61,59,46,7,
            62,59,46,7,
            63,59,46,7,
            64,59,46,7,
            52,60,46,7,
            53,60,46,7,
            54,60,46,7,
            55,60,46,7,
            56,60,46,7,
            57,60,46,7,
            58,60,46,7,
            59,60,46,7,
            60,60,46,7,
            61,60,46,7,
            62,60,46,7,
            63,60,46,7,
            64,60,46,7,
            52,57,56,9,
            53,57,56,9,
            54,57,56,9,
            55,57,56,9,
            56,57,56,9,
            57,57,56,9,
            58,57,56,9,
            59,57,56,9,
            60,57,56,9,
            61,57,56,9,
            62,57,56,9,
            63,57,56,9,
            64,57,56,9,
            65,57,56,8,
            65,58,56,8,
            65,59,56,8,
            65,60,56,8,
            52,58,56,7,
            53,58,56,7,
            54,58,56,7,
            55,58,56,7,
            56,58,56,7,
            57,58,56,7,
            58,58,56,7,
            59,58,56,7,
            60,58,56,7,
            61,58,56,7,
            62,58,56,7,
            63,58,56,7,
            64,58,56,7,
            52,59,56,7,
            53,59,56,7,
            54,59,56,7,
            55,59,56,7,
            56,59,56,7,
            57,59,56,7,
            58,59,56,7,
            59,59,56,7,
            60,59,56,7,
            61,59,56,7,
            62,59,56,7,
            63,59,56,7,
            64,59,56,7,
            52,60,56,7,
            53,60,56,7,
            54,60,56,7,
            55,60,56,7,
            56,60,56,7,
            57,60,56,7,
            58,60,56,7,
            59,60,56,7,
            60,60,56,7,
            61,60,56,7,
            62,60,56,7,
            63,60,56,7,
            64,60,56,7,
            65,57,47,9,
            65,57,48,9,
            65,57,49,9,
            65,57,50,9,
            65,57,51,9,
            65,57,52,9,
            65,57,53,9,
            65,57,54,9,
            65,57,55,9,
            65,58,47,7,
            65,58,48,11,
            65,58,49,11,
            65,58,50,7,
            65,58,51,7,
            65,58,52,7,
            65,58,53,11,
            65,58,54,11,
            65,58,55,7,
            65,59,47,7,
            65,59,48,7,
            65,59,49,7,
            65,59,50,7,
            65,59,51,7,
            65,59,52,7,
            65,59,53,7,
            65,59,54,7,
            65,59,55,7,
            65,60,47,7,
            65,60,48,7,
            65,60,49,7,
            65,60,50,7,
            65,60,51,7,
            65,60,52,7,
            65,60,53,7,
            65,60,54,7,
            65,60,55,7,
            64,57,51,9,
            63,57,51,9,
            62,57,51,9,
            61,57,51,9,
            60,57,51,9,
            60,57,50,9,
            60,57,49,9,
            60,57,47,9,
            64,58,51,7,
            63,58,51,7,
            62,58,51,7,
            61,58,51,7,
            60,58,51,7,
            60,58,50,7,
            60,58,49,7,
            60,58,47,7,
            64,59,51,7,
            63,59,51,7,
            62,59,51,7,
            61,59,51,7,
            60,59,51,7,
            60,59,50,7,
            60,59,49,7,
            60,59,47,7,
            64,60,51,10,
            63,60,51,10,
            62,60,51,10,
            61,60,51,10,
            60,60,51,10,
            60,60,50,10,
            60,60,49,10,
            60,60,47,10,
            60,59,48,7,
            60,60,48,10,
            64,57,47,13,
            63,57,47,13,
            64,57,48,12,
            63,57,48,12,
            64,57,49,12,
            63,57,49,12,
            61,57,50,8,
            63,57,53,7,
            63,57,54,7,
            62,57,53,7,
            62,57,54,7,
            61,57,53,7,
            61,57,54,7,
            52,56,54,0,
            52,56,55,0,
            53,56,54,0,
            53,56,55,0,
            53,55,54,0,
            53,55,55,0,
            54,56,54,0,
            54,56,55,0,
            54,55,54,0,
            54,55,55,0,
            54,54,54,0,
            54,54,55,0,]

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