let sallyPosition = new THREE.Vector2(0,0);

// rate of displacement change
sallyStride = 0.08;

movingUpDownLeftRight = 0;

// TODO: FPS SHOULDN'T DEPEND ON sally'S STRIDE
// its function seems to be *seconds per frame*, not frame per second
fps = sallyStride * 3000;
let currentTime = fps;
let clock = new THREE.Clock();

// make a keyevent listening file
document.addEventListener("keydown", function(event) {
    if (event.key === "w" || event.key === "W") {
        if (movingUpDownLeftRight != 1) {
            SelectSprite(10);
        }
        movingUpDownLeftRight = 1;
        flipSpriteToOriginal();
        sallyPosition.y += sallyStride;
    }
    if (event.key === "a" || event.key === "A") {
        if (movingUpDownLeftRight != 3) {
            SelectSprite(15);
        }
        movingUpDownLeftRight = 3;
        flipSpriteToOriginal();
        sallyPosition.x -= sallyStride;
    }
    if (event.key === "d" || event.key === "D") {
        if (movingUpDownLeftRight != 4) {
            SelectSprite(15);
        }
        movingUpDownLeftRight = 4;
        flipSpriteToFlipped();
        sallyPosition.x += sallyStride;
    }
    if (event.key === "s" || event.key === "S") {
        if (movingUpDownLeftRight != 2) {
            SelectSprite(12);
        }
        movingUpDownLeftRight = 2;
        flipSpriteToOriginal()
        sallyPosition.y -= sallyStride;
    }
})

document.addEventListener("keyup", function(event) {
    if (event.key === "s" || event.key === "S" || event.key === "a" || event.key ==="A"
    || event.key == "w" || event.key === "W" || event.key === "d" || event.key === "D") {
        movingUpDownLeftRight = 0;
    }
})

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// adding sprite render

let sallyTexture = new THREE.TextureLoader().load("sally.png");
sallyTexture.magFilter = THREE.NearestFilter;
let sallyMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map: sallyTexture, side: THREE.DoubleSide, transparent: true});
const spriteGeometry = new THREE.PlaneGeometry(1, 1);
const sally = new THREE.Mesh( spriteGeometry, sallyMaterial);
scene.add(sally);

camera.position.z = 5;

//  TODO: THIS FUNCTION SHOULD ONLY INCLUDE 0) calculate delta
// 1) change sprite 2) request animation frame 3) rendering
function animate() {
    let delta = clock.getDelta(); 
    // todo: make changes here
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();