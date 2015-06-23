/**
 * @author  tatocaster <tatocaster.me>
 */
(function(document, window) {

    var selectBox = getById('de_method');
    var finalX = getById('final_valueX');
    var calculateBtn = getById('calculate');

    selectBox.onchange = function() {
        if (this.value == 2 || this.value == 3) {
            finalX.style.display = "block";
        } else {
            finalX.style.display = "none";
        }
    };

    calculate.onclick = function() {
        var k = 0;
        var n = 10;
        var y = parseFloat(getById("yzero").value);
        var x = parseFloat(getById("xzero").value);
        var h = parseFloat(getById("h").value);
        var tablePrint = "";

        // if simple Euler
        if (selectBox.value == 1) {
            for (var j = 1; j <= n; j++) {
                x = x + h;
                // eval() is evil, but we need this now.
                k = h * eval(getById("mainEquation").value);
                y = y + k;

                tablePrint += "<tr><td>" + j + "</td><td>" + Math.round(x * 100) / 100 + "</td><td>" + Math.round(y * 1000) / 1000 + "</td></tr>";
            }
        }

        if (selectBox.value == 2) {
            // initialisation
            var s = [];
            var yArr = [];
            var xArr = [];
            var m = [];
            yArr[0] = y;
            xArr[0] = x;
            s[0] = yArr[0];

            var fX = finalX.value;

            var m1, m2;

            for (i = 1; xArr[i - 1] < fX; i++) {
                w = 100.0;
                xArr[i] = xArr[i - 1] + h;
                m[i] = calcSlope(xArr[i - 1], yArr[i - 1]);
                c = 0;
                while (w > 0.0001) {
                    m1 = calcSlope(xArr[i], s[c]);
                    m2 = (m[i] + m1) / 2;
                    s[c + 1] = yArr[i - 1] + m2 * h;
                    w = s[c] - s[c + 1];
                    w = Math.abs(w);
                    c = c + 1;
                }
                yArr[i] = s[c];
            }
            console.log("The respective values of xArr and yArr are\n     xArr yArr");
            for (j = 0; j < i; j++) {
                // answer at last. Aaah.
                tablePrint += "<tr><td>" + (j + 1) + "</td><td>" + xArr[j] + "</td><td>" + yArr[j] + "</td></tr>";
            }
        }

        if (selectBox.value == 3) {
            var fX = finalX.value;
            var i = 0;
            while (x < fX) {
                m1 = eulerFunction(x, y);
                m2 = eulerFunction((x + h / 2), (y + m1 * h / 2));
                m3 = eulerFunction((x + h / 2), (y + m2 * h / 2));
                m4 = eulerFunction((x + h), (y + m3 * h));
                m = ((m1 + 2 * m2 + 2 * m3 + m4) / 6);
                y = y + m * h;
                x = x + h;
                i++;
                tablePrint += "<tr><td>" + i + "</td><td>" + Math.round(x * 100) / 100 + "</td><td>" + Math.round(y * 1000) / 1000 + "</td></tr>";
            }
        }

        getById("tableBody").innerHTML = tablePrint;
    };


    function eulerFunction(x, y) {
        m = (x - y) / (x + y);
        return m;
    }

    function calcSlope(a, b) {
        var c;
        c = a * a + b;
        return c;
    }

    function getById(id) {
        return document.getElementById(id);
    }


})(document, window);