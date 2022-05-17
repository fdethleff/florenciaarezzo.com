import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { FBXLoader } from "FBXLoader";
import { GLTFLoader } from "GLTFLoader";

// Constants

const heightScaleFactor = 1;

// Scene

const scene = new THREE.Scene();

// Viewport dimensions

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Renderer

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("scene-container"),
});

// Camera

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-5, -10, 12);

// Mesh objects

const loader = new GLTFLoader();
const assetUrl = "assets/meshes/hoodie.gltf";

loader.load(assetUrl, function (gltf) {
  gltf.scene.position.set(-8, -15, 0);
  gltf.scene.scale.set(10, 10 / heightScaleFactor, 10);
  scene.add(gltf.scene);
});

loader.load(assetUrl, function (gltf) {
  gltf.scene.position.set(-24, -15, -20);
  gltf.scene.scale.set(10, 10 / heightScaleFactor, 10);
  scene.add(gltf.scene);
});

loader.load(assetUrl, function (gltf) {
  gltf.scene.position.set(-4, -15, -20);
  gltf.scene.scale.set(10, 10 / heightScaleFactor, 10);
  scene.add(gltf.scene);
});

// Light

const keyLight = new THREE.PointLight(0xffffff, 5);
keyLight.position.set(0, 0, 30);
scene.add(keyLight);

const spotLight = new THREE.DirectionalLight(0xffffff, 5);
spotLight.position.set(0, 30, 0);
scene.add(spotLight);

// Background

//Load background texture
const textureloader = new THREE.TextureLoader();
textureloader.load("assets/images/scene-background.png", function (texture) {
  scene.background = texture;
});

// Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.2;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;

// Helpers

// const size = 100;
// const divisions = 100;
// const gridHelper = new THREE.GridHelper(size, divisions);
// scene.add(gridHelper);

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// const keylightHelper = new THREE.PointLightHelper(keyLight, 5, 0xff0000);
// scene.add(keylightHelper);

// const spotLightHelper = new THREE.DirectionalLightHelper(spotLight);
// scene.add(spotLightHelper);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
