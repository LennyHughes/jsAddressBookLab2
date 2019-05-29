class Contact {
   constructor(name,email,phone,relation){
       this.name = name;
       this.email = email;
       this.phone = phone;
       this.relation = relation;
   }
}

class AddressBook {
    constructor (){
      this.contacts = [new Contact("Einstein","ein@stein.me","299.792.4580", "Hero"),
                       new Contact("Euler","leonhard@euler.net","271.828.1828", "Hero")
                      ];
   }

   add(info){
       let contactInstance = new Contact(...info);

       this.contacts.push(contactInstance);

   }

   findEqual(name, email, phone, rel){
       for (let i = 0; i < this.contacts.length; i++){
           if (this.contacts[i]["name"] === name &&
               this.contacts[i]["email"] === email &&
               this.contacts[i]["phone"] === phone &&
               this.contacts[i]["relation"] === rel ){
               return i;
           }
       }

       return -1;
   }

   deleteAt(index){

       this.contacts.splice(index,1);
   }

   deleteByName(name){
 
       for (let i =0; i < this.contacts.length; i++){
           if (this.contacts[i]["name"] === name){
               this.contacts.splice(i,1);
           }
       }
        console.log(this.contacts);
   }

   display(){

       const footerElem = document.querySelector("#display-footer");
       
       while (footerElem.hasChildNodes()){
        footerElem.removeChild(footerElem.firstChild);
        
       }

       for (let element in this.contacts){
          let displayElem = document.createElement("div");
          displayElem.className ="display-box";
          displayElem.style.display ="flex";
          displayElem.style.flexDirection = "column";
          displayElem.style.justifyContent = "space-evenly";
    
           for (let key in this.contacts[element]){
            
            displayElem.insertAdjacentText('beforeend',key + ": " + this.contacts[element][key]);
            displayElem.insertAdjacentHTML('beforeend','<p>');
           
           }
           
           displayElem.insertAdjacentHTML('beforeend', '<i class="material-icons">delete</i>');
            
           footerElem.appendChild(displayElem);
       }
        
   }

   print(){ 

      for(let element in this.contacts){
        let contactStr = element + "." ;
          for (let key in this.contacts[element]){
        
            contactStr += " " + key.charAt(0).toUpperCase() +": " + this.contacts[element][key];    
          }
        console.log(contactStr);  
      }

   }
}


let addressBook = new AddressBook();

addressBook.display();



let addButton = document.querySelector("#add-button");


addButton.addEventListener("click",function() {
    let newContactArr = [];

    let nameField = document.querySelector("#name-field").value;
    let emailField = document.querySelector("#email-field").value;
    let phoneField = document.querySelector("#phone-field").value;
    let relationDrop = document.querySelector("#relation-dropdown").value;
    
    newContactArr.push(nameField,emailField,phoneField,relationDrop);

    addressBook.add(newContactArr);
    addressBook.display();
});


function deleteClickHandler (e) {
    if (e.target.matches('.material-icons')){
        
        let nameValueOnly = e.target.parentElement.childNodes["0"].data.replace("name: ", "");
        let emailValueOnly = e.target.parentElement.childNodes["2"].data.replace("email: ", "");
        let phoneValueOnly = e.target.parentElement.childNodes["4"].data.replace("phone: ", "");
        let relationValueOnly = e.target.parentElement.childNodes["6"].data.replace("relation: ", "");
        

        let addressIndex = addressBook.findEqual(nameValueOnly,emailValueOnly,phoneValueOnly,relationValueOnly);
        
        if (addressIndex !== -1){
            addressBook.deleteAt(addressIndex);
            addressBook.display();
        }
    }
}
let displayFooter = document.querySelector('#display-footer');

displayFooter.addEventListener('click', deleteClickHandler);


