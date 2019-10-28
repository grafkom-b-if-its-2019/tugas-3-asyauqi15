(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
  
    // Definisi verteks dan buffer
    var triangleVertices = [
      // x, y       r, g, b
      +0.3, +0.6,     1.0, 1.0, 0.0,
      +0.7, +0.6,     0.7, 0.0, 1.0,
      +0.7, +0.4,     0.1, 1.0, 0.6,
      +0.3, +0.6,     1.0, 1.0, 0.0,
      +0.3, +0.4,     0.7, 0.0, 1.0,
      +0.7, +0.4,     0.1, 1.0, 0.6,
      +0.3, +0.6,     1.0, 1.0, 0.0,
      +0.3, -0.1,     0.7, 0.0, 1.0,
      +0.4, -0.1,     0.1, 1.0, 0.6,
      +0.3, +0.6,     1.0, 1.0, 0.0,
      +0.4, +0.6,     0.7, 0.0, 1.0,
      +0.4, -0.1,     0.1, 1.0, 0.6,
      +0.3, -0.1,     1.0, 1.0, 0.0,
      +0.3, +0.1,     0.7, 0.0, 1.0,
      +0.7, +0.1,     0.1, 1.0, 0.6,
      +0.3, -0.1,     1.0, 1.0, 0.0,
      +0.7, -0.1,     0.7, 0.0, 1.0,
      +0.7, +0.1,     0.1, 1.0, 0.6,
      +0.3, -0.1,     1.0, 1.0, 0.0,
      +0.7, -0.1,     0.7, 0.0, 1.0,
      +0.7, +0.1,     0.1, 1.0, 0.6,
      +0.7, +0.1,     1.0, 1.0, 0.0,
      +0.7, -0.6,     0.7, 0.0, 1.0,
      +0.6, -0.6,     0.1, 1.0, 0.6,
      +0.7, +0.1,     1.0, 1.0, 0.0,
      +0.6, +0.1,     0.7, 0.0, 1.0,
      +0.6, -0.6,     0.1, 1.0, 0.6,
      +0.7, -0.6,     1.0, 1.0, 0.0,
      +0.3, -0.6,     0.7, 0.0, 1.0,
      +0.3, -0.4,     0.1, 1.0, 0.6,
      +0.7, -0.6,     1.0, 1.0, 0.0,
      +0.7, -0.4,     0.7, 0.0, 1.0,
      +0.3, -0.4,     0.1, 1.0, 0.6,
    ];

    var triangleVertices2 = [
      // x, y       r, g, b
      -0.7, +0.6,     1.0, 1.0, 0.0,
      -0.3, +0.6,     0.7, 0.0, 1.0,
      -0.3, +0.4,     0.1, 1.0, 0.6,
      -0.6, +0.4,     1.0, 1.0, 0.0,
      -0.6, +0.1,     0.7, 0.0, 1.0,
      -0.3, +0.1,     0.1, 1.0, 0.6,
      -0.3, -0.6,     1.0, 1.0, 0.0,
      -0.7, -0.6,     0.7, 0.0, 1.0,
      -0.7, -0.4,     0.1, 1.0, 0.6,
      -0.4, -0.4,     1.0, 1.0, 0.0,
      -0.4, -0.1,     0.7, 0.0, 1.0,
      -0.7, -0.1,     0.1, 1.0, 0.6
    ];

    vertices = triangleVertices.concat(triangleVertices2);

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');

    var vPosition2 = gl.getAttribLocation(program2, 'vPosition');
    var vColor2 = gl.getAttribLocation(program2, 'vColor');
    
    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      2,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );

    gl.vertexAttribPointer(
      vPosition2,  // variabel yang memegang posisi attribute di shader
      2,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );

    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
      5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    gl.enableVertexAttribArray(vPosition2);
    gl.enableVertexAttribArray(vColor2);
    
    var scale = 1;
    var membesar = 1;

    var theta2 = 0;

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.useProgram(program);
      var scaleLoc = gl.getUniformLocation(program, 'scale');
      if (scale >= 1) membesar = -1;
      else if (scale <= -1) membesar = 1;
      scale = scale + (membesar * 0.0093);
      gl.uniform1f(scaleLoc, scale);
      gl.drawArrays(gl.TRIANGLES, 0, 33);

      gl.useProgram(program2);
      var thetaLoc2 = gl.getUniformLocation(program2, 'theta');
      theta2 += Math.PI * 0.0093
      gl.uniform1f(thetaLoc2, theta2);
      gl.drawArrays(gl.LINE_LOOP, 33, 12);

      requestAnimationFrame(render); 
    }
    render();
  }

})();
