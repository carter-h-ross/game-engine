import * as THREE from 'three';

import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

/*----- helper functions -----*/

export function rgbToHex(r, g, b) {
    var redHex = r.toString(16).padStart(2, '0');
    var greenHex = g.toString(16).padStart(2, '0');
    var blueHex = b.toString(16).padStart(2, '0');
    return "#" + redHex + greenHex + blueHex;
}

export function degToRad(degrees) {
    var radians = degrees * (Math.PI / 180);
    return radians;
}

/*----- scene class -----*/

export class Game {

    constructor() {
        //general
        this.textureLoader = new THREE.TextureLoader();
        this.scene = new THREE.Scene();
        this.started = false;

        // 3d model loaders
        this.gltfLoader = new GLTFLoader();
        this.objLoader = new OBJLoader();

        // main scene rederer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("#bg"),
            antialias: true,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // 3d builder helpers
        this.axisHelper = null;
        this.gridHelper = null;

        //controls
        this.orbitalControls = null;
        this.FpsControls

        //lighting 
        this.ambientLight = null;
        this.pointLights = [];

        // all objects
        this.allMeshes = [];

        // 3d shapes
            //boxes 
            this.boxMeshes = [];
            this.instancedBoxMeshes = [];

            //spheres 
            this.sphereMeshes = [];
            this.instancedSphereMeshes = [];

            //cylinders 
            this.cylinderMeshes = [];
            this.instancedCylinderMeshes = [];  

            //cones 
            this.coneMeshes = [];
            this.instancedConeMeshes = [];

            //toruses 
            this.torusMeshes = [];
            this.instancedTorusMeshes = [];

        // 3d shape maps

            //cube maps
            this.floorMapMeshes = []
            this.wallMapMeshes = []

        // 3d model loaders
        this.models3d = []

        //camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 3, 5);
    }

    /**
     * starts the process of rendering the game
     */
    start() {
        if (!(this.started)) {
            const animate = () => {
                requestAnimationFrame(animate);
                this.renderer.render(this.scene, this.camera);
            };
            animate();
            this.started = true;
        }
    }

    /**
     * removes all of the shapes from the scene
     */
    reset() {
        // Remove all box meshes
        this.boxMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
        this.instancedBoxMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
    
        // Remove all sphere meshes
        this.sphereMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
        this.instancedSphereMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
    
        // Remove all cylinder meshes
        this.cylinderMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
        this.instancedCylinderMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
    
        // Remove all cone meshes
        this.coneMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
        this.instancedConeMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
    
        // Remove all torus meshes
        this.torusMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
        this.instancedTorusMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
    
        // Clear other arrays
        this.floorMapMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
        this.wallMapMeshes.forEach(mesh => {
            this.scene.remove(mesh);
        });
        
        // Clear other arrays
        this.models3d.forEach(mesh => {
            this.scene.remove(mesh);
        });
    
        // Clear other arrays
        this.pointLights.forEach(light => {
            this.scene.remove(light);
        });
    
        // Clear other arrays
        if (this.ambientLight) {
            this.scene.remove(this.ambientLight);
        }
    
        // Reset arrays
        this.boxMeshes = [];
        this.instancedBoxMeshes = [];
        this.sphereMeshes = [];
        this.instancedSphereMeshes = [];
        this.cylinderMeshes = [];
        this.instancedCylinderMeshes = [];
        this.coneMeshes = [];
        this.instancedConeMeshes = [];
        this.torusMeshes = [];
        this.instancedTorusMeshes = [];
        this.floorMapMeshes = [];
        this.wallMapMeshes = [];
        this.models3d = [];
        this.pointLights = [];
        this.ambientLight = null;

        this.funcCount = 1;
    }    

    /*---- 3d builder helpers -----*/
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

        /*---- axis helper -----*/

