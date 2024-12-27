const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const assert = require('assert');
require('edgedriver'); // Requiere el driver de Microsoft Edge

describe('Pruebas Frontend de CandidatesWeb', function () {
  let driver;

  // Configura el tiempo de espera global a 10 segundos
  this.timeout(10000);

  // Configura el WebDriver para Microsoft Edge antes de iniciar las pruebas
  before(async function () {
    this.timeout(10000); // Aumentar el tiempo de espera a 10 segundos
    const options = new edge.Options();
    driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
    await driver.get('http://localhost:4000'); // Cambiar la URL del frontend
  });

  it('debería mostrar la lista de documentos', async function () {
    // Buscar el botón para listar los documentos y hacer click
    await driver.findElement(By.xpath("//button[contains(text(),'Listar Documentos')]")).click();

    // Esperar a que se cargue la lista de documentos
    await driver.wait(until.elementLocated(By.css('.tarjetas-container')), 10000); // Ajustar el selector a .tarjetas-container

    // Validar que la lista de documentos no esté vacía
    let documentos = await driver.findElements(By.css('.tarjeta')); // Cambiar a .tarjeta para las tarjetas de documentos
    assert(documentos.length > 0, 'No hay documentos en la lista');
  });

  it('debería realizar una búsqueda de documentos', async function () {
    // Buscar el input del campo de búsqueda por clase .buscador
    let inputBusqueda = await driver.findElement(By.css('input.buscador')); // Usar la clase .buscador
    await inputBusqueda.sendKeys('Escolaridad'); // Escribe el término de búsqueda

    // Hacer click en el botón de buscar
    await driver.findElement(By.xpath("//button[contains(text(),'Buscar')]")).click();

    // Esperar los resultados de búsqueda
    await driver.wait(until.elementLocated(By.css('.tarjetas-container')), 5000); // Ajustar el selector

    // Verificar que los resultados contengan el término "Escolaridad"
    let documentos = await driver.findElements(By.css('.tarjeta'));
    let primerDocumentoTexto = await documentos[0].getText();
    assert(primerDocumentoTexto.includes('Escolaridad'), 'El documento no contiene la palabra clave');
  });

  it('debería subir un documento', async function () {
    // Navegar a la sección de subir documentos
    await driver.findElement(By.xpath("//button[contains(text(),'Cargar Documentos')]")).click();

    // Seleccionar un archivo para subir (verifica si el input está visible y usa un selector preciso)
    let inputArchivo = await driver.findElement(By.css('input[type="file"]')); // Cambiar a un selector CSS
    await inputArchivo.sendKeys('C:\\Users\\nicol\\OneDrive\\Escritorio\\Nueva carpeta\\Escolaridad.pdf'); // Reemplaza con la ruta a tu archivo

    // Hacer click en el botón de subir
    let botonSubir = await driver.findElement(By.xpath("//button[contains(text(),'Subir')]"));
    await botonSubir.click();

    // Verificar el mensaje de éxito
    let mensajeExito = await driver.findElement(By.css('.success')).getText();
    assert(mensajeExito.includes('Subido correctamente'), 'El documento no se subió correctamente');
  });

  // Cierra el WebDriver después de las pruebas
  after(async function () {
    await driver.quit();
  });
});