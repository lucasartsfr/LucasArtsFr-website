function LowPolyPlanet() {
  // Déclaration des constantes et variables
  const Sx = {
    Canvas: 'canvas',    
    cameraZ: 400,
    fov: 80,
    autoRotate : false,
    autoRotateSpeed : 0.1,
    rotateSpeed : 0.1,
    AlphaValue : 0.38
  };

  const { 
    WebGLRenderer, 
    PerspectiveCamera, 
    OrbitControls, 
    AmbientLight, 
    DirectionalLight, 
    SpotLight,
    PointLight,
    Scene, 
    Object3D, 
    CylinderGeometry, 
    IcosahedronGeometry, 
    SphereGeometry, 
    MeshLambertMaterial, 
    MeshBasicMaterial,
    Mesh, 
    Points,
    Vector3 
  } = THREE;

  const { 
    randFloat: rnd, 
    randFloatSpread: rndFS 
  } = THREE.Math;

  const { 
    random, 
    PI 
  } = Math;

  const simplex = new SimplexNoise();
  let renderer, scene, camera, cameraCtrl, width, height, planet, moon, sun, cloud;

  //Initialisation
  function Initialize() {

    Rendering = new WebGLRenderer({ 
      canvas: document.getElementById(Sx.Canvas),
      antialias: true,
      alpha: true,
      powerPreference : "high-performance"
    });

    Rendering.shadowMap.enabled = true;
    Rendering.shadowMap.type = THREE.PCFSoftShadowMap;
    Rendering.shadowMap.renderSingleSided = false;
    Rendering.setClearColor( 0x000000, Sx.AlphaValue );
    //Rendering.setClearColor(0xffffff, 1);
    //document.body.appendChild(Rendering.domElement);

    camera = new PerspectiveCamera(Sx.fov,  window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = Sx.cameraZ;
    cameraCtrl = new OrbitControls(camera, Rendering.domElement);
    cameraCtrl.enableDamping = true;
    cameraCtrl.dampingFactor = 0.1;
    cameraCtrl.rotateSpeed = Sx.rotateSpeed;
    cameraCtrl.autoRotate = Sx.autoRotate;
    cameraCtrl.autoRotateSpeed = Sx.autoRotateSpeed;
    camera.position.set( 600, 0, 600 );
    
    // Créer la Scène
    scene = new Scene();
    scene.add(new AmbientLight(0x666666, 0.6));

    // const SunLight = new PointLight( 0xff0000, 100, 100 );
    // SunLight.position.set( 4500, 0, 4500 );
    // SunLight.lookAt(0, 0, 0);
    // scene.add(SunLight);
    // const sphereSize = 3000;
    // const pointLightHelper = new THREE.PointLightHelper( SunLight, sphereSize );
    // scene.add( pointLightHelper );

     // Créer la lumière
     const light = new DirectionalLight(0xffffff, 1.2);
     const d = 400;
     light.position.x = 100;
     light.position.y = 0;
     light.position.z = 100;
     light.castShadow = true;
     light.shadowCameraVisible     
     light.shadow.camera.left = - d;
     light.shadow.camera.right = d;
     light.shadow.camera.top = d;
     light.shadow.camera.bottom = - d;
     light.shadow.camera.near = -2000;
     light.shadow.camera.far = 2500;
     light.shadow.mapSize.width = 2048; // default
     light.shadow.mapSize.height = 2048; // default

     // Lumière suit la caméra
     cameraCtrl.addEventListener( 'change', light_update );
      function light_update(){
          //light.position.copy(camera.position);          
      }
     scene.add(light);   
      
     // Helper Camera
     var helper = new THREE.CameraHelper( light.shadow.camera );
     //scene.add(helper);    

    SizeUpdate();
    window.addEventListener('resize', SizeUpdate, false);
    InitializeScene();
    Animation();
  }
  Initialize();

  function InitializeScene() {      

    // Créer la Planète
    planet = new Object3D();
    scene.add(planet);
    // Créer la Lune
    moon = new Object3D();
    scene.add(moon);
    // Créer le soleil
    sun = new Object3D();
    scene.add(sun);
    
    // Configuration du Noise
    const Noise = {
      Repartition : 0.0055,
      Mountain : 100,
      WaterSeuil : 0.351,
      WaterLevel : 0.350,
      Snow : 3,
      Rock : 5,
      Buffer : []
    }

    //Configuration Planete
    const Planete = {
      detail : 5,
      radius : 200,
      TreePercent : 90,
      CloudR : 1.5,
      StarsR : 50,
      Fibonacci : 1200,
      Speed : 0.009
    }

    const Lune = {
      detail : 1,
      radius : Planete.radius/2,
      distance : Planete.radius*10,
      Speed : 0.005
    }

    const Soleil = {
      detail : 2,
      radius : Planete.radius*20,
      distance : Planete.radius*35,
      Speed : 0.005
    }

    // Fonction de Noise
    const time = Date.now() * 0.001;
    function NoiseFunction(P1, P2, P3){
      const NoiseF = new Vector3(P1.x, P1.y, P1.z).multiplyScalar(P2).addScalar(time);;
      let noise = (simplex.noise3D(NoiseF.x, NoiseF.y, NoiseF.z) + 1) / 2;
      noise = (noise > Noise.WaterSeuil) ? noise : Noise.WaterLevel;
      if (Number.isInteger(P3)) Noise.Buffer[P3] = noise;
      return noise;
    };

    // Fonction de Déplacement vertical
    function DisplaceFunction(P1, P2){
      const DisplaceF = new Vector3(P1.x, P1.y, P1.z);
      DisplaceF.add(DisplaceF.clone().normalize().multiplyScalar(NoiseFunction(DisplaceF, Noise.Repartition, P2) * Noise.Mountain));      
      P1.x = DisplaceF.x;
      P1.y = DisplaceF.y;
      P1.z = DisplaceF.z;
    };

    // Geométrie de la Planete
    var PointsList = []
    let geometry, material, mesh, PointMaterial, pointCloud, ArePoints, MoonGeometry, SunGeometry, SunMesh, MoonMesh;       

    // -------------------------------------------- PLANETE ------------------------------------

    geometry = new IcosahedronGeometry(Planete.radius, Planete.detail);
    //geometry.mergeVertices();
    for (let i = 0; i < geometry.vertices.length; i++) {
      DisplaceFunction(geometry.vertices[i], i);      
      PointsList.push(geometry.vertices[i])
    }
    geometry.computeFlatVertexNormals();  

    // Couleur du sol de la planète
    for (let k = 0; k < geometry.faces.length; k++) {
      let Face = geometry.faces[k];      
      // Herbe
      Face.color.setStyle("rgb(65,"+(Math.floor(Math.random() * (120 - 111 + 1))+111)+",43)");   
      // Sable
      if (Noise.Buffer[Face.a] <= (Noise.WaterLevel+0.15) && Noise.Buffer[Face.b] <= (Noise.WaterLevel+0.15) && Noise.Buffer[Face.c] <= (Noise.WaterLevel+0.15)) {   
        Face.color.setStyle("rgb(194, 178, 128)");
      }
      // Océans
      if (Noise.Buffer[Face.a] === Noise.WaterLevel && Noise.Buffer[Face.b] === Noise.WaterLevel && Noise.Buffer[Face.c] === Noise.WaterLevel) {        
        Face.color.setStyle("rgb(0,120,"+(Math.floor(Math.random() * (255 - 220 + 1))+220)+")");
      }
      // Roche
      if (Noise.Buffer[Face.a]*Noise.Mountain > Noise.Mountain-Noise.Rock || Noise.Buffer[Face.b]*Noise.Mountain > Noise.Mountain-Noise.Rock || Noise.Buffer[Face.c]*Noise.Mountain > Noise.Mountain-Noise.Rock) {        
        Face.color.setStyle("rgb(100,100,100)"); 
      }
      // Neige
      if (Noise.Buffer[Face.a]*Noise.Mountain > Noise.Mountain-Noise.Snow || Noise.Buffer[Face.b]*Noise.Mountain > Noise.Mountain-Noise.Snow || Noise.Buffer[Face.c]*Noise.Mountain > Noise.Mountain-Noise.Snow) {        
        Face.color.setStyle("rgb(255,255,255)"); 
      }
    } 
    // Maillage de la Planète
    material = new MeshLambertMaterial({ flatShading: true, vertexColors: THREE.VertexColors });    
    mesh = new Mesh(geometry, material);        
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    planet.add(mesh);
    planet.receiveShadow = true;
    planet.castShadow = true;

    // -------------------------------------- LUNE --------------------------------------

    MoonGeometry = new IcosahedronGeometry(Lune.radius, Lune.detail);
    MoonGeometry.mergeVertices();
    for (let j = 0; j < MoonGeometry.vertices.length; j++) {
      DisplaceFunction(MoonGeometry.vertices[j], j);   
    }
    MoonGeometry.computeFlatVertexNormals();

     // Couleur de la Lune
     for (let t = 0; t < MoonGeometry.faces.length; t++) {
      let MoonFace = MoonGeometry.faces[t];     
      MoonFace.color.setStyle("rgb(114,120,110)"); // Couleur Gris Lune 
    }

    // Maillage de la Lune
    MoonMesh = new Mesh(MoonGeometry, material);    
    MoonMesh.position.set(Lune.distance, 0, 0);
    MoonMesh.receiveShadow = true;
    MoonMesh.castShadow = true;
    moon.add(MoonMesh)

    // -------------------------------------- Soleil --------------------------------------


     // Sun Shape
     SunGeometry = new IcosahedronGeometry(Soleil.radius, Soleil.detail);
     SunGeometry.mergeVertices();
     SunGeometry.computeFlatVertexNormals();
    // Couleur du soleil
    for (let z = 0; z < SunGeometry.faces.length; z++) {
      let SunFace = SunGeometry.faces[z];     
      SunFace.color.setStyle("rgb("+(Math.floor(Math.random() * (255 - 255 + 1))+255)+","+(Math.floor(Math.random() * (255 - 255 + 1))+255)+",0)"); // Couleur Jaune 
    }
    // Maillage du soleil
    Sunmaterial = new MeshBasicMaterial({ flatShading: true, vertexColors: THREE.VertexColors }); 
    SunMesh = new Mesh(SunGeometry, Sunmaterial);    
    SunMesh.position.set(Soleil.distance, 0, Soleil.distance);
    SunMesh.receiveShadow = false;
    SunMesh.castShadow = false;
    sun.add(SunMesh)
    
    // Point Vertex Couleur
    PointMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    ArePoints = new Points(geometry, PointMaterial);
    //planet.add(ArePoints);

    // Animation
    planet.scale.set(0.1, 0.1, 0.1);
    TweenMax.to(planet.scale, rnd(2, 5), { x: 1, y: 1, z: 1, ease: Power1.easeOut });    

    moon.scale.set(0.1, 0.1, 0.1);
    TweenMax.to(moon.scale, rnd(2, 5), { x: 1, y: 1, z: 1, ease: Power1.easeOut });

    sun.scale.set(0.1, 0.1, 0.1);
    TweenMax.to(sun.scale, rnd(2, 5), { x: 1, y: 1, z: 1, ease: Power1.easeOut });
    

    // Arbres et Pierres
    objects = [];
    Clouds = [];
    const ColorScale = chroma.scale([0x509A36, 0xFF5A36, 0x509A36, 0xFFC236, 0x509A36]);
    const points = getFibonacciSpherePoints(Planete.Fibonacci, Planete.radius); // Points de la sphere fia Fibonacci
    //const points = PointsList;
    let p, obj, cloud;

    // Boucle sur les points
    for (let i = 0; i < points.length; i++) {

      p = points[i];     
      if (NoiseFunction(p, Noise.Repartition) === Noise.WaterLevel || NoiseFunction(p, Noise.Repartition) > (1-(Noise.Mountain*20)/10000)) continue;
      
      DisplaceFunction(p); 

      Helper = CreateHelpers(rnd(1, 1))
      Helper.position.set(p.x, p.y, p.z);
      Helper.scale.set(1, 1, 1);
      //planet.add(Helper);
      
      // Random Placement Element
      if (random() > (100 - Planete.TreePercent)/100) {
        // Créer Arbres (70%)
        const tsize = rnd(5, 15);
        const bsize = tsize * rnd(0.5, 0.7);
        const vn2 = NoiseFunction(p, 0.01);
        obj = CreateArbre(tsize, bsize, 0x764114, ColorScale(vn2).hex());
        obj.position.set(p.x, p.y, p.z);        
        obj.lookAt(0, 0, 0);

        // Etoiles / Stars
        Stars = CreateStars(rnd(3, 3))
        Stars.position.set(Planete.StarsR*p.x, Planete.StarsR*p.y, Planete.StarsR*p.z);
        objects.push(Stars);
        Stars.scale.set(0.01, 0.01, 0.01);
        Stars.tween = TweenMax.to(Stars.scale, rnd(5, 5), { x: 10, y: 10, z: 10, ease: Elastic.easeOut.config(1, 0.2), delay: rnd(0, 2) });
        scene.add(Stars);
      } 
      
      else {
        // Créer Pierre (30%)
        obj = CreatePierre(rnd(2, 8));
        obj.position.set(p.x, p.y, p.z);
        // Nuages /  Cloud
        if(i % 2 === 0){
          cloud = CreateCloud(rnd(8, 30))
          cloud.position.set(Planete.CloudR*p.x+(random()*5), Planete.CloudR*p.y+(random()*5), Planete.CloudR*p.z+(random()*5));          
          cloud.scale.set(0.01, 0.01, 0.01);
          cloud.lookAt(0,0,0)
          cloud.receiveShadow = true;
          cloud.castShadow = true;
          cloud.name = "Clouds"
          Clouds.push(cloud);
          
          cloud.tween = TweenMax.to(cloud.scale, rnd(50, 50), { x: 2, y: 1.3, z: .7, ease: Elastic.easeOut.config(1, 0.2), delay: rnd(0, 2) });          
          planet.add(cloud);
        }
        
      }
      objects.push(obj);
      obj.scale.set(0.01, 0.01, 0.01);
      obj.tween = TweenMax.to(obj.scale, rnd(3, 10), { x: 1, y: 1, z: 1, ease: Elastic.easeOut.config(1, 0.2), delay: rnd(0, 4) });
      obj.traverse(o => {
          if (o.isMesh){ // set these parameters for meshes only
              o.receiveShadow = true;
              o.castShadow = true;
          }
      })
      planet.add(obj);     
      
    }

    // Interractions
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const onMouseMove = e => {
      mouse.x = e.clientX / width * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objects, true);
      if (intersects.length > 0) {
        let obj = intersects[0].object;
        obj = obj.tween ? obj : obj.parent;
        if (!obj.tween.isActive()) {
          obj.scale.set(0.5, 0.5, 0.5);
          obj.tween = TweenMax.to(obj.scale, 1.5, { x: 1, y: 1, z: 1, ease: Elastic.easeOut.config(1, 0.2) });
          
        }
      }
    };
    Rendering.domElement.addEventListener('mousemove', onMouseMove);
  }

  // Arbre Low Poly
  function CreateArbre(tsize, bsize, tcolor, bcolor) {
    const TroncRayon = tsize * 0.1;
    const TroncLength = tsize / 2;
    const BigTroncRayon = TroncRayon * 0.5;

    const TroncMaterial = new MeshLambertMaterial({ color: tcolor, flatShading: true });
    const LeafMaterial = new MeshLambertMaterial({ color: bcolor, flatShading: true });

    const Arbre = new Object3D();

    // Tronc
    const TroncGeometrie = new CylinderGeometry(TroncRayon * 0.7, TroncRayon, tsize, 5, 3, true);
    TroncGeometrie.translate(0, tsize / 2, 0);
    TroncGeometrie.rotateX(-PI / 2);
    RandomizeGeometry(TroncGeometrie, TroncRayon * 0.2);
    const MeshTronc = new Mesh(TroncGeometrie, TroncMaterial);
    Arbre.add(MeshTronc);

    // Corps
    const LeafGeometrie = new SphereGeometry(bsize, 4, 4);
    LeafGeometrie.translate(0, tsize + bsize * 0.7, 0);
    LeafGeometrie.rotateX(-PI / 2);
    RandomizeGeometry(LeafGeometrie, bsize * 0.2);
    const MeshLeaf = new Mesh(LeafGeometrie, LeafMaterial);
    Arbre.add(MeshLeaf);

    if (random() > 0.5) {
      // Tronc de Type 1
      const TroncType1 = new CylinderGeometry(BigTroncRayon * 0.5, BigTroncRayon, TroncLength, 4, 2, true);
      TroncType1.translate(0, TroncLength / 2, 0);
      TroncType1.rotateZ(PI / 3 + rnd(0, 0.2));
      TroncType1.rotateY(rndFS(PI / 2));
      TroncType1.translate(0, tsize * rnd(0.2, 0.7), 0);
      TroncType1.rotateX(-PI / 2);
      RandomizeGeometry(TroncType1, TroncRayon * 0.1);
      TroncGeometrie.merge(TroncType1);

      // Leaf de Type 1
      const LeafType1 = bsize * rnd(0.5, 0.8);
      const t1bp = GetTroncPosition(TroncType1, LeafType1);
      const b1geometry = new SphereGeometry(LeafType1, 4, 4);
      b1geometry.translate(t1bp.x, t1bp.y, t1bp.z);
      RandomizeGeometry(b1geometry, LeafType1 * 0.2);
      LeafGeometrie.merge(b1geometry);
    }

    if (random() > 0.5) {
      // Tronc de Type 2
      const TroncType2 = new CylinderGeometry(BigTroncRayon * 0.5, BigTroncRayon, TroncLength, 4, 2, true);
      TroncType2.translate(0, TroncLength / 2, 0);
      TroncType2.rotateZ(-PI / 3 + rnd(0, 0.2));
      TroncType2.rotateY(rndFS(PI / 2));
      TroncType2.translate(0, tsize * rnd(0.2, 0.7), 0);
      TroncType2.rotateX(-PI / 2);
      RandomizeGeometry(TroncType2, TroncRayon * 0.1);
      TroncGeometrie.merge(TroncType2);

      // Leaf de Type 2
      const LeafType2 = bsize * rnd(0.5, 0.8);
      const t2bp = GetTroncPosition(TroncType2, LeafType2);
      const b2geometry = new SphereGeometry(LeafType2, 4, 4);
      b2geometry.translate(t2bp.x, t2bp.y, t2bp.z);
      RandomizeGeometry(b2geometry, LeafType2 * 0.2);
      LeafGeometrie.merge(b2geometry);
    }

    return Arbre;
  }

  // low poly rock
  function CreatePierre(size) {
    const material = new MeshLambertMaterial({ color: 0x808080, flatShading: true });
    const geometry = new SphereGeometry(size, 5, 4);
    RandomizeGeometry(geometry, size * 0.2);
    return new Mesh(geometry, material);
  }

  // Low Poly Cloud
  function CreateCloud(size) {
    const material = new MeshLambertMaterial({ transparent : true, opacity : 0.9, color: 0xFFFFFF, flatShading: true });
    const geometry = new SphereGeometry(size, 5, 4);
    RandomizeGeometry(geometry, size * 0.2);
    return new Mesh(geometry, material);
  }

  // Stars
  function CreateStars(size) {
    const material = new MeshBasicMaterial({ color: 0xFFFFFF, flatShading: true });
    const geometry = new SphereGeometry(size, 5, 4);
    RandomizeGeometry(geometry, size * 0.2);
    return new Mesh(geometry, material);
  }

  // Helpers
  function CreateHelpers(size) {
    const material = new MeshLambertMaterial({ color: 0xFF0000, flatShading: true });
    const geometry = new SphereGeometry(size, 5, 4);
    RandomizeGeometry(geometry, size * 0.2);
    return new Mesh(geometry, material);
  }

  // trunk helper
  function GetTroncPosition(geo, bsize) {
    let v1 = geo.vertices[0],v2 = geo.vertices[geo.vertices.length - 1];
    v1 = new Vector3(v1.x, v1.y, v1.z);
    v2 = new Vector3(v2.x, v2.y, v2.z);
    const dv = v1.clone().sub(v2).normalize().multiplyScalar(bsize * 0.5);
    return v1.add(dv);
  }

  // randomize Geométrie des éléments
  function RandomizeGeometry(geo, d) {
    let v;
    for (let i = 0; i < geo.vertices.length; i++) {
      v = geo.vertices[i];
      v.x += rndFS(2 * d);
      v.y += rndFS(2 * d);
      v.z += rndFS(2 * d);
    }
    geo.computeFlatVertexNormals();
  }

  // Autorotation Animation
  function AutoRotate() {
    //var time = Date.now() * 0.0005;
    // mesh.position.z = Math.cos( time * 8 ) * 4;   

    // Animating sphere 2
    planet.rotation.y += 0.002;
    moon.rotation.y += 0.009;
    var Cld = planet.getObjectByName( "Clouds", true );
    //console.log(Cld)
    for(var i=0; i<Clouds.length; i++){
      //Clouds[i].tween = TweenMax.to(Clouds[i].scale, rnd(20, 300), { x: 0, y: 0, z: 0, ease: Elastic.easeOut.config(1, 0.2), delay: rnd(15, 25) }); 
    }
  }

  function Animation() {
    requestAnimationFrame(Animation);
    if (cameraCtrl) cameraCtrl.update();
    Rendering.render(scene, camera);    
    AutoRotate();
  }

  function SizeUpdate() {
    width = window.innerWidth;
    height = window.innerHeight;
    Rendering.setSize(width, height);    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

function getFibonacciSpherePoints(samples, radius, randomize) {
  samples = samples || 1;
  radius = radius || 1;
  randomize = randomize || true;
  let random = 1;
  if (randomize) {
    random = Math.random() * samples;
  }
  let points = [];
  let offset = 2 / samples;
  let increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    let y = i * offset - 1 + offset / 2;
    let distance = Math.sqrt(1 - Math.pow(y, 2));
    let phi = (i + random) % samples * increment;
    let x = Math.cos(phi) * distance;
    let z = Math.sin(phi) * distance;
    x = x * radius;
    y = y * radius;
    z = z * radius;
    points.push({ x, y, z });
  }
  return points;
}

LowPolyPlanet();