        /**
         * Adds a axis helper to the scene.
         * @param {Object} options - Options for the axis helper.
         * @param {number} [options.size=5] - the size of the axis helper
         */
        addAxisHelper(options = {}) {
            const {
                size = 5,
            } = options;
            this.axisHelper = new THREE.AxesHelper(size);
            this.scene.add(this.axisHelper)
        }
        removeAxisHelper() {
            this.scene.remove(this.axisHelper);
        }

        /*----- grid helper -----*/

        /**
         * Adds a grid helper to the scene.
         * @param {Object} options - Options for the grid helper.
         * @param {number} [options.size=10] - the size of the grid helper
         * @param {number} [options.divisions=10] - the number of divisions in the grid helper
         */
        addGridHelper(options = {}) {
            const {
                size = 10, 
                divisions = 10
            } = options;
            this.gridHelper = new THREE.GridHelper(size, divisions);
            this.scene.add(this.gridHelper);
        }
        removeGridHelper() {
            this.scene.remove(this.gridHelper)
        }

    /*---- basic shapes -----*/
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

        /*----- boxes -----*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Adds a box to the scene.
         * @param {Object} options - Options for the box.
         * @param {number} [options.x=0] - The x-coordinate of the box's position.
         * @param {number} [options.y=0] - The y-coordinate of the box's position.
         * @param {number} [options.z=0] - The z-coordinate of the box's position.
         * @param {number} [options.scaleX=1] - The scale factor along the x-axis.
         * @param {number} [options.scaleY=1] - The scale factor along the y-axis.
         * @param {number} [options.scaleZ=1] - The scale factor along the z-axis.
         * @param {string} [options.color='#ffffff'] - The color of the box in hexadecimal format.
         * @param {string|null} [options.texture=null] - The texture of the box.
         */
        addBox(options = {}) {
            const {
                x = 0,
                y = 0,
                z = 0,
                scaleX = 1,
                scaleY = 1,
                scaleZ = 1,
                color = `${rgbToHex(255, 255, 255)}`,
                texture = null
            } = options;
            const boxGeometry = new THREE.BoxGeometry(scaleX, scaleY, scaleZ);
            let blockMaterial;
            if (texture == null) {
                blockMaterial = new THREE.MeshStandardMaterial({ color: color })
            }
            const boxMesh = new THREE.Mesh(boxGeometry, blockMaterial);
            boxMesh.position.set(x, y, z);
            this.boxMeshes.push(boxMesh);
            this.allMeshes.push(boxMesh);
            this.scene.add(boxMesh);
        }
        /**
         * Adds multiple instances of a box to the scene.
         * @param {Object} options - Options for the box.
         * @param {Array<Array<number>>} [options.positions=[[0,0,0], [2,0,2], [-2,0,-2]]] - The positions of each instance of the box.
         * @param {number} [options.scaleX=1] - The scale factor along the x-axis.
         * @param {number} [options.scaleY=1] - The scale factor along the y-axis.
         * @param {number} [options.scaleZ=1] - The scale factor along the z-axis.
         * @param {string} [options.color='#ffffff'] - The color of the boxes in hexadecimal format.
         * @param {THREE.Texture|null} [options.texture=null] - The texture of the boxes.
         */
        addInstancedBoxes(options = {}) {
            const {
                positions = [[0, 0, 0], [2, 0, 2], [-2, 0, -2]],
                scaleX = 1,
                scaleY = 1,
                scaleZ = 1,
                color = rgbToHex(255,255,255),
                texture = null
            } = options;
            const blockGeometry = new THREE.BoxGeometry(scaleX, scaleY, scaleZ);
            let blockMaterial;
            if (texture !== null) {
                blockMaterial = new THREE.MeshStandardMaterial({ map: texture });
            } else {
                blockMaterial = new THREE.MeshStandardMaterial({ color: color });
            }
            const instMesh = new THREE.InstancedMesh(blockGeometry, blockMaterial, positions.length);
            for (let i = 0; i < positions.length; i++) {
                const position = new THREE.Vector3(positions[i][0], positions[i][1], positions[i][2]);
                const quaternion = new THREE.Quaternion();
                const scale = new THREE.Vector3(scaleX, scaleY, scaleZ);
                const matrix = new THREE.Matrix4();
                
                matrix.compose(position, quaternion, scale);
                instMesh.setMatrixAt(i, matrix);
            }
            this.scene.add(instMesh);
            this.instancedBoxMeshes.push(instMesh);
            this.allMeshes.push(instMesh);
        }

