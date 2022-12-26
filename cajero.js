var dinero = 0;
var div = 0;
var papeles = 0;
var resultado = document.getElementById("resultado");
//var resultado = document.querySelector("#resultado");

var b = document.getElementById("extraer");
b.addEventListener("click", entregarDinero);

class Billete
{
    constructor(n, v, c)
    {
        this.nombre = n;
        this.valor = v;
        this.cantidad = c;
        this.imagen = new Image();
        this.imagen.src = imagenes[this.nombre];
        this.imagen.className = "foto";
        //this.imagen.id = randomId()
    }
}

//function randomId(){

  //  return  '' + Math.random() * (100 - 1) + 1;
//}

var imagenes = [];
imagenes["100.000"] = "100.jpg";  //array asociativo
imagenes["50.000"] = "50.jpg";
imagenes["10.000"] = "10.jpg";
imagenes["5.000"] = "5.jpg";

var caja = [];
caja.push(new Billete ("100.000", 100000, 30));
caja.push(new Billete ("50.000", 50000, 25));
caja.push(new Billete ("10.000", 10000, 15));
caja.push(new Billete ("5.000", 5000, 10));



function entregarDinero()
{
    var t = document.getElementById("dinero");
    dinero = parseInt(t.value);
    var entregado = [];
   // b.onclick = function () {dinero.value = "";  };
   //$('#dinero').val('');
    
    console.log(dinero);
    console.log('caja obj antes' , caja)
    for (var bi of caja)
    {
        
        if (dinero > 0)
        {
            div = Math.floor(dinero / bi.valor); //para recorrer el array de caja en la variable valor y cantidad
            if(div > bi.cantidad)
            {
                papeles = bi.cantidad;

            }else
            {
                papeles = div;
            }
            entregado.push(new Billete(bi.nombre, bi.valor, papeles));
            dinero = dinero - (bi.valor*papeles);
   
        }

        
    }
    if(dinero>0){
        resultado.innerHTML = "Soy un cajero malo, y no puedo entregarte esa cantidad :(";
    }else{
        for (var e of entregado)
        {
            if(e.cantidad >0)
            {
                //resultado.innerHTML = resultado.innerHTML +  e.cantidad + " billete(s) de $" + e.valor + "<br />";
                

                for(var i =0; i< e.cantidad; i++)
                {
                    //resultado.appendChild(e.imagen);
                    //resultado.innerHTML = resultado.innerHTML + " ";

                    resultado.insertAdjacentElement("afterbegin", e.imagen );
                    resultado.innerHTML = resultado.innerHTML + " ";
                }

                

                var str = '<p>' +e.cantidad + ' billete(s) de $' + e.valor + '</p>';
                resultado.insertAdjacentHTML("afterbegin",str);
                
                resultado.innerHTML = resultado.innerHTML + "<br />" ;

                
                for (x=0; x<caja.length; x++){

                    if(e.nombre == caja[x].nombre){
                        caja[x].cantidad = caja[x].cantidad - e.cantidad
                        x = caja.length + 1;
                    } 
                }
            }
             
            //resultado.innerHTML = resultado.innerHTML + "Su saldo es de: "+  + "<br /> <br />"  ;
            
        }

        console.log('caja obj despues' , caja)
        
        calcularDineroCaja();
    }

    t.value = ''
    
}


function calcularDineroCaja(){

    var total = 0;

    for (var e of caja){
        total+= e.valor * e.cantidad
    }
    //resultado.innerHTML = resultado.innerHTML + "Al cajero le quedan : $" + total + "<br /> <br />";
    resultado.insertAdjacentHTML("afterbegin", "<br />Al cajero le quedan : <b>$" + total + "<b/> <br />");
    
    var momentoActual = new Date();
    var hora = momentoActual.getHours();
    var minuto = momentoActual.getMinutes();
    var segundo = momentoActual.getSeconds();
    var horaImprimible = hora + ":" + minuto + ":" + segundo;

    resultado.insertAdjacentHTML("afterbegin", "<br/><br/><b>Fecha de ultimo acceso: </b>"+ momentoActual.getDate() + "/" + (momentoActual.getMonth() +1) + "/" + momentoActual.getFullYear() +" <b>Hora:</b> "+ horaImprimible + "<br/>");
}

function playSound(event){

    if(event.key <= 9 && event.key != ' ')
    {   
        const music = new Audio('tecla.wav');
        music.play();
        console.log(event.key);

    }
    console.log("keydown event, codeValue: " + event.code);
    
    
}

/*
document.addEventListener('keydown', (event) => {
    var keyValue = event.key;
    var codeValue = event.code;
   
    console.log("keydown event, keyValue: " + keyValue);
    console.log("keydown event, codeValue: " + codeValue);
}, false);
*/


