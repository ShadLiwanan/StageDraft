//IMPORTANT STUFF
const SCENE = new THREE.Scene();
const FOV = 75;
const NEAR = 0.1;
const FAR = 1000;
const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);

//CAMERA
let camera = new THREE.PerspectiveCamera(
  FOV,
  window.innerWidth / window.innerHeight,
  NEAR,
  FAR
);
camera.position.x = 0;
camera.position.y = -30;
camera.position.z = 150;

camera.lookAt(new THREE.Vector3(0, 0, 0));


//SKYBOX (THIS IS THE MEAT OF MY CODE)
let stageGeometry = new THREE.BoxBufferGeometry(100,100,100);
let stageGround = 
[
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load('images/5.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load('images/5.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load('images/5.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load('images/3.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load('images/5.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load('images/5.jpg'), side: THREE.DoubleSide})

];
let stageMaterials = new THREE.MeshFaceMaterial(stageGround);
let stageCube = new THREE.Mesh(stageGeometry, stageMaterials);
SCENE.add(stageCube);
stageCube.position.z=100

//ENDS HERE

//LIGHT
let light = new THREE.AmbientLight( "#FFFFFF" );
SCENE.add( light );

//RENDER LOOP
function render() {
    requestAnimationFrame(render);
    stageCube.rotation.y += -0.0020;
    RENDERER.render(SCENE, camera);
  }
  render();

//RESIZE
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  RENDERER.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize, false);