import * as THREE from 'three';
import { OakLeavesBlock } from './oakLeavesBlock.js'; 
import { OakLogBlock } from './oakLogBlock.js';

export class OakTree extends THREE.Group { // Extend THREE.Group to hold multiple blocks
    constructor(blockSize, treeHeight) {
        super(); // Call the constructor of THREE.Group
        for(let i = 0; i < treeHeight; i++) {
            const oakLogBlock = new OakLogBlock(blockSize);
            oakLogBlock.position.y = i * blockSize; 
            oakLogBlock.castShadow = true;
            oakLogBlock.receiveShadow = true;
            this.add(oakLogBlock); // Add the block to the group
        }
        for(let j = 0; j < 8; j++) {
            for(let i = 0; i < 8; i++) { // layer pertama dari bawah
                for(let j = 0; j < 8; j++) {
                    const oakLeavesBlock = new OakLeavesBlock(blockSize);
                    oakLeavesBlock.position.set(i-3.5, treeHeight*2, j-3.5);
                    oakLeavesBlock.castShadow = true;
                    oakLeavesBlock.receiveShadow = true;
                    this.add(oakLeavesBlock); // Add the block to the group
                }
            }
        }
        for(let i = 0; i < 8; i++) { // layer kedua dari bawah
            for(let j = 0; j < 8; j++) {
                const oakLeavesBlock = new OakLeavesBlock(blockSize);
                oakLeavesBlock.position.set(i-3.5, treeHeight*2+blockSize, j-3.5);
                oakLeavesBlock.castShadow = true;
                oakLeavesBlock.receiveShadow = true;
                this.add(oakLeavesBlock); // Add the block to the group
            }
        }
        for(let i = 0; i < 4; i++) { // layer ketiga dari bawah
            for(let j = 0; j < 4; j++) {
                const oakLeavesBlock = new OakLeavesBlock(blockSize);
                oakLeavesBlock.position.set(i-1.5, treeHeight*2+blockSize+blockSize/1.5, j-1.5);
                oakLeavesBlock.castShadow = true;
                oakLeavesBlock.receiveShadow = true;
                this.add(oakLeavesBlock); // Add the block to the group
            }
        }
        for(let i = 0; i < 2; i++) { // layer terakhir
            for(let j = 0; j < 2; j++) {
                const oakLeavesBlock = new OakLeavesBlock(blockSize);
                oakLeavesBlock.position.set(i-0.5, treeHeight*2+blockSize+blockSize/1.5+blockSize/2, j-0.5);
                oakLeavesBlock.castShadow = true;
                oakLeavesBlock.receiveShadow = true;
                this.add(oakLeavesBlock); // Add the block to the group
            }
        }
    }
}
