import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadParang(scene, renderer, onLoaded) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load("./public/studio.jpg", (texture) => {
    const envMap = pmrem.fromEquirectangular(texture).texture;
    scene.environment = envMap;

    const loader = new GLTFLoader();
    loader.load("./public/parang_pudding.glb", (gltf) => {
      const pudding = gltf.scene;

      pudding.traverse((child) => {
        if (!child.isMesh) return;

        if (child.name === "metal") {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x9d9d9d,
            metalness: 1.0,
            roughness: 0.0,
            side: THREE.DoubleSide,
            envMapIntensity: 1.5,
          });
        } else if (child.name === "체리") {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0x2e7594,
            metalness: 1.0,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0,
            transmission: 0.2,
            ior: 1.5,
            thickness: 0.2,
            envMapIntensity: 1.5,
          });
        } else if (child.name === "크림") {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0xe7e7e7,
            metalness: 0.0,
            roughness: 0.4,
            envMapIntensity: 1.5,
          });
        } else if (child.name === "푸딩") {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0x94e9ff,
            metalness: 0.0,
            roughness: 0.0,
            transmission: 0.2,
            emissive: 0xccecff,
            emissiveIntensity: 0.6,
            thickness: 0.2,
            ior: 1.5,
            envMapIntensity: 1.5,
            transparent: true,
            opacity: 1.0,
          });
        }
      });

      pudding.scale.set(0.5, 0.5, 0.5);
      pudding.position.set(1.6, 0, 0);

      onLoaded(pudding, "#113445");
    });
  });
}