        /**
         * removes a box from the scene.
         * @param {number} [index=0] - index of box to remove
         */
        removeBox (index = 0) {
            this.scene.remove(this.boxMeshes[index]);
            this.boxMeshes.splice(index,index);
        }
        /**
         * removes an instanced box mesh from the scene.
         * @param {number} [index=0] - index of instanced boxes to remove
         */
        removeInstancedBoxes (index = 0) {
            this.scene.remove(this.instancedBoxMeshes[index]);
            this.instancedBoxMeshes.splice(index,index);
        }

        /*----- spheres ------*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Adds a sphere to the scene.
         * @param {Object} options - Options for the sphere.
         * @param {number} [options.x=0] - The x-coordinate of the sphere's position.
         * @param {number} [options.y=0] - The y-coordinate of the sphere's position.
         * @param {number} [options.z=0] - The z-coordinate of the sphere's position.
         * @param {number} [options.radius=1=0.5] - The radius of the sphere.
         * @param {string} [options.color='#ffffff'] - The color of the sphere in hexadecimal format.
         * @param {string|null} [options.texture=null] - The texture of the sphere.
         */
        addSphere(options = {}) {
            const {
                x = 0, 
                y = 0, 
                z = 0, 
                radius = 0.5, 
                color = `${rgbToHex(255, 255, 255)}`, 
                texture = null
            } = options;
            const sphereGeometry = new THREE.SphereGeometry(radius);
            let sphereMaterial;
            if (texture == null) {
                sphereMaterial = new THREE.MeshStandardMaterial({ color: color })
            }
            const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphereMesh.position.set(x, y, z);
            this.sphereMeshes.push(sphereMesh);
            this.allMeshes.push(sphereMesh);
            this.scene.add(sphereMesh);
        }
        /**
         * Adds a sphere to the scene.
         * @param {Object} options - Options for the box.
         * @param {Array<Array<number>>} [options.positions=[[0,0,0], [2,0,2], [-2,0,-2]]] - The positions of each instance of the sphere.
         * @param {number} [options.radius=0.5] - The radius of the spheres.
         * @param {string} [options.color='#ffffff'] - The color of the spheres in hexadecimal format.
         * @param {string|null} [options.texture=null] - The texture of the spheres.
         */
        addInstancedSpheres(options = {}) {
            const {
                positions = [[0, 0, 0], [2, 0, 2], [-2, 0, -2]],
                radius = 0.5,
                color = rgbToHex(255,255,255),
                texture = null
            } = options;
            const sphereGeometry = new THREE.SphereGeometry(radius);
            let sphereMaterial;
            if (texture !== null) {
                sphereMaterial = new THREE.MeshStandardMaterial({ map: texture });
            } else {
                sphereMaterial = new THREE.MeshStandardMaterial({ color: color });
            }
            const instMesh = new THREE.InstancedMesh(sphereGeometry, sphereMaterial, positions.length);
            for (let i = 0; i < positions.length; i++) {
                const position = new THREE.Vector3(positions[i][0], positions[i][1], positions[i][2]);
                const quaternion = new THREE.Quaternion();
                const scale = new THREE.Vector3(1, 1, 1); // Spheres don't need scaling, so scale is set to (1, 1, 1)
                const matrix = new THREE.Matrix4();
                
                matrix.compose(position, quaternion, scale);
                instMesh.setMatrixAt(i, matrix);
            }
            this.instancedSphereMeshes.push(instMesh);
            this.allMeshes.push(instMesh);
            this.scene.add(instMesh);
        }
        
