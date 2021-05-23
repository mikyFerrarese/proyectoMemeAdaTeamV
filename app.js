// guardamos document.getElementById en const $ 
// es una arrow function que recibe un parametro, el ID del elemento 
// que queremos seleccionar.
// cada vez que veamos $("una_id") equivale a document.getElementById

// ahorrar repetir escribir lo mismo mil veces
// reutilizar codigo una funcion

const $ = (id) => document.getElementById(id);
const $class = (id) => document.getElementsByClassName(id);

// DESCARGAR MEME

const inicializarMeme = () => {

  const contenedorMeme = $('canvas-imagen'); // guardamos en una una const una referencia a el div que tiene la "imagen"
  const botonDescarga = $('descargar-meme'); // guardar una referencia al boton en una const

  botonDescarga.addEventListener('click', () =>{
    debugger;
    //toblob recibe el elemento del DOM que va transformarse en imagen en este caso es el div #canvas-imagen que le ponemos de nombre contendorMeme 
    domtoimage.toBlob(contenedorMeme) 
    .then(function (blob) {
      // genera la ventana para descargar, esta funcion recibe el blob -la imagen generada- y el 2ndo parametro es el nombre del archivo.
        window.saveAs(blob, 'memeimg.png');
    });

  })
}

const cambiarModoOscuro = () => {
  document.body.classList.remove('modo-claro')
  document.body.classList.add('modo-oscuro')
}

const cambiarModoClaro = () => {
  document.body.classList.remove('modo-oscuro')
  document.body.classList.add('modo-claro')
}


// 1. en esta app una parte de codigo donde se configuran y vinculan HTML con eventos (inicializan)

// en los inicializadores (1) se usa el metodo eventListener que recibe dos parametros, 
// el tipo de evento(click, input, cambio) y la funcion que se va a ejecutar cuando ocurra
// el evento (2)

// 2. y luego donde estan las funciones que se disparan en cada caso, la mismas actualizan el DOM y reflejan
// los cambios que se hicieron en la interfaz.

/**
 * Imagen
 */

// esta funcion fue triggereada por el eventListener 

const cargarImagenMeme = (e) => {
  // si la url que se pega en el field es mas larg que 5 se habilita el boton
  if (e.target.value.length > 5) {
    $('descargar-meme').classList.remove('disabled-button');
    $('imagen-de-meme').style.backgroundImage = `url('${e.target.value}')`
  }
}


// esta funcion recibe el evento (e) y del mismo saca el valor del div objetivo (target)
// ese valor es la seleccion del color picker (selector de colores)
const actualizarColorMix = (e) => {
  // actualizar el valor en la interfaz
  $('blend-color').innerText = e.target.value.toUpperCase()
  $('imagen-de-meme').style.backgroundColor = e.target.value
}

const actualizarTipoMezcla = (e) => {
  $('imagen-de-meme').style.backgroundBlendMode = e.target.value
}

const actualizarFiltro = () => {
  const brightness = $('brightness-control').value
  const opacity = $('opacity-control').value
  const blur = $('blur-control').value
  const contrast = $('contrast-control').value
  const grayscale = $('grayscale-control').value
  const hue = $('hue-control').value
  const sepia = $('sepia-control').value
  const saturate = $('saturate-control').value
  const invert = $('invert-control').value

  $(
    'imagen-de-meme'
  ).style.filter = `brightness(${brightness}) opacity(${opacity}) blur(${blur}px) contrast(${contrast}%) grayscale(${grayscale}%) hue-rotate(${hue}deg) sepia(${sepia}%) saturate(${saturate}%) invert(${invert})`
}

const resetearrFiltro = () => {
  $('brightness-control').value = 1
  $('opacity-control').value = 1
  $('blur-control').value = 0
  $('contrast-control').value = 100
  $('grayscale-control').value = 0
  $('hue-control').value = 0
  $('sepia-control').value = 0
  $('saturate-control').value = 100
  $('invert-control').value = 0

  actualizarFiltro()
}

const ajustarTamanoImagen = () => {
  $('canvas-imagen').style.height = `${
    $('canvas-imagen').getBoundingClientRect().width
  }px`
}

/**
 * Texto
 */

const actualizarTxt = () => {
  $('texto-superior').innerText = $('texto-superior-input').value
  $('bottom-text').innerText = $('bottom-text-input').value
}

