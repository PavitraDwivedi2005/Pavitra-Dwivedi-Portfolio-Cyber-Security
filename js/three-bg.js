// Full-page Space Background — colorful galaxy with nebulae, cursor-reactive
(function(){
  const canvas = document.getElementById('space-bg');
  if(!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 2000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:false, antialias:true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x050505, 1);

  // --- Helper: create star layer ---
  function starLayer(count, size, spread, colors, opacity){
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count*3);
    const col = new Float32Array(count*3);
    for(let i=0;i<count;i++){
      pos[i*3]   = (Math.random()-0.5)*spread;
      pos[i*3+1] = (Math.random()-0.5)*spread;
      pos[i*3+2] = (Math.random()-0.5)*spread;
      const c = colors[Math.floor(Math.random()*colors.length)];
      col[i*3]   = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2];
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
    geo.setAttribute('color', new THREE.BufferAttribute(col,3));
    const mat = new THREE.PointsMaterial({
      size, transparent:true, opacity, vertexColors:true,
      blending: THREE.AdditiveBlending, sizeAttenuation:true, depthWrite:false
    });
    return new THREE.Points(geo, mat);
  }

  // Star color palettes (RGB 0-1)
  const neonPink    = [1, 0, 0.8];
  const electricBlue = [0, 0.9, 1];
  const cyberGold    = [1, 0.85, 0];
  const magenta      = [1, 0, 0.5];
  const white        = [0.95, 0.95, 1];

  // Far stars — tiny, dim, thousands
  const far = starLayer(4000, 0.08, 900, [white, neonPink, electricBlue], 0.55);
  scene.add(far);

  // Mid stars — more colorful
  const mid = starLayer(1500, 0.18, 600, [neonPink, electricBlue, cyberGold, white], 0.7);
  scene.add(mid);

  // Close bright stars
  const close = starLayer(300, 0.4, 350, [cyberGold, neonPink, white], 0.9);
  scene.add(close);

  // Accent colored stars — sparse, vivid
  const accents = starLayer(120, 0.55, 400, [neonPink, electricBlue, cyberGold, magenta], 0.85);
  scene.add(accents);

  // Bright anchor stars — very few, large
  const anchors = starLayer(25, 1.2, 500, [cyberGold, neonPink], 0.6);
  scene.add(anchors);

  // --- Nebula clouds using sprite textures ---
  function createNebulaSprite(x, y, z, scale, color, opacity){
    const canvas2 = document.createElement('canvas');
    canvas2.width = 256; canvas2.height = 256;
    const ctx = canvas2.getContext('2d');
    const grad = ctx.createRadialGradient(128,128,0, 128,128,128);
    grad.addColorStop(0, `rgba(${color},${opacity})`);
    grad.addColorStop(0.4, `rgba(${color},${opacity*0.4})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,256,256);
    const tex = new THREE.CanvasTexture(canvas2);
    const mat = new THREE.SpriteMaterial({
      map:tex, transparent:true, blending: THREE.AdditiveBlending, depthWrite:false
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set(x,y,z);
    sprite.scale.set(scale,scale,1);
    return sprite;
  }

  // Nebula clouds — cyber space colors
  scene.add(createNebulaSprite(-120, 40, -300, 280, '255,0,204', 0.25));   // neon pink
  scene.add(createNebulaSprite(150, -60, -350, 320, '0,234,255', 0.2));    // electric blue
  scene.add(createNebulaSprite(80, 100, -280, 200, '255,215,0', 0.15));    // cyber gold
  scene.add(createNebulaSprite(-60, -80, -250, 180, '255,0,204', 0.2));    // neon pink
  scene.add(createNebulaSprite(200, 30, -400, 250, '0,234,255', 0.15));    // electric blue
  scene.add(createNebulaSprite(-180, -30, -320, 220, '255,0,85', 0.15));   // magenta
  scene.add(createNebulaSprite(0, 50, -200, 300, '255,215,0', 0.1));       // subtle gold center haze

  // --- Shooting stars ---
  const shootingStars = [];
  function createShootingStar(){
    const geo = new THREE.BufferGeometry();
    const len = 8;
    const positions = new Float32Array(len*3);
    const opacities = new Float32Array(len);
    for(let i=0;i<len;i++){ positions[i*3]=0; positions[i*3+1]=0; positions[i*3+2]=0; opacities[i]=1-i/len; }
    geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
    const mat = new THREE.PointsMaterial({
      size:0.15, color:0xffffff, transparent:true, opacity:0.9,
      blending:THREE.AdditiveBlending, sizeAttenuation:true, depthWrite:false
    });
    const pts = new THREE.Points(geo, mat);
    pts.visible = false;
    scene.add(pts);
    return {
      mesh:pts, geo, active:false, life:0,
      pos:{x:0,y:0,z:0}, vel:{x:0,y:0,z:0}
    };
  }
  for(let i=0;i<5;i++) shootingStars.push(createShootingStar());

  function launchShootingStar(){
    const s = shootingStars.find(s=>!s.active);
    if(!s) return;
    s.active = true; s.life = 0;
    s.pos.x = (Math.random()-0.5)*300;
    s.pos.y = (Math.random()-0.3)*200 + 50;
    s.pos.z = -100 - Math.random()*200;
    const angle = Math.PI*0.6 + Math.random()*0.8;
    const speed = 6 + Math.random()*5;
    s.vel.x = Math.cos(angle)*speed;
    s.vel.y = Math.sin(angle)*speed*-1;
    s.vel.z = (Math.random()-0.5)*0.5;
    s.mesh.visible = true;
  }
  setInterval(()=>{ if(Math.random()>0.2) launchShootingStar(); }, 1500);

  camera.position.z = 120;

  let mouseX=0, mouseY=0, targetX=0, targetY=0;
  document.addEventListener('mousemove', (e)=>{
    mouseX = (e.clientX/window.innerWidth - 0.5)*2;
    mouseY = (e.clientY/window.innerHeight - 0.5)*2;
  });

  const clock = new THREE.Clock();

  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.015;
    targetY += (mouseY - targetY) * 0.015;

    // Parallax layers
    far.rotation.y = targetX * 0.02;      far.rotation.x = -targetY * 0.02;
    mid.rotation.y = targetX * 0.05;      mid.rotation.x = -targetY * 0.05;
    close.rotation.y = targetX * 0.1;     close.rotation.x = -targetY * 0.1;
    accents.rotation.y = targetX * 0.08;  accents.rotation.x = -targetY * 0.08;
    anchors.rotation.y = targetX * 0.04;  anchors.rotation.x = -targetY * 0.04;

    // Slow drift
    far.rotation.y += 0.00003;
    mid.rotation.y += 0.00006;
    close.rotation.y += 0.0001;

    // Twinkling
    close.material.opacity = 0.7 + Math.sin(t*1.2)*0.2;
    accents.material.opacity = 0.65 + Math.sin(t*0.7+1)*0.2;
    anchors.material.opacity = 0.4 + Math.sin(t*0.5+2)*0.2;

    // Shooting stars
    shootingStars.forEach(s=>{
      if(!s.active) return;
      s.life++;
      s.pos.x += s.vel.x; s.pos.y += s.vel.y; s.pos.z += s.vel.z;
      const positions = s.geo.attributes.position.array;
      for(let i=7; i>0; i--){
        positions[i*3] = positions[(i-1)*3]; positions[i*3+1]=positions[(i-1)*3+1]; positions[i*3+2]=positions[(i-1)*3+2];
      }
      positions[0]=s.pos.x; positions[1]=s.pos.y; positions[2]=s.pos.z;
      s.geo.attributes.position.needsUpdate = true;
      s.mesh.material.opacity = Math.max(0, 1 - s.life/60);
      if(s.life > 60){ s.active=false; s.mesh.visible=false; }
    });

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
