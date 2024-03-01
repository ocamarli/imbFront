import React, { useEffect, useRef, useState, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
//NovaModel
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas } from "react-three-fiber";

export function Model3d(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./blender.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log(animations)
    actions[animations[0].name].play()
    console.log(materials["Scene_-_Root"])
  }, [animations,actions,materials])


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Sphere_0">
                <mesh
                  name="mesh_0"
                  geometry={nodes.mesh_0.geometry}
                  material={materials["Scene_-_Root"]}
                  morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
                />
              </group>
              <group name="Sphere001_1">
                <mesh
                  name="mesh_1"
                  geometry={nodes.mesh_1.geometry}
                  material={materials["Scene_-_Root"]}
                  morphTargetDictionary={nodes.mesh_1.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_1.morphTargetInfluences}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export const NovaModel = () => {
  const sizes = [];
  const shift = [];
  const pushShift = () => {
    shift.push(
      Math.random() * Math.PI,
      Math.random() * Math.PI * 2,
      (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
      Math.random() * 0.9 + 0.1
    );
  };

  const gu = {
    time: { value: 0 },
  };

  const Particles = () => {
    const pts = new Array(50000).fill().map((p) => {
      sizes.push(Math.random() * 1.5 + 0.5);
      pushShift();
      return new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(Math.random() * 0.5 + 9.5);
    });

    for (let i = 0; i < 100000; i++) {
      let r = 10,
        R = 40;
      let rand = Math.pow(Math.random(), 1.5);
      let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
      pts.push(
        new THREE.Vector3().setFromCylindricalCoords(
          radius,
          Math.random() * 2 * Math.PI,
          (Math.random() - 0.5) * 2
        )
      );
      sizes.push(Math.random() * 1.5 + 0.5);
      pushShift();
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
    g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));
    const m = new THREE.PointsMaterial({
      size: 0.125,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      onBeforeCompile: (shader) => {
        shader.uniforms.time = gu.time;
        shader.vertexShader = `
      uniform float time;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      ${shader.vertexShader}
    `
          .replace(`gl_PointSize = size;`, `gl_PointSize = size * sizes;`)
          .replace(
            `#include <color_vertex>`,
            `#include <color_vertex>
        float d = length(abs(position) / vec3(40., 10., 40));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
      `
          )
          .replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
        float t = time;
        float moveT = mod(shift.x + shift.z * t, PI2);
        float moveS = mod(shift.y + shift.z * t, PI2);
        transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
      `
          );
        //console.log(shader.vertexShader);
        shader.fragmentShader = `
      varying vec3 vColor;
      ${shader.fragmentShader}
    `
          .replace(
            `#include <clipping_planes_fragment>`,
            `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
        //if (d > 0.5) discard;
      `
          )
          .replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`
          );
        //console.log(shader.fragmentShader);
      },
    });

    const p = new THREE.Points(g, m);
    p.rotation.order = "ZYX";
    p.rotation.z = 0.2;
    return p;
  };

  return Particles();
};

export const NovaCanvas = (props) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [executed, setExecuted] = useState(false);

  const gu = {
    time: { value: 0 },
  };
  
  const camera = useMemo(() => new THREE.PerspectiveCamera(60, width / height, 0.1, 1000), [width, height])
  
  useEffect(() => {
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();
    const renderer = new THREE.WebGLRenderer();

    const InitScene = (ren) => {
      ren.setSize(width, height);
      scene.background = new THREE.Color(0x160016);
      camera.position.set(0, 20, 31);

      const p = NovaModel();
      console.log(p);
      scene.add(p);

      window.addEventListener("resize", (event) => {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        ren.setSize(width, height);
      });
      document.querySelector("#nova canvas").remove();
      document
        .querySelector("#nova div")
        .appendChild(ren.domElement);

      let controls = new OrbitControls(camera, ren.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;

      ren.setAnimationLoop(() => {
        controls.update();
        let t = clock.getElapsedTime() * 0.5;
        gu.time.value = t * Math.PI;
        p.rotation.y = t * 0.1;
        ren.render(scene, camera);
      });
    };

    if (renderer !== null && !executed) {
      InitScene(renderer);
      setExecuted(true);
    }
  }, [executed, width, height, camera, gu.time]);

  return (
    <Canvas id="nova"> 
     
    </Canvas>
  );
};

useGLTF.preload('./blender.glb"');