const swichearTxt = () => {
  if ($('no-texto-superior-checkbox').checked) {
    $('texto-superior').classList.add('oculto')
  } else {
    $('texto-superior').classList.remove('oculto')
  }

  if ($('no-bottom-text-checkbox').checked) {
    $('bottom-text').classList.add('oculto')
  } else {
    $('bottom-text').classList.remove('oculto')
  }
}

const alinearTexto = (alineacion) => {
  $('texto-superior').style.textAlign = alineacion
  $('bottom-text').style.textAlign = alineacion
}

const actualizarTamanioTexto = () => {
  const tamanio = $('text-size-input').value

  $('texto-superior').style.fontSize = `${tamanio}px`
  $('bottom-text').style.fontSize = `${tamanio}px`
}

const actualizarFuente = () => {
  const fuente = $('text-font-select').value
  $('texto-superior').style.fontFamily = fuente
  $('bottom-text').style.fontFamily = fuente
}

const actualizarColorTexto = () => {
  const color = $('text-color-input').value.toUpperCase()

  $('text-color').innerText = color
  $('texto-superior').style.color = color
  $('bottom-text').style.color = color
}

const actualizarFondoTexto = () => {
  if (!$('text-no-background-checkbox').checked) {
    const color = $('text-background-color-input').value

    $('text-background-color').innerText = color.toUpperCase()
    $('texto-superior').style.backgroundColor = color
    $('bottom-text').style.backgroundColor = color
  } else {
    $('texto-superior').style.backgroundColor = 'transparent'
    $('bottom-text').style.backgroundColor = 'transparent'
  }
}

const actualizarPosicionTexto = () => {
  if ($('text-no-background-checkbox').checked) {
    $('texto-superior').style.position = 'absolute'
    $('bottom-text').style.position = 'absolute'
  } else {
    $('texto-superior').style.position = 'static'
    $('bottom-text').style.position = 'static'
  }
}

const actualizarContorno = (contorno) => {
  const grosor = '2px'

  if (contorno === 'ninguno') {
    $('texto-superior').style.textShadow = 'none'
    $('bottom-text').style.textShadow = 'none'
  } else if (contorno === 'claro') {
    $(
      'texto-superior'
    ).style.textShadow = `${grosor} ${grosor} #FFF, -${grosor} ${grosor} #FFF, ${grosor} -${grosor} #FFF, -${grosor} -${grosor} #FFF`
    $(
      'bottom-text'
    ).style.textShadow = `${grosor} ${grosor} #FFF, -${grosor} ${grosor} #FFF, ${grosor} -${grosor} #FFF, -${grosor} -${grosor} #FFF`
  } else if (contorno === 'oscuro') {
    $(
      'texto-superior'
    ).style.textShadow = `${grosor} ${grosor} #000, -${grosor} ${grosor} #000, ${grosor} -${grosor} #000, -${grosor} -${grosor} #000`
    $(
      'bottom-text'
    ).style.textShadow = `${grosor} ${grosor} #000, -${grosor} ${grosor} #000, ${grosor} -${grosor} #000, -${grosor} -${grosor} #000`
  }
}

const actualizarEspaciado = () => {
  const paddingY = $('padding-input').value
  $('texto-superior').style.padding = `${paddingY}px 50px`
  $('bottom-text').style.padding = `${paddingY}px 50px`
}

const actualizarInterlineado = () => {
  const lineHeight = $('line-height-input').value
  $('texto-superior').style.lineHeight = lineHeight
  $('bottom-text').style.lineHeight = lineHeight
}

const ajustarTexto = () => {
  if (window.innerWidth > 1100) {
    return
  }

  const tamanioTexto = Math.round((window.innerWidth / 10) * 0.5)
  const padding = Math.round((window.innerWidth / 10) * 0.2)

  $('text-size-input').value = tamanioTexto
  $('padding-input').value = padding

  actualizarEspaciado()
  actualizarTamanioTexto()
}
/**
 * Galeria
 */
 const ocultarGaleria = () => {
    $('meme-gallery').classList.add('oculto')
  }
  const mostrarGaleria = () => {
    $('meme-gallery').classList.remove('oculto')
  }


/**
 * Paneles
 */

const ocultarPanel = () => {
  $('panel').classList.add('oculto')
}

const mostrarPanel = () => {
  $('panel').classList.remove('oculto')
}

const mostrarPanelImagen = () => {
  $(`panel-text`).classList.add('oculto')
  $(`panel-img`).classList.remove('oculto')
}

const mostrarPanelTexto = () => {
  $(`panel-img`).classList.add('oculto')
  $(`panel-text`).classList.remove('oculto')
}


