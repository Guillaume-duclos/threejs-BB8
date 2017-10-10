import * as THREE from 'three';
import Stats from 'stats.js';
import ThreeOrbitControls from './OrbitControls_js';
import TweenMax from 'gsap';

//Resized

//Attach orbit controls to THREE
const OrbitControls = ThreeOrbitControls(THREE);

//Stats
const stats = new Stats();
document.body.appendChild(stats.domElement);

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setClearColor(0xd1ebf8);
renderer.setPixelRatio(window.devicePixelRation);
renderer.setSize(window.innerWidth, window.innerHeight);

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 10);

//scene
const scene = new THREE.Scene();



document.body.appendChild(renderer.domElement);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);

//Axis helper
const axisHelper = new THREE.AxisHelper();
scene.add(axisHelper);

//Création des objets
const floor = new THREE.PlaneGeometry(20, 20, 20);
const body = new THREE.SphereGeometry(1, 32, 16, 0, undefined, 0, undefined);
const coup = new THREE.CylinderGeometry(0.5, 0.25, 0.25, 32, 1);
const head = new THREE.SphereGeometry(0.5, 32, 32, 32, undefined, undefined, 1.5);
const antenna1 = new THREE.CylinderGeometry(0.005, 0.01, 0.15, 32);
const antenna2 = new THREE.CylinderGeometry(0.005, 0.01, 0.4, 32);
const eyes1 = new THREE.SphereGeometry(0.1, 32, 32);
const eyes2 = new THREE.SphereGeometry(0.05, 32, 32);
const eyes3 = new THREE.SphereGeometry(0.05, 32, 32);

//Création des matériaux
const materialFloor = new THREE.MeshPhongMaterial({ emissive: 0x000000, specular: 0x111111, side: THREE.DoubleSide, color: 'gray' });
const materialBody = new THREE.MeshLambertMaterial({ color: 0xf3ad3b, emissive: 0xf3ad3b, emissiveIntensity: 0.1 });
const materialHead = new THREE.MeshLambertMaterial({ color: 0xbdc3c7, emissive: 0xa6adb6, emissiveIntensity: 0.3 });
const materialEyes = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0xffffff, emissive: 0x000000, emissiveIntensity: 0.3, transparent: true, opacity: 0.8 });
const materialEyes3 = new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0xffffff, emissive: 0xff0000, emissiveIntensity: 1 });
const materialAntena = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1 });

//Création des meshs
const meshFloor = new THREE.Mesh(floor, materialFloor);
const meshBody = new THREE.Mesh(body, materialBody);
const meshCoup = new THREE.Mesh(coup, materialHead);
const meshHead = new THREE.Mesh(head, materialHead);
const meshAntenna1 = new THREE.Mesh(antenna1, materialAntena);
const meshAntenna2 = new THREE.Mesh(antenna2, materialAntena);
const meshEyes1 = new THREE.Mesh(eyes1, materialEyes);
const meshEyes2 = new THREE.Mesh(eyes2, materialEyes);
const meshEyes3 = new THREE.Mesh(eyes3, materialEyes3);

//shadow
meshBody.castShadow = true;

//Réglages de la position
meshFloor.position.set(0, 0, 0);
meshBody.position.set(0, 1, 0);
meshCoup.position.set(0, 1.9, 0);
meshHead.position.set(0, 1.99, 0);
meshAntenna1.position.set(0, 2.50, -0.2);
meshAntenna2.position.set(0, 2.50, -0.3);
meshEyes1.position.set(0, 2.25, 0.36);
meshEyes2.position.set(0.2, 2.20, 0.40);
meshEyes3.position.set(0, 2.27, 0.39);

//Manipulation des objets
const floorMaterial = new THREE.MeshPhongMaterial({ emissive: 0x000000, specular: 0x888888, color: 0x42f4bc, side: THREE.DoubleSide });
meshFloor.rotation.x = Math.PI / 2;
meshFloor.receiveShadow = true;

//Ajouts des objets dans la scène
scene.add(meshFloor);
scene.add(meshBody);
scene.add(meshCoup);
scene.add(meshHead);
scene.add(meshAntenna1);
scene.add(meshAntenna2);
scene.add(meshEyes1);
scene.add(meshEyes2);
scene.add(meshEyes3);

//Lights
const light = new THREE.AmbientLight(0xffffff, 0.5);
light.castShadow = true;
scene.add(light);

const spotLight = new THREE.SpotLight(0xffffff);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLight.position.set(50, 50, 0);
spotLight.castShadow = true;
spotLight.angle = 25 * (Math.PI / 180);
spotLight.castShadow = true;
spotLight.penumbra = 0.9;
spotLight.decay = 2;
spotLight.distance = 100;
scene.add(spotLight);
scene.add(spotLightHelper);

const spotLight2 = new THREE.SpotLight(0xaa44aa);
spotLight2.angle = 25 * (Math.PI / 180);
spotLight2.position.set(80, 80, 50);
spotLight2.distance = 200;
spotLight2.castShadow = true;
spotLight2.decay = 2;
spotLight2.penumbra = 0.9;
scene.add(spotLight2);
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
scene.add(spotLightHelper2);

//Move object
let i = 0;
let lastTimeStamp = 0;
const INTERVAL= 200;

//Rendu
const animate = timestamps => {
  stats.begin();
  renderer.render(scene, camera);
  stats.end();
  requestAnimationFrame(animate);
}

animate();
