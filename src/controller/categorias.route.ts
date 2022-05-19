import { Router } from 'express';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { isEmpty } from '../tools/Empty';

const categoriasRouter = Router();
const insertCategoriaRouter = Router();
const updateCategoriaRouter = Router();
const deletCategoriaRouter = Router();
const categoriasLimparRouter = Router();
const findCategoriaDescricao = Router();



categoriasRouter.post("/", async (req, res) => {

    try{

        const obj = req.body;

        const api = new WooCommerceRestApi({
            url: `${req.query.url}`, 
            consumerKey: `${req.query.consumerKey}`, 
            consumerSecret: `${req.query.consumerSecret}`, 
            version: "wc/v3"
          });      

        const responseWordpress = await api.post("products/categories/batch", obj);
        return res.status(201).json(responseWordpress.data);     

    }catch(error){
     
        console.log(error);
    } 
    console.log(`PROCESSO FINALIZADO!`);
      
    return res.status(201).json({ status: "OK"});
})

categoriasLimparRouter.get("/", async (req, res) => {

  try{

    if(process.env.NODE_ENV === 'production'){
      return res.status(201).json({ status: "OK"});
    }

      const api = new WooCommerceRestApi({
          url: 'https://ofertabest.com',
          consumerKey : 'ck_7a7ec430f64531a2eee616f01ae2c86d3df6c3f3',
          consumerSecret: 'cs_33f86464c511a1875325d4e91fefcc3cb29c3e20',
          version: "wc/v3"
        });    

      let responseWordpress ;
        
      do{
        responseWordpress = await api.get("products/categories?per_page=100");
       
        let del: any[] = [];
        for (const key in responseWordpress.data) {

          const id = responseWordpress.data[key].id;
          del.push(id);
         
        }
        const data = {
          delete: del
        }
        console.log(data)
        const ret = await api.post("products/categories/batch", data);
        console.log(ret)

      }while(!isEmpty(responseWordpress))

  }catch(error){
   
      console.log(error);
  } 
  console.log(`PROCESSO FINALIZADO!`);
    
  return res.status(201).json({ status: "OK"});
})

findCategoriaDescricao.get("/", async (req, res) => {

  try{

      const api = new WooCommerceRestApi({
        url: `${req.query.url}`, 
        consumerKey: `${req.query.consumerKey}`, 
        consumerSecret: `${req.query.consumerSecret}`,
        });    
       
      
      //const url = `products/categories`
      let responseWordpress; 

      const retornoData: any[] = [];
      let page = 0;
      do{
        page++
        const url = `products/categories?search=${req.query.categoriaDescricao}&page=${page}&per_page=100`
        responseWordpress = await api.get(url);
        for (const key in responseWordpress.data) {
          retornoData.push(responseWordpress.data[key])
        }
        
      }while(!isEmpty(responseWordpress.data))

      
      return res.status(201).json(retornoData);
      
  }catch(error){
   
      console.log(error);
  } 
  console.log(`PROCESSO FINALIZADO!`);
    
  return res.status(201).json({ status: "OK"});
})


insertCategoriaRouter.post("/", async (req, res) => {

  try{

    const obj = req.body;

    const api = new WooCommerceRestApi({
        url: `${req.query.url}`, 
        consumerKey: `${req.query.consumerKey}`, 
        consumerSecret: `${req.query.consumerSecret}`, 
        version: "wc/v3"
      });      
    const responseWordpress = await api.post(`products/categories/`, obj);
    return res.status(201).json(responseWordpress.data);     

  }catch(error){
    
        console.log(error);
  } 

  
  return res.status(201).json({ status: "OK"});
})

updateCategoriaRouter.post("/", async (req, res) => {

  try{

    const obj = req.body;

    const api = new WooCommerceRestApi({
        url: `${req.query.url}`, //'https://ofertabest.com',
        consumerKey: `${req.query.consumerKey}`, //'ck_5193b5cad53355a278e2b9eaf5ff15e32674dbd7',
        consumerSecret: `${req.query.consumerSecret}`, //'cs_d066c316183d55f2ebaa0a5a80610e3c3c1d58b9',
        version: "wc/v3"
      });      
    const responseWordpress = await api.put(`products/categories/${req.query.id}`, obj);
    return res.status(201).json(responseWordpress.data);     

  }catch(error){
        console.log(error);
  } 
  return res.status(201).json({ status: "OK"});
})


deletCategoriaRouter.post("/", async (req, res) => {

  try{

    const obj = req.body;

    const api = new WooCommerceRestApi({
        url: `${req.query.url}`, 
        consumerKey: `${req.query.consumerKey}`, 
        consumerSecret: `${req.query.consumerSecret}`, 
        version: "wc/v3"
      });      
    const responseWordpress = await api.delete(`products/categories/${req.query.id}`, {force: true});

    return res.status(201).json(responseWordpress.data);     

  }catch(error){
        console.log(error);
  } 
    
  return res.status(201).json({ status: "OK"});
})



export { categoriasRouter, insertCategoriaRouter, updateCategoriaRouter, deletCategoriaRouter, categoriasLimparRouter, findCategoriaDescricao };

