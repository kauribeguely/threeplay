
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
  const orthographicAdapt = 100;

  // const camera = new THREE.PerspectiveCamera( 30, canvasWidth*window.innerWidth / window.innerHeight, 0.1, 1000 );
  var camera = new THREE.OrthographicCamera( window.innerWidth / - orthographicAdapt, window.innerWidth / orthographicAdapt, window.innerHeight / orthographicAdapt, window.innerHeight / - orthographicAdapt, 1, 1000 );

  // camera.position.z = 5;
  // Set the camera position
  // camera.position.set(9.2, 3.5357076573574338, -5.445004156246992);
  camera.position.set(-7, 6.8, 5.5);
  //
  // // Set the camera rotation
  // camera.rotation.set(-2.6737411922676193, 0.7789086841463806, 2.8005140536335853);

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
  // lightGroup.add( directionalLight );

  // const pointLight = new THREE.PointLight( 0x9a458c , 3, 100 ); //darker purple
  const pointLight = new THREE.PointLight( 0xffffff , 0.5, 100 ); //darker purple
  // pointLight.position.y = 4;

  // lightGroup.add( pointLight );

  // const ambLight = new THREE.AmbientLight( 0x9a458c, 0.5);
  const ambLight = new THREE.AmbientLight( 0xffffff, 1);
  lightGroup.add( ambLight );


  //group for animation
  const objGroup = new THREE.Group();
  scene.add(objGroup);

  const wow2LoopGroup = new THREE.Group();
  wow2LoopGroup.position.set(3.2, 0, 0);
  objGroup.add(wow2LoopGroup);

  const wow2LoopGroup2 = new THREE.Group();
  wow2LoopGroup2.position.set(-6.4, 0, 0);
  objGroup.add(wow2LoopGroup2);
  // scene.add(wow2LoopGroup);

  const wow3LoopGroup = new THREE.Group();
  wow3LoopGroup.position.set(-3.2, 0, 0);
  objGroup.add(wow3LoopGroup);
  // scene.add(wow3LoopGroup);
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
  // loadOutline();

  loadWow();

  let singleLineGroup = new THREE.Group();

  loadOutlineAsTubes();




  // loudMouse();


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



        const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color as needed
        outline.traverse((child) => {
            // if (child.isMesh) {
                // Optionally adjust the thickness here, for example, by scaling
                // child.scale.set(1.2, 1.2, 1.2); // Scale to thicken lines
                child.material = lineMaterial; // Apply the new material
            // }
        });
      }, );
    }



    function loadOutlineAsTubes()
    {
      objLoader.load('obj/wowLine.obj',	function ( obj )
      // objLoader.load('obj/outline.obj',	function ( obj )
      // objLoader.load('obj/cheeks.obj',	function ( obj )
      {
        // console.log('outline: '+obj);
        // Traverse through the object's geometry
            obj.traverse(function (child)
            {
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
                  singleLineGroup.add( createTube(start, end, lineThickness));

                }

                // randomAllLoop(singleLineGroup, 100);
                objGroup.add(singleLineGroup);

                // setTimeout(() => randomAllWithOutline(wow, singleLineGroup, 33), 1000);
                // setTimeout(() => randomAllWithOutline(wow2, singleLineGroup, 33), 1000);
                // setTimeout(() => randomAllWithOutline(wow3, singleLineGroup, 33), 1000);

                let loopCount = 20;
                let zDist = 1.2;

                setTimeout(() =>
                {
                  loopCreate(wow, loopCount, [0, 0, zDist], objGroup);
                  loopCreate(singleLineGroup, loopCount, [0, 0, zDist], objGroup);

                  loopCreate(wow2, loopCount, [0, 0, zDist], wow2LoopGroup);
                  loopCreate(singleLineGroup, loopCount, [0, 0, zDist], wow2LoopGroup);

                  loopCreate(wow2, loopCount, [0, 0, zDist], wow2LoopGroup2);
                  loopCreate(singleLineGroup, loopCount, [0, 0, zDist], wow2LoopGroup2);

                  loopCreate(wow3, loopCount, [0, 0, zDist], wow3LoopGroup);
                  loopCreate(singleLineGroup, loopCount, [0, 0, zDist], wow3LoopGroup);
                }, 500);

              }
            });
        });
    }

    let lineColor = 0x000000;
    let lineThickness = 0.01;

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


  let mainColorMat;
  let sideColorMat;
  // Initialize material references
