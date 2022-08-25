import * as THREE from 'three';
import { OrbitControls } from 'orbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { DRACOLoader } from 'DRACOLoader';
import { TetrahedronGeometry } from 'three';


let camera, scene, renderer, strongLight, lowLight, noLight, controls;
let model1 = '../assets/models/220823_Windbreaker_DAY.glb';
let model2 = '../assets/models/220823_Windbreaker_NIGHT.glb';
let model3 = '../assets/models/220823_Windbreaker_REFLECTIVE.glb';



init();


function init() {

    // DOM elements
    const container = document.getElementById('canvas');


    // Camera
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 15 );
    camera.position.x = 1.7;
    camera.position.z = 1.7;
    camera.position.y = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    // Scene
    scene = new THREE.Scene();


    // Lights
    // strongLight = new THREE.PointLight(0xffee88, 30, 100, 2);
    strongLight = new THREE.SpotLight(0xFFFFFF, 30, 100, 2);
    strongLight.position.set(1, 2, 1);
    lowLight = new THREE.SpotLight(0xFFFFFF, 2, 100, 2);
    lowLight.position.set(1, 2, 1);
    noLight = new THREE.SpotLight(0xffee88, 0, 100, 2);
    noLight.position.set(1, 2, 1);

    scene.add(strongLight);
    
    function setStrongLight() {
        scene.remove(lowLight);
        scene.remove(noLight);
        scene.add(strongLight);
    }

    function setLowLight() {
        scene.remove(strongLight);
        scene.remove(noLight);
        scene.add(lowLight);
    }

    function setNoLight() {
        scene.remove(strongLight);
        scene.remove(lowLight);
        scene.add(noLight);
    }
    


    // Models
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader( dracoLoader );

    function loadModel(model) {
        loader.load(
            model, function ( glb ) {
                // remove all group objects from the scene
                for (var child in scene.children) {
                    if (scene.children[child].type === 'Group') {
                        scene.remove(scene.children[child]);
                    }
                }
                const model = glb.scene;
                model.scale.set(1, 1, 1);
                model.position.set(0, -1.35, 0);
                scene.add( model );
                dracoLoader.dispose();
            },
        );
    }

    loadModel(model1);

    document.getElementById('day').addEventListener('click', function (element, event) {
        loadModel(model1);
        setStrongLight();
        
        document.getElementById('day').classList.add('active-button');
        document.getElementById('day').classList.remove('inactive-button');
        document.getElementById('night').classList.remove('active-button');
        document.getElementById('night').classList.add('inactive-button');
        document.getElementById('reflective').classList.add('inactive-button');
        document.getElementById('reflective').classList.remove('active-button');
    });

    document.getElementById('night').addEventListener('click', function (element, event) {
        loadModel(model2);
        setNoLight();
        
        document.getElementById('day').classList.remove('active-button');
        document.getElementById('day').classList.add('inactive-button');
        document.getElementById('night').classList.add('active-button');
        document.getElementById('night').classList.remove('inactive-button');
        document.getElementById('reflective').classList.add('inactive-button');
        document.getElementById('reflective').classList.remove('active-button');
    });

    document.getElementById('reflective').addEventListener('click', function (element, event) {
        loadModel(model3);
        setLowLight();
        
        document.getElementById('day').classList.remove('active-button');
        document.getElementById('day').classList.add('inactive-button');
        document.getElementById('night').classList.remove('active-button');
        document.getElementById('night').classList.add('inactive-button');
        document.getElementById('reflective').classList.remove('inactive-button');
        document.getElementById('reflective').classList.add('active-button');
    });



    //Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 2.5;
    controls.autoRotate = true;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minPolarAngle = 0;

    // Axes
    const axesHelper = new THREE.AxesHelper( 0.5 );
    axesHelper.setColors( 0xFFFFFF, 0xFFFFFF, 0xFFFFFF );
    // scene.add( axesHelper );


    // Handle viewport resize
    window.addEventListener('resize', onWindowResize);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    const timer = Date.now() * 0.0005;
    strongLight.position.x = Math.sin(timer * 2) +1;
    lowLight.position.x = Math.sin(timer * 2) +1;
    renderer.render( scene, camera );
}