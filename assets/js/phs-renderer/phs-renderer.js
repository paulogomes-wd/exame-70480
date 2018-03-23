var currentContent;
var mainContent;

function configurePage(initialContent){
  mainContent = document.getElementById('content');
  defineContent(initialContent);
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

function renderContent(fileName){
  if (typeof fileName === 'string' && currentContent.src !== fileName) {
    defineContent(fileName);
  } else {
    mainContent.innerHTML = content[0].value;
  }
}