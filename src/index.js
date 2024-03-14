import {threeScriptToJavascript, getThreeScriptFunction} from './translate.js'
import {stringTo2dNumArray} from './stringToArray.js'

let script = "0:0:0:.0.0.0.1.1.1#FFFFFF^n|0:0:0:.0.0.2.1.1.1#FFFFFF|1:0:0:#FFFFFF|0:1:1:=2,0,0;2,0,-2;2,0,2.1#FFFFFF^n|2:0:0:^n";

let render = threeScriptToJavascript(script);

const cat1Names = [
    "basic shapes",
    "lights",
    "controls",
]

const cat2names = [
    [
        "boxes",
        "spheres",
        "cylinders",
        "cones",
        "toruses",
    ],
    [
        "ambient lights",
        "point lights",
    ],
    [
        "orbital controls",
        "FPS controls",
    ]
]

let functions = [

[// basic shapes - 0
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

    [ // boxes - 0
        // add box - 0
        {
            name: "addBox",
            buttonText: "add box",
            params: [
                { name: "x", type: "number" },
                { name: "y", type: "number" },
                { name: "z", type: "number" },
                { name: "scaleX", type: "number" },
                { name: "scaleY", type: "number" },
                { name: "scaleZ", type: "number" },
                { name: "color", type: "color" },
                { name: "texture", type: "file" }
            ],
        },
        // add instanced box - 0
        {
            name: "addInstancedBox",
            buttonText: "add instanced box",
            params: [
                { name: "positions", type: "array2dNum" },
                { name: "scaleX", type: "number" },
                { name: "scaleY", type: "number" },
                { name: "scaleZ", type: "number" },
                { name: "color", type: "color" },
                { name: "texture", type: "file" }
            ],
        },
    ],

    [ // spheres - 1
        // add sphere - 0
        {
            name: "addSphere",
            buttonText: "add sphere",
            params: [
                { name: "x", type: "number" },
                { name: "y", type: "number" },
                { name: "z", type: "number" },
                { name: "radius", type: "number" },
                { name: "color", type: "color" },
                { name: "texture", type: "file" }
            ],
        },
        // add instanced spheres - 0
        {
            name: "addInstancedSphere",
            buttonText: "add instanced spheres",
            params: [
                { name: "positions", type: "array2dNum" },
                { name: "radius", type: "number" },
                { name: "color", type: "color" },
                { name: "texture", type: "file" }
            ],
        },
    ], 
],

[// lighting - 1
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

    [ // ambient lights - 0
        // add ambient light - 0
        {
            name: "addAmbientLight",
            buttonText: "add ambient light",
            params: [
                { name: "color", type: "color" },
            ],
        },
        // remove ambient light - 1
        {
            name: "removeAmbientLight",
            buttonText: "remove ambient light",
            params: [
                { name: "color", type: "color" },
            ],
        },
    ],
],

[// lighting - 1
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

    [ // orbital controls - 0
        // add orbital controls - 0
        {
            name: "enableOrbitalControls",
            buttonText: "enable orbital controls",
            params: [
            ],
        },
        // remove orbital controls - 1
        {
            name: "disableOrbitalControls",
            buttonText: "disable orbital controls",
            params: [
            ],
        },
    ],
],

]

/**
 * checks if an input value needs to be translated from its input type
 * @param {any} [val] - the value to translate
 * @param {string} [type] - the number of divisions in the grid helper         
 */
function translateInputValue(val, type) {
    switch (type) {
        case "array2dNum":
            return stringTo2dNumArray(val);
        default: 
            return val
    }
}

