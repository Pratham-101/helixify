import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SimpleDNAHelix = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.6);  // Adjust to fill more screen
    currentMount.appendChild(renderer.domElement);

    // Colors for the DNA strands (light blue)
    const strandColor = new THREE.Color(0x3c78d8);  // Light blue
    const rungColor = new THREE.Color(0x1a1a1a);  // Darker rungs for the center

    const helixGroup = new THREE.Group();

    // Function to create a DNA strand
    const createStrand = (radius, heightFactor) => {
      const material = new THREE.MeshBasicMaterial({ color: strandColor });
      const points = [];

      for (let i = 0; i < 100; i++) {
        const t = i * 0.15;
        const x = Math.sin(t) * radius;
        const y = i * 0.05;
        const z = Math.cos(t) * radius;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.07, 8, false);
      return new THREE.Mesh(tubeGeometry, material);
    };

    // Function to create the center rungs between the strands
    const createRungs = (radius, heightFactor, spacing) => {
      const rungsGroup = new THREE.Group();
      const material = new THREE.MeshBasicMaterial({ color: rungColor });

      for (let i = 0; i < 100; i += 5) {
        const t = i * spacing;
        const x = Math.sin(t) * radius;
        const z = Math.cos(t) * radius;
        const y = i * 0.05;

        const rungGeometry = new THREE.BoxGeometry(0.2, 0.02, 0.02);
        const rung = new THREE.Mesh(rungGeometry, material);
        rung.position.set(0, y, 0);

        const connectorGeometry = new THREE.BoxGeometry(0.01, 0.01, radius * 2);
        const connector = new THREE.Mesh(connectorGeometry, material);
        connector.position.set(0, y, 0);

        rungsGroup.add(rung);
        rungsGroup.add(connector);
      }

      return rungsGroup;
    };

    const radius = 1.2;
    const heightFactor = 5;

    // Create two strands of DNA (left and right)
    const strand1 = createStrand(radius, heightFactor);
    const strand2 = createStrand(radius, heightFactor);
    strand2.rotation.y = Math.PI;  // Rotate the second strand to intertwine

    // Add the rungs in the center
    const rungs = createRungs(radius, heightFactor, 0.1);

    helixGroup.add(strand1);
    helixGroup.add(strand2);
    helixGroup.add(rungs);

    scene.add(helixGroup);

    camera.position.z = 8;

    const animate = () => {
      requestAnimationFrame(animate);
      helixGroup.rotation.y += 0.01;  // Slow rotation for smooth effect
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '600px', height: '600px', margin: 'auto' }} />;
};

export default SimpleDNAHelix;
