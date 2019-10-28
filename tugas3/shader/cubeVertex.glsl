precision mediump float;

attribute vec3 vPos;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 theta;
uniform float scale;
uniform mat4 projection;
uniform mat4 modelView;

void main(){
	gl_Position=vec4(vPos,1.);

	vec3 angle = radians(theta);

	vec3 c = cos(angle);
	vec3 s = sin(angle);

	mat4 rotationZ=mat4(
		c.z, s.z, 0.0, 0.0,
		-s.z, c.z, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	mat4 rotationX=mat4(
		1.0, 0.0, 0.0, 0.0,
		0, c.x, s.x, 0.0,
		0.0, -s.x, c.x, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	mat4 rotationY=mat4(
		c.y, 0.0, -s.y, 0.0,
		0.0, 1.0, 0.0, 0.0,
		s.y, 0.0,  c.y, 0.0,
		0.0, 0.0, 0.0,1.0
	);
	gl_Position = rotationX * rotationY * rotationZ * gl_Position;

	mat4 scalation = mat4(
		scale, 0.0, 0.0, 0.0,
		0.0, scale, 0.0, 0.0,
		0.0, 0.0, scale, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	gl_Position = gl_Position * scalation;

	gl_Position = projection * modelView * gl_Position;

	fColor=vColor;
}
