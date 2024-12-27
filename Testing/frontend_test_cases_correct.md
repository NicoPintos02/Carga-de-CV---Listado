## Casos de Prueba Funcionales y No Funcionales – CandidatesWeb

# Suite de Casos de Prueba Funcionales

| ID | CPF-01 |
| --- | --- |
| Descripción | Ver listado de candidatos en forma de tabla paginada |
| Actor | Usuario (RR.HH) |
| Precondiciones | La aplicación está abierta y conectada a la base de datos. Existen candidatos almacenados en la base de datos. |
| Curso normal | El usuario navega a la sección de listado de candidatos. La tabla muestra los candidatos paginados en forma de tabla |
| Curso alternativo | No hay candidatos en la base de datos. Termina el proceso |
| Resultado esperado | La tabla muestra correctamente los datos de los candidatos en forma paginada |

| ID | CPF-02 |
| --- | --- |
| Descripción | Mostrar los primeros N caracteres del CV en la tabla |
| Actor | Usuario (RR.HH) |
| Precondiciones | La tabla muestra un listado de candidatos. |
| Curso normal | El usuario observa que solo se muestran los primeros N caracteres del CV en la tabla. |
| Curso alternativo | Ninguno |
| Resultado esperado | La tabla muestra correctamente los primeros N caracteres del CV, según lo configurado. |

| ID | CPF-03 |
| --- | --- |
| Descripción | Click en la tarjeta para ver el CV completo |
| Actor | Usuario (RR.HH) |
| Precondiciones | La tabla muestra un listado de candidatos. |
| Curso normal | El usuario hace clic en la tarjeta del cv cargado. Se despliega el CV completo del candidato seleccionado. |
| Curso alternativo | El candidato no tiene un CV almacenado. Proceso terminado |
| Resultado esperado | El CV completo del candidato se muestra en la pantalla. |

| ID | CPF-04 |
| --- | --- |
| Descripción | Realizar búsqueda por palabras clave |
| Actor | Usuario (RR.HH) |
| Precondiciones | Existen candidatos con CVs almacenados en la base de datos. |
| Curso normal | El usuario ingresa palabras clave en el campo de búsqueda. Los resultados filtrados aparecen paginados visiblemente |
| Curso alternativo | No se encuentran candidatos que coincidan con las palabras clave. Termina el proceso |
| Resultado esperado | La tabla muestra los resultados filtrados. |

| ID | CPF-05 |
| --- | --- |
| Descripción | Resaltar coincidencias de búsqueda |
| Actor | Usuario (RR.HH) |
| Precondiciones | El usuario ha realizado una búsqueda exitosa |
| Curso normal | El usuario visualiza los resultados de búsqueda en la tabla. Las coincidencias con las palabras clave están resaltadas. |
| Curso alternativo | N/A |
| Resultado esperado | Las coincidencias de las palabras clave están resaltadas en los resultados. |

# Suite de Casos de Prueba No Funcionales
- Suposiciones: Se supone que hay datos ya cargados en la base de datos, se supone que ya hay usuarios utilizando el sistema, se supone que existen mas roles como administrador

| ID | CP-NF-01 |
| --- | --- |
| Descripción | Verificar el tiempo de carga de la página principal |
| Actor | Usuario (RR.HH) |
| Precondiciones | La aplicación está disponible y el usuario accede a la página principal. |
| Curso normal | El usuario accede a la página principal. |
| Curso alternativo | La base de datos está sobrecargada con un gran número de registros. Se termina el proceso |
| Resultado esperado | La página principal se carga en menos de 3 segundos bajo condiciones normales. En caso de una alta carga, el tiempo no debe excederse de los 5 segundos. |

| ID | CP-NF-02 |
| --- | --- |
| Descripción | Verificar el rendimiento de la búsqueda con más de 1000 candidatos |
| Actor | Usuario (RR.HH) |
| Precondiciones | Existen más de 1000 registros en la base de datos. |
| Curso normal | El usuario realiza una búsqueda usando palabras clave |
| Curso alternativo | Ninguno |
| Resultado esperado | El tiempo de respuesta para la búsqueda no debe superar los 2 segundos. |

| ID | CP-NF-03 |
| --- | --- |
| Descripción | Verificar la capacidad de respuesta de la interfaz bajo alta carga de usuarios |
| Actor | Usuario (RR.HH) |
| Precondiciones | Múltiples usuarios (más de 100) están utilizando la aplicación simultáneamente. |
| Curso normal | Los usuarios interactúan con las tarjetas Los usuarios realizan búsquedas |
| Curso alternativo | No es posible realizar búsquedas ni interactuar por sobrecarga |
| Resultado esperado | La aplicación sigue siendo usable sin ralentización perceptible. Las acciones (navegación, búsqueda, etc.) se procesan en menos de 1 segundo. |

| ID | CP-NF-04 |
| --- | --- |
| Descripción | Verificar la seguridad de los datos sensibles |
| Actor | Usuario (RR.HH), Administrador |
| Precondiciones | El sistema tiene varios usuarios con distintos niveles de acceso. |
| Curso normal | El usuario RR.HH. accede solo a los datos de los candidatos. El administrador puede ver y gestionar todos los datos del sistema. |
| Curso alternativo | Un usuario no autorizado intenta acceder a datos de candidatos. Se muestra error por falta de permisos y se bloquea |
| Resultado esperado | Los usuarios solo pueden acceder a los datos que les corresponden según su rol. Cualquier intento de acceso no autorizado es bloqueado. |
