var currentContent, mainContent, logoText, fontBase = 1000, fontSize = 95;

function configurePage(text, initialContent, layout){
  mainContent = document.getElementById('content');
  window.onresize = onWindowResize;
  defineContent(initialContent);
  defineLayout(layout);
  renderLogo(text);
  logoText = text;
}

function onLoadLayout() {
  // alert('Layout was load successfully.');
}

function onWindowResize() {
  // console.log('Window was resized.');
  renderLogo(logoText);
}

function defineLayout(layout = 'book-layout'){
  var layoutPath = './phs-renderer/styles/' + layout + '.css';
  var layoutStyle = document.createElement('link');
  layoutStyle.onload = onLoadLayout;
  layoutStyle.rel = 'stylesheet';
  layoutStyle.type = 'text/css';
  layoutStyle.href = layoutPath;
  layoutStyle.id = 'layout';

  document.head.appendChild(layoutStyle);
}

function defineColorsInterval (){
  /* red: #f05125, green: #7ebb42, blue: #32a0da, yellow: #fdb813 */
  return [
          { interval: 0, colorName: "#f05125" }, 
          { interval: 0.33, colorName: "#fdb813" },
          { interval: 0.66, colorName: "#7ebb42" },
          { interval: 1.0, colorName: "#32a0da" }
        ];
}

function renderLogo(text) {
  var canvas = document.getElementById("logo-canvas");
  canvas.width = window.innerWidth;
  canvas.height = 40;

  var context = canvas.getContext("2d");
  context.textBaseline = "middle";
  context.font = '32px sans-serif';
  context.textBaseline = 'top';
  context.textAlign = "center";

  context.fillStyle = defineGradiente(context, canvas, defineColorsInterval());
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'white';
  context.fillText(text, canvas.width / 2, 2);
}

function defineGradiente(context, canvas, colorsIntervals){
  var gradient = context.createLinearGradient(0, 0, canvas.width, 0);

  for(i = 0; i < colorsIntervals.length; i++){
    gradient.addColorStop( colorsIntervals[i].interval, colorsIntervals[i].colorName );
  }

  return gradient;
}

function defineContent(fileName){
  if (!fileName) {
    alert('Error!!! \n No file content was defined.');
    return;
  }

  if (currentContent) { 
    if (currentContent.src.includes(fileName.substring(1))) { return; }
    document.body.removeChild(currentContent);
  }
  currentContent = document.createElement('script');
  currentContent.onload = renderContent;
  currentContent.id = 'script-content';
  currentContent.src = fileName;

  document.body.appendChild(currentContent);
}

function renderContent(fileName) {
  if (typeof fileName === 'string' && currentContent.src !== fileName) {
    defineContent(fileName);
  } else {
    mainContent.innerHTML = content[0].value;
  }
}