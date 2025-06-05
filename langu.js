import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadLangu(scene, renderer, onLoaded) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load("./public/studio.jpg", (texture) => {
    const envMap = pmrem.fromEquirectangular(texture).texture;
    scene.environment = envMap;

    const loader = new GLTFLoader();
    loader.load("/public/your_model2.glb", (gltf) => {
      const pudding = gltf.scene;

      pudding.traverse((child) => {
        if (!child.isMesh) return;

        if (child.name === "Mesh_0") {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0xf0f0f0,
            metalness: 1.0,
            roughness: 0.15,
            envMap: envMap,
            envMapIntensity: 1.8,
            clearcoat: 1.0,
            clearcoatRoughness: 0.03,
            ior: 2.0,
            reflectivity: 1.0,
          });
        } else if (child.name === "Cylinder") {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0x121212,
            metalness: 1.0,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.02,
            envMap: envMap,
            envMapIntensity: 2.0,
            emissive: 0x000000,
            reflectivity: 1.0,
            ior: 2.2,
          });
        }
      });

      pudding.scale.set(0.5, 0.5, 0.5);
      pudding.position.set(1.6, 0, 0);

      onLoaded(pudding, "#121212");
    });
  });
}
