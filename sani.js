import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadSani(scene, renderer, onLoaded) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load("./public/studio.jpg", (texture) => {
    const envMap = pmrem.fromEquirectangular(texture).texture;
    scene.environment = envMap;

    const loader = new GLTFLoader();
    loader.load("./public/mypudding.glb", (gltf) => {
      const pudding = gltf.scene;

      pudding.traverse((child) => {
        if (!child.isMesh || !child.material || !child.material.name) return;

        const matName = child.material.name;

        if (matName === "매테리얼.004") {
          child.material = new THREE.MeshPhysicalMaterial({
            color: "#e4a1d5",
            transmission: 0.1,
            roughness: 0.25,
            metalness: 0,
            clearcoat: 0.8,
            clearcoatRoughness: 0.15,
            ior: 1.3,
            thickness: 1.0,
            transparent: true,
            opacity: 0.95,
            attenuationDistance: 0.05,
            attenuationColor: "#f297c2",
            envMapIntensity: 1.5,
          });
        }

        if (matName === "매테리얼.006") {
          child.material = new THREE.MeshPhysicalMaterial({
            color: "#e8d9a8",
            metalness: 1,
            roughness: 0.2,
            clearcoat: 0.7,
            clearcoatRoughness: 0.1,
            reflectivity: 0.6,
            sheen: 0.7,
            emissive: new THREE.Color("#e8d9a8").multiplyScalar(0.02),
            envMapIntensity: 1.5,
          });
        }

        if (["매테리얼.007", "매테리얼.008"].includes(matName)) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#d6c7f7",
            metalness: 1,
            roughness: 0.2,
            clearcoat: 0.7,
            clearcoatRoughness: 0.1,
            reflectivity: 0.6,
            sheen: 0.7,
            envMapIntensity: 1.5,
          });
        }
      });

      pudding.scale.set(0.5, 0.5, 0.5);
      pudding.position.set(1.6, 0, 0);

      onLoaded(pudding, "#F48DA4"); // 사니 배경색
    });
  });
}
