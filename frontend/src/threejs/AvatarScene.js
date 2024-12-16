import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class AvatarScene {
  constructor(container) {
    this.container = container;
    this.width = container.clientWidth;
    this.height = container.clientHeight;

    this.scene = new THREE.Scene();

    // ตั้งค่ากล้อง
    this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 100);
    this.camera.position.set(0, 1.5, 2.5); // ปรับตำแหน่งกล้องตามที่ต้องการ

    // ตั้งค่า Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.container.appendChild(this.renderer.domElement);

    // แสงสว่างพื้นฐาน
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemiLight.position.set(0, 1, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(1, 1, 1).normalize();
    this.scene.add(dirLight);

    // โหลดโมเดล Avatar
    const loader = new GLTFLoader();
    loader.load('/avatar.glb', (gltf) => {
      this.avatar = gltf.scene;
      this.scene.add(this.avatar);

      // ปรับ scale หรือ position ของ avatar ตามต้องการ
      this.avatar.scale.set(1, 1, 1);
      this.avatar.position.set(0, 0, 0);
    }, undefined, (error) => {
      console.error('Error loading avatar model:', error);
    });

    // รีไซส์เมื่อขนาด container เปลี่ยน
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // เริ่มการ render loop
    this.animate();
  }

  onWindowResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // สามารถเพิ่ม logic animation ของ avatar ตรงนี้ ถ้ามี
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    // cleanup ถ้าจำเป็น
    window.removeEventListener('resize', this.onWindowResize);
    if (this.renderer.domElement && this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}