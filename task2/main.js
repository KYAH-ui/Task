// 1. Create the scene
const scene = new THREE.Scene();

// 2. Set up the camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.z = 50;

// 3. Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Lighting
const ambientLight = new THREE.AmbientLight(0x222222); // Soft light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2); // Sunlight
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// 5. Add the Sun
const sunGeometry = new THREE.SphereGeometry(4, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfdb813 }); // bright yellow
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// 6. Define planet data
const planets = [
  { name: 'Mercury', color: 0xb1b1b1, size: 0.5, distance: 7, speed: 0.04 },
  { name: 'Venus', color: 0xe0c16c, size: 0.9, distance: 10, speed: 0.015 },
  { name: 'Earth', color: 0x2d6cdf, size: 1.0, distance: 13, speed: 0.01 },
  { name: 'Mars', color: 0xff6d2d, size: 0.7, distance: 16, speed: 0.008 },
  { name: 'Jupiter', color: 0xe2a948, size: 2.5, distance: 21, speed: 0.005 },
  { name: 'Saturn', color: 0xd9c089, size: 2.0, distance: 26, speed: 0.003 },
  { name: 'Uranus', color: 0x7fdbff, size: 1.4, distance: 30, speed: 0.002 },
  { name: 'Neptune', color: 0x4169e1, size: 1.3, distance: 35, speed: 0.0015 }
];

// 7. Create planets and sliders
const controlsDiv = document.getElementById("controls");

planets.forEach((planet, index) => {
  // Create planet mesh
  const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: planet.color });
  const mesh = new THREE.Mesh(geometry, material);
  planet.mesh = mesh;
  planet.angle = Math.random() * Math.PI * 2;

  scene.add(mesh);

  // Create slider UI
  const control = document.createElement("div");
  control.innerHTML = `
    <label>${planet.name}</label>
    <input type="range" min="0.0005" max="0.05" step="0.0005" value="${planet.speed}" id="slider-${index}">
    <span id="value-${index}">${planet.speed}</span><br/>
  `;
  controlsDiv.appendChild(control);

  // Real-time slider control
  const slider = document.getElementById(`slider-${index}`);
  const valueDisplay = document.getElementById(`value-${index}`);

  slider.addEventListener("input", (e) => {
    planet.speed = parseFloat(e.target.value);
    valueDisplay.textContent = planet.speed;
  });
});

// 8. Animate planets
function animate() {
  requestAnimationFrame(animate);

  planets.forEach(planet => {
    planet.angle += planet.speed;
    planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
    planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
  });

  renderer.render(scene, camera);
}
animate();

// 9. Handle browser resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
