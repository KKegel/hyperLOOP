import * as THREE from 'three';


const particles  = ( scene, position ) => {

    var particles = 500000;

    var geometry = new THREE.BufferGeometry();

    var positions = [];
    var colors = [];

    var color = new THREE.Color();

    var n = 10, n2 = n / 2; // particles spread in the cube

    for ( var i = 0; i < particles; i ++ ) {

        // positions

        // var x = Math.random() * n - n2;
        // var y = Math.random() * n - n2;
        // var z = Math.random() * n - n2;

        let x = position.x;
        let y = position.y;
        let z = position.z;

        positions.push( x, y, z );

        // colors

        var vx = ( x / n ) + 0.5;
        var vy = ( y / n ) + 0.5;
        var vz = ( z / n ) + 0.5;

        color.setRGB( vx, vy, vz );

        colors.push( color.r, color.g, color.b );

    }

    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    geometry.computeBoundingSphere();

    //

    var material = new THREE.PointsMaterial( { size: 10, vertexColors: THREE.VertexColors } );

    let points = new THREE.Points( geometry, material );
    scene.add( points );

    //

}

export default particles;

