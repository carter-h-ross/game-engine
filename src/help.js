/*
    * this help.js file shows all of the available functions in the game engine
    * all example functions show default values of variables
*/

// these 2 lines of code are always needed to start a new game
import {Game, rgbToHex, degToRad} from "./engine.js";

let scene = new Game();

// loading 3d shapes | cat1 = 0

    // boxes | cat2 = 0

        // adds one box to the scene | func = 0
        scene.addBox({x: 0, y: 0, z: 0, scaleX: 1, scaleY: 1, scaleZ: 1, color: rgbToHex(255,255,255), texture: null})

        // adds many boxes to the scene with the same paramaters other than positions improves preformance vs adding boxes one at a time | func = 0
        scene.addInstancedBoxes({positions: [[0,0,0], [2,0,2], [-2,0,-2]], scaleX: 1, scaleY: 1, scaleZ: 1, color: rgbToHex(255,255,255), texture: null});

        // removes a box from the scene
        scene.removeBox(0);

        // removes a set of instanced boxes
        scene.removeInstancedBoxes(0);
    
    // shperes

        // adds one sphere to the scene
        scene.addSphere({x: 0, y: 0, z: 0, radius: 0.5, color: rgbToHex(255,255,255), texture: null});

        // adds many spheres to the scene with the same paramaters other than positions improves preformance vs adding boxes one at a time
        scene.addInstancedSpheres({positions: [[0,0,0], [2,0,2], [-2,0,-2]], radius: 0.5, color: rgbToHex(255,255,255), texture: null});

        // removes a sphere from the scene
        scene.removeSphere(0);

        // removes a set of instanced spheres
        scene.removeInstancedSpheres(0);

    // cylinders

        // adds one cylinder to the scene
        scene.addCylinder({x: 0, y: 0, z: 0, radiusTop: 0.5, radiusBot: 0.5, height: 1, color: rgbToHex(255,255,255), texture: null});

        // adds many cylinders to the scene with the same paramaters other than positions improves preformance vs adding boxes one at a time
        scene.addInstancedCylinders({positions: [[0,0,0], [2,0,2], [-2,0,-2]], radiusTop: 0.5, radiusBot: 0.5, height: 1, color: rgbToHex(255,255,255), texture: null});

        // removes a cylinder from the scene
        scene.removeCylinder(0);

        // removes a set of instanced cylinders
        scene.removeInstancedCylinders(0);

    // cones

        // adds one cone to the scene
        scene.addCone({x: 0, y: 0, z: 0, radius: 0.5, height: 1, color: rgbToHex(255,255,255), texture: null});

        // adds many cones to the scene with the same paramaters other than positions improves preformance vs adding boxes one at a time
        scene.addInstancedCones({positions: [[0,0,0], [2,0,2], [-2,0,-2]], radius: 0.5, height: 1, color: rgbToHex(255,255,255), texture: null});

        // removes a cone from the scene
        scene.removeCone(0);

        // removes a set of instanced cones
        scene.removeInstancedCones(0);

    // toruses

        // adds one torus to the scene
        scene.addTorus({x: 0, y: 0, z: 0, radius: 3/8, tubeRadius: 1/16, radialSegments: 20, tubularSegments: 100, arc: degToRad(360), color: rgbToHex(255,255,255), texture: null});

        // adds many toruss to the scene with the same paramaters other than positions improves preformance vs adding boxes one at a time
        scene.addInstancedToruses({positions: [[0,0,0], [2,0,2], [-2,0,-2]], radius: 3/8, tubeRadius: 1/16, radialSegments: 20, tubularSegments: 100, arc: degToRad(360), color: rgbToHex(255,255,255), texture: null});

        // removes a torus from the scene
        scene.removeTorus(0);

        // removes a set of instanced toruss
        scene.removeInstancedToruses(0);

// 3d shape maps

    // cube maps

        // adds a cube map to the scene
        scene.addCubeMap({map: [
            [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
            ],
            [
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1],
            ],
            [
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1],
            ],
        ],
        scale: 1,
        orgin: [0,0,0],
        floorColor: rgbToHex(255,255,255),
        wallColor: rgbToHex(255,255,255),
        floorTexture: null,
        wallTexture: null,});

// loading 3d models

    // gltf 3d models

        // loads the 3d model
        scene.addGLTF({path: "3d-models/example.gltf", x: 0, y: 0, z: 0, scaleFactor: 1});

        // removes the 3d models
        scene.removeGLTF(0)

// adding lights 

    // ambient light 

        // sets the scen light to ambient light
        scene.addAmbientLight();

        // removes the ambient light from the scene
        scene.removeAmbientLight();

// 3d builder helpers

    // axis helper

        // adds axis helper
        scene.addAxisHelper({size: 5});

        // removes axis helper
        scene.removeAxisHelper();

    // grid helper

        // adds grid helper to the scene
        scene.addGridHelper({size: 20, divisions: 10})

// controls 

    // orbital controls

        // sets the main control method to orbital controls
        scene.enableOrbitalControls();

        // removes the orbital controls from the scene
        scene.disableOrbitalControls();

// nescesary functions calleed in program

    // starts the scene rendering
    scene.start();