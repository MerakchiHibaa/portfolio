import './style.css'
import * as THREE from 'three' ;
import { AmbientLight } from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' ; // to be able to move around the scene using the mouse
//we need three objects, a scene, a camera and a renderer
const scene = new THREE.Scene() ;

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight , 0.1 , 1000 );
const renderer = new THREE.WebGLRenderer(
  {canvas : document.querySelector("#bg") ,
 }) ; 

renderer.setPixelRatio(window.devicePixelRatio) ; 
renderer.setSize(window.innerWidth , window.innerHeight) ; 
camera.position.setZ(30) ; 
renderer.render(scene , camera) ; 


const geometry = new THREE.TorusGeometry(10 , 3 , 16, 100) ;
//const material = new THREE.MeshBasicMaterial( {color: 0xFF6347 , wireframe: true})  ; //no light source required
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347})  ; //react to light


const torus = new THREE.Mesh(geometry , material ) ; 

scene.add(torus) ;
const pointlight = new THREE.PointLight(0xffffff) ;
pointlight.position.set(5,5,5) ;
const ambientlight = new THREE.AmbientLight(0xffffff) ;
scene.add(pointlight , ambientlight) ;

//lighthelper shows the position and the direction of the light
const lighthelper = new THREE.PointLightHelper(pointlight)
const gridhelper = new THREE.GridHelper(200 , 50 ) ; 
scene.add(lighthelper , gridhelper) ; 
const controls = new OrbitControls(camera , renderer.domElement) ; //listen to dom events on the mouose and change the camera accoordingly

//avatar

const hibaTexture = new THREE.TextureLoader().load('hiba.jpg') ; 
const hiba = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3) , 
  new THREE.MeshBasicMaterial({ map : hibaTexture})
) ;
scene.add(hiba) ; 
//moon
const moontexture = new THREE.TextureLoader().load('moon.jpg') ; 
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32) ,
  new THREE.MeshStandardMaterial({map : moontexture})
) ;

scene.add(moon) ; 
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25 , 24 , 24) ; 
  const material = new THREE.MeshStandardMaterial({color: 0xffffff}) ;
  const star = new THREE.Mesh(geometry , material) ; 
//generate random numbers between -100 and 100 and map them with an array of size 3 
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)) ; 
star.position.set(x,y,z) ; 
scene.add(star) ; 
}

Array(200).fill().forEach(addStar) ; 

const spaceTexture = new THREE.TextureLoader().load('space.jpg') ; 
scene.background = spaceTexture ; 





function animate() {
  requestAnimationFrame(animate) ; 

  torus.rotation.x += 0.01 ; 
  torus.rotation.y += 0.005 ; 
  torus.rotation.z += 0.01 ; 


  renderer.render(scene , camera) ;
}

animate()