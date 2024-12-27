## Casos de Prueba Funcionales y No Funcionales – DocumentIngester

# Suite de Casos de Prueba Funcionales
Suposiciones: Se supone que existen más roles como administrador

| ID | CPF-01 |
| --- | --- |
| Descripción | Subir un archivo y extraer su texto |
| Actor | Usuario API |
| Precondiciones | El servidor está disponible, y el endpoint de ingesta de documentos está funcional. |
| Curso normal | El usuario envía un archivo PDF o DOCX a través de la API. El servidor responde con el texto extraído y un identificador numérico único. |
| Curso alternativo | El usuario envía un archivo en un formato no soportado. Devuelve error 415 |
| Resultado esperado | El texto se extrae correctamente y se devuelve un ID único. En el caso de un archivo no soportado, el servidor devuelve error  415 Unsupported Media Type. |

| ID | CPF-02 |
| --- | --- |
| Descripción | Almacenar archivo en la base de datos |
| Actor | Usuario API |
| Precondiciones | El archivo fue enviado correctamente y el texto fue extraído. La base de datos está conectada y accesible. |
| Curso normal | El texto del archivo y su identificador se almacenan en la base de datos relacional con PostgreSQL. |
| Curso alternativo | La base de datos está caída o inaccesible. Termina el proceso |
| Resultado esperado | El archivo se almacena correctamente en la base de datos. Si la base de datos está caída, el sistema devuelve un error 500 (Internal Server Error). |

| ID | CPF-03 |
| --- | --- |
| Descripción | Búsqueda simple por palabra clave |
| Actor | Usuario API |
| Precondiciones | Hay documentos almacenados en la base de datos. |
| Curso normal | El usuario realiza una búsqueda exacta por una o más palabras clave. El sistema devuelve los documentos que coinciden con la búsqueda. |
| Curso alternativo | No hay documentos que coincidan con la búsqueda. Termina el proceso |
| Resultado esperado | Los documentos que contienen las palabras clave exactas se devuelven. Si no hay coincidencias, se devuelve una respuesta vacía. |

| ID | CPF-04 |
| --- | --- |
| Descripción | Búsqueda avanzada con umbral de selectividad |
| Actor | Usuario API |
| Precondiciones | Hay documentos almacenados en la base de datos. |
| Curso normal | El usuario realiza una búsqueda con palabras clave y un valor numérico entre 0 y 1 que representa el umbral de selectividad. El sistema devuelve los documentos que coinciden según el umbral de selectividad especificado. |
| Curso alternativo | No se especifica el umbral o es un valor fuera del rango [0, 1]. Se emite error 400 Bad Request |
| Resultado esperado | Los documentos que cumplen con el umbral de selectividad son devueltos. Si el umbral es inválido, el servidor devuelve un error 400 (Bad Request) |

| ID | CPF-05 |
| --- | --- |
| Descripción | Eliminar un documento de la base de datos |
| Actor | Administrador API |
| Precondiciones | El documento está almacenado en la base de datos. |
| Curso normal | El administrador solicita la eliminación de un documento usando su ID único. El documento se elimina de la base de datos. |
| Curso alternativo | El documento no existe o el ID proporcionado es incorrecto. Se muestra error 404 |
| Resultado esperado | El documento se elimina correctamente. Si el ID no existe, se devuelve un error 404 (Not Found). |

# Suite de Casos de Prueba No Funcionales
| ID | CP-NF-01 |
| --- | --- |
| Descripción | Verificar la eficiencia de extracción de texto de archivos grandes |
| Actor | Usuario API |
| Precondiciones | La aplicación está funcionando correctamente. |
| Curso normal | El usuario envía un archivo PDF o DOCX de más de 100MB. |
| Curso alternativo | El archivo es demasiado grande para ser procesado en un tiempo razonable. Se muestra error 413 |
| Resultado esperado | El texto se extrae correctamente en menos de 5 segundos. Si el archivo es demasiado grande para procesarse, el sistema devuelve un error 413 (Payload Too Large). |

| ID | CP-NF-02 |
| --- | --- |
| Descripción | Verificar el rendimiento de búsqueda con más de 1000 documentos |
| Actor | Usuario API |
| Precondiciones | Hay más de 1000 documentos almacenados en la base de datos. |
| Curso normal | El usuario realiza una búsqueda por palabra clave con resultados esperados en un alto volumen de datos. |
| Curso alternativo | La base de datos está sobrecargada. No se puede continuar, se excede el tiempo de espera |
| Resultado esperado | La búsqueda devuelve los resultados en menos de 2 segundos. Si hay sobrecarga, el tiempo de respuesta no debe exceder los 5 segundos. |

| ID | CP-NF-03 |
| --- | --- |
| Descripción | Verificar la disponibilidad del sistema bajo alta concurrencia |
| Actor | Usuario API |
| Precondiciones | Múltiples usuarios (más de 50) están interactuando con la API al mismo tiempo. |
| Curso normal | Los usuarios realizan varias acciones concurrentes (subir archivos, realizar búsquedas). |
| Curso alternativo | El número de usuarios activos excede los 50 simultáneamente. Se cae el sistema |
| Resultado esperado | La API responde de manera consistente, sin caídas ni tiempos de respuesta excesivos bajo alta concurrencia. |

| ID | CP-NF-04 |
| --- | --- |
| Descripción | Verificar la seguridad de acceso a la API |
| Actor | Usuario API, Administrador API |
| Precondiciones | El sistema tiene usuarios autenticados y roles definidos. |
| Curso normal | El usuario autenticado accede solo a las funcionalidades permitidas. El administrador puede acceder a todas las funcionalidades, incluidas las de eliminación. |
| Curso alternativo | Un usuario no autenticado intenta realizar acciones restringidas Se rechaza la solicitud Se muestra error 401 |
| Resultado esperado | Los usuarios autenticados solo pueden acceder a las funcionalidades permitidas según su rol. Los intentos de acceso no autorizado son rechazados con un error 401 (Unauthorized). |