function createInputFields(cat1, cat2, func) {
    // Get the function object
    const funcObj = functions[cat1][cat2][func];

    // Get the container element where input fields will be appended
    const container = document.getElementById("inputFieldsContainer");

    // Clear any existing input fields
    container.innerHTML = `<h2 class = "param-header">${funcObj.buttonText}</h2>`;

    // Iterate over the parameters of the function
    funcObj.params.forEach(param => {
        // Create label element
        const label = document.createElement("label");
        label.textContent = `${param.name}: `;
        label.setAttribute("for", param.name); // Assign for attribute to associate label with input
        label.classList.add("label"); // Add CSS class to label element

        // Create input element based on parameter type
        let input;
        switch (param.type) {
            case "number":
                input = document.createElement("input");
                input.type = "number";
                input.classList.add("input-number"); // Add CSS class to input element
                input.classList.add("input-all");
                break;
            case "string":
                input = document.createElement("input"); 
                input.type = "text";
                input.classList.add("input-text"); // Add CSS class to input element
                input.classList.add("input-all");
                break;
            case "color": 
                input = document.createElement("input"); 
                input.type = "color";
                input.classList.add("input-color"); // Add CSS class to input element
                input.classList.add("input-all")
                break;
            case "file": 
                input = document.createElement("input"); 
                input.type = "file";
                label.classList.add("file-input-button"); // Add CSS class to label element
                break;
            case "array2dNum":
                input = document.createElement("input"); 
                input.type = "text";
                input.classList.add("input-text"); // Add CSS class to input element
                input.classList.add("input-all")
                break;
            // Add cases for other types as needed
        }

        // Assign ID to input element
        input.id = param.name;

        // Append label and input elements to the container
        container.appendChild(label);
        container.appendChild(input);

        // Add line break after each input
        container.appendChild(document.createElement("br"));
    });

    // Create "Add to Scene" button
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Scene";
    addButton.classList.add("main-menu-button");
    addButton.id = "addToSceneButton"; // Assign an ID to the button for easy reference
    
    // Attach event listener to the "Add to Scene" button
    addButton.addEventListener("click", () => {
        // Get the values of the input fields
        const params = funcObj.params.map(param => {
            const inputValue = document.getElementById(param.name).value;
            return translateInputValue(inputValue, param.type);
        });

        // Call the updateScript function with the obtained parameters
        updateScript(cat1, cat2, func, params);
    });

    container.appendChild(addButton);
}

function updateScript (cat1, cat2, func, params) {
    script += getThreeScriptFunction(cat1, cat2, func, params);
}

function loadCat1Menu() {
    const container = document.getElementById("nav-menu");
    container.innerHTML = ""; // Clear any existing content

    // Iterate over the categories in the functions array
    functions.forEach((category, cat1Index) => {
        const cat1Button = document.createElement("button");
        cat1Button.textContent = `${cat1Names[cat1Index]}`;
        cat1Button.classList.add("main-menu-button");
        cat1Button.addEventListener("click", () => loadCat2Menu(cat1Index));
        container.appendChild(cat1Button);
        container.appendChild(document.createElement("br"));
    });
}


// Function to create back button in the category 2 menu
function loadCat2Menu(cat1) {
    const container = document.getElementById("nav-menu");
    container.innerHTML = ""; // Clear any existing content

    // Iterate over the functions in the selected category
    functions[cat1].forEach((subCategory, cat2Index) => {
        const cat2Button = document.createElement("button");
        cat2Button.textContent = `${cat2names[cat1][cat2Index]}`;
        cat2Button.classList.add("main-menu-button");
        cat2Button.addEventListener("click", () => loadFuncMenu(cat1, cat2Index));
        container.appendChild(cat2Button);
        container.appendChild(document.createElement("br"));
    });

    // Create back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.classList.add("back-button");
    backButton.addEventListener("click", () => loadCat1Menu()); // Go back to category 1 menu
    container.appendChild(backButton);
}

// Function to create back button in the function menu
function loadFuncMenu(cat1, cat2) {
    const container = document.getElementById("nav-menu");
    container.innerHTML = ""; // Clear any existing content

    // Iterate over the functions in the selected category and subcategory
    functions[cat1][cat2].forEach((funcObj, funcIndex) => {
        const funcButton = document.createElement("button");
        funcButton.textContent = funcObj.buttonText || funcObj.name; // Use buttonText if available, otherwise use name
        funcButton.classList.add("main-menu-button");
        funcButton.addEventListener("click", () => createInputFields(cat1, cat2, funcIndex));
        container.appendChild(funcButton);
        container.appendChild(document.createElement("br"));
    });

    // Create back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.classList.add("back-button");
    backButton.addEventListener("click", () => loadCat2Menu(cat1)); // Go back to category 2 menu
    container.appendChild(backButton);
}

// Load the initial menu
loadCat1Menu();