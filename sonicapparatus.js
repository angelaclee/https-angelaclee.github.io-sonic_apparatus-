// Synth Global Vars
let sampler, wave, ftt, imgSize;


// MAKE A PLAYER FOR CONTINUOUS ATMOSPHERIC SOUNDS

var player = new Tone.Player({

  "url": "./samples/pads.mp3", 
  "loop": true,
  "volume": -5

}).toMaster();

// play as soon as the buffer is loaded
player.autostart = true;



function setup() {
  createCanvas(windowWidth,windowHeight);

  background(51);

  // CREATE SAMPLER STUFF
  fft = new Tone.FFT(256).toMaster();
  wave = new Tone.Waveform(256).toMaster();
  sampler = new Tone.Sampler({
    C3: "../samples/harpA3.mp3"
  });

  // SAMPLER ROUTING
  sampler.connect(fft);
  sampler.connect(wave);

}


var multislider = new Nexus.Multislider('#target',{
  'size': [200,100],
  'numberOfSliders': 5,
  'min': 0,
  'max': 1,
  'step': 0,
  'candycane': 3,
  'values': [0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1],
  'smoothing': 0,
  'mode': 'bar'  // 'bar' or 'line'
 })
  
multislider.on('change',function(v) {
  console.log(v);
})


////////// LAYERING TEXTURES
// CREATE KNOBS/SLIDER FOR TIMBRAL EFFECTS (Lo-PASS FILTER, DISTORTION) --> DYNAMIC TEXTURAL CHANGES (i.e, FOG, STROKE WEIGHT)
// CREATE BUTTONS TO TRIGGER DIFF TIMBRES --> 
// CREATE KNOBS FOR TEMPORAL EFFECTS (DELAY, REVERB) -->
// THRESHOLD --> Visuals disappear at a certain threshold to make room for new textures
// ADDITIVE TEXTURES? SOUNDS AND ART BECOMES "WHITE NOISE"
////////// daniel schiffman

// nexus UI


///////// USER INPUT
// midi? https://editor.p5js.org/dbarrett/sketches/HJhBG-LI7
///////




// function draw() {}



function mouseClicked() {
  stroke("white");
  let num = ceil(random(2, 9));

  crack(mouseX, mouseY, num);

  switch (true) {
    case num == 7:
      sampler.triggerAttackRelease("C3", "4n");
      break;
    case num == 6:
      sampler.triggerAttackRelease("D3", "4n");
      break;
    case num == 5:
      sampler.triggerAttackRelease("Eb3", "4n");
      break;
    case num == 4:
      sampler.triggerAttackRelease("G3", "4n");
      break;
    case num == 3:
      sampler.triggerAttackRelease("Ab3", "4n");
      break;
    case num == 2:
      sampler.triggerAttackRelease("C4", "4n");
      break;
    case num == 8:
      sampler.triggerAttackRelease("D4", "4n");
      break;
    case num == 9:
      sampler.triggerAttackRelease("Eb4", "4n");
      break;
  }
}

// CREATE CRACKS RECURSIVELY
function crack(x, y, num, previousVect) {
  stroke("grey");
  if (num <= 0) {
    return;
  }

  strokeWeight(num);

  for (var i = 0; i < random(1, 3); i++) {
    let prev = makeCrack(x, y, previousVect);
    if (x < 0 || x > windowWidth || y < 0 || y > windowHeight) {
      return;
    }

    crack(prev.end.x, prev.end.y, num - .5, prev.previousVect);
  }
}

function makeCrack(x, y, previousVector) {
  // calculate a random line
  const center = createVector(x, y);

  let randomVect;
  if (previousVector) {
    let noise = p5.Vector.random2D().mult(random(20, 30));
    randomVect = previousVector.add(noise);
  } else {
    randomVect = p5.Vector.random2D().mult(random(20, 30));
  }
  let end = randomVect.copy().add(center);

  line(center.x, center.y, end.x, end.y);
  return {
    end: end,
    previousVect: randomVect
  };
}
