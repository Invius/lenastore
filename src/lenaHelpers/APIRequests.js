import axios from "axios";
import * as routes from "../lenaHelpers/Constants.js";


export const home = () =>{
    return new Promise((resolve) =>{
        axios.get(routes.baseURL).then((response) => {
            resolve(response.data);
          }).catch((err)=>{
            resolve(err);
          });
    });
}

/**
     {
         "category": "Cat1"
      }
      {
        products
      }
    */
export const products = (category) =>{
    return new Promise((resolve) =>{
        axios.post(routes.productsByCategory, {
            category
        }).then((response) => {
            resolve(response.data.products);
          }).catch((err)=>{
            resolve(err);
          });
    });
}

/**
      {
           "id": "product1"
           "category": "Cat1"
      }
      
      {
        "productPhoto": "img 64"
       }
     */
export const photo = (id, category) =>{
    return new Promise((resolve) =>{
        axios.post(routes.photo, {
            id,
            category
        }).then((response) => {
            resolve(response.data.productPhoto);
          }).catch((err)=>{
            resolve(err);
          });
    });
}

/**
     {
    }
    
    {
        categories: []
    }
    */
export const categories = (id, category) =>{
    return new Promise((resolve) =>{
        axios.get(routes.categories).then((response) => {
            resolve(response.data.categories);
          }).catch((err)=>{
            resolve(err);
          });
    });
}



/**
    {
    "name": "",
    "phone": "",
    "address": "",
    "products": [{"id": "", "category": ""}],
    "hasToSave": true
    }

    {
      success: "", 
      id: "", 
      total: 0
      productsToRemove:[]
    }
  */
  export const newSale = (name, phone, address, products, hasToSave) =>{
    return new Promise((resolve) =>{
      axios.post(routes.newSale, {
          name,
          phone,
          address,
          products,
          hasToSave
      }).then((response) => {
          console.log(response.data);
          resolve(response.data);
        }).catch((err)=>{
          resolve(err);
        });
  });
}

/**
    {
    "id": ""
    }

    {
      success: "", 
      id: "", 
      total: 0
    }
  */
  export const showSale = (id) =>{
    return new Promise((resolve) =>{
      axios.post(routes.showSale, {
          id
      }).then((response) => {
          console.log(response.data);
          resolve(response.data);
        }).catch((err)=>{
          resolve(err);
        });
  });
}

/**
    {
    }

    {
      "id": "",
      "name": "",
      "price": 0,
      "category": "",
      "description": ""
    }
  */
  export const test = () =>{
    return new Promise((resolve) =>{
      axios.get(routes.test).then((response) => {
          console.log(response.data);
          resolve(response.data);
        }).catch((err)=>{
          resolve(err);
        });
  });
}

/**
    {
    }

    {
      "productPhoto": "img 64"
    }
  */
  export const testPhoto = () =>{
    return new Promise((resolve) =>{
      axios.get(routes.testPhoto).then((response) => {
          console.log(response.data.productPhoto);
          resolve(response.data.productPhoto);
        }).catch((err)=>{
          resolve(err);
        });
  });
}

/**
    {
      "id": "",
      "comment": ""
    }

    {
      success: "Purchase conversation updated!",
      conversations: data.messages
    }
  */
  export const comment = (id, comment) =>{
    return new Promise((resolve) =>{
      axios.post(routes.comment, {
        id,
        comment
      }).then((response) => {
          console.log(response.data);
          resolve(response.data);
        }).catch((err)=>{
          resolve(err);
        });
  });
}



export const configEnum = {
  contacts      :routes.contacts,   
  payMethods    :routes.payMethods,   
  noService     :routes.noService,   
  welcome       :routes.welcome,   
  storeName     :routes.storeName,   
  warnings      :routes.warnings,   
  delivery      :routes.delivery,    
  support       :routes.support,    
  returns       :routes.returns,    
  toPay         :routes.toPay,    
  payed         :routes.payed,    
  finalized     :routes.finalized,    
  limitProducts :routes.limitProducts,  
  facebook      :routes.facebook,    
  instagram     :routes.instagram,  
}

export const config = (route) =>{
  
  return new Promise((resolve) =>{
    console.log(configEnum[route]);
    if(configEnum[route]){
      axios.get(configEnum[route]).then((response) => {
        console.log(response.data);
        resolve(response.data);
      }).catch((err)=>{
        resolve(err);
      });
    }else{
      resolve({err: 'Route does not exists!'});
    }
  });
}