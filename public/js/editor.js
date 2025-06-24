// Wait for Quill to be available
function initEditor() {
  const noteId = window.location.pathname.split('/')[2];
  const editorElement = document.querySelector('#editor');
  
  if (editorElement) {
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: { toolbar: false }
    });
    
    quill.root.innerHTML = editorElement.innerHTML;
    
    let saveTimeout;
    quill.on('text-change', () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        const content = quill.root.innerHTML;
        fetch(`/notes/${noteId}/content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content })
        });
      }, 1000);
    });
  }
}

// Initialize when ready
if (typeof Quill !== 'undefined') {
  initEditor();
} else {
  window.addEventListener('quill-loaded', initEditor);
}

// Formatting and block helpers
function formatText(format) {
  const quill = Quill.find(document.querySelector('#editor'));
  const range = quill.getSelection();
  if (range) {
    quill.format(format, !quill.getFormat(range)[format]);
  }
}

function addBlock(type) {
  const quill = Quill.find(document.querySelector('#editor'));
  const range = quill.getSelection();
  const index = range ? range.index : quill.getLength();
  
  switch(type) {
    case 'heading':
      quill.insertText(index, '\nHeading\n', { header: 1 });
      break;
    case 'bullet':
      quill.insertText(index, '\n• List item\n');
      quill.formatLine(index + 1, 1, { list: 'bullet' });
      break;
    case 'number':
      quill.insertText(index, '\n1. List item\n');
      quill.formatLine(index + 1, 1, { list: 'ordered' });
      break;
    case 'todo':
      quill.insertText(index, '\n☐ Todo item\n');
      quill.formatLine(index + 1, 1, { list: 'checked' });
      break;
  }
}