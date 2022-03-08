import left from "../assets/leftImage.png";
import right from "../assets/rightImage.png";
import back from "../assets/backImage.png";
import forward from "../assets/frontImage.png";
import end from "../assets/endImage.png";
import * as THREE from 'three';
import { Texture, TextureLoader } from "three";
import * as ZapparThree from '@zappar/zappar-threejs';



export class Direction {
    textureLoader:THREE.TextureLoader|null = null;
    left:THREE.Sprite|null = null;
    right:THREE.Sprite|null = null;
    back:THREE.Sprite|null = null;
    forward: THREE.Sprite|null = null;
    end: THREE.Sprite|null = null;

    activeGroup:THREE.Group|null = null;

    constructor() {
        this.loadMaterials();
    }
    loadMaterials() {
        this.textureLoader = new THREE.TextureLoader();
        var leftImage = this.textureLoader.load(left);
        var leftMaterial = new THREE.SpriteMaterial({map: leftImage, color: 0xfff});
        this.left = new THREE.Sprite(leftMaterial);
        var rightImage = new TextureLoader().load(right);
        var rightMaterial = new THREE.SpriteMaterial({map: rightImage, color: 0xfff});
        this.right = new THREE.Sprite(rightMaterial);
        var backImage = new TextureLoader().load(back);
        var backMaterial = new THREE.SpriteMaterial({map: backImage, color: 0xfff});
        this.back = new THREE.Sprite(backMaterial);
        var frontImage = new TextureLoader().load(forward);
        var frontMaterial = new THREE.SpriteMaterial({map: frontImage, color: 0xfff});
        this.forward = new THREE.Sprite(frontMaterial);
        var endImage = new TextureLoader().load(end);
        var endMaterial = new THREE.SpriteMaterial({map: endImage, color: 0xfff});
        this.end = new THREE.Sprite(endMaterial);
    }

    clearActiveGroup() {
        this.activeGroup?.clear();
    }

    createLeft(group: ZapparThree.ImageAnchorGroup) {
        this.clearActiveGroup();
        group.add(this.left!);
        this.activeGroup = group;
    }
    createRight(group: ZapparThree.ImageAnchorGroup) {
        this.clearActiveGroup();
        group.add(this.right!);
        this.activeGroup = group;
    }
    createForward(group: ZapparThree.ImageAnchorGroup) {
        this.clearActiveGroup();
        group.add(this.forward!);
        this.activeGroup = group;
    }
    
    createBack(group: ZapparThree.ImageAnchorGroup) {
        this.clearActiveGroup();
        group.add(this.back!);
        this.activeGroup = group;
    }
    createEnd(group: ZapparThree.ImageAnchorGroup) {
        this.clearActiveGroup();
        group.add(this.end!);
        this.activeGroup = group;
    }
}

export const directions = new Direction();