import * as ZapparThree from '@zappar/zappar-threejs';
import * as THREE from 'three';
import {pointIdToPoint} from "./services";
import {currentRouteStore} from "./currentRoute";
import { ViewedPoints } from './viewedPointsManagement';


if (ZapparThree.browserIncompatible()) {
  ZapparThree.browserIncompatibleUI();
  throw new Error('Unsupported browser');
}


export const manager = new ZapparThree.LoadingManager();

const renderer = new THREE.WebGLRenderer({ antialias: true });
export const scene = new THREE.Scene();
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

export const camera = new ZapparThree.Camera();

ZapparThree.permissionRequestUI().then((granted) => {
  if (granted) camera.start();
  else ZapparThree.permissionDeniedUI();
});

ZapparThree.glContextSet(renderer.getContext());

scene.background = camera.backgroundTexture;

manager.onError = (url) => console.log(`There was an error loading ${url}`);


const urlParams = new URLSearchParams(window.location.search);
const points = JSON.parse(urlParams.get("points")!);
const startingPoint = JSON.parse(urlParams.get("starting_point")!);
export const viewedPoints = new ViewedPoints(points);

currentRouteStore.setShortestPathToRoutes(parseInt(startingPoint), parseInt(points[0]));


const raycaster = new THREE.Raycaster();

function render(): void {
  camera.updateFrame(renderer);
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