        /**
         * removes a sphere from the scene.
         * @param {number} [index=0] - index of sphere to remove
         */
        removeSphere (index) {
            this.scene.remove(this.sphereMeshes[index]);
            this.sphereMeshes.splice(index,index);
        }
        /**
         * removes an instanced box mesh from the scene.
         * @param {number} [index=0] - index of instanced boxes to remove
         */
        removeInstancedSpheres (index) {
            this.scene.remove(this.instancedsphereMeshes[index]);
            this.instancedSphereMeshes.splice(index,index);
        }

        /*----- cylinders ------*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Adds a cylinder to the scene.
         * @param {Object} options - Options for the cylinder.
         * @param {number} [options.x=0] - The x-coordinate of the cylinder's position.
         * @param {number} [options.y=0] - The y-coordinate of the cylinder's position.
         * @param {number} [options.z=0] - The z-coordinate of the cylinder's position.
         * @param {number} [options.radiusTop=1] - The radius of the cylinder.
         * @param {number} [options.radiusBot=1] - The radius of the cylinder.
         * @param {number} [options.height=1] - The radius of the cylinder.
         * @param {string} [options.color='#ffffff'] - The color of the cylinder in hexadecimal format.
         * @param {string|null} [options.texture=null] - The texture of the cylinder.
         */
        addCylinder(options = {}) {
            const {
                x = 0, 
                y = 0, 
                z = 0, 
                radiusTop = 0.5, 
                radiusBot = 0.5, 
                height = 1, 
                color = `${rgbToHex(255, 255, 255)}`, 
                texture = null
            } = options;
            const cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBot, height);
            let cylinderMaterial;
            if (texture == null) {
                cylinderMaterial = new THREE.MeshStandardMaterial({ color: color })
            }
            const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
            cylinderMesh.position.set(x, y, z);
            this.cylinderMeshes.push(cylinderMesh);
            this.allMeshes.push(cylinderMesh);
            this.scene.add(cylinderMesh);
        }
        /**
         * Adds a cylinder to the scene.
         * @param {Object} options - Options for the cylinder.
         * @param {Array<Array<number>>} [options.positions=[[0,0,0], [2,0,2], [-2,0,-2]]] - The positions of each instance of the cylinder.
         * @param {number} [options.radiusTop=0.5] - The radius of the cylinder.
         * @param {number} [options.radiusBot=0.5] - The radius of the cylinder.
         * @param {number} [options.height=1] - The radius of the cylinder.
         * @param {string} [options.color='#ffffff'] - The color of the cylinder in hexadecimal format.
         * @param {string|null} [options.texture=null] - The texture of the cylinder.
         */
        addInstancedCylinders(options = {}) {
            const {
                positions = [[0, 0, 0], [2, 0, 2], [-2, 0, -2]],
                radiusTop = 0.5,
                radiusBot = 0.5,
                height = 1,
                color = rgbToHex(255,255,255),
                texture = null
            } = options;
            const cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBot, height);
            let cylinderMaterial;
            if (texture !== null) {
                cylinderMaterial = new THREE.MeshStandardMaterial({ map: texture });
            } else {
                cylinderMaterial = new THREE.MeshStandardMaterial({ color: color });
            }
            const instMesh = new THREE.InstancedMesh(cylinderGeometry, cylinderMaterial, positions.length);
            for (let i = 0; i < positions.length; i++) {
                const position = new THREE.Vector3(positions[i][0], positions[i][1], positions[i][2]);
                const quaternion = new THREE.Quaternion();
                const scale = new THREE.Vector3(1, 1, 1); // Cylinders don't need scaling, so scale is set to (1, 1, 1)
                const matrix = new THREE.Matrix4();
                
                matrix.compose(position, quaternion, scale);
                instMesh.setMatrixAt(i, matrix);
            }
            this.allMeshes.push(instMesh);
            this.instancedCylinderMeshes.push(instMesh);
            this.scene.add(instMesh);
        }
        /**
         * Removes a cylinder from the scene.
         * @param {number} [index=0] - Index of cylinder to remove
         */
        removeCylinder(index = 0) {
            if (index >= 0 && index < this.cylinderMeshes.length) {
                this.scene.remove(this.cylinderMeshes[index]);
                this.cylinderMeshes.splice(index, 1);
            }
        }
        /**
         * Removes an instanced cylinder mesh from the scene.
         * @param {number} [index=0] - Index of instanced cylinders to remove
         */
        removeInstancedCylinders(index = 0) {
            if (index >= 0 && index < this.instancedCylinderMeshes.length) {
                this.scene.remove(this.instancedCylinderMeshes[index]);
                this.instancedCylinderMeshes.splice(index, 1);
            }
        }
        

        /*----- cones ------*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Adds a cone to the scene.
         * @param {Object} options - Options for the cone.
         * @param {number} [options.x=0] - The x-coordinate of the cone's position.
         * @param {number} [options.y=0] - The y-coordinate of the cone's position.
         * @param {number} [options.z=0] - The z-coordinate of the cone's position.
         * @param {number} [options.radius=0.5] - The radius of the cone.
         * @param {number} [options.height=1] - The radius of the cone.
         * @param {string} [options.color='#ffffff'] - The color of the cone in hexadecimal format.
         * @param {string|null} [options.texture=null] - The texture of the cone.
         */
        addCone(options = {}) {
            const {
                x = 0, 
                y = 0, 
                z = 0, 
                radius = 0.5, 
                height = 1, 
                color = `${rgbToHex(255, 255, 255)}`, 
                texture = null
            } = options;
            const coneGeometry = new THREE.ConeGeometry(radius, height);
            let coneMaterial;
            if (texture == null) {
                coneMaterial = new THREE.MeshStandardMaterial({ color: color })
            }
            const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
            coneMesh.position.set(x, y, z);
            this.allMeshes.push(coneMesh);
            this.coneMeshes.push(coneMesh);
            this.scene.add(coneMesh);
        }
        /**
         * Adds a cone to the scene.
         * @param {Object} options - Options for the cone.
         * @param {number} [options.positions=[[0,0,0], [2,0,2], [-2,0,-2]]] - The x-coordinate of the cone's position.
         * @param {number} [options.radius=0.5] - The radius of the cone.
         * @param {number} [options.height=1] - The radius of the cone.
         * @param {string} [options.color='#ffffff'] - The color of the box in hexadecimal format.
         * @param {string|null} [options.texture=null] - The texture of the cone.
         */
        addInstancedCones(options = {}) {
            const {
                positions = [[0, 0, 0], [2, 0, 2], [-2, 0, -2]],
                radius = 0.5,
                height = 1,
                color = rgbToHex(255,255,255),
                texture = null
            } = options;
            const coneGeometry = new THREE.ConeGeometry(radius, height);
            let coneMaterial;
            if (texture !== null) {
                coneMaterial = new THREE.MeshStandardMaterial({ map: texture });
            } else {
                coneMaterial = new THREE.MeshStandardMaterial({ color: color });
            }
            const instMesh = new THREE.InstancedMesh(coneGeometry, coneMaterial, positions.length);
            for (let i = 0; i < positions.length; i++) {
                const position = new THREE.Vector3(positions[i][0], positions[i][1], positions[i][2]);
                const quaternion = new THREE.Quaternion();
                const scale = new THREE.Vector3(1, 1, 1); // Cones don't need scaling, so scale is set to (1, 1, 1)
                const matrix = new THREE.Matrix4();
                matrix.compose(position, quaternion, scale);
                instMesh.setMatrixAt(i, matrix);
            }
            this.instancedConeMeshes.push(instMesh);
            this.allMeshes.push(instMesh);
            this.scene.add(instMesh);
        }
        
        /**
         * removes a cone from the scene.
         * @param {number} [index=0] - index of cone to remove
         */
        removeCone (index) {
            this.scene.remove(this.coneMeshes[index]);
            this.coneMeshes.splice(index,index);
        }
        /**
         * removes an instanced cone mesh from the scene.
         * @param {number} [index=0] - index of instanced cones to remove
         */
        removeInstancedCones (index) {
            this.scene.remove(this.instancedconeMeshes[index]);
            this.instancedConeMeshes.splice(index,index);
        }

        /*----- torus ------*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Adds a torus to the scene.
         * @param {Object} options - Options for the torus.
         * @param {number} [options.x=0] - The x-coordinate of the torus's position.
         * @param {number} [options.y=0] - The y-coordinate of the torus's position.
         * @param {number} [options.z=0] - The z-coordinate of the torus's position.
         * @param {number} [options.radius=3/8] - The radius of the torus to the center of the tube.
         * @param {number} [options.tubeRadius=1/16] - The radius of the tube of the torus.
         * @param {number} [options.radialSegments=20] - The number of radial segments of the torus.
         * @param {number} [options.tubularSegments=100] - The number of tubular segments of the torus.
         * @param {number} [options.arc=degToRad(360)] - The radius of the torus.
         * @param {number} [options.height=1] - The radius of the torus.
         * @param {string} [options.color='#ffffff'] - The color of the torus in hexadecimal format.
         * @param {string|null} [options.texture=null] - The texture of the torus.
         */
        addTorus(options = {}) {
            const {
                x = 0, 
                y = 0, 
                z = 0, 
                radius = 3/8, 
                tubeRadius = 1/16, 
                radialSegments = 20, 
                tubularSegments = 100, 
                arc = degToRad(360),  
                color = `${rgbToHex(255, 255, 255)}`, 
                texture = null
            } = options;
            const torusGeometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments, arc);
            let torusMaterial;
            if (texture == null) {
                torusMaterial = new THREE.MeshStandardMaterial({ color: color })
            }
            const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
            torusMesh.position.set(x, y, z);
            this.torusMeshes.push(torusMesh);
            this.allMeshes.push(torusMesh)
            this.scene.add(torusMesh);
        }
        /**
         * Adds a torus to the scene.
         * @param {Object} options - Options for the torus.
         * @param {number} [options.positions=[[0,0,0], [2,0,2], [-2,0,-2]]] - The positions of the torus's
         * @param {number} [options.radius=3/8] - The radius of the torus to the center of the tube.
         * @param {number} [options.tubeRadius=1/16] - The radius of the tube of the torus.
         * @param {number} [options.radialSegments=20] - The number of radial segments of the torus.
         * @param {number} [options.tubularSegments=100] - The number of tubular segments of the torus.
         * @param {number} [options.arc=degToRad(360)] - The radius of the torus.
         * @param {number} [options.height=1] - The radius of the torus.
         * @param {string} [options.color='#ffffff'] - The color of the torus in hexadecimal format.
         * @param {string|null} [options.texture=null] - The texture of the torus.
         */
        addInstancedToruses(options = {}) {
            const {
                positions = [[0, 0, 0], [2, 0, 2], [-2, 0, -2]],
                radius = 3 / 8,
                tubeRadius = 1 / 16,
                radialSegments = 20,
                tubularSegments = 100,
                arc = degToRad(360),
                color = rgbToHex(255,255,255),
                texture = null
            } = options;
            const torusGeometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments, arc);
            let torusMaterial;
            if (texture !== null) {
                torusMaterial = new THREE.MeshStandardMaterial({ map: texture });
            } else {
                torusMaterial = new THREE.MeshStandardMaterial({ color: color });
            }
            const instMesh = new THREE.InstancedMesh(torusGeometry, torusMaterial, positions.length);   
            for (let i = 0; i < positions.length; i++) {
                const position = new THREE.Vector3(positions[i][0], positions[i][1], positions[i][2]);
                const quaternion = new THREE.Quaternion();
                const scale = new THREE.Vector3(1, 1, 1); // Toruses don't need scaling, so scale is set to (1, 1, 1)
                const matrix = new THREE.Matrix4();
                
                matrix.compose(position, quaternion, scale);
                instMesh.setMatrixAt(i, matrix);
            }
            this.instancedTorusMeshes.push(instMesh);
            this.allMeshes.push(instMesh);
            this.scene.add(instMesh);
        }
        
        /**
         * removes a cone from the scene.
         * @param {number} [index=0] - index of cone to remove
         */
        removeTorus (index) {
            this.scene.remove(this.torusMeshes[index]);
            this.torusMeshes.splice(index,index);
        }
        /**
         * removes an instanced cone mesh from the scene.
         * @param {number} [index=0] - index of instanced cones to remove
         */
        removeInstancedToruses (index) {
            this.scene.remove(this.instancedtorusMeshes[index]);
            this.instancedorusMeshes.splice(index,index);
        }

    /*---- 3d shape maps -----*/
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

        /*----- box map -----*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Adds multiple instances of a box to the scene.
         * @param {Object} options - Options for the box.
         * @param {Array<Array<Array<number>>>} [options.map] - The positions of each instance of the box.
         * @param {Array<number>} [options.orgin] - The positions of each instance of the box.
         * @param {number} [options.scale=1] - The scale factor of the cubes
         * @param {string} [options.floorColor='#ffffff'] - The color of the floor boxes in hexadecimal format.
         * @param {string} [options.wallColor='#ffffff'] - The color of the wall boxes in hexadecimal format.
         * @param {THREE.Texture|null} [options.floorTexture=null] - The texture of the floor boxes.
         * @param {THREE.Texture|null} [options.wallTexture=null] - The texture of the wall boxes.
         */
        addCubeMap(options = {}) {
            // adding cube map
            const {
                map = [
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
                scale = 1,
                orgin = [0,0,0],
                floorColor = rgbToHex(255,255,255),
                wallColor = rgbToHex(255,255,255),
                floorTexture = null,
                wallTexture = null,
            } = options;

            const blockGeometry = new THREE.BoxGeometry(scale, scale, scale);

            // loading floor blocks
            let floorCount = 0;
            for (let z = 0;z < this.sizeZ;z++) {
                for (let x = 0;x < this.sizeX;x++) {
                    if (map[0][z][x] == 1) {
                        floorCount++;       
                    }
                }
            }
            let blockMaterial = null;
            if (texture !== null) {
                blockMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
            } else {
                blockMaterial = new THREE.MeshStandardMaterial({ color: floorColor });
            }
            const floorMesh = new THREE.InstancedMesh(blockGeometry, blockMaterial, floorCount);
            this.scene.add(floorMesh);
            this.floorMapMeshes.push(floorMesh);
            floorCount = 0;
            const tempFloor = new THREE.Object3D();
            for (let z = 0;z < this.sizeZ;z++) {
                for (let x = 0;x < this.sizeX;x++) {
                    if (map[0][z][x] == 1) {
                        tempFloor.position.x = x * blockScale + orgin[0];            
                        tempFloor.position.y = orgin[1];
                        tempFloor.position.z = z * blockScale + orgin[2];
                        tempFloor.updateMatrix();
                        floorMesh.setMatrixAt(floorCount, tempFloor.matrix);
                        floorCount++;
                    }
                }
            }

            // loading wall blocks
            let wallCount = 0;
            for (let y = 1;y < this.sizeY;y++) {
                for (let z = 0;z < this.sizeZ;z++) {
                    for (let x = 0;x < this.sizeX;x++) {
                        if (map[y][z][x] == 2) {
                            wallCount++;       
                        }
                    }
                }
            }
            blockMaterial = null;
            if (texture !== null) {
                blockMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
            } else {
                blockMaterial = new THREE.MeshStandardMaterial({ color: wallColor });
            }
            const wallMesh = new THREE.InstancedMesh(blockGeometry, blockMaterial, wallCount);
            this.wallMapMeshes.push(wallMesh);
            this.scene.add(wallMesh);
            wallCount = 0;
            const tempWall = new THREE.Object3D();
            for (let y = 1;y < this.sizeY;y++) {
                for (let z = 0;z < this.sizeZ;z++) {
                    for (let x = 0;x < this.sizeX;x++) {
                        if (map[y][z][x] == 2) {
                            tempWall.position.x = x * blockScale + orgin[0];
                            tempWall.position.z = y * blockScale + orgin[1];            
                            tempWall.position.y = z * blockScale + orgin[2];
                            tempWall.updateMatrix();
                            wallMesh.setMatrixAt(wallCount, tempWall.matrix);
                            wallCount++;
                        }
                    }
                }
            }
        }

        /**
         * removes a cube map from the scene.
         * @param {number} [index=0] - index of cube map to remove
         */
        removeCubeMap (index) {
            this.scene.remove(this.wallMapMeshes[index]);
            this.wallMapMeshes.splice(index,index);
            this.scene.remove(this.floorMapMeshes[index]);
            this.floorMapMeshes.splice(index,index);
        }

    /*---- 3d model loaders -----*/
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

        /*----- gltf loader -----*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Adds a 3d gltf model to the scene.
         * @param {Object} options - Options for the model.
         * @param {number} [options.x=0] - The x-coordinate of the model's position.
         * @param {number} [options.y=0] - The y-coordinate of the model's position.
         * @param {number} [options.z=0] - The z-coordinate of the model's position.
         * @param {number} [options.scaleFactor=0] - The scale factor of the model's position.
         */
        addGLTF (options = {}) {
            const {
                modelPath = "3d-models/example.gltf", 
                x = 0, 
                y = 0, 
                z = 0, 
                scaleFactor = 1,
            } = options;
            this.gltfLoader.load(modelPath, gltf => {
                const model = gltf.scene;
                model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                model.position.set(x, y, z);
                this.models3d.push(model);
                this.scene.add(model);
            }, undefined, error => {
                console.error(error);
            });
        }
        
        /**
         * removes a gltf model from the scene.
         * @param {number} [index=0] - index of cone to remove
         */
        removeGLTF (index) {
            this.scene.remove(this.models3d[index]);
            this.models3d.splice(index,index);
        }

    /*----- controls -----*/
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

        /*----- orbital controls -----*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * sets the control method to orbital controls.
         */
        enableOrbitalControls () {
            this.orbitalControls = new OrbitControls(this.camera, this.renderer.domElement);
            this.orbitalControls.update();
            this.orbitalControls.enabled = true;
        }
        /**
         * disables the orbital controls.
         */
        disableOrbitalControls () {
            this.orbitalControls.enabled = false;
        }

        /*----- FPS controls -----*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * sets the control method to fps controls.
         */
        enableFpsContols (options = {}) {
            const {
                movementSpeed = 150,
                lookSpeed = 0.1,
            } = options;
            this.FpsControls = new FirstPersonControls( this.camera, this.renderer.domElement );
			this.FpsControls.movementSpeed = movementSpeed;
			this.FpsControls.lookSpeed = lookSpeed;
        }
        /**
         * disables the fps controls.
         */
        disableFpsControls () {
            this.FpsControls.dispose();
        }

    /*----- lighting -----*/
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

        /*---- ambient light -----*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        addAmbientLight(color = rgbToHex(255,255,255)) {
            if (this.ambientLight != null) {
                this.ambientLight = null;
            }
            this.ambientLight = new THREE.AmbientLight(color);
            this.scene.add(this.ambientLight);
        }
        removeAmbientLight () {
            if (this.ambientLight != null) {
                this.scene.remove(this.ambientLight);
                this.addAmbientLight = null;
            } else {
            }
        }

        /*----- point lights -----*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        addPointLight ( position = [10,5,10], color = rgbToHex(255,255,255), intensity = 3, distance = 100, helper = false) {
            this.pointLights.push(new THREE.PointLight(color, intensity, distance));
            this.pointLights[this.pointLights.length - 1].position.set(position[0], position[1], position[2]);
            this.scene.add(this.pointLights[this.pointLights.length - 1]);
        }
        removePointLight (index = 0) {
            this.scene.remove(this.pointLights[index]);
            this.pointLights.splice(index, index);
        }

}