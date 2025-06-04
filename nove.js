import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadNove(scene, renderer, onLoaded) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load("./public/studio.jpg", (texture) => {
    const envMap = pmrem.fromEquirectangular(texture).texture;
    scene.environment = envMap;

    const loader = new GLTFLoader();
    loader.load("./public/nove_pudding.glb", (gltf) => {
      const pudding = gltf.scene;

      pudding.scale.set(0.5, 0.5, 0.5);
      pudding.position.set(1.6, 0, 0);

      onLoaded(pudding, "#edae73");
    });
  });
}