// let wowMainColorMat, wowSideColorMat;
let wow2MainColorMat, wow2SideColorMat;
let wow3MainColorMat, wow3SideColorMat;

  let wow, wow2, wow3;
  function loadWow()
  {
    // loader.load('obj/deskcartoon.glb',	function ( gltf )
    loader.load('obj/wow.glb',	function ( gltf )
    {
      // deskObj
      wow = gltf.scene;
      console.log(wow);
      objGroup.add( wow );

      wow2 = wow.clone();
      wow3 = wow.clone();

      // Traverse to find materials by name
      wow.traverse((child) => {
        if (child.isMesh) {
          if (child.material.name === 'mainColor') {
            mainColorMat = child.material;
            mainColorMat.emissive.set(0xff9500);
          } else if (child.material.name === 'sideColor') {
            sideColorMat = child.material;
            sideColorMat.emissive.set(addShade(0xff9500));
          }
          // console.log('Main Color Material:', mainColorMat);
          // console.log('Side Color Material:', sideColorMat);
        }
      });

      // Traverse and assign materials for wow2, keeping references
       wow2.traverse((child) => {
           if (child.isMesh) {
               if (child.material.name === 'mainColor') {
                   child.material = child.material.clone();
                   wow2MainColorMat = child.material;
                   wow2MainColorMat.emissive.set(0xA80000); // Initial color for wow2 main
               } else if (child.material.name === 'sideColor') {
                   child.material = child.material.clone();
                   wow2SideColorMat = child.material;
                   wow2SideColorMat.emissive.set(addShade(0xA80000));
               }
           }
       });

       // Traverse and assign materials for wow3, keeping references
       wow3.traverse((child) => {
           if (child.isMesh) {
               if (child.material.name === 'mainColor') {
                   child.material = child.material.clone();
                   wow3MainColorMat = child.material;
                   wow3MainColorMat.emissive.set(0x051a7f); // Initial color for wow3 main
               } else if (child.material.name === 'sideColor') {
                   child.material = child.material.clone();
                   wow3SideColorMat = child.material;
                   wow3SideColorMat.emissive.set(addShade(0x051a7f));
               }
           }
       });

      // randomAllLoop(wow, 500);

    },    );
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

      // let randomXR = toRad((Math.random()-0.5)*180);
      // let randomYR = toRad((Math.random()-0.5)*180);
      // let randomZR = toRad((Math.random()-0.5)*180);
      // clone.rotation.set(randomXR, randomYR, randomZR);

      let randomScale = (Math.random()-0.5)*0.5;
      // clone.scale.set(randomScale, randomScale, randomScale);
      objGroup.add(clone);
    }
  }

  function randomAllWithOutline(object, outlineObj, loopCount)
  {
    for(let i = 0; i < loopCount; i++)
    {
      let clone = object.clone();
      let lineClone = outlineObj.clone();
      // let center = i - (0.5*loopCount);
      let randomX = (Math.random()-0.5)*20;
      let randomY = (Math.random()-0.5)*20;
      let randomZ = (Math.random()-0.5)*20;
      clone.position.set(randomX, randomY, randomZ);
      lineClone.position.set(randomX, randomY, randomZ);

      // let randomXR = toRad((Math.random()-0.5)*180);
      // let randomYR = toRad((Math.random()-0.5)*180);
      // let randomZR = toRad((Math.random()-0.5)*180);
      // clone.rotation.set(randomXR, randomYR, randomZR);

      let randomScale = (Math.random()-0.5)*0.5;
      // clone.scale.set(randomScale, randomScale, randomScale);
      objGroup.add(clone);
      objGroup.add(lineClone);
    }
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

      let y = Math.sin(toRad(2*i/loopCount * 360));
      // let y =


      console.log('calc: '+centerMath);
      // activeDiv = addToDiv; //should be the first one
      // activeDivObj = null;
      // addObj(loopObject);
      let loopedObject = loopObject.clone();
      // selectedObj.position[0] = i * 20;
      // loopedObject.position.set(centerMath * spaceArray[0], centerMath * spaceArray[1], centerMath * spaceArray[2]);

      // loopedObject.position.set(y, centerMath * spaceArray[1], centerMath * spaceArray[2]);
      loopedObject.position.set(centerMath * spaceArray[0], centerMath * spaceArray[1], centerMath * spaceArray[2]);
      // loopedObject.position.set(centerMath * spaceArray[0], y, centerMath * spaceArray[2]);

      // selectedObj.setPosition(centerMath * spaceArray[0], centerMath * spaceArray[1], centerMath * spaceArray[2]);
      group.add(loopedObject);
    }
  }




  // Reference to the color picker element
  const colorPicker = document.getElementById('colorPicker');

  // Event listener for the color picker
  colorPicker.addEventListener('input', (event) => {
      // Get the selected color value from the picker
      const color = event.target.value;
      console.log(color);
      // Update the material color (setHex converts hex color string to a format Three.js can use)
      mainColorMat.emissive.set(color);
      sideColorMat.emissive.set(addShade(color));
  });
  // Reference to the color picker element
  const colorPicker2 = document.getElementById('colorPicker2');

  // Event listener for the color picker
  colorPicker2.addEventListener('input', (event) => {
      const color = event.target.value;
      wow2MainColorMat.emissive.set(color);
      wow2SideColorMat.emissive.set(addShade(color));
  });
  // Reference to the color picker element
  const colorPicker3 = document.getElementById('colorPicker3');

  // Event listener for the color picker
  colorPicker3.addEventListener('input', (event) => {
      // Get the selected color value from the picker
      const color = event.target.value;
      console.log(color);
      // Update the material color (setHex converts hex color string to a format Three.js can use)
      wow3MainColorMat.emissive.set(color);
      wow3SideColorMat.emissive.set(addShade(color));
  });



  function addShade(color)
  {


    const sideColor = new THREE.Color(color);

    console.log(color);

    // Set the main color for the emissive property of mainColorMat
    // mainColorMat.emissive.set(sideColor);

    // Convert to HSL
    const hsl = {};
    sideColor.getHSL(hsl);

    // Darken the color by reducing the lightness (L)
    hsl.l = Math.max(0, hsl.l - 0.2); // Reduce lightness by 0.2 for a darker shade

    // Create a darker color for the side and apply it
    const darkerColor = new THREE.Color().setHSL(hsl.h, hsl.s, hsl.l);
    // sideColorMat.emissive.set(darkerColor);
    return darkerColor;
    // return sideColor.clone().multiplyScalar(0.7);
  }



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


    let groupX = percentY * toRad(3);
    let groupY = percentX * toRad(-3);
    // objGroup.rotation.set(0, groupY, groupX);


    objGroup.position.set(0, 0, percentX);
    wow2LoopGroup.position.set(3.2, 0, percentX*3);
    wow3LoopGroup.position.set(-3.2, 0, percentX*-3);
    wow2LoopGroup2.position.set(-6.4, 0, percentX*2);



// if(mouseObj)    mouseObj.rotation.y = 1.5 + (percentX - 0.5) * 0.1;


    objToX = (percentX-0.5)*10;
    objToY = (percentY-0.5)*-2;

    mouseToX = (percentY-0.5)*0.17;
    mouseToZ = (percentX-0.5)*-0.1;

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

    // let distmouseX = mouseToX - mouseGroup.position.x;
    // let distmousez = mouseToZ - mouseGroup.position.z;
    //
    //
    // let mouseSpeed = delta /100;
    // mouseGroup.position.x = mouseGroup.position.x + (distmouseX * mouseSpeed);
    // mouseGroup.position.z = mouseGroup.position.z + (distmousez * mouseSpeed);


    // pTeal.lookAt(camera.position);
    // pTeal.lookAt(pOrange.position);
    // pOrange.lookAt(pTeal.position);
  	renderer.render( scene, camera );
  }
  animate();
