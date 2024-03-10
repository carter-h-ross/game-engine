import {threeScriptToJavascript} from './translate.js'

let script = "0:0:0:.0.0.0.1.1.1#FFFFFF^n|0:0:0:.0.0.2.1.1.1#FFFFFF|1:0:0:#FFFFFF|0:1:1:=2,0,0;2,0,-2;2,0,2.1#FFFFFF^n|2:0:0:^n";

let scene = threeScriptToJavascript(script);

let functions = [

[// basic shapes - 0
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

    [ // boxes - 0
        // add box - 0
        {
            name: "addBox",
            params: [
                { name: "x", type: "number" },
                { name: "y", type: "number" },
                { name: "z", type: "number" },
                { name: "scaleX", type: "number" },
                { name: "scaleY", type: "number" },
                { name: "scaleZ", type: "number" },
                { name: "color", type: "color" },
                { name: "texture", type: "string" }
            ],
            func: function addBox_ (params) {
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
            }
        },

        // add instanced boxes - 1 
        {

        }
    ]
],

]

function createInputFields(cat1, cat2, func) {
    // Get the function object
    const funcObj = functions[cat1][cat2][func];

    // Get the container element where input fields will be appended
    const container = document.getElementById("inputFieldsContainer");

    // Clear any existing input fields
    container.innerHTML = `<h1 class = "param-header">${funcObj.name}</h1>`;

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
    container.appendChild(addButton);s
}

createInputFields(0,0,0)