varying vec3 vPos;                               // Position in image
uniform float uTime;                             // Time

vec3 LDir = normalize(vec3(1.,-sin(uTime),.5));  // Light direction

vec2 raytraceSphere(vec3 V, vec3 W, vec4 S) {
   V -= S.xyz;
   float B = 2. * dot(V, W);
   float C = dot(V, V) - S.w * S.w;
   float discrim = B*B - 4.*C;
   return discrim < 0. ? vec2(1000., 1000.)
                       : vec2(-B - discrim, -B + discrim) / 2.;
}

vec3 reflection(vec3 L, vec3 N) {
   return 2. * dot(N, L) * N - L;
}

vec3 phong(vec3 N, vec3 E, vec3 A, vec3 D, vec4 S) {
   vec3 c = A;                                // Ambient color
   for (int i = 0; i < uLDirs_length; i++){
      vec3 LDir = normalize(uLDirs[i]);
      float d = max(0., dot(N, LDir));           // Diffuse value
      vec3 R = 2. * dot(N, LDir) * N - LDir;     // Reflection dir
      float s = pow(max(0., dot(E, R)), S.a);    // Specular value
      c += uLColors[i] * (d * D + s * S.rgb * .1*S.a);
   }
   
   return c;
}

vec4 C;
vec3 V, W, P, E, N;

bool raytrace() {
   float distance = 1000.;
   for (int i = 0 ; i < uSpheres_length ; i++) {
      vec2 t = raytraceSphere(V, W, uSpheres[i]);
      if (t.x < distance) {
         C = uSColors[i];
         P = V + t.x * W;                      // Point on sphere
         E = -normalize(P);                    // Direction to eye
         N = normalize(P - uSpheres[i].xyz);   // Surface normal
         distance = t.x;
      }
   }
   return distance < 1000.;
}

void main() {
   vec3 c = vec3(.01, .01, .04);

   V = vec3(0.,0.,0.);                         // Ray origin
   W = normalize(vec3(vPos.xy, -3.));          // Ray direction
   if (raytrace())
      for (int bounce = 0 ; bounce < 5 ; bounce++) {
    c += phong(N, E, .1*C.rgb, .5*C.rgb, vec4(.5,.5,.5,C.a));
    V = P + .001 * W;
    W = reflection(-W, N);
         if (! raytrace())
       break;
      }
         
   gl_FragColor = vec4(sqrt(c), 1.);           // Final pixel color
}