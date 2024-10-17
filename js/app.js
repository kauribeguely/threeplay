
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

  const canvasWidth = 1;
  var showPhone = true;
  // const loader = new THREE.GLTFLoader();
  const loader = new GLTFLoader();

  const camera = new THREE.PerspectiveCamera( 30, canvasWidth*window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  // camera.position.y = 1;

  const scene = new THREE.Scene();


    // scene.background = new THREE.Color( 0xff0000 );

  // const renderer = new THREE.WebGLRenderer();
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize( canvasWidth*window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.update();

  const lightGroup = new THREE.Group();
  // lightGroup.position.z = 1;
  scene.add(lightGroup);

  // const directionalLight = new THREE.DirectionalLight( 0xffffff, 20 );
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  // lightGroup.add( directionalLight );

  // const pointLight = new THREE.PointLight( 0x9a458c , 3, 100 ); //darker purple
  const pointLight = new THREE.PointLight( 0xffffff , 0.5, 100 ); //darker purple
  // pointLight.position.y = 4;

  // lightGroup.add( pointLight );

  // const ambLight = new THREE.AmbientLight( 0x9a458c, 0.5);
  const ambLight = new THREE.AmbientLight( 0xffffff, 0.2);


  //group for animation
  const objGroup = new THREE.Group();
  scene.add(objGroup);
  objGroup.position.y =-0.2;





  const dotGeometry = new THREE.BufferGeometry();
  dotGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0,0,0]), 3));
  const dotMaterial = new THREE.PointsMaterial({ size: 0.1, color: 0xff0000 });

  const lightDot = new THREE.Points(dotGeometry, dotMaterial);
  lightGroup.add( lightDot );
  lightGroup.position.y = 4;
  lightGroup.position.z = -1;

  const centerGroupDot = new THREE.Points(dotGeometry, dotMaterial);
  objGroup.add( centerGroupDot );





  var obj1;
loadDesk();
  function loadDesk()
  {
    // loader.load('obj/deskcartoon.glb',	function ( gltf )
    loader.load('obj/desk cartoon.glb',	function ( gltf )
    {
      obj1 = gltf.scene;
      objGroup.add( obj1 );

    },    );
  }

var mouseObj;
var mouseGroup = new THREE.Group();
scene.add(mouseGroup);

loudMouse();
  function loudMouse()
  {
    // loader.load('obj/deskcartoon.glb',	function ( gltf )
    loader.load('obj/mouse.glb',	function ( gltf )
    {
      obj1 = gltf.scene;
      mouseObj = gltf.scene;
      console.log(mouseObj);
      // console.log(gltf);
      // scene.add( model );
      // objGroup.add( obj1 );
      mouseGroup.add( obj1 );
      // directionalLight.target = obj1;
      //
      // obj1.scale.set(0.3,0.3,0.3);
      // mouseObj.position.set(-1.8,-0.2,1.5);
      mouseObj.position.set(2,-0.2,-2);
      obj1.rotation.set(0,1.5,0);

    },    );
  }


  renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  var envMap;
  new RGBELoader().load( 'textures/royal_esplanade_1k.hdr', function ( texture ) {


						texture.mapping = THREE.EquirectangularReflectionMapping;
            envMap = pmremGenerator.fromEquirectangular( texture ).texture;
						// scene.background = envMap;
						scene.environment = envMap;


					} );


  var percentX, percentY, mouseX, mouseY;
  var objToX = 0;
  var objToY = 0;
  var mouseToX = 0;
  var mouseToZ = 0;
  // objRotX;
  document.onmousemove = function(evt)
  {
    mouseX = evt.clientX;
    mouseY = evt.clientY;

    percentX = mouseX/window.innerWidth;
    percentY = mouseY/window.innerHeight;

    mouseObj.rotation.y = 1.5 + (percentX - 0.5) * 0.1;


    objToX = (percentX-0.5)*10;
    objToY = (percentY-0.5)*-2;

    mouseToX = (percentY-0.5)*0.17;
    mouseToZ = (percentX-0.5)*-0.1;

  }

  function toRad(deg)
  {
    return 0.0175*deg;
  }


  let activateAnimation = false;
  let delta, perSecond;
  let timeLastFrame = new Date().getTime();
  function animate()
  {
  	requestAnimationFrame( animate );
    delta = new Date().getTime() - timeLastFrame;
    perSecond = delta / 1000;
    timeLastFrame = new Date().getTime();

    let distX = objToX - objGroup.position.x;
    let distY = objToY - objGroup.position.y;

    let distmouseX = mouseToX - mouseGroup.position.x;
    let distmousez = mouseToZ - mouseGroup.position.z;


    let mouseSpeed = delta /100;
    mouseGroup.position.x = mouseGroup.position.x + (distmouseX * mouseSpeed);
    mouseGroup.position.z = mouseGroup.position.z + (distmousez * mouseSpeed);


    // pTeal.lookAt(camera.position);
    // pTeal.lookAt(pOrange.position);
    // pOrange.lookAt(pTeal.position);
  	renderer.render( scene, camera );
  }
  animate();
