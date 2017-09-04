/*
 *
 *   roots and wings core game logic
 *
 *   * sets up the view port (mf_vp)
 *   * sets up the canvas (mf_canvas)
 *   * sets up sections (mf_sections)
 *   * stores the player's ShipCollection instance (rw.ps);
 *   * stores the enemy unit ShipCollection instance (rw.ps);


 *   * current state of distance game mechanic
 *   * enemy re-spawn method based on distnace
 *   * Contains a planet class that inherits from Unit (mf_units)
 *   * Universe generator method creates planets for all sections
 *
 */

var rw = (function () {

    var x = 0,
    y = 0;

    // update all things distance.
    var distTick = function (obj) {

        var roll;

        // update distance
        this.d.d = _.d(0, 0, obj.x + obj.w / 2, obj.y + obj.w / 2);

        this.d.spawnPer = .5;

        if (new Date() - this.d.lastSpawn >= this.d.spawnRate) {

            roll = _.r();

            if (roll < this.d.spawnPer) {

                this.es.addShip({

                    x : 200

                });

            }

            this.d.lastSpawn = new Date();

        }

    };

    var onPl = function (sec, obj) {

        var i;
        if (sec) {

            if (sec.pl) {

                i = sec.pl.length;
                while (i--) {

                    if (_.b(sec.pl[i], obj)) {

                        return sec.pl[i];

                    }

                }

            }

        }

        return false;

    };

    var Planet = function (obj) {

        Unit.call(this, obj);

    };

    Planet.prototype = new Unit();

    api = {

        d : {

            spawnRate : 3000,
            lastSpawn : new Date()

        }, // the current distance data
        ps : {},
        es : {},
        cp : {}, // current planet

        init : function () {

            _.l('rw-core: init...');

            // view port
            vp.nw = 640;
            vp.nh = 480;
            vp.zoom(1);

            // canvas
            C.canvas.width = 640;
            C.canvas.height = 480;
            C.cls();

            // sections
            S.set(1280, 960, 20, 20);
            S.ls(vp.x, vp.y, vp.w, vp.h);

            // pl array for each section
            S.secs.forEach(function (sec) {

                sec.pl = [];

            });

            var sec = S.getPos(-32, -32);
            sec.pl.push({

                x : -32,
                y : -32,
                w : 64,
                h : 64,
                id : 'home',
                po : false

            });

            // the New Player Ship Collection that will replace playerObj, and pShots
            this.ps = new ShipCollection({
                    faction : 'p',
                    //ai : true,
                    max : 1
                });

            // add the single player ship
            this.ps.addShip();

            // enemy ships collection
            this.es = new ShipCollection({
                    faction : 'e',
                    ai : true,
                    max : 5
                });

            // set enemy collections for each collection
            this.ps.enemys = this.es;
            this.es.enemys = this.ps;

            // add enemy ship
            //this.es.addShip({

            //    x : 200

            //});

            _.l(this.ps)

        },

        tick : function () {

            // player object
            var obj = this.ps.units[0];

            distTick.call(this, obj);

            var d = kc.d();

            if (d >= 0) {

                // new _.asd method works great
                if (_.asd(obj.a, d) == -1) {

                    obj.a -= Math.PI / 100;

                } else {

                    obj.a += Math.PI / 100;
                }

                obj.step();
            }

            vp.lookAt(x, y);

            vp.x = obj.x - vp.w / 2;
            vp.y = obj.y - vp.h / 2;

            S.ls(vp.x, vp.y, vp.w, vp.h);

            // fire shots
            if (kc.keys[186]) {

                obj.shoot();

            }

            if (kc.keys[49]) {

                ps.ai = true;

            }

            if (kc.keys[50]) {

                ps.ai = false;

            }

            // get planet
            var pl = onPl(S.getPos(obj.x, obj.y), obj);

            this.cp = {};
            if (pl) {

                this.cp = pl;

            }

            this.ps.update();
            this.es.update();

        }

    };

    return api;

}
    ());
