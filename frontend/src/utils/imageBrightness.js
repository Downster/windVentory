let thisImg;

function getImageBrightness(image, callback) {

    const img = document.createElement("img");
    img.src = image

    img.style.display = "none";
    img.setAttribute('crossOrigin', '');
    document.body.appendChild(img);

    let colorSum = 0;

    img.onload = function () {
        // create canvas
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r, g, b, avg;

        for (let x = 0, len = data.length; x < len; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];

            avg = Math.floor((r + g + b) / 3);
            colorSum += avg;
        }
        const brightness = Math.floor(colorSum / (this.width * this.height));
        callback(brightness)
        img.remove()
    }
}

// $("img").on("click", function () {
//     thisImg = $(this)

//     getImageBrightness($(this), function (thisImgID, brightness) {
//         document.getElementsByTagName('pre')[0].innerHTML = "Brightness: " + brightness + "<br><br>- Red border means class added -> dark,<br>- yellow border mean class added -> light";

//         if (brightness < 127.5) {
//             $("#" + thisImgID).addClass("dark");
//         } else {
//             $("#" + thisImgID).addClass("light");
//         }
//     });
// });

export default getImageBrightness