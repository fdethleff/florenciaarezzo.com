import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { GLTFLoader } from "GLTFLoader";

// Constants

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
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Camera

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 15);
camera.aspect = sizes.width / sizes.height;
camera.updateProjectionMatrix();

// Mesh objects

const loader = new GLTFLoader();
const assetUrl = "assets/meshes/hoodie.gltf";

const frontX = 0;
const frontY = -14;
const frontZ = 0;

const backLeftX = 10;
const backLeftY = -14;
const backLeftZ = -10;

const backRightX = -10;
const backRightY = -14;
const backRightZ = -10;

loader.load(assetUrl, function (gltf) {
  gltf.scene.position.set(frontX, frontY, frontZ);
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

loader.load(assetUrl, function (gltf) {
  gltf.scene.position.set(backLeftX, backLeftY, backLeftZ);
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

loader.load(assetUrl, function (gltf) {
  gltf.scene.position.set(backRightX, backRightY, backRightZ);
  gltf.scene.scale.set(10, 10, 10);
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
// const textureloader = new THREE.TextureLoader();
// textureloader.load("assets/images/scene-background.png", function (texture) {
//   scene.background = texture;
// });

// Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

// controls.autoRotateSpeed = 0.2;
// controls.enablePan = false;
// controls.maxPolarAngle = Math.PI / 2;
// controls.minPolarAngle = Math.PI / 2;
// controls.enableDamping = true;

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

let scrollY = window.scrollY;

window.addEventListener("scroll", function () {
  scrollY = window.scrollY;
  console.log(scrollY);
});
