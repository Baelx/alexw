let angle = 0;
let w = 19;
let ma;
let maxD;

function setup() { 
    let canvas = createCanvas(500, 500, WEBGL);
    canvas.parent('canvas');
    
    // Set magic angle 
    ma = asin(1 / sqrt(3))

    // Max distance: Distance between the center of wave and the outside cubes
    maxD = dist(0,0,200,200)
  } 
  
  function draw() { 
    background(100);

    // Lighting
    ambientLight(100, 100, 100);
    
    // Set overhead perspective
    ortho(-200, 200, -200, 100, 100, 1000)
    translate(0, 50, -50)

    // imperfect isometric projection
    rotateX(-QUARTER_PI - 0.5)
    rotateY(ma)

    // Lock on to mouse movements
    let locX = mouseX - height / 2;
    let locY = mouseY - width / 2;
  
    // Spotlight using mouse movements
    pointLight(255, 255, 255, locX, locY, 100);

    // Generate waves
    for (let z = 0; z < height; z += w) {
      for (let x = 0; x < width; x += w) {
        let d = dist(x, z, width / 2, height / 2)
        let offset = map(d, 0, maxD, -PI, PI)
        push()
          let a = angle + offset;
          let h = floor(map(Math.sin(a), -1, 1, 100, 300));
          ambientMaterial(70, 130, 230)
          translate(x - width / 2, 0, z - height / 2)
          box(w - 2, h, w - 2)
        pop()
      }
    }
    angle -= 0.02;
  }