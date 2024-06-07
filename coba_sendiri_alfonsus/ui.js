import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import {  resources } from './blocks.js';

export function createUI(world, player, scene) {
    const gui = new GUI();

    const playerFolder = gui.addFolder('Player');
    playerFolder.add(player, 'maxSpeed', 1, 20).name('Max Speed');
    playerFolder.add(player.cameraHelper, 'visible').name('Show Camera Helper');
    playerFolder.add(player.boundsHelper, 'visible').name('Show Bound Helper');
    playerFolder.add(scene.shadowHelper, 'visible').name('Show Shadow Helper');
    
    const terrainFolder = gui.addFolder("Terrain");
    terrainFolder.add(world.size, 'width', 8, 512, 1).name("Width");
    terrainFolder.add(world.size, 'height', 8, 128, 1).name("Height");
    terrainFolder.add(world.params, 'seed', 0, 10000).name('Seed')
    terrainFolder.add(world.params.terrain, 'scale', 10, 100).name('Scale');
    terrainFolder.add(world.params.terrain, 'magnitude', 0, 1).name('Magnitude');
    terrainFolder.add(world.params.terrain, 'offset', 0, 1).name('Offset');

    const resourcesFolder = terrainFolder.addFolder('Resources');

    resources.forEach(resource => {
        const resourceFolder = resourcesFolder.addFolder(resource.name);
        resourceFolder.add(resource, 'scarcity', 0, 1).name('Scarcity');

        const scaleFolder = resourceFolder.addFolder('Scale');
        scaleFolder.add(resource.scale, 'x', 10, 100).name('X Scale');
        scaleFolder.add(resource.scale, 'y', 10, 100).name('Y Scale');
        scaleFolder.add(resource.scale, 'z', 10, 100).name('Z Scale');
    });
    
    const treesFolder = terrainFolder.addFolder('Trees').close();

    treesFolder.add(world.params.trees, 'frequency', 0, 0.1).name('Frequency');
    treesFolder.add(world.params.trees.trunk, 'minHeight', 0, 10, 1).name('Min Trunk Height');
    treesFolder.add(world.params.trees.trunk, 'maxHeight', 0, 10, 1).name('max Trunk Height');
    treesFolder.add(world.params.trees.canopy, 'minRadius', 0, 10, 1).name('Min Canopy Size');
    treesFolder.add(world.params.trees.canopy, 'maxRadius', 0, 10, 1).name('Max Canopy Size');
    treesFolder.add(world.params.trees.canopy, 'density', 0, 1).name('Canopy Density');

    const cloudsFolder = terrainFolder.addFolder('Clouds').close();

    cloudsFolder.add(world.params.clouds, 'scale', 0, 100).name('Cloud Size');
    cloudsFolder.add(world.params.clouds, 'density', 0, 1).name('Cloud Cover');

    gui.onChange(() => {
        world.generate();
    });
}