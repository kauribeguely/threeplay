
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

  const canvasWidth = 1;
  var showPhone = true;
  // const loader = new THREE.GLTFLoader();
  const loader = new GLTFLoader();
  const objLoader = new OBJLoader();

  const camera = new THREE.PerspectiveCamera( 30, canvasWidth*window.innerWidth / window.innerHeight, 0.1, 1000 );
  // camera.position.z = 5;
  // Set the camera position
  camera.position.set(9.2, 3.5357076573574338, -5.445004156246992);

  // Set the camera rotation
  camera.rotation.set(-2.6737411922676193, 0.7789086841463806, 2.8005140536335853);

  // camera.position.y = 1;

  const scene = new THREE.Scene();


    // scene.background = new THREE.Color( 0xff0000 );

  // const renderer = new THREE.WebGLRenderer();
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
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
  directionalLight.position.set(4, 0 ,0 );
  lightGroup.add( directionalLight );
  // lightGroup.position.set(0, 0 , 10 );

  // const pointLight = new THREE.PointLight( 0x9a458c , 3, 100 ); //darker purple
  const pointLight = new THREE.PointLight( 0xffffff , 0.5, 100 ); //darker purple
  // pointLight.position.y = 4;

  // lightGroup.add( pointLight );

  // const ambLight = new THREE.AmbientLight( 0x9a458c, 0.5);
  const ambLight = new THREE.AmbientLight( 0xffffff, 1);
  // lightGroup.add( ambLight );


  //group for animation
  const objGroup = new THREE.Group();
  scene.add(objGroup);
  // objGroup.position.y =-0.2;





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
  let deskObjOutline;
  let mouseObjOutline;

  // loadScreenAndKeys();
  // loadOutlineAsTubes();
  // loudMouse();


  // loadOutline();
  // loadFace();

  // var outline;
  //   function loadOutline()
  //   {
  //     // loader.load('obj/deskcartoon.glb',	function ( gltf )
  //     loader.load('obj/outline.glb',	function ( gltf )
  //     {
  //       // deskObj
  //       outline = gltf.scene;
  //       console.log(outline);
  //       // objGroup.add( obj1 );
  //       scene.add(outline);
  //
  //
  //     },    );
  //   }
  var outline;
    function loadOutline()
    {
      // loader.load('obj/deskcartoon.glb',	function ( gltf )
      objLoader.load('obj/outline.obj',	function ( obj )
      // objLoader.load('obj/cheeks.obj',	function ( obj )
      {
        // deskObj
        outline = obj;
        console.log(outline);
        // objGroup.add( obj1 );
        scene.add(outline);


        // outline.traverse(function (child) {
        //     if (child.isLine) {
        //   console.log("Line found: ", child);
        //
        //   // Modify the material of the line
        //   const newMaterial = new THREE.LineBasicMaterial({
        //     color: 0xff0000, // Set the color to red
        //     linewidth: 5 // This property might only work in WebGL 2, be mindful of browser compatibility
        //   });
        //
        //   // Apply the material to the line
        //   child.material = newMaterial;
        //
        //   // Optionally create tubes along the line (if desired)
        //   const tubeGeometry = new THREE.TubeGeometry(child.geometry, 20, 0.1, 8, false);
        //   const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green tubes
        //   const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        //
        //   // Add the tube to the scene
        //   scene.add(tube);
        // }});

        // outline = obj;
        //
        // // Create edges from the object geometry
        // const edges = new THREE.EdgesGeometry(outline.geometry);
        // const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 1 }); // Change color as needed
        // const lineSegments = new THREE.LineSegments(edges, lineMaterial);
        //
        // // Add the lines to the scene
        // scene.add(lineSegments);


        const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color as needed
        outline.traverse((child) => {
            // if (child.isMesh) {
                // Optionally adjust the thickness here, for example, by scaling
                // child.scale.set(1.2, 1.2, 1.2); // Scale to thicken lines
                child.material = lineMaterial; // Apply the new material
            // }
        });

        // let clone1 = outline.clone();
        // clone1.position.set(.001, 0, 0);
        // let clone2 = outline.clone();
        // clone1.position.set(.002, 0, 0);
        // // clone2.position.set(0, .0005, 0);
        // let clone3 = outline.clone();
        // clone1.position.set(.003, 0, 0);
        // // clone3.position.set(0, 0, .0005);
        // scene.add(clone1);
        // scene.add(clone2);
        // scene.add(clone3);







      }, );
    }

    function loadOutlineAsTubes()
    {
      objLoader.load('obj/outline.obj',	function ( obj )
      // objLoader.load('obj/cheeks.obj',	function ( obj )
      {
        console.log('outline: '+obj);
        // Traverse through the object's geometry
                obj.traverse(function (child) {
                  if (child.isLine) {
                    console.log('Line detected:', child);

                    const geometry = child.geometry;
                    const vertices = geometry.attributes.position.array; // Get the vertices directly from the line

                    // Loop through the vertices in pairs to create tubes along the line segments
                    for (let i = 0; i < vertices.length; i += 6) {
                      const start = new THREE.Vector3(
                        vertices[i],
                        vertices[i + 1],
                        vertices[i + 2]
                      );
                      const end = new THREE.Vector3(
                        vertices[i + 3],
                        vertices[i + 4],
                        vertices[i + 5]
                      );

                      // Create a tube along the current line segment (from start to end)
                      // scene.add(createTube(start, end, lineThickness)); // Adjust tube radius as needed
                      objGroup.add( createTube(start, end, lineThickness));

                    }
                  }
                  });
        });
    }

    let lineColor = 0x000000;
    let lineThickness = 0.005;

    // Function to create a tube between two points
      // function createTube(point1, point2, radius) {
    function createTube(start, end, radius) {
        // const direction = new THREE.Vector3().subVectors(point2, point1); // Direction vector from start to end
        const direction = new THREE.Vector3().subVectors(end, start); // Direction vector from start to end
        const length = direction.length(); // Distance between start and end

        // Create a cylinder with the correct length and radius
        const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, length, 8, 1, false);
        const cylinderMaterial = new THREE.MeshBasicMaterial({ color: lineColor });

        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

        // Align the cylinder with the line segment
        const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5); // Midpoint of the line
        cylinder.position.copy(midPoint); // Position the cylinder at the midpoint

        // Align the cylinder with the direction vector
        cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

        return cylinder;
      }


