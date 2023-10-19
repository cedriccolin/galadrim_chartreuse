import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    ACESFilmicToneMapping,
    HemisphereLight,
    PointLight,
    AmbientLight,
    DirectionalLight,
    Mesh
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let scene, camera, loader, container, renderer, root,
    mouseX = 0,
    mouseY = 0;

const WIDTH = 400, HEIGHT = 400;

init().then(render);

/**
 * Initializes the WebGL renderer and sets up the scene, camera, and lighting.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function init(){
    container = document.getElementById("blep");

    // load scene & camera

    scene = new Scene();
    camera = new PerspectiveCamera(30, WIDTH / HEIGHT, 0.25, 100);
    camera.position.set(0, 0.8, 15);

    loader = new GLTFLoader();

    // fetch & add the mesh to the scene

    root = await loader.loadAsync('assets/gmp/galadrim2.glb');
    root.scene.rotation.y = Math.PI;
    root.scene.traverse(function (node) {
        if (node instanceof Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    root = scene.add(root.scene);

    const hemiLight = new HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 5);
    scene.add(hemiLight);

    const ambientLight = new AmbientLight(0x404040, 5);
    scene.add(ambientLight);

    const dirLight = new DirectionalLight(0xffffff, 1.25);
    dirLight.position.set(5, 10, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // create WebGL renderer

    renderer = new WebGLRenderer({ alpha: true, antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    onWindowResize()
    console.log("WebGL renderer initiated & running")

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
}

/**
 * Handles the window resize event.
 *
 * @returns {void}
 */
function onWindowResize()
{
    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    //
    // renderer.setSize( window.innerWidth, window.innerHeight );

    render();
}

/**
 * Handles the onMouseMove event.
 *
 * @param {MouseEvent} event - The mouse event object.
 */
function onMouseMove(event)
{
    event.preventDefault();

    let deltaX = event.clientX - mouseX;
    let deltaY = event.clientY - mouseY;
    mouseX = event.clientX;
    mouseY = event.clientY;
    moveJoint({ x: mouseX, y: mouseY}, root, 15);
}

/**
 * Moves a joint based on the position of the mouse.
 * The rotation of the joint is adjusted based on the mouse coordinates.
 *
 * @param {Object} mouse - The mouse object containing x and y coordinates.
 * @param {Object} joint - The joint object to be moved.
 * @param {number} degreeLimit - The maximum degree limit for the joint rotation.
 */
function moveJoint(mouse, joint, degreeLimit)
{
    let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
    joint.rotation.y = degrees_to_radians(degrees.x);
    joint.rotation.x = degrees_to_radians(degrees.y);

    render();
}

/**
 * Converts degrees to radians.
 *
 * @param {number} degrees - The value in degrees to be converted.
 * @return {number} The value in radians.
 */
function degrees_to_radians(degrees)
{
    return degrees * (Math.PI/180);
}

/**
 * Calculates the degree values based on the mouse position relative to the screen.
 *
 * @param {number} x - The x-coordinate of the mouse position.
 * @param {number} y - The y-coordinate of the mouse position.
 * @param {number} degreeLimit - The maximum rotation allowed in degrees.
 * @return {{x: number, y: number}} - The calculated degree values for x and y.
 */
function getMouseDegrees(x, y, degreeLimit)
{
    let dx = 0,
        dy = 0,
        xdiff,
        xPercentage,
        ydiff,
        yPercentage;

    let w = { x: window.innerWidth, y: window.innerHeight };

    // Left
    if (x <= w.x / 2) {
        xdiff = w.x / 2 - x;
        xPercentage = (xdiff / (w.x / 2)) * 100;
        dx = ((degreeLimit * xPercentage) / 100) * -1;
    }

    // Right
    if (x >= w.x / 2) {
        xdiff = x - w.x / 2;
        xPercentage = (xdiff / (w.x / 2)) * 100;
        dx = (degreeLimit * xPercentage) / 100;
    }
    // Up
    if (y <= w.y / 2) {
        ydiff = w.y / 2 - y;
        yPercentage = (ydiff / (w.y / 2)) * 100;
        dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
    }
    // Down
    if (y >= w.y / 2) {
        ydiff = y - w.y / 2;
        yPercentage = (ydiff / (w.y / 2)) * 100;
        dy = (degreeLimit * yPercentage) / 100;
    }
    return { x: dx, y: dy };
}

/**
 * Renders the scene using the specified renderer and camera.
 * @memberOf namespace
 * @function
 * @name render
 *
 * @return {void}
 */
function render() {
    renderer.render(scene, camera);
}