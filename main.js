import * as THREE from "three";
import { loadChori } from "./chori.js";
import { loadSani } from "./sani.js";
import { loadParang } from "./parang.js";
import { loadNove } from "./nove.js";
import { loadLangu } from "./langu.js";

let scene, camera, renderer, pudding;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector("#bg-canvas"),
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputEncoding = THREE.sRGBEncoding;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 5);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(0, 2, 2);
  scene.add(pointLight);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // 버튼 클릭 + 호버 효과
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modelName = btn.dataset.model;
      loadModel(modelName);
    });

    btn.addEventListener("mouseenter", () => {
      btn.classList.add("hover-effect");
    });

    btn.addEventListener("mouseleave", () => {
      btn.classList.remove("hover-effect");
    });
  });

  loadModel("chori"); // 최초 로드
}

function loadModel(name) {
  if (pudding) scene.remove(pudding);

  const onLoaded = (model, bgColor) => {
    pudding = model;
    scene.background = new THREE.Color(bgColor);
    document.body.style.setProperty("--hover-text-color", bgColor); // 호버 텍스트 컬러 설정
    scene.add(pudding);
  };

  if (name === "chori") loadChori(scene, renderer, onLoaded);
  else if (name === "sani") loadSani(scene, renderer, onLoaded);
  else if (name === "parang") loadParang(scene, renderer, onLoaded);
  else if (name === "nove") loadNove(scene, renderer, onLoaded);
  else if (name === "langu") loadLangu(scene, renderer, onLoaded);
}

function animate() {
  requestAnimationFrame(animate);
  if (pudding) pudding.rotation.y += 0.01;
  renderer.render(scene, camera);
}
