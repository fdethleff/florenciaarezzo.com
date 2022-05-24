import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { GLTFLoader } from "GLTFLoader";

/// Setup

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.getElementById("scene");
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
});

const loadingBar = document.querySelector(".loading-bar");

const loadingManager = new THREE.LoadingManager(
  // Loading complete
  () => {
    gsap.delayedCall(0.5, () => {
      gsap.to(overlayMaterial.uniforms.uAlpha, {
        duration: 3,
        value: 0,
        delay: 1,
      });
      loadingBar.classList.add("ended");
      loadingBar.style.transform = "";
    });
  },
  // Loading progress
  (url, loaded, total) => {
    const progressRatio = loaded / total;
    loadingBar.style.transform = `scaleX(${progressRatio})`;
  }
);

///

const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);
const overlayMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: {
    uAlpha: { value: 1 },
  },
  vertexShader: `
    void main() {
      gl_Position = vec4(position, 1.0);
    }`,
  fragmentShader: `
    uniform float uAlpha;
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }`,
});

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
scene.add(overlay);

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.z = 25;
  return camera;
}

const camera = createCamera();

function createCameraPole(camera) {
  const cameraPole = new THREE.Object3D();
  scene.add(cameraPole);
  cameraPole.add(camera);
  return cameraPole;
}

const cameraPole = createCameraPole(camera);

//
//
//

const gltfLoader = new GLTFLoader(loadingManager);

const asset1 = "assets/meshes/hoodie.gltf";
const asset2 = "assets/meshes/jacket.gltf";
const asset3 = "assets/meshes/pants.gltf";
const asset4 = "assets/meshes/trench.gltf";

let meshObjects = [];

function loadGLTFMesh(assetUrl, x, y, z, scale) {
  gltfLoader.load(assetUrl, function (gltf) {
    gltf.scene.position.set(x, y, z);
    gltf.scene.scale.set(scale, scale, scale);
    meshObjects.push(gltf.scene);
    scene.add(gltf.scene);
  });
}

loadGLTFMesh(asset1, -12, -10, 0, 8);
loadGLTFMesh(asset2, -4, -10, 0, 8);
loadGLTFMesh(asset3, 4, -4, 0, 8);
loadGLTFMesh(asset4, 12, -8, 0, 8);

//
//

function addLights() {
  const keyLight = new THREE.PointLight(0xffffff, 5);
  keyLight.position.set(0, 0, 40);
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

const controls = addControls();

function addHelpers() {
  const size = 100;
  const divisions = 100;
  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);
}

// addHelpers();

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function render(time) {
  time *= 0.001;

  meshObjects.forEach((mesh) => {
    mesh.rotation.y = time * 0.5;
  });

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
