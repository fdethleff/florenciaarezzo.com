import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const rtWidth = 1000;
  const rtHeight = 1000;
  const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);

  const rtFov = 75;
  const rtAspect = rtWidth / rtHeight;
  const rtNear = 0.1;
  const rtFar = 5;
  const rtCamera = new THREE.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
  rtCamera.position.z = 1.8;
  rtCamera.position.y = 3;

  const rtScene = new THREE.Scene();
  rtScene.background = new THREE.Color("orange");

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    rtScene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const loader = new GLTFLoader();

  function makeObject(x) {
    let meshObject = new THREE.Object3D();
    loader.load("assets/meshes/hoodie.gltf", function (gltf) {
      const mesh = gltf.scene.children[0];
      rtScene.add(mesh);
      mesh.position.set(x, 0, 0);
      mesh.scale.set(2, 2, 2);
      meshObject = mesh;
    });
    return meshObject;
  }

  const rtObjects = [makeObject(0), makeObject(-2), makeObject(2)];

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const material = new THREE.MeshPhongMaterial({
    map: renderTarget.texture,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // rotate all the cubes in the render target scene
    rtObjects.forEach((object) => {
      object.rotation.x = time;
    });

    // draw render target scene to render target
    renderer.setRenderTarget(renderTarget);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);

    // rotate the cube in the scene
    cube.rotation.y = time * 0.1;

    // render the scene to the canvas
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
