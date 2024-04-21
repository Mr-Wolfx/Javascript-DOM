//WRAPPER
let cardWrapper = document.querySelector('#cardWrapper');

//BUTTONS
let showContactsBtn = document.querySelector('#showContactsBtn');
let addContactBtn = document.querySelector('#addContactBtn');
let removeContactBtn = document.querySelector('#removeContactBtn');
let searchContatcBtn = document.querySelector('#searchContatcBtn');

// console.log(searchContatcBtn);

//INPUTS
let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput');
// console.dir(nameInput)

let rubrica = {

    contacts : [

        {name : 'Mattia', number : 3333333333},
        {name : 'Angelo', number : 3453453456},
        {name : 'Francesco', number : 3313313312},

    ],

    showContacts : function(array){
        //svuoto il wrapper
        cardWrapper.innerHTML = ``;

        //creo un div
        //gli do le classi di una colonna
        //lo riempio con la card
        //lo appendo alla row

        array.forEach( (contact)=>{
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-lg-8',  'my-3');
            div.innerHTML = `
                <div class="card-contact bg-purple my-border rounded-4 px-5">
                    <p class="pt-3 fs-5">
                        ${contact.name}
                    </p>

                    <p class="pt-3 fs-5">
                        ${contact.number}
                    </p>

                    <i class="fa-regular fa-trash-can fa-2x icon"></i>
                
                </div>
            `

            cardWrapper.appendChild(div)
        });

        //catturo le icone nelle cards
        let icons = document.querySelectorAll('.icon')
        icons.forEach((icon, i)=>{
            icon.addEventListener('click', ()=>{
                let name = array[i].name;
                this.removeContact(name)
            })
        })
    },

    addContact : function(newName, newNum) {
        this.contacts.push(
            {name : newName, number : newNum}
        )
        this.showContacts(this.contacts);
    },

    removeContact : function(removedName){

        let names = this.contacts.map( (contact) => contact.name.toLowerCase() );
        // console.log(names);
        let index = names.indexOf(removedName.toLowerCase());

        if (index > -1) {
            this.contacts.splice(index, 1);
            this.showContacts(this.contacts);
            showContactsBtn.innerHTML="Nascondi Contatti";
        } else {
            alert('Come faccio ad eliminare un contatto che non esiste?\n GENIO')
        }
    },


    //! AGGIUNTA POSSIBILITA' DI RICERCA NELLA RUBRICA DEL NOME SIA IN MINUSCOLO CHE MAIUSCOLO (utilizzanto toUpperCase e toLowerCase)

    searchContact : function(searchedName){
        let filtered = this.contacts.filter( (contact)=> contact.name == searchedName || contact.name.toLocaleLowerCase() == searchedName || contact.name.toLocaleUpperCase() == searchedName )

        if(filtered.length > 0){
        this.showContacts(filtered);

        showContactsBtn.innerHTML="Nascondi Contatti";
        confirm = true;
        } else {
            alert(`${nameInput.value} non ti ha dato il numero GNE GNE`);
            nameInput.value = ''
        }
    }

}
// creo una variabile d'appoggio da andare a sovrascrivere quando necessario.
let confirm = false;

//Evento per mostrare i contatti al click del bottone
showContactsBtn.addEventListener( 'click', ()=>{
    
    if (confirm == false) {
        rubrica.showContacts(rubrica.contacts);
        confirm = true;
        showContactsBtn.innerHTML="Nascondi Contatti";
    } else {
        cardWrapper.innerHTML = ``;
        confirm = false;
        showContactsBtn.innerHTML="Mostra Contatti";
    }
    
} );


//Evento per aggiungere un contatto al click del bottone.

addContactBtn.addEventListener( 'click', ()=>{
    
    if(nameInput.value != '' && numberInput.value != '' && numberInput.value.length == 10){
        
        confirm = true;
        rubrica.addContact(nameInput.value, numberInput.value);
        showContactsBtn.innerHTML="Nascondi Contatti";

        //svuoto i campi input
        nameInput.value = '';
        numberInput.value = '';
    } else {
        alert('Attenzione, devi inserire un nome ed un numero valido!')
    }
    
} )


//Evento per rimuovere un contatto al click del bottone.
removeContactBtn.addEventListener( 'click', ()=>{
    confirm = true;
    rubrica.removeContact(nameInput.value);
    nameInput.value = '';
} )



//evento per cercare un contatto al click del bottone.
searchContatcBtn.addEventListener('click', ()=> {

    rubrica.searchContact(nameInput.value);
    nameInput.value = '';

})