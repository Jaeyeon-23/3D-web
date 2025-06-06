import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadChori(scene, renderer, onLoaded) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load("./public/studio.jpg", (texture) => {
    const envMap = pmrem.fromEquirectangular(texture).texture;
    scene.environment = envMap;

    const loader = new GLTFLoader();
    loader.load("./public/pudding_web.glb", (gltf) => {
      const pudding = gltf.scene;

      //초리 매쉬 스타일 입히는 코드
      pudding.traverse((child) => {
        if (!child.isMesh) return;

        if (child.name === "평면" || child.name === "평면.001") {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xffffcc,
            metalness: 0.6,
            roughness: 0.2,
            side: THREE.DoubleSide,
            envMapIntensity: 1.5,
          });
        } else if (child.name === "구체.002") {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0xffff66,
            roughness: 0.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0,
            transmission: 0.3,
            ior: 1.5,
            thickness: 0.2,
            envMapIntensity: 1.5,
          });
        } else if (child.name === "Cylinder") {
          child.material = new THREE.ShaderMaterial({
            vertexShader: `
              varying vec3 vPos;
              void main() {
                vPos = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              varying vec3 vPos;
              void main() {
                float t = clamp(vPos.y * 0.5 + 0.5, 0.0, 1.0);
                vec3 top = vec3(1.0, 0.1176, 0.3372);     // #FF1E56
                vec3 bottom = vec3(1.0, 0.8313, 0.9215);  // #FFD4EB
                gl_FragColor = vec4(mix(bottom, top, t), 0.85);
              }
            `,
            transparent: true,
            side: THREE.DoubleSide,
          });
        }
      });

      pudding.scale.set(0.5, 0.5, 0.5);
      pudding.position.set(1.6, 0, 0);

      onLoaded(pudding, "#014C8D"); //초리 배경색
    });
  });
}
