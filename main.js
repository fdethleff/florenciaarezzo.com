import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { GLTFLoader } from "GLTFLoader";

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("scene-container"),
  alpha: true,
});

//
// Camera
//

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 25;
const cameraPole = new THREE.Object3D();
scene.add(cameraPole);
cameraPole.add(camera);

//
// Mesh objects
//

const loader = new GLTFLoader();
const asset1 = "assets/meshes/hoodie.gltf";
const asset2 = "assets/meshes/JACKET.gltf";
const asset3 = "assets/meshes/PANTS.gltf";
const asset4 = "assets/meshes/TRENCH.gltf";

let meshes = [];

function loadMesh(assetUrl, x, y, z, scale) {
  loader.load(assetUrl, function (gltf) {
    gltf.scene.position.set(x, y, z);
    gltf.scene.scale.set(scale, scale, scale);
    meshes.push(gltf.scene);
    scene.add(gltf.scene);
  });
}

loadMesh(asset1, -12, -10, 0, 8);
loadMesh(asset2, -4, -10, 0, 8);
loadMesh(asset3, 4, -4, 0, 8);
loadMesh(asset4, 12, -8, 0, 8);

//
// Lights
//

function addLights() {
  const keyLight = new THREE.PointLight(0xffffff, 5);
  keyLight.position.set(0, 0, 30);
  scene.add(keyLight);

  const cameraLight = new THREE.DirectionalLight(0xffffff, 10);
  cameraPole.add(cameraLight);
}

addLights();

function addControls() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  controls.autoRotateSpeed = 0.2;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 2;
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);
  return controls;
}

function addHelpers() {
  const size = 100;
  const divisions = 100;
  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  // const keylightHelper = new THREE.PointLightHelper(keyLight, 5, 0xff0000);
  // scene.add(keylightHelper);

  // const spotLightHelper = new THREE.DirectionalLightHelper(spotLight);
  // scene.add(spotLightHelper);
}

// addHelpers();

// Setup

const controls = addControls();

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function render(time) {
  time *= 0.001;

  meshes.forEach((mesh) => {
    mesh.rotation.y = time * 0.5;
  });

  // cameraPole.position.x = Math.sin(time) * 1;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
