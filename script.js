 if (!Detector.webgl) Detector.addGetWebGLMessage();

        var camera, controls, scene, renderer;

        // Gradient
        var uniforms = {
            "color1": {
                type: "c",
                value: new THREE.Color(0xFF59B0)
            },
            "color2": {
                type: "c",
                value: new THREE.Color(0x7396FF)
            },
        };

        var fShader = document.getElementById('fragmentShader').text;
        var vShader = document.getElementById('vertexShader').text;


        // Create material
        var _material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vShader,
            fragmentShader: fShader
        });
        // Gradient end

        var path = "img/";

        var format = '.PNG';
        var urls2 = [
            path + 'dia_4' + format, path + 'dia_4' + format,
            path + 'dia_4' + format, path + 'dia_4' + format,
            path + 'dia_4' + format, path + 'dia_4' + format
        ];

        var textureCube2 = new THREE.CubeTextureLoader().load(urls2);
        scene = new THREE.Scene();
        scene.background = textureCube2;


        var format = '.jpg';
        var urls = [
            path + 'pano' + format, path + 'pano' + format,
            path + 'pano' + format, path + 'pano' + format,
            path + 'pano' + format, path + 'pano' + format
        ];

        var textureCube = new THREE.CubeTextureLoader().load(urls);
        scene = new THREE.Scene();
        scene.background = textureCube;

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x222222, 0.0004);


        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(scene.fog.color, 0.2)
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        var container = document.getElementById('container');
        container.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 100, 1700);
        
        controls = new THREE.OrbitControls(camera, renderer.domElement);    
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.autoRotate = false;
        controls.enableZoom = true;
        controls.minDistance = 100;
        controls.maxDistance = 1700;


        var materialTop = new THREE.MeshBasicMaterial({
            color: 0xE91E63,
            transparent: true,
            wireframe: true

        });

        var materialBottom = new THREE.MeshBasicMaterial({
            color: 0x3D5AFE,
            transparent: true,
            wireframe: true

        });

        var materialLeft = new THREE.MeshBasicMaterial({
            color: 0x3D5AFE

        });

        var materialRight = new THREE.MeshBasicMaterial({
            color: 0xF50057

        });

        // top wall
        var geometryTop = new THREE.PlaneGeometry(2500, 750, 50, 50);
        var meshTop = new THREE.Mesh(geometryTop, _material);

        meshTop.rotation.y = -200;
        meshTop.position.x = -400;
        meshTop.position.z = -400;
        scene.add(meshTop);

        var Bottom__grid = new THREE.GridHelper(5000, 100);
        Bottom__grid.setColors(0x33CCAF, 0xAF0808);
        Bottom__grid.position.y = -560;
        scene.add(Bottom__grid);


        var geometry = new THREE.BoxBufferGeometry(95, 95, 95);
        var edges = new THREE.EdgesGeometry(geometry);

        var material = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            specular: 0x999999,
            envMap: textureCube2,
            combine: THREE.MultiplyOperation,
            shininess: 20,
            reflectivity: 1.9,
            transparency: 0.5,
        });


        var itmArr = [];

        var coneGeometry = new THREE.CylinderGeometry(0, 100, 200, 400, false);


        (function() {
            for (var i = 0; i < 3; i++) {
                var cone = new THREE.Mesh(coneGeometry, material);
                cone.position.z = -520;
                cone.position.x = (Math.random() - Math.random()) * 520;
                cone.position.y = (Math.random() - Math.random()) * 20;

                scene.add(cone);
                itmArr.push(cone);
                cone.rotation.x = 80;
                cone.rotation.y = 0;
                cone.rotation.z = 0;
            }
        })();


        var vmaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            // specular: 0x222222,
            envMap: textureCube2,
            combine: THREE.MultiplyOperation,
            //wireframe: true,
            shininess: 20,
            reflectivity: 4.10,
            roughness: 2.5,
            opacity: 1,
            transparent: false

        });

        // venus

        var loader = new THREE.JSONLoader();

        loader.load('venus_x.js', function(vgeometry, vmaterials) {
            // vmaterial = new THREE.MultiMaterial( vmaterials );
            vmesh = new THREE.Mesh(vgeometry, vmaterial);
            vmesh.position.set(0, -590, 0);
            vmesh.scale.set(180, 180, 180);
            scene.add(vmesh);
        });




        // lights

        light = new THREE.DirectionalLight(0x9570AE, 10.2);
        light.position.set(-1, 0, 10);
        scene.add(light);

        light = new THREE.DirectionalLight(0x000000, 15.6);
        light.position.set(-1, 10, 10);
        scene.add(light);

        light = new THREE.AmbientLight(0xFFFFFF, 10);
        light.position.set(0, 0, -10);
        scene.add(light);

        light_top = new THREE.DirectionalLight(0xFFFFFF, 10.5);
        light_top.position.set(10, 0, -10)
        scene.add(light_top);

        window.addEventListener('resize', onWindowResize, false);


        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }


        var render = function() {

            requestAnimationFrame(render);


            vmesh.rotation.y += 0.002;

            Bottom__grid.position.z += 1;

            if (Bottom__grid.position.z >= 500) {
                Bottom__grid.position.z -= 2500;
            }


            renderer.render(scene, camera);

        }
        render();