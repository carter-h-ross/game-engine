import {Game, rgbToHex, degToRad} from "./engine.js";
import {num2dArrayToThreeArray} from "./arrayToThreeArray.js";

let scene = new Game();

let result = {
    // 3d builder helpers
    axisHelper: null,
    gridHelper: null,

    //controls
    orbitalControls: null,
    FpsControls: null,

    //lighting 
    ambientLight: null,
    pointLights: [],

    // all objects
    allMeshes: [],

    // 3d shapes
        //boxes 
        boxMeshes: [],
        instancedBoxMeshes: [],

        //spheres 
        sphereMeshes: [],
        instancedSphereMeshes: [],

        //cylinders 
        cylinderMeshes: [],
        instancedCylinderMeshes: [],

        //cones 
        coneMeshes: [],
        instancedConeMeshes: [],

        //toruses 
        torusMeshes: [],
        instancedTorusMeshes: [],

    // 3d shape maps

        //cube maps
        floorMapMeshes: [],
        wallMapMeshes: [],

    // 3d model loaders
    models3d: [],

    //camera
    camera: null,
}

function removeLinebreaks(str) {
    let newstr = "";
     
    // Looop and traverse string
    for (let i = 0; i < str.length; i++)
        if (!(str[i] == "\n" || str[i] == "\r"))
            newstr += str[i];
    return newstr;
}

/*---- basic shapes -----*/
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function cat1_0(cat2, func, params) {
    switch (cat2) {

        case "0": // boxes
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
            switch(func) {
                case "0": // add one box
                    scene.addBox({
                        x: params[0], 
                        y: params[1], 
                        z: params[2], 
                        scaleX: params[3], 
                        scaleY: params[4], 
                        scaleZ: params[5], 
                        color: params[6], 
                        texture: params[7]
                    });
                    break;
                case "1": // add instaced boxes
                    scene.addInstancedBoxes({
                        positions: params[0],
                        scaleX: params[1],
                        scaleY: params[2],
                        scaleZ: params[3],
                        color: params[4],
                        texture: params[5]
                    })
                    break;
                case "2": // remove one box
                    scene.removeBox(params[0]);
                    break;
                case "3": // remove instanced boxes
                    scene.removeInstancedBoxes(params[0]);
                    break;
            }
            break;

        case "1": // spheres
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
            switch(func) {
                case "0": // add one box
                    scene.addSphere({
                        x: params[0], 
                        y: params[1], 
                        z: params[2],
                        radius: params[3],
                        color: params[4], 
                        texture: params[5]
                    });
                    break;
                case "1": // add instaced boxes
                    scene.addInstancedSpheres({
                        positions: params[0],
                        radius: params[1],
                        color: params[2],
                        texture: params[3]
                    })
                    break;
                case "2": // remove one box
                    scene.removeSphere(params[0]);
                    break;
                case "3": // remove instanced boxes
                    scene.removeInstancedSpheres(params[0]);
            }
            break;

        case "2": // cylinders
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
            switch(func) {
                case "0": // add one cylinder
                    scene.addCylinder({
                        x: params[0], 
                        y: params[1], 
                        z: params[2],
                        radiusTop: params[3],
                        radiusBot: params[4],
                        height: params[5],
                        color: params[6], 
                        texture: params[7]
                    });
                    break;
                case "1": // add instaced cylinders
                    scene.addInstancedCylinders({
                        positions: params[0],
                        radiusTop: params[1],
                        radiusBot: params[2],
                        height: params[3],
                        color: params[4],
                        texture: params[5]
                    })
                case "2": // remove one cylinder
                    scene.removeCylinder(params[0]);
                case "3": // remove instanced cylinders
                    scene.removeInstancedCylinders(params[0]);
            }

        case "3": // cones
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
            switch(func) {
                case "0": // add one cone
                    scene.addCone({
                        x: params[0], 
                        y: params[1], 
                        z: params[2],
                        radius: params[3],
                        height: params[4],
                        color: params[5], 
                        texture: params[6]
                    });
                case "1": // add instaced cones
                    scene.addInstancedCones({
                        positions: params[0],
                        radius: params[1],
                        height: params[2],
                        color: params[3],
                        texture: params[4]
                    })
                case "2": // remove one cone
                    scene.removeCone(params[0]);
                case "3": // remove instanced cones
                    scene.removeInstancedCones(params[0]);
            }

        case "4": // toruses
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
            switch(func) {
                case "0": // add one torus
                    scene.addTorus({
                        x: params[0], 
                        y: params[1], 
                        z: params[2],
                        radius: params[3],
                        tubeRadius: params[4],
                        radialSegments: params[5],
                        tubularSegments: params[6],
                        arc: params[7],
                        color: params[8], 
                        texture: params[9]
                    });
                case "1": // add instaced toruses
                    scene.addInstancedToruses({
                        positions: params[0],
                        radius: params[1],
                        tubeRadius: params[2],
                        radialSegments: params[3],
                        tubularSegments: params[4],
                        arc: params[5],
                        color: params[6],
                        texture: params[7]
                    })
                case "2": // remove one torus
                    scene.removeTorus(params[0]);
                case "3": // remove instanced toruses
                    scene.removeInstancedToruses(params[0]);
            }

    }
}

