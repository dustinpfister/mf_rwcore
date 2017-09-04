


// draw method
var draw = function () {

    var x,
    obj,
    y,
    w,
    h;

    C.cls();

    // draw sections
    S.load.forEach(function (sec) {

        C.hiDraw(function (ctx) {

            obj = vp.makeVPRel({

                    x : sec.x,
                    y : sec.y,
                    w : S.sw,
                    h : S.sh

                });

            ctx.strokeStyle = '#00ff00';
            ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);

            if (sec.pl.length > 0) {

                sec.pl.forEach(function (pl) {

                    pl = vp.makeVPRel(pl);

                    ctx.strokeStyle = '#00ffff';
                    ctx.strokeRect(pl.x, pl.y, pl.w, pl.h);

                });

            }

            // draw section info
            C.drawInfo(

                [

                    'i: ' + sec.i,
                    'x,y: ' + sec.x + ',' + sec.y,
                    'X,Y:' + sec.X + ',' + sec.Y,
                    'pl.length: ' + sec.pl.length

                ],

                obj.x + 60, obj.y + 60, '', '', '#00ff00');

        });

    });

    // draw ships
    C.hiDraw(function (ctx) {

        // player ships
        rw.ps.units.forEach(function (ship) {

            var obj = _.c(ship),

            pos = vp.makeVPRel(obj);

            obj.x = pos.x;
            obj.y = pos.y;
            obj.f = '#00af88';
            //C.drawInfo([obj.a], 50, 20);
            C.dBX(obj);

        });

        // enemy ships
        rw.es.units.forEach(function (ship) {

            var obj = _.c(ship),

            pos = vp.makeVPRel(obj);

            obj.x = pos.x;
            obj.y = pos.y;
            obj.s = '#000000';
            obj.f = '#af0000';
            //C.drawInfo([obj.a], 50, 20);
            C.dBX(obj);

            C.drawInfo(
                [

                    'id: ' + ship.id,
                    'hp:' + ship.hp,
                    'a: ' + ship.a,
                    //'target: ' + (ship.target ? ship.target : false)
                    'dtt: ' + Math.floor(ship.dtt),
                    'adt: ' + ship.adt.toFixed(2),
                    'aDir: ' + ship.aDir,
                    'turnPer: ' + ship.turnPer.toFixed(2),
                    'maxTurn: ' + ship.maxTurn.toFixed(2),
                    'aDelta: ' + ship.aDelta.toFixed(2)

                ],

                obj.x, obj.y, 12, '12px courier', '#ff8888');

        });

    });

    // draw shots
    C.hiDraw(function (ctx) {

        // player shots
        rw.ps.shots.units.forEach(function (sh) {

            var obj = vp.makeVPRel(sh);

            ctx.fillStyle = '#00afff';
            ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

        });

    });

    C.drawInfo([

            'D : ' + rw.d.d.toFixed(2),
            'spawnPer: ' + rw.d.spawnPer,
            'nextSpawn: ' + (rw.d.spawnRate -(new Date()-rw.d.lastSpawn)),
            'spawnRate: ' + rw.d.spawnRate

        ], 10, 20);

    //C.drawInfo([currentPl.id || '']);

},

loop = function () {

    requestAnimationFrame(loop);

    rw.tick();
    draw();

};

rw.init();
loop();
