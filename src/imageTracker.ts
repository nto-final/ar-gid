import * as ZapparThree from '@zappar/zappar-threejs';
import * as THREE from 'three';
import {directions} from "./directions";
import {currentRouteStore} from "./currentRoute"; 
import {manager, scene, camera} from "./index";


class ImageTrackerAndLoader {
    imageTracker:ZapparThree.ImageTracker|null = null;
    imageTrackerGroup:ZapparThree.ImageAnchorGroup|null = null;
    create(targetImage: string, direction: string) {
        this.clearTrackerAndGroup();
        this.imageTracker = new ZapparThree.ImageTrackerLoader(manager).load(targetImage);
        const imageTrackerGroup = new ZapparThree.ImageAnchorGroup(camera, this.imageTracker);
        scene.add(imageTrackerGroup);
        imageTrackerGroup.add(new THREE.AmbientLight(0xffffff));
        
        switch(direction) {
            case "R":
                directions.createRight(imageTrackerGroup);
                break;
            case "L":
                directions.createLeft(imageTrackerGroup);
                break;
            case "U":
                directions.createForward(imageTrackerGroup);
                break;
            case "D":
                directions.createBack(imageTrackerGroup);
                break;
            case "END":
                directions.createEnd(imageTrackerGroup);
        }
        this.imageTracker.onVisible.bind(() => { scene.visible = true; });
        this.imageTracker.onNotVisible.bind(() => {
            if (scene.visible == true) {
                currentRouteStore.incrementRouteId();
            } 
            scene.visible = false; 
        });
    }
    clearTrackerAndGroup() {
        this.imageTracker?.destroy();
        this.imageTrackerGroup?.clear();
    }
    constructor(){};
}

export const imageTracker = new ImageTrackerAndLoader();