var deskObj;
  function loadScreenAndKeys()
  {
    // loader.load('obj/deskcartoon.glb',	function ( gltf )
    loader.load('obj/desk cartoon.glb',	function ( gltf )
    {
      // deskObj
      deskObj = gltf.scene;
      console.log(deskObj);
      objGroup.add( deskObj );
      // scene.add(deskObj);
      // deskObj = obj1;
      // deskObjOutline = deskObj.clone();
      // outLineObj(deskObjOutline);
      // scene.add(deskObjOutline);
      // outLineObj(deskObj);


    },    );
  }


  var phone;
  let row = new THREE.Group();
  row.position.set(0, 1, 0);
  scene.add(row);

  let row2 = new THREE.Group();
  row2.position.set(0, 2, 0);
  scene.add(row2);

  loadPhone();
  function loadPhone()
  {
    // loader.load('obj/deskcartoon.glb',	function ( gltf )
    loader.load('obj/phone.glb',	function ( gltf )
    {
      // deskObj
      phone = gltf.scene;
      // console.log(phone);
      phone.scale.set(0.2, 0.2, 0.2);
      objGroup.add( phone );
      rowLoop(phone, 30);
      // randomAllLoop(phone, 1000);
      // loopCreate(phone, 40, [0, 0, 1], objGroup);
      // phone.position.set(0, 1, 0);

      // loopCreate(phone, 40, [0, 0, 1], row);

      // loopCreate(phone, 40, [0, 0, 1], row2);


    },    );
  }


