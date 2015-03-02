var renderer;
var scene;
var camera;
var directionalLight;
var controls
var sphere;

var obj = new THREE.OrthographicCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    100000
  );

obj.position.z = 300;

function init() {
  scene = new THREE.Scene();

  var ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  scene.add(directionalLight);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    100000
  );

  camera.position.z = 250;

  var geometry = new THREE.CircleGeometry(110, 110);
  
  var material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('./img/mooncolor-big.jpg')
  });

  var halfGeometry = new THREE.SphereGeometry(101, 101, 101, Math.PI/2, Math.PI, Math.PI, Math.PI);
  var halfMaterial = new THREE.MeshBasicMaterial({
    color: 0x151554
  });

  halfMaterial.side = THREE.BackSide;

  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  halfSphere = new THREE.Mesh(halfGeometry, halfMaterial);
  scene.add(halfSphere);

  renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  document.getElementById("moon-container").insertBefore(renderer.domElement, document.getElementById("moon-container").firstChild);
  renderer.domElement.id = "canvas";

  controls = new THREE.OrbitControls(obj, renderer.domElement);
  window.addEventListener( 'resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }, false );

}

function animate() {
  //console.log(Math.atan(obj.position.z, obj.position.x));
  halfSphere.rotation.y = Math.atan2(obj.position.z, obj.position.x);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}

init();
animate();
