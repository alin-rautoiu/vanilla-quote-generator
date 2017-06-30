var canvas = document.getElementById('memecanvas');
ctx = canvas.getContext('2d');

var deviceWidth = window.innerWidth;;
canvasWidth = Math.min(800, deviceWidth - 20);
canvasHeight = Math.min(800, deviceWidth - 20);

canvas.width = canvasWidth;
canvas.height = canvasHeight;

//  Grab the image
var img = document.getElementById('start-image');

// When the image has loaded...
img.onload = function () {
  // Work out where to center it
  x = canvas.width / 2 - img.width / 2;
  y = canvas.height / 2 - img.height / 2;

  // Draw it
  ctx.drawImage(img, x, y);

  // Set the text style to that to which we are accustomed
  setTimeout(function () {
    ctx.lineWidth = 2;
    ctx.font = '60pt Armonioso';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';

    text = '"';
    x = canvas.width / 2;
    y = canvas.height / 6;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);

    ctx.font = '25pt Armonioso';

    quote = getRandomQuote();
    text = quote.citat;

    x = canvas.width / 2;
    y = canvas.height / 5;
    wrapText(ctx, text, x, y, canvasWidth - canvasWidth / 3, 35);

    if (quote.autor === null) 
      return;
    text = "--" + quote.autor;
    x = canvas.width / 1.5;
    y = canvas.height - canvas.height / 2.5;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  }, 500);
}

window.fbAsyncInit = function () {
  FB.init({
    appId: '322460528197025', 
    autoLogAppEvents: true, 
    xfbml: true, 
    version: 'v2.9'
  });
  FB.AppEvents.logPageView();
  FB.getLoginStatus(function(response){
    fbApiInit = true;
    var shareButton = document.getElementById('share-button');
    shareButton.addEventListener("click", new function () {
      var msg = '#sustinvaniliatraditionala #oling';
      var data = canvas.toDataURL();

      try {
        FB
          .ui({
            method: 'feed',
            name: 'Susține și tu vanilia tradițională',
            link: 'https://alin-rautoiu.github.io/vanilla-quote-generator/',
            picture: data,
            source: 'https://alin-rautoiu.github.io/vanilla-quote-generator/',
            caption: 'mywebsite.com',
            description: msg,
            message: msg
          }, function (response) {
            if (response && response.post_id) {
              self.register_share('facebook');
            } else {
              console.log("Post not shared");
            }
          });
      } catch (e) {
        console.log(e);
      }
    })
  });
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }

  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs
    .parentNode
    .insertBefore(js, fjs);  

}(document, 'script', 'facebook-jssdk'));

function getRandomQuote() {
  var rand = parseInt(Math.random() * quoteList.length);
  return quote = quoteList[rand];
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.strokeText(line, x, y);
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.strokeText(line, x, y);
  ctx.fillText(line, x, y);
}

var quoteList = [
  {
    citat: "Trăiește viața fără frică, atacă obstacolele din calea ta și mănâncă vanilia!",
    autor: null
  }, {
    citat: "Ich bin ein Vaniller!",
    autor: "JFK"
  }, {
    citat: "Istoria nu va uita pe vinovați și vinovați suntem cu toții: unii pentru că am tă" +
        "cut. Alții pentru că am greșit. Cu toții, pentru că am lins la un moment dat și " +
        "altceva...",
    autor: "Mareșalul vanilescu"
  }
]