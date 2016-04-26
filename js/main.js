var renderer;
var scene;
var camera;
var directionalLight;
var controls
var sphere;
var moonphase;
var oldmoonphase = 0;

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

function setDateTime() {
  var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
  $("#time").text(h + ':' + m);
  var dd = d.getDate();
  var mm = d.getMonth()+1; //January is 0!
  var yyyy = d.getFullYear();
  if(dd<10) {
      dd='0'+dd
  } 
  if(mm<10) {
      mm='0'+mm
  } 

  var month = 'Jan';

  if (mm == 01) { month = 'Jan'; }
  else if (mm == 02) { month = 'Feb'; }
  else if (mm == 03) { month = 'Mar'; }
  else if (mm == 04) { month = 'Apr'; }
  else if (mm == 05) { month = 'May'; }
  else if (mm == 06) { month = 'Jun'; }
  else if (mm == 01) { month = 'Jul'; }
  else if (mm == 01) { month = 'Aug'; }
  else if (mm == 01) { month = 'Sep'; }
  else if (mm == 01) { month = 'Oct'; }
  else if (mm == 01) { month = 'Nov'; }
  else if (mm == 01) { month = 'Dec'; }

  $("#day").text(dd);
  $("#month").text(month);
}

function animate() {
  halfSphere.rotation.y = (Math.atan2(obj.position.z, obj.position.x));
  moonphase = (halfSphere.rotation.y*180/Math.PI);

  // remove this when finished
  // console.log((halfSphere.rotation.y*180/Math.PI));

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
  getMoonPhase();
}

function getMoonPhase() {
  if(oldmoonphase != moonphase) {
    setMoonPhase();
    changeData();
    oldmoonphase = moonphase;
  } else {
    // Do nothing
  }
}


function randomNumber(min,max) {
    var randomNumber = Math.floor(Math.random()*(max-min+1)+min);
    return randomNumber;
}

function setMoonPhase() {
    document.getElementById('data').className = '';
  if (moonphase > 60 && moonphase < 135) {
    $('#data').addClass('phase-new');
    //console.log("NEW");
  } else if (moonphase > 135 && moonphase <= 180) {
    $('#data').addClass('phase-waning-crescent');
    //console.log("WANING CRESCENT");
  } else if (moonphase >= -180 && moonphase < -160) {
    $('#data').addClass('phase-third-quarter');
    //console.log("THIRD QUARTER");
  } else if (moonphase > -160 && moonphase < -120) {
    $('#data').addClass('phase-waning-gibbous');
    //console.log("WANING GIBBOUS");
  } else if (moonphase > -120 && moonphase < -50) {
    $('#data').addClass('phase-full');
    //console.log("FULL");
  } else if (moonphase > -50 && moonphase < -7) {
    $('#data').addClass('phase-waxing-gibbous');
    //console.log("WAXING GIBBOUS");
  } else if (moonphase > -7 && moonphase < 7) {
    $('#data').addClass('phase-first-quarter');
    //console.log("FIRST QUARTER");
  } else if (moonphase > 7 && moonphase < 60) {
    $('#data').addClass('phase-waxing-crescent');
    //console.log("WAXING CRESCENT");
  }
}

function changeData() {
    var illumination = Math.round((90 - (moonphase)) * (5/9));

    if (illumination >= 0 && illumination <= 100) {
      $('#phase-info-1').text("illumination: " + illumination + "%");
    }
    else if (illumination > 100) {
      var illuminationNegative = 100 - (illumination - 100);
      $('#phase-info-1').text("illumination: " + illuminationNegative + "%");
    }
    else if (illumination < 0) {
      var illuminationNegative = illumination * -1;
      $('#phase-info-1').text("illumination: " + illuminationNegative + "%");
    }

    //just faking the distance thing for now... we should fix this later.
    var distance = randomNumber(1, 700);
    $('#phase-info-4').text("376," + distance + "km away");
}

init();
setDateTime();
animate();