function cat1_1(cat2, func, params) {
    switch (cat2) {
        
        case "0": // ambient lights
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
            switch (func) {
                case "0": // add ambient light
                    scene.addAmbientLight(params[0]);
                    break;
                case "1": // remove ambient light
                    scene.removeAmbientLight();
                    break;
            }

    }
}

function cat1_2(cat2, func, params) {
    switch (cat2) {
        case "0": // orbital controls
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
            switch (func) {
                case "0":
                    scene.enableOrbitalControls();
                    break;
                case "1": 
                    scene.disableOrbitalControls();
                    break;
            }
    }

}

export function threeScriptToJavascript(script) {
    if (scene.started) {
        console.log("resetting scene")
        scene.reset();
    }
    const commands = script.split("|");
    for (let i = 0;i < commands.length;i++) {
        const cmd = splitCommand(commands[i]);
        switch(cmd[0]) {

            case "0":
                cat1_0(cmd[1], cmd[2], cmd[3]);
                break;
            case "1":
                cat1_1(cmd[1], cmd[2], cmd[3]);
                break;
            case "2":
                cat1_2(cmd[1], cmd[2], cmd[3]);
                break;
            default: 
                console.error(`cat1 command is not recognized, wrong command is: ${cmd[0]}`)

        }
    }
    scene.start();
}

function splitCommand (command) {
    const commandPath = command.split(":");
    commandPath[3] = getParams(commandPath[3]);
    return commandPath;
}

const tags = [".", "$", "@", "=", "+", "#", "^"];
function getParams (paramsStr) {
    let params = [];
    for (let i = 0;i < paramsStr.length;i++) {
        let length = 1;
        for (let j = i+1;j < paramsStr.length;j++) {
            if (!(tags.includes(paramsStr.substring(j,j+1)))) {
                length++;
            } else {
                break;
            }
        }
        params.push(paramsStr.substring(i-1, i+length));
        i += length;
    }
    for (let i = 0;i < params.length;i++) {
        params[i] = convertParam(params[i].charAt(0,1), params[i].substring(1,params[i].length))
    }
    return params;
}

function getNumArray (arr) {
    let positions = arr.split(";")
}

function getStringArray (arr) {

}

function get2dNumArray (arr) {
    let result = arr.split(";");
    for (let i = 0;i < result.length;i++) {
        result[i] = result[i].split(',');
    }
    return result;
}

function get2dStringArray (arr) {

}



function convertParam (tag, val) {
    switch (tag) {
        
        case ".": 
            return parseInt(val);
        case "$":
            return getNumArray(val);
        case "@":
            return getStringArray(val);
        case "=":
            return get2dNumArray(val);
        case "+":
            return get2dStringArray(val);
        case "#": 
            return `#${val}`
        case "^": 
            return null;
        default:
            console.error(`undefined tag: ${tag}`);

    }
}

/*---- javascript function call to threejs -----*/
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

export function getThreeScriptFunction (cat1, cat2, func, params) {
    return `|${cat1}:${cat2}:${func}:${paramsToThreeScript(params)}`;
}

function paramsToThreeScript (params) {
    let result = "";
    for (let i = 0;i < params.length;i++) {
        console.log(typeof params[i]);
        switch (typeof params[i]) {
            case "number":
                result += `.${params[i]}`;
                break;
            case "string":
                switch (params[i].substring(0,1)) {
                    case "#": 
                        result += params[i];
                        break;
                    default: 
                        result += "^n"
                }
                break;
            case "object":
                console.log(params);
                console.log(i);
                result += num2dArrayToThreeArray(params[i]);
                break;
            default: 
                result += "^n";
        }
    }
    return result;
}