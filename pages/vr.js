import * as THREE from 'three';
import { OrbitControls } from 'orbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { DRACOLoader } from 'DRACOLoader';
import {EffectComposer} from 'EffectComposer';
import {RenderPass} from 'RenderPass';
import {UnrealBloomPass} from 'UnrealBloomPass';



let camera, scene, renderScene, renderer, strongLight, lowLight, noLight, controls, composer, clock, models;

init();


function init() {

    models = [
        '../assets/models/220823_Windbreaker_DAY.glb',
        '../assets/models/220823_Windbreaker_NIGHT.glb',
        '../assets/models/220823_Windbreaker_REFLECTIVE.glb'
    ];

    // DOM elements
    const container = document.getElementById('canvas');


    // Update clock
    clock = new THREE.Clock();


    // Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    // renderer.toneMapping = THREE.ReinhardToneMapping;
    container.appendChild( renderer.domElement );


    // Scene
    scene = new THREE.Scene();


    // Camera
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 15 );
    camera.position.x = 1.7;
    camera.position.z = 1.7;
    camera.position.y = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);


    // Bloom
    renderScene = new RenderPass( scene, camera );
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 5, 0.4, 0.85 );
    bloomPass.threshold = 1;
    bloomPass.strength = 3;
    bloomPass.radius = 1;
    composer = new EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( bloomPass );


    // Lights
    strongLight = new THREE.SpotLight(0xFFFFFF, 30, 0, Math.PI / 2, 1);
    strongLight.position.set(0, 3, 1);
    lowLight = new THREE.SpotLight(0xFFFFFF, 1, 100, 2);
    lowLight.position.set(1, 3, 1);
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
    
    
    // Load models
    const loadingManager = new THREE.LoadingManager();
    const loader = new GLTFLoader(loadingManager);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader( dracoLoader );

    function loadModel(model) {
        loadingManager.onLoad = () => {
            const el = document.getElementById( 'loading-screen' );
            el.classList.add( 'visible' );
            el.classList.add( 'fade-out' );
            el.addEventListener( 'transitionend', onTransitionEnd );
            console.log("Model loaded");
            
        }

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
                model.position.set(-0.3, -1.35, 0);
                scene.add( model );
            },
        );
        
        
    }

    loadModel(models[0]);

    document.getElementById('day').addEventListener('click', function () {
        // update button state
        document.getElementById('day').classList.add('active-button');
        document.getElementById('day').classList.remove('inactive-button');
        document.getElementById('night').classList.remove('active-button');
        document.getElementById('night').classList.add('inactive-button');
        document.getElementById('reflective').classList.add('inactive-button');
        document.getElementById('reflective').classList.remove('active-button');
        
        // show loading bar
        // document.getElementById('ProgressBarCanvas').classList.remove('hidden');
        // document.getElementById('ProgressBarCanvas').classList.add('visible');
        
        // load new model
        loadModel(models[0]);
        setStrongLight();
        bloomPass.threshold = 1;
        
        // hide loading bar after timeout
        // setTimeout(function () {
        //     document.getElementById('ProgressBarCanvas').classList.remove('visible');
        //     document.getElementById('ProgressBarCanvas').classList.add('hidden');
        // }, 4000);

        
    });

    document.getElementById('night').addEventListener('click', function () {
        // update button state
        document.getElementById('day').classList.remove('active-button');
        document.getElementById('day').classList.add('inactive-button');
        document.getElementById('night').classList.add('active-button');
        document.getElementById('night').classList.remove('inactive-button');
        document.getElementById('reflective').classList.add('inactive-button');
        document.getElementById('reflective').classList.remove('active-button');
        
        // show loading bar
        // document.getElementById('ProgressBarCanvas').classList.remove('hidden');
        // document.getElementById('ProgressBarCanvas').classList.add('visible');

        // load new model
        loadModel(models[1]);
        setNoLight();
        bloomPass.threshold = 0;
        bloomPass.strength = 0.3;
        
        
        // hide loading bar after timeout
        // setTimeout(function () {
        //     document.getElementById('ProgressBarCanvas').classList.remove('visible');
        //     document.getElementById('ProgressBarCanvas').classList.add('hidden');
        // }, 4000);
    });

    document.getElementById('reflective').addEventListener('click', function () {
        // update button state
        document.getElementById('day').classList.remove('active-button');
        document.getElementById('day').classList.add('inactive-button');
        document.getElementById('night').classList.remove('active-button');
        document.getElementById('night').classList.add('inactive-button');
        document.getElementById('reflective').classList.remove('inactive-button');
        document.getElementById('reflective').classList.add('active-button');
        
        // show loading bar
        // document.getElementById('ProgressBarCanvas').classList.remove('hidden');
        // document.getElementById('ProgressBarCanvas').classList.add('visible');

        // load new model
        loadModel(models[2]);
        setLowLight();
        bloomPass.threshold = 0;
        bloomPass.strength = 2.5;
        
        // hide loading bar after timeout
        // setTimeout(function () {
        //     document.getElementById('ProgressBarCanvas').classList.remove('visible');
        //     document.getElementById('ProgressBarCanvas').classList.add('hidden');
        // }, 4000);
    });





    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 2.5;
    controls.autoRotate = true;
    controls.maxPolarAngle = Math.PI / 2;
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
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
    composer.setSize( width, height );
}

function animate() {
    requestAnimationFrame( animate );
    const delta = clock.getDelta();
    controls.update( delta );
    composer.render();
}

function onTransitionEnd( event ) {
    event.target.classList.add('hidden');
}