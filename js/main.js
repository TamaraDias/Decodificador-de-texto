// Seletores
const selectors = {
    inputField: 'textarea#textarea',
    outputField: 'div.grid2',
    encryptButton: 'button.btn-criptografar',
    decryptButton: 'button.btn-descriptografar'
  };
  
  const elements = {
    inputField: document.querySelector(selectors.inputField),
    outputField: document.querySelector(selectors.outputField),
    encryptButton: document.querySelector(selectors.encryptButton),
    decryptButton: document.querySelector(selectors.decryptButton),
    copyButton: createButton('Copiar', 'btn-copiar'),
    alertBox: createAlertBox()
  };
  
  // Função para criar um botão
  function createButton(text, className) {
    const button = document.createElement('button');
    button.innerText = text;
    button.classList.add(className);
    return button;
  }
  
  // Função para criar a caixa de alerta
  function createAlertBox() {
    const alertBox = document.createElement('div');
    alertBox.classList.add('box-alert');
    alertBox.innerHTML = `
      <p>Texto inválido! Por favor, insira um texto com letras minúsculas e sem acentos.</p>
      <button onclick="hideAlertBox()">X</button>`;
    return alertBox;
  }
  
  // Funções de transformação de texto
  const transformations = {
    encrypt: (text) => text
      .replaceAll('e', 'enter')
      .replaceAll('o', 'ober')
      .replaceAll('i', 'imes')
      .replaceAll('a', 'ai')
      .replaceAll('u', 'ufat'),
  
    decrypt: (text) => text
      .replaceAll('enter', 'e')
      .replaceAll('ober', 'o')
      .replaceAll('imes', 'i')
      .replaceAll('ai', 'a')
      .replaceAll('ufat', 'u')
  };
  
  // Validação do texto
  const isValidText = (text) => !/[A-ZÀ-ü]/.test(text);
  
  // Mostrar a caixa de alerta
  function showAlertBox() {
    const main = document.querySelector('body main');
    if (main) {
      main.append(elements.alertBox);
      clearTimeout(alertBoxTimeout);
      alertBoxTimeout = setTimeout(hideAlertBox, 10000); // 10 segundos
    }
  }
  
  // Ocultar a caixa de alerta
  function hideAlertBox() {
    const main = document.querySelector('body main');
    if (main && main.contains(elements.alertBox)) {
      main.removeChild(elements.alertBox);
    }
  }
  
  // Atualizar o campo de saída e o botão "Copiar"
  function updateOutput(text) {
    elements.outputField.innerHTML = `<div class="text-output">${text}</div>`;
    // Remove o botão de copiar existente antes de adicionar um novo
    const existingButton = elements.outputField.querySelector('.btn-copiar');
    if (existingButton) {
      elements.outputField.removeChild(existingButton);
    }
    elements.outputField.append(elements.copyButton);
    elements.copyButton.disabled = false;
  }
  
  // Lidar com a criptografia e descriptografia
  function handleTextTransformation(transformationFunction) {
    const inputValue = elements.inputField.value;
    if (inputValue && isValidText(inputValue)) {
      const transformedText = transformationFunction(inputValue);
      updateOutput(transformedText);
    } else {
      showAlertBox();
    }
  }
  
  // Event Listeners
  elements.encryptButton.addEventListener('click', () => handleTextTransformation(transformations.encrypt));
  elements.decryptButton.addEventListener('click', () => handleTextTransformation(transformations.decrypt));
  
  elements.copyButton.addEventListener('click', () => {
    const textToCopy = elements.outputField.querySelector('.text-output').innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      elements.copyButton.innerText = 'Copiado!';
      elements.copyButton.disabled = true;
    });
  });
  