//   const geometry = new THREE.SphereGeometry( 1, 16, 16 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );
// rowLoop(sphere, 30);

  function rowLoop(object, rowCount)
  {
    for(let i = 0; i < rowCount; i++)
    {
      let row = new THREE.Group();
      let center = i - (0.5*rowCount);
      row.position.set(0, center, center);
      // scene.add(row);
      objGroup.add(row);
      loopCreate(object, 100, [0, 0, 0.5], row);

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

var mouseObj;
var mouseGroup = new THREE.Group();
// scene.add(mouseGroup);

  function loudMouse()
  {
    // loader.load('obj/deskcartoon.glb',	function ( gltf )
    loader.load('obj/mouse.glb',	function ( gltf )
    {
      // obj1 = gltf.scene;
      mouseObj = gltf.scene;
      console.log(mouseObj);
      // console.log(gltf);
      // scene.add( model );
      // objGroup.add( obj1 );
      mouseGroup.add( mouseObj );
      objGroup.add(mouseGroup);
      mouseObjOutline = mouseObj.clone();

      // outLineObj(mouseObjOutline);
      // directionalLight.target = obj1;
      //
      // obj1.scale.set(0.3,0.3,0.3);
      // mouseObj.position.set(-1.8,-0.2,1.5);
      mouseObj.position.set(2,0,-2);
      // obj1.rotation.set(0,1.5,0);

    },    );
  }




  var face;
    function loadFace()
    {
      // loader.load('obj/face.glb',	function ( gltf )
      // loader.load('obj/faceSmall.glb',	function ( gltf )
      // loader.load('obj/faceobj.glb',	function ( gltf )
      loader.load('obj/faceobjanim.glb',	function ( gltf )
      {
        face = gltf.scene;
        objGroup.add( face );
        face.rotation.set(0, 2, 0)
        console.log(face);
        face = face.children[0];
        // if (face.morphTargetDictionary && face.morphTargetInfluences) {
        //     console.log('Blend Shape Names and Values:');
        //
        //     // Loop through each morph target in the dictionary
        //     for (const [key, index] of Object.entries(face.morphTargetDictionary)) {
        //       face.morphTargetInfluences[index] = Math.random();
        //         console.log(`Blend Shape: ${key}, Influence: ${face.morphTargetInfluences[index]}`);
        //     }
        // } else {
        //     console.log('No blend shapes (morph targets) found on this object.');
        // }
        // face.position.set(0,0,-10);
      },    );
    }

// setInterval(function()
// {
//   if (face.morphTargetDictionary && face.morphTargetInfluences) {
//   // console.log('Blend Shape Names and Values:');
//
//   // Loop through each morph target in the dictionary
//   for (const [key, index] of Object.entries(face.morphTargetDictionary)) {
//     face.morphTargetInfluences[index] = Math.random();
//       // console.log(`Blend Shape: ${key}, Influence: ${face.morphTargetInfluences[index]}`);
//   }
//   ambLight.intensity = Math.random()*2;
// }
// }, 200);



// const loader = new THREE.GLTFLoader();
// loader.load('scene.gltf', function(gltf) {
//     scene.add(gltf.scene);
//
//     // Select individual objects by name or path
//     const objectToAnimate = gltf.scene.getObjectByName('ObjectNameInBlender');
//
//     // You can now animate objectToAnimate
//     gsap.to(objectToAnimate.position, { x: 10, duration: 2 });
// });



// ____________________________________________________










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


    let groupX = (percentY -0.5)* toRad(-90);
    let groupY = (percentX -0.5) * toRad(40);
    // let groupX = (percentY -0.5)* toRad(-0.5);
    // let groupY = (percentX -0.5) * toRad(0.5);
    // let groupX = (percentY -0.5)* toRad(-10);
    // let groupY = (percentX -0.5) * toRad(10);
    objGroup.rotation.set(0, groupY, groupX);
    // objGroup.position.set(0, 0, percentX * 0.1);

if(mouseObj)    mouseObj.rotation.y = 1.5 + (percentX - 0.5) * 0.1;


    objToX = (percentX-0.5)*10;
    objToY = (percentY-0.5)*-2;

    mouseToX = (percentY-0.5)*0.2;
    mouseToZ = (percentX-0.5)*-0.13;

  }

  document.onkeydown = function(evt)
  {
    console.log(evt.key);

    switch(evt.key)
    {
      case " ":
        console.log(camera.position);
        break;



    }
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
      let y = Math.sin(toRad(4*i/loopCount * 360))*2;
      console.log('calc: '+centerMath);
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

    let distmouseX = mouseToX - mouseGroup.position.x;
    let distmousez = mouseToZ - mouseGroup.position.z;


    let mouseSpeed = delta /100;
    mouseGroup.position.x = mouseGroup.position.x + (distmouseX * mouseSpeed);
    mouseGroup.position.z = mouseGroup.position.z + (distmousez * mouseSpeed);

    //auto rotate obj group
    // rot += perSecond * toRad(180);
    // objGroup.rotation.set(0, rot, 0);


    // pTeal.lookAt(camera.position);
    // pTeal.lookAt(pOrange.position);
    // pOrange.lookAt(pTeal.position);
  	renderer.render( scene, camera );
  }
  animate();