/** #################################################
 * Inicializaciones de eventListeners. 
 * ##################################################
 */
 const inicializarGallery = () => {

    $('mostrar-galeria').addEventListener('click', () => {
      mostrarGaleria()
    })
    $('close-gallery').addEventListener('click', () => {
      ocultarGaleria()
    })
  
}

const inicializarTemas = () => {
  $('modo-oscuro-button').addEventListener('click', cambiarModoClaro)
  $('modo-claro-button').addEventListener('click', cambiarModoOscuro)
}

const inicializarPaneles = () => {
  $('panel-img-button').addEventListener('click', () => {
    mostrarPanelImagen()
    mostrarPanel()
  })
  $('text-panel-button').addEventListener('click', () => {
    mostrarPanelTexto()
    mostrarPanel()
  })
  $('panel-close-button').addEventListener('click', ocultarPanel)
}


const inicializarImagen = () => {
  $('url-img-input').addEventListener('input', cargarImagenMeme)

  $('blend-color-input').addEventListener('input', actualizarColorMix)
  $('blend-mode-select').addEventListener('change', actualizarTipoMezcla)

  $('brightness-control').addEventListener('change', actualizarFiltro)
  $('opacity-control').addEventListener('change', actualizarFiltro)
  $('blur-control').addEventListener('change', actualizarFiltro)
  $('contrast-control').addEventListener('change', actualizarFiltro)
  $('grayscale-control').addEventListener('change', actualizarFiltro)
  $('hue-control').addEventListener('change', actualizarFiltro)
  $('sepia-control').addEventListener('change', actualizarFiltro)
  $('saturate-control').addEventListener('change', actualizarFiltro)
  $('invert-control').addEventListener('change', actualizarFiltro)

  $('default-filters-button').addEventListener('click', resetearrFiltro)

  window.addEventListener('resize', ajustarTamanoImagen)
}

const inicializarTexto = () => {
  $('texto-superior-input').addEventListener('input', actualizarTxt)
  $('bottom-text-input').addEventListener('input', actualizarTxt)

  $('no-texto-superior-checkbox').addEventListener('change', swichearTxt)
  $('no-bottom-text-checkbox').addEventListener('change', swichearTxt)

  $('text-font-select').addEventListener('change', actualizarFuente)
  $('text-size-input').addEventListener('input', actualizarTamanioTexto)
  $('text-left-align-button').addEventListener('click', () =>
    alinearTexto('left')
  )
  $('text-center-align-button').addEventListener('click', () =>
    alinearTexto('center')
  )
  $('text-right-align-button').addEventListener('click', () =>
    alinearTexto('right')
  )

  $('text-color-input').addEventListener('input', actualizarColorTexto)
  $('text-background-color-input').addEventListener(
    'input',
    actualizarFondoTexto
  )
  $('text-no-background-checkbox').addEventListener('change', () => {
    actualizarFondoTexto()
    actualizarPosicionTexto()
  })

  $('no-outline-button').addEventListener('click', () => {
    actualizarContorno('ninguno')
  })

  $('light-outline-button').addEventListener('click', () => {
    actualizarContorno('claro')
  })

  $('dark-outline-button').addEventListener('click', () => {
    actualizarContorno('oscuro')
  })

  $('padding-input').addEventListener('input', actualizarEspaciado)

  $('line-height-input').addEventListener('change', actualizarInterlineado)

  window.addEventListener('resize', ajustarTexto)
}

const inicializarValoresDefault = () => {
  ajustarTamanoImagen()
  actualizarFuente()
  actualizarColorTexto()
  actualizarFondoTexto()
  actualizarPosicionTexto()
  ajustarTexto()
}

const inicializar = () => {
  inicializarTemas()
  inicializarMeme()
  inicializarPaneles()
  inicializarImagen()
  inicializarTexto()
  inicializarValoresDefault()
  inicializarGallery()
}



window.onload = inicializar


document.addEventListener("DOMContentLoaded", function() {
  let imageItems = document.querySelectorAll('.gallery-image');
  console.log(imageItems);
  imageItems.forEach(item => {
    item.addEventListener('click', evento => {
      // agarro del evento click el target y su propiedad src -la url de la imagen-
      let elemento = $('url-img-input')
      elemento.setAttribute("value",evento.target.src);
      $('imagen-de-meme').style.backgroundImage = `url('${evento.target.src}')`
      ocultarGaleria()
    })
  })
});

