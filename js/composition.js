
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { TextureLoader } from 'three';

  const canvasWidth = 1;
  var showPhone = true;
  // const loader = new THREE.GLTFLoader();
  const loader = new GLTFLoader();
  const objLoader = new OBJLoader();
  const textureLoader = new THREE.TextureLoader();

  const orthographicAdapt = 500;

  // const camera = new THREE.PerspectiveCamera( 30, canvasWidth*window.innerWidth / window.innerHeight, 0.1, 1000 );
  // const camera = new THREE.OrthographicCamera( window.innerWidth / - orthographicAdapt, window.innerWidth / orthographicAdapt, window.innerHeight / orthographicAdapt, window.innerHeight / - orthographicAdapt, 1, 1000 );
  var camera = new THREE.OrthographicCamera( window.innerWidth / - orthographicAdapt, window.innerWidth / orthographicAdapt, window.innerHeight / orthographicAdapt, window.innerHeight / - orthographicAdapt, 1, 1000 );
  // const camera = new THREE.OrthographicCamera( window.innerWidth, window.innerWidth, window.innerHeight, window.innerHeight, 1, 1000 );
  // scene.add(camera );
  // camera.position.z = 5;
  // Set the camera position
  // camera.position.set(9.2, 3.5357076573574338, -5.445004156246992);

  // Set the camera rotation
  // camera.rotation.set(-2.6737411922676193, 0.7789086841463806, 2.8005140536335853);

  // camera.position.y = 1;

  const scene = new THREE.Scene();


    // scene.background = new THREE.Color( 0xff0000 );

  // const renderer = new THREE.WebGLRenderer();
  const renderer = new THREE.WebGLRenderer({ alpha: true , antialias: true });
  renderer.setSize( canvasWidth*window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // const controls = new OrbitControls( camera, renderer.domElement );
  // controls.enableDamping = true;
  // controls.update();

  const lightGroup = new THREE.Group();
  // lightGroup.position.z = 1;
  scene.add(lightGroup);

  // const directionalLight = new THREE.DirectionalLight( 0xffffff, 20 );
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set(4, 0 ,0 );
  lightGroup.add( directionalLight );
  // lightGroup.position.set(0, 0 , 10 );

  // const pointLight = new THREE.PointLight( 0x9a458c , 3, 100 ); //darker purple
  const pointLight = new THREE.PointLight( 0xffffff , 0.5, 100 ); //darker purple
  // pointLight.position.y = 4;

  // lightGroup.add( pointLight );

  // const ambLight = new THREE.AmbientLight( 0x9a458c, 0.5);
  const ambLight = new THREE.AmbientLight( 0xffffff, 0.5);
  lightGroup.add( ambLight );


  //group for animation
  const objGroup = new THREE.Group();
  scene.add(objGroup);
  // objGroup.position.y =-0.2;



  // const lightDot = new THREE.Points(dotGeometry, dotMaterial);
  // lightGroup.add( lightDot );
  lightGroup.position.y = 4;
  lightGroup.position.z = -1;


  const screenTexturePath = './textures/loftop.jpg';
  const laptopTexturePath = './textures/loftop.jpg';
  const phoneTexturePath = './textures/loftop.jpg';
  const tabletTexturePath = './textures/loftop.jpg';

  var fullCompScene;
  var phone, laptop, screen, tablet;
  loadComposition();
  function loadComposition()
  {
    // loader.load('obj/deskcartoon.glb',	function ( gltf )
    // loader.load('obj/comp1.glb',	function ( gltf )
    loader.load('obj/isoDevice.glb',	function ( gltf )
    {
      // deskObj
      fullCompScene = gltf.scene;
      // deskObj.scale.set(0.2, 0.2, 0.2);
      // console.log(deskObj);

      objGroup.add( fullCompScene );

      // rowLoop(deskObj, 10);
      // scene.add(deskObj);
      // deskObj = obj1;
      // deskObjOutline = deskObj.clone();
      // outLineObj(deskObjOutline);
      // scene.add(deskObjOutline);
      // outLineObj(deskObj);
      // scene.add(gltf.cameras[0]);
      camera = gltf.cameras[0];
      camera.updateProjectionMatrix();



      objGroup.remove(camera); // Remove camera from the group
        scene.add(camera); // Add camera directly to the scene

      const  controls = new OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        controls.update();

      screen = gltf.scene.getObjectByName('ScreenGroup');
      laptop = gltf.scene.getObjectByName('LaptopGroup');
      phone = gltf.scene.getObjectByName('PhoneGroup');
      tablet = gltf.scene.getObjectByName('TabletGroup');
      // phone.position.set(0, 0, 1);

      // objGroup.add(screen);
      // objGroup.add(laptop);
      // objGroup.add(phone);
      console.log('screenpos'+screen.position);
      console.log(screen.position.toArray()); // Output: [x, y, z]
      console.log(screen);


          applyTextureToMaterial(screen, 'screenMat', screenTexturePath);
          applyTextureToMaterial(laptop, 'laptopMat', laptopTexturePath);
          applyTextureToMaterial(phone, 'phoneMat', phoneTexturePath);
          applyTextureToMaterial(tablet, 'tabletMat', tabletTexturePath);

      gltf.scene.traverse(function (child) {
       // Check if the child is a Mesh
         if (child.isMesh) {
             // Check if the child has materials
             if (child.material) {
                 // If the material is an array (multiple materials)
                 const materials = Array.isArray(child.material) ? child.material : [child.material];

                 materials.forEach((material) => {
                      // Log the name of the mesh and the name of the material
                      console.log(`Object: ${child.name}, Material: ${material.name}`);
                  });
             }
         }
     });
      // screen.position.set(1, 0, 0);  // Example: move the screen to a new position

    },    ); //END LOAD
  }




  // Function to apply texture to specified material
      function applyTextureToMaterial(object, materialName, texturePath) {
          const texture = textureLoader.load(texturePath, function (loadedTexture) {

            texture.wrapS = THREE.RepeatWrapping; // Allow wrapping in the S (horizontal) direction
            texture.wrapT = THREE.RepeatWrapping; // Allow wrapping in the T (vertical) direction
            texture.repeat.set(1, -1); // Flip on both X and Y by setting repeat to -1
            console.log(object.children[1].name);

            object.children[1].material.map = loadedTexture;
            object.children[1].material.needsUpdate = true;

              // Loop through the materials of the object
              // if (object && object.material) {
                  // Check if material is an array or a single material
                  // const materials = Array.isArray(object.material) ? object.material : [object.material];
                  //
                  // materials.forEach((material) => {
                  //     if (material.name === materialName) {
                  //         material.map = loadedTexture; // Set the texture
                  //         material.needsUpdate = true; // Inform Three.js to update the material
                  //     }
                  // });
              // }
          });
      }



  function rowLoop(object, rowCount)
  {
    for(let i = 0; i < rowCount; i++)
    {
      let row = new THREE.Group();
      let center = i - (0.5*rowCount);
      row.position.set(0, center, center);
      // scene.add(row);
      objGroup.add(row);
      loopCreate(object, 10, [0, 0, 1], row);
      // loopCreate(object, 100, [0, 0, 0.5], row);

    }

  }

  function randomAllLoop(object, loopCount)
  {
    for(let i = 0; i < loopCount; i++)
    {
      let clone = object.clone();
      // let center = i - (0.5*loopCount);
      let randomX = (Math.random()-0.5)*20;
      let randomY = (Math.random()-0.5)*20;
      let randomZ = (Math.random()-0.5)*20;
      clone.position.set(randomX, randomY, randomZ);

      let randomXR = toRad((Math.random()-0.5)*180);
      let randomYR = toRad((Math.random()-0.5)*180);
      let randomZR = toRad((Math.random()-0.5)*180);
      clone.rotation.set(randomXR, randomYR, randomZR);

      let randomScale = (Math.random()-0.5)*0.5;
      // clone.scale.set(randomScale, randomScale, randomScale);
      objGroup.add(clone);
    }
  }



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


    let groupX = (percentY -0.5)* toRad(-20);
    let groupY = (percentX -0.5) * toRad(20);
    // let groupX = (percentY -0.5)* toRad(-0.5);
    // let groupY = (percentX -0.5) * toRad(0.5);
    // let groupX = (percentY -0.5)* toRad(-10);
    // let groupY = (percentX -0.5) * toRad(10);
    objGroup.rotation.set(0, groupY, groupX);
    // objGroup.position.set(0, 0, percentX * 0.1);


    objToX = (percentX-0.5)*10;
    objToY = (percentY-0.5)*-2;

    mouseToX = (percentY-0.5)*0.2;
    mouseToZ = (percentX-0.5)*-0.13;

  }

  function toRad(deg)
  {
    return 0.0175*deg;
  }


  function loopCreate(loopObject, loopCount, spaceArray, group)
  {
    //todo, dont loop inside a template
    // let addToDiv = activeDiv;
    // let loopCount = 20;
    for(let i = 0; i < loopCount; i++)
    {
      let centerMath = i-(0.5*loopCount);
      // let centerMath = i/loopCount;
      // let centerMath = i-(0.5*loopCount) * Math.sin()) +1;
      // centerMath = Math.sin(toRad(centerMath * 360)) + 1;
      // let y = Math.sin(toRad(4*i/loopCount * 360))*2;
      let y = centerMath * spaceArray[0];


      // console.log('calc: '+centerMath);
      // activeDiv = addToDiv; //should be the first one
      // activeDivObj = null;
      // addObj(loopObject);
      let loopedObject = loopObject.clone();
      // selectedObj.position[0] = i * 20;
      // loopedObject.position.set(centerMath * spaceArray[0], centerMath * spaceArray[1], centerMath * spaceArray[2]);
      loopedObject.position.set(y, centerMath * spaceArray[1], centerMath * spaceArray[2]);
      // selectedObj.setPosition(centerMath * spaceArray[0], centerMath * spaceArray[1], centerMath * spaceArray[2]);
      group.add(loopedObject);
    }
  }


//__________ANIMATION________________

  let activateAnimation = false;
  let delta, perSecond;
  let timeLastFrame = new Date().getTime();
  let rot = 0;
  function animate()
  {
  	requestAnimationFrame( animate );
    delta = new Date().getTime() - timeLastFrame;
    perSecond = delta / 1000;
    timeLastFrame = new Date().getTime();

    let distX = objToX - objGroup.position.x;
    let distY = objToY - objGroup.position.y;

    // let distmouseX = mouseToX - mouseGroup.position.x;
    // let distmousez = mouseToZ - mouseGroup.position.z;


    // let mouseSpeed = delta /100;
    // mouseGroup.position.x = mouseGroup.position.x + (distmouseX * mouseSpeed);
    // mouseGroup.position.z = mouseGroup.position.z + (distmousez * mouseSpeed);

    //auto rotate obj group
    // rot += perSecond * toRad(180);
    // objGroup.rotation.set(0, rot, 0);


    // pTeal.lookAt(camera.position);
    // pTeal.lookAt(pOrange.position);
    // pOrange.lookAt(pTeal.position);
  	renderer.render( scene, camera );
  }
  animate();
