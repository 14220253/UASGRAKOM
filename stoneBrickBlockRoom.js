import * as THREE from 'three';
import { Block } from './block.js';

export class StoneBrickBlockRoom extends THREE.Group { // Extend THREE.Group to hold multiple blocks
    constructor(length, width) {
        super(); 
        const count = 2 * length + 2 * (width - 2);
        for(let i = 0; i < length; i++) {
            for(let j = 0; i < width; j++) {
                if (i == 0 || i == length - 1 || j == 0 || j == width - 1) {
                    
                }
            }
        }
    }
}
