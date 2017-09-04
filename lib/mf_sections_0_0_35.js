var S = {

    sw : 320, // the pixel width and height of a section
    sh : 240,
    W : 8, // the section matrix width and height
    H : 5,
    la : 1,

    secs : [], // the sections array
    load : [], // currently loaded sections

    // setup sections
    set : function (sw, sh, W, H) {

        var X,
        Y,
        x,
        y;

        this.sw = sw || 320;
        this.sh = sh || 240;
        this.W = W || 8;
        this.H = H || 5;

        this.secs = [];
        Y = Math.floor(-this.H / 2);
        while (Y < this.H / 2) {

            X = Math.floor(-this.W / 2);
            while (X < this.W / 2) {

                x = X * this.sw;
                y = Y * this.sh;

                // push new section object
                this.secs.push({

                    i : (Y + Math.floor(this.H / 2)) * this.W + X + Math.floor(this.W / 2),
                    X : X, // cell pos
                    Y : Y,
                    x : x, // px pos
                    y : y

                });

                X += 1;

            }

            Y += 1;
        }

    },

    // get a section by x, and y pixel location
    getPos : function (x, y) {

        return this.get(Math.floor(x / this.sw), Math.floor(y / this.sh));

    },

    // get a section by X & Y sec pos
    get : function (X, Y) {

        var hw = Math.ceil(this.W / 2),
        hh = Math.ceil(this.H / 2);

        if (X >= -hw && X < hw && Y >= -hh && Y < hh) {

            var i = this.W * (Y + hh) + X + hw,

            sec = this.secs[i];

            return sec

        };

        return {};

    },

    // load sections based on the given vp values
    ls : function (x, y, w, h) {

        var SX,
        EX,
        SY,
        EY,
        Y,
        X,
        i;

        this.load = [];

        SX = Math.round(x / this.sw);
        SY = Math.round(y / this.sh);
        EX = Math.round((x + w) / this.sw);
        EY = Math.round((y + h) / this.sh);

        Y = SY - this.la;
        while (Y < EY + this.la) {

            X = SX - this.la;
            while (X < EX + this.la) {

                var sec = this.get(X, Y);

                if (sec.X != undefined) {

                    this.load.push(sec);
                }

                X += 1;

            }

            Y += 1;

        }

    }

};
