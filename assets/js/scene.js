/* Three.js scenes. VA.scene(canvas, variant, {onHover, onPick, dark})
   Variants: hub (globe + three lecture moons), l7 (trade globe), l8 (IP vault), l9 (marketing funnel).
   Renders only while visible; static single frame under reduced motion. */
(function () {
  const VA = window.VA;
  VA.scene = function (canvas, variant, opt = {}) {
    if (!window.THREE) { canvas.style.display = 'none'; return; }
    const T = THREE;
    let renderer;
    try { renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
    catch (e) { canvas.style.display = 'none'; return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    const scene = new T.Scene();
    const cam = new T.PerspectiveCamera(40, 1, 0.1, 100);
    cam.position.set(0, 0, variant === 'hub' ? 9 : 6.4);
    const dark = !!opt.dark;
    const INK = dark ? 0xF2EDE3 : 0x14120F;
    const C = { 7: 0x5466FF, 8: 0xD8473C, 9: 0xF2B227 };
    const root = new T.Group(); scene.add(root);
    const tick = [];

    // fibonacci sphere of points
    const sphere = (n, r, color, size, opacity) => {
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2, rad = Math.sqrt(1 - y * y), th = Math.PI * (3 - Math.sqrt(5)) * i;
        pos.set([Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r], i * 3);
      }
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(pos, 3));
      const m = new T.PointsMaterial({ color, size, transparent: true, opacity, sizeAttenuation: true, depthWrite: false });
      return new T.Points(g, m);
    };
    const randOnSphere = r => { const u = Math.random() * 2 - 1, t = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u); return new T.Vector3(s * Math.cos(t) * r, u * r, s * Math.sin(t) * r); };
    // animated arcs between random points (trade routes)
    const arcs = (parent, r, count, colors) => {
      const list = [];
      for (let i = 0; i < count; i++) {
        const a = randOnSphere(r), b = randOnSphere(r);
        const mid = a.clone().add(b).multiplyScalar(.5).normalize().multiplyScalar(r * (1.25 + a.distanceTo(b) * .18));
        const pts = new T.QuadraticBezierCurve3(a, mid, b).getPoints(64);
        const g = new T.BufferGeometry().setFromPoints(pts);
        const line = new T.Line(g, new T.LineBasicMaterial({ color: colors[i % colors.length], transparent: true, opacity: .9 }));
        line.userData = { off: Math.random() * 3, speed: .25 + Math.random() * .3 };
        parent.add(line); list.push(line);
      }
      tick.push(t => list.forEach(l => {
        const p = ((t * l.userData.speed + l.userData.off) % 1.6) / 1.2; // 0..1.33
        const start = Math.max(0, Math.floor((p - .35) * 65)), end = Math.min(65, Math.floor(p * 65));
        l.geometry.setDrawRange(start, Math.max(0, end - start));
      }));
    };

    let moons = [];
    if (variant === 'hub' || variant === 'l7') {
      const r = variant === 'hub' ? 2.3 : 1.75;
      const globe = new T.Group(); root.add(globe);
      globe.add(sphere(variant === 'hub' ? 2600 : 1600, r, INK, variant === 'hub' ? .028 : .03, dark ? .55 : .7));
      const wire = new T.Mesh(new T.SphereGeometry(r * .985, 32, 18), new T.MeshBasicMaterial({ color: INK, wireframe: true, transparent: true, opacity: dark ? .05 : .07 }));
      globe.add(wire);
      arcs(globe, r, variant === 'hub' ? 14 : 10, variant === 'hub' ? [C[7], C[8], C[9]] : [C[7], C[9]]);
      tick.push((t, dt) => { globe.rotation.y += dt * .12; });
      globe.rotation.x = .35;
    }
    if (variant === 'hub') {
      const geos = { 7: new T.IcosahedronGeometry(.36, 0), 8: new T.OctahedronGeometry(.4, 0), 9: new T.ConeGeometry(.34, .62, 4) };
      [7, 8, 9].forEach((id, i) => {
        const pivot = new T.Group(); root.add(pivot);
        const mesh = new T.Mesh(geos[id], new T.MeshStandardMaterial({ color: C[id], roughness: .35, metalness: .15, flatShading: true }));
        const edges = new T.LineSegments(new T.EdgesGeometry(geos[id]), new T.LineBasicMaterial({ color: 0xF2EDE3, transparent: true, opacity: .5 }));
        mesh.add(edges);
        const halo = new T.Mesh(new T.RingGeometry(.55, .58, 48), new T.MeshBasicMaterial({ color: C[id], transparent: true, opacity: 0, side: T.DoubleSide }));
        mesh.add(halo);
        mesh.userData = { id, halo, base: 1 };
        const radius = 3.35 + i * .25, tilt = [-.35, .25, .05][i];
        pivot.rotation.x = tilt; pivot.rotation.z = [.2, -.15, .35][i];
        mesh.position.x = radius; pivot.add(mesh);
        const orbit = new T.Mesh(new T.TorusGeometry(radius, .004, 4, 160), new T.MeshBasicMaterial({ color: 0xF2EDE3, transparent: true, opacity: .14 }));
        orbit.rotation.x = Math.PI / 2; pivot.add(orbit);
        pivot.userData.speed = [.16, .12, .09][i]; pivot.rotation.y = i * 2.1;
        moons.push(mesh);
        tick.push((t, dt) => { pivot.rotation.y += dt * pivot.userData.speed * (hovered ? .25 : 1); mesh.rotation.x += dt * .6; mesh.rotation.y += dt * .8; halo.lookAt(cam.position);
          const s = mesh.userData.base + (hovered === mesh ? .35 : 0); mesh.scale.lerp(new T.Vector3(s, s, s), .12); halo.material.opacity += ((hovered === mesh ? .9 : 0) - halo.material.opacity) * .15; });
      });
      scene.add(new T.AmbientLight(0xffffff, .55));
      const dl = new T.DirectionalLight(0xffffff, 1.1); dl.position.set(3, 4, 5); scene.add(dl);
    }
    if (variant === 'l8') {
      const make = (geo, op) => new T.LineSegments(new T.EdgesGeometry(geo), new T.LineBasicMaterial({ color: INK, transparent: true, opacity: op }));
      const outer = make(new T.OctahedronGeometry(2, 0), .55), mid = make(new T.IcosahedronGeometry(1.35, 0), .4);
      const core = new T.Mesh(new T.DodecahedronGeometry(.75, 0), new T.MeshStandardMaterial({ color: C[8], roughness: .4, flatShading: true }));
      root.add(outer, mid, core);
      const docs = new T.Group(); root.add(docs);
      for (let i = 0; i < 18; i++) {
        const d = new T.Mesh(new T.BoxGeometry(.16, .22, .015), new T.MeshStandardMaterial({ color: i % 3 ? 0xFBF8F2 : C[8], roughness: .6 }));
        const a = (i / 18) * Math.PI * 2; d.position.set(Math.cos(a) * 2.5, Math.sin(a * 3) * .25, Math.sin(a) * 2.5); d.lookAt(0, 0, 0); docs.add(d);
      }
      docs.rotation.x = .3;
      scene.add(new T.AmbientLight(0xffffff, .7)); const dl = new T.DirectionalLight(0xffffff, 1); dl.position.set(2, 3, 4); scene.add(dl);
      tick.push((t, dt) => { outer.rotation.y += dt * .15; outer.rotation.x += dt * .05; mid.rotation.y -= dt * .25; mid.rotation.z += dt * .1; core.rotation.y += dt * .4; core.rotation.x += dt * .2; docs.rotation.y += dt * .2; core.scale.setScalar(1 + Math.sin(t * 2) * .04); });
    }
    if (variant === 'l9') {
      const rings = [];
      for (let i = 0; i < 7; i++) {
        const rad = 1.9 - i * .24, y = 1.5 - i * .5;
        const ring = new T.Mesh(new T.TorusGeometry(rad, .025, 8, 96), new T.MeshBasicMaterial({ color: i % 2 ? INK : C[9], transparent: true, opacity: i % 2 ? .45 : 1 }));
        ring.rotation.x = Math.PI / 2; ring.position.y = y; root.add(ring); rings.push(ring);
      }
      const N = 260, pos = new Float32Array(N * 3), seed = [];
      for (let i = 0; i < N; i++) seed.push({ a: Math.random() * Math.PI * 2, p: Math.random(), s: .08 + Math.random() * .12 });
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(pos, 3));
      const pts = new T.Points(g, new T.PointsMaterial({ color: C[7], size: .06, transparent: true, opacity: .85 })); root.add(pts);
      root.rotation.x = .45;
      tick.push((t, dt) => {
        seed.forEach((q, i) => { q.p = (q.p + dt * q.s) % 1; q.a += dt * (1 + q.p * 2); const rad = (1.9 - q.p * 1.5) * (.6 + .4 * Math.sin(i)); pos.set([Math.cos(q.a) * rad, 1.6 - q.p * 3.4, Math.sin(q.a) * rad], i * 3); });
        g.attributes.position.needsUpdate = true;
        rings.forEach((r, i) => r.rotation.z = Math.sin(t * .8 + i * .5) * .12);
        root.rotation.y += dt * .2;
      });
    }

    // mouse parallax + picking
    const mouse = new T.Vector2(9, 9), target = { x: 0, y: 0 };
    let hovered = null;
    const ray = new T.Raycaster();
    canvas.addEventListener('pointermove', e => {
      const r = canvas.getBoundingClientRect();
      mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      target.x = mouse.y * .18; target.y = mouse.x * .3;
    });
    canvas.addEventListener('pointerleave', () => { mouse.set(9, 9); target.x = target.y = 0; });
    if (moons.length) canvas.addEventListener('click', () => { if (hovered && opt.onPick) opt.onPick(hovered.userData.id); });
    VA.sceneHighlight = id => { hovered = moons.find(m => m.userData.id === id) || null; };

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); cam.aspect = w / h;
      if (variant === 'hub') { cam.position.z = w / h < 1 ? 13 : 9; root.position.x = w / h > 1.2 ? 1.6 : 0; }
      cam.updateProjectionMatrix();
      if (VA.RM) renderer.render(scene, cam);
    };
    new ResizeObserver(resize).observe(canvas); resize();

    const clock = new T.Clock(); let visible = true, running = false, t = 0;
    const frame = () => {
      if (!visible || document.hidden) { running = false; return; }
      const dt = Math.min(clock.getDelta(), .05); t += dt;
      tick.forEach(f => f(t, dt));
      root.rotation.x += (target.x + (variant === 'l9' ? .45 : 0) - root.rotation.x) * .05;
      if (variant !== 'l9') root.rotation.y += (target.y - root.rotation.y) * .05;
      if (moons.length) {
        ray.setFromCamera(mouse, cam);
        const hit = ray.intersectObjects(moons, false)[0];
        const h = hit ? hit.object : null;
        if (h !== hovered && mouse.x < 5) { hovered = h; canvas.style.cursor = h ? 'pointer' : ''; opt.onHover && opt.onHover(h ? h.userData.id : null); }
      }
      renderer.render(scene, cam);
      requestAnimationFrame(frame);
    };
    const start = () => { if (!running && !VA.RM) { running = true; clock.getDelta(); requestAnimationFrame(frame); } };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(canvas);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
    if (VA.RM) { tick.forEach(f => f(1.2, 0)); renderer.render(scene, cam); } else start();
  };
})();
