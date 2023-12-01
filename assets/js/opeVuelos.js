
//Se inicia el almacenamiento local del cumputador
const baseDatos=window.localStorage;

//se localiza los errores que puedan suceder en el codigo
document.addEventListener("DOMContentLoaded", function() {
    let ciudadEscogida;
    let error = document.getElementById("mensajeError");
    let botonSiguiente = document.getElementById("botonSiguiente");

    //se inicia la funcion del boton siguiente 
    botonSiguiente.addEventListener("click", function() {
         ciudadEscogida = document.getElementById("ciudadDestinos").value;

//se hace la decision de la ciudad con el toLowerCase
        if (ciudadEscogida.toLowerCase() === "selecciona") {
            error.innerHTML = "Por favor, selecciona una ciudad antes de continuar";
        } else {
            const reserva={
                ciudadEscogida:ciudadEscogida,
            }
            baseDatos.setItem("reserva", JSON.stringify(reserva));
            location.href='http://127.0.0.1:5500/indexTiquete.html';
           
           
        };
        
    });

});
document.addEventListener("DOMContentLoaded", function() {
let btncomprar=document.getElementById("btnEnviar");
const reservaJson=baseDatos.getItem("reserva");
if(reservaJson)
{
    const reserva=JSON.parse(reservaJson);
    const ciudadEscogida=reserva.ciudadEscogida;
    btncomprar.addEventListener("click", function(){
        let cantiPasajero=document.getElementById("CantidadPasajeros").value;
        let pesoMaleta=document.getElementById("pesoMaletas").value;
        let silla=document.getElementById("sillas").value;
        let error2=document.getElementById("mensajeError2");
    
    let precioCiudad;
        switch (ciudadEscogida) {
            case "bogota":
                precioCiudad = 100000;
                break;
            case "medellin":
                precioCiudad = 89000;
                break;
            case "cali":
                precioCiudad = 39000;
                break;
            case "cartagena":
                precioCiudad = 200000;
                break;
            case "barranquilla":
                precioCiudad = 120000;
                break;
            default:
                precioCiudad = 0;
    
        };
        //calculamos el peso de maletas 
        let costoMaletas = pesoMaleta > 50 ? (pesoMaleta - 50) * 15000 : 0;
     //calculamos el adicional de las sillas
     let costoSilla = 0;
     if (silla === "ejecutivo") {
         costoSilla = 20000;
     } else if (silla === "vip") {
         costoSilla = 40000;
     };
    // Calcular el costo total
    let costoTotal = cantiPasajero * precioCiudad + costoMaletas + costoSilla;
        if(silla.toLowerCase() === "selecciona")
        {
            error2.innerHTML = "Por favor, selecciona una ciudad antes de continuar";
        }else{
             // Actualizar elementos en el tiquete
             document.getElementById("ciudadEscogida").textContent = ciudadEscogida;
             document.getElementById("cantidadSillas").textContent = silla;
             document.getElementById("cantidadPersonas").textContent = cantiPasajero;
             document.getElementById("pesoMaleta").textContent = pesoMaleta;
             document.getElementById("totalViaje").textContent = costoTotal;
            const compras={
                ciudadEscogida:ciudadEscogida,
                ciudadEscogida:precioCiudad,
                cantiPasajero:cantiPasajero,
                pesoMaleta:costoMaletas,
                silla:costoSilla,
                costoTotal:costoTotal,
            };
            baseDatos.setItem("compras", JSON.stringify(compras));
        };
        });
}else 
{
    alert("La reserva no fue analizada exitosamente");

};
 });