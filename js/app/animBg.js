(function() {

    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {
            x: 0,
            y: height
        };

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height + 'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for (var x = 0; x < width * 0.012; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        var COLORS = [
            { r: 103, g: 204, b: 252 },
            { r: 255, g: 199, b: 115 }, 
            { r: 61, g: 240, b: 157 },
            { r: 255, g: 125, b: 122 }
        ];
        var color;

        // constructor
        (function() {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = (height * .25) + Math.random() * (height + 100);

            _this.alpha = 0.0005;
            _this.scale = 0.1 + Math.random() * 0.5;
            _this.velocity = 0.1 + Math.random() * 0.25;
            _this.maxAlpha = 0.1 + Math.random() * 0.75;

            _this.alphaIsIncreasing = true;
            _this.alphaSteps = Math.random() * 0.0004 + 0.0005;
            _this.color = COLORS[Math.floor(Math.random() * (COLORS.length))];
        }

        this.draw = function() {
            if (_this.alpha <= 0) {
                init();
            } else if (_this.alpha >= _this.maxAlpha) {
                _this.alphaIsIncreasing = false;
            }

            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 20, 0, 3 * Math.PI, false);
            ctx.fillStyle = 'rgba('+ _this.color.r + ',' + _this.color.g + ',' + _this.color.b + ',' + _this.alpha + ')';
            ctx.fill();

            if (_this.alphaIsIncreasing) {
                _this.alpha += _this.alphaSteps;
            } else {
                _this.alpha -= _this.alphaSteps;
            }
            _this.pos.y -= _this.velocity;
        };
    }
})();
