const form = document.querySelector('#formProductos');
const inputTitle = document.querySelector('#title');
const inputPrice = document.querySelector('#price');
const divProductos = document.querySelector('#productos');

const chatForm = document.getElementById("chatForm");
const inputEmail = document.getElementById("email");
const messaggesDiv = document.getElementById("chat");
const inputMessage = document.getElementById("message");


const socket = io();

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(inputTitle.value && inputPrice.value){
        const nuevoProducto = {
            title: inputTitle.value,
            price: inputPrice.value,
        }
        socket.emit('Cliente:nuevoProducto', nuevoProducto) 
        inputTitle.value = '';
        inputPrice.value= '';
    }
})
socket.on('Server:TodosLosProductos', async  (data)=>{
    const products = await data;
     console.log(products)
     divProductos.innerHTML = '';
     products.forEach(function(product){
         divProductos.innerHTML += `
             <div class="card m-2 tarjeta">
               <div class="row g-0">
               <div class="col-md-5">
               </div>
               <div class="col-md-7">
                 <div class="card-body">
                 <h5 class="card-title">${product.title}</h5>
                 <p class="card-text">Precio $${product.price}</p>
                 </div>
               </div>
               </div>
             </div>
         `
        });
    })

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
      
        let message = {
          email: inputEmail.value,
          message: inputMessage.value,
        };
      
        //Emit message to the server
        socket.emit("sendMesssage", message);
      
        inputEmail.value = "";
        inputMessage.value = "";
      });
      
      socket.on("lastMessage", (lastMessage) => {
        AddNewMessage(lastMessage);
      });
      
      function AddNewMessage(lastMessage) {
        const pEmail = document.createElement("p");
        const pTime = document.createElement("p");
        const pMessage = document.createElement("p");
        const finalMessage = document.createElement("p");
      
        pEmail.classList.add("emailAzulNegrita");
        pTime.classList.add("horaRojo");
        pMessage.classList.add("mensajeVerdeCursiva");
      
        pEmail.innerText = lastMessage.email;
        pTime.innerText = `[${lastMessage.time}]:`;
        pMessage.innerText = `${lastMessage.message}`;
      
        finalMessage.appendChild(pEmail);
        finalMessage.appendChild(pTime);
        finalMessage.appendChild(pMessage);
      
        finalMessage.classList.add("mensajeFinal");
      
        messaggesDiv.appendChild(finalMessage);
    }