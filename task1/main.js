// togal states 
let isPaused = false;
let isDarkMode = true;

// Scene, Camera, Renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//  Lighting
scene.add(new THREE.AmbientLight(0x222222));
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(0, 0, 0);
scene.add(light);

// Sun
const sunGeometry = new THREE.SphereGeometry(4, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfdb813 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// All Planets
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

planets.forEach(planet => {
  const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: planet.color });
  const mesh = new THREE.Mesh(geometry, material);
  planet.mesh = mesh;
  planet.angle = Math.random() * Math.PI * 2;
  scene.add(mesh);
});

// 5.  stars background
function addStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1000;
  const starVertices = [];

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}
addStars();

// 6. Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (!isPaused) {
    planets.forEach(planet => {
      planet.angle += planet.speed;
      planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
      planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
    });
  }

  renderer.render(scene, camera);
}
animate();

// 7. Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 8. UI Buttons 


const pauseBtn = document.getElementById("pauseBtn");
const toggleBtn = document.getElementById("toggleTheme");

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
 pauseBtn.innerText = isPaused ? "Resume" : "Pause"
});

toggleBtn.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
 if (isDarkMode) {
  document.body.style.backgroundColor = "black";
  renderer.setClearColor(0x000000); 
  toggleBtn.innerText = "Light Mode";
} else {
  document.body.style.backgroundColor = "white";
  renderer.setClearColor(0xffffff); 
  toggleBtn.innerText = "Dark Mode";
}

});
