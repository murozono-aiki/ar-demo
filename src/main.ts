import * as THREE from 'three';
import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';

import markerMindUrl from './markers/ar-images.mind?url';

const mindarThree = new MindARThree({
	container: document.querySelector("#container"),
	imageTargetSrc: markerMindUrl,
    maxTrack: 2
});
const {renderer, scene, camera} = mindarThree;
const anchor1 = mindarThree.addAnchor(0);
const anchor2 = mindarThree.addAnchor(1);

const geometry = new THREE.PlaneGeometry(1, 0.55);
const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
const plane = new THREE.Mesh(geometry, material);
anchor1.group.add(plane);

const boxGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
const box = new THREE.Mesh(boxGeometry, material);
anchor1.group.add(box);
box.translateZ(1);

const sphereGeometry = new THREE.SphereGeometry(0.4);
const sphere = new THREE.Mesh(sphereGeometry, material);
anchor2.group.add(sphere);


const angularVelocity = 0.002;

const start = async() => {
    await mindarThree.start();
    renderer.setAnimationLoop(time => {
        box.position.z = Math.cos(angularVelocity * time);
        sphere.position.z = -Math.cos(angularVelocity * time);
        renderer.render(scene, camera);
    });
}
const startButton = document.getElementById("startButton") as HTMLButtonElement;
startButton.addEventListener("click", () => {
    start();
});
const stopButton = document.getElementById("stopButton") as HTMLButtonElement;
stopButton.addEventListener("click", () => {
    mindarThree.stop();
    renderer.setAnimationLoop(null);
});