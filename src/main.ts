import * as THREE from 'three';
import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';

const mindarThree = new MindARThree({
	container: document.querySelector("#container"),
	imageTargetSrc: "https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind",
    maxTrack: undefined
});
const {renderer, scene, camera} = mindarThree;
const anchor = mindarThree.addAnchor(0);
const geometry = new THREE.PlaneGeometry(1, 0.55);
const material = new THREE.MeshBasicMaterial( {color: 0x00ffff, transparent: true, opacity: 0.5} );
const plane = new THREE.Mesh( geometry, material );
anchor.group.add(plane.clone());
const start = async() => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}
const startButton = document.getElementById("startButton") as HTMLButtonElement;
startButton.addEventListener("click", () => {
    start();
});
const stopButton = document.getElementById("startButton") as HTMLButtonElement;
stopButton.addEventListener("click", () => {
    mindarThree.stop();
    mindarThree.renderer.setAnimationLoop(null);
});