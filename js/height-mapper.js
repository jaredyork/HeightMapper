var canvas = document.getElementById("preview");
var ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1920;

ctx.save();
ctx.fillStyle = "#e9e9e9";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.restore();

class Generator {
  constructor(canvas, ctx) {
    this.noise = noise;
    this.canvas = canvas;
    this.ctx = ctx;

    console.log(this.noise.perlin2(100, 200) / 100);
    console.log(this.canvas);
  }

  generate() {

    var imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {

      var x = Math.floor((i / 4) % (this.canvas.width * 1));
      var y = Math.floor((i / 4) / (this.canvas.height * 1));

      var e0 = this.ridgenoise(1 * x, 1 * y);
      var e1 = 0.5 * this.ridgenoise(2 * x, 2 * y) * e0;
      var e2 = 0.25 * this.ridgenoise(4 * x, 4 * y) * (e0 + e1);
      var e = e0 + e1 + e2;

      var perlin = Math.pow(e, 2);

      if (i % 81920 == 0)
        console.log(perlin);

      // red
      data[i] = perlin;
      
      // green
      data[i + 1] = perlin;
      
      // blue
      data[i + 2] = perlin;
    }

    this.ctx.putImageData(imageData, 0, 0);

    console.log("Generated preview.");

  }

  ridgenoise(nx, ny) {
    return 2 * (0.5 - Math.abs(0.5 - this.noise.perlin2(nx, ny)));
  }
}

var generator = new Generator(canvas, ctx);
generator.generate();

