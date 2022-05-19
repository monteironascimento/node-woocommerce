import { Router } from 'express';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { isEmpty } from '../tools/Empty';

const produtosRouter = Router();
const insertProdutoRouter = Router();
const updateProdutoRouter = Router();
const deletProdutoRouter = Router();
const produtoListAllRouter = Router();
const produtosLimparRouter = Router();
const produtoListSkuouter = Router();


const host = 'https://ofertabest.com';

produtoListAllRouter.get("/", async (req, res) => {

  try{
      
      const api = new WooCommerceRestApi({
            url: host,
            consumerKey: 'ck_5193b5cad53355a278e2b9eaf5ff15e32674dbd7',
            consumerSecret: 'cs_d066c316183d55f2ebaa0a5a80610e3c3c1d58b9',
            version: "wc/v3"
        });      
         const responseWordpress = await api.get("products");
         return res.json(responseWordpress.data);   

  }catch(error){
      console.log(error);
  } 
  console.log(`PROCESSO FINALIZADO!`);
    
  return res.status(201).json({ status: "OK"});
})


produtoListSkuouter.get("/", async (req, res) => {

  try{
      
    const api = new WooCommerceRestApi({
        url: `${req.query.url}`, //'https://ofertabest.com',
        consumerKey: `${req.query.consumerKey}`, //'ck_5193b5cad53355a278e2b9eaf5ff15e32674dbd7',
        consumerSecret: `${req.query.consumerSecret}`, //'cs_d066c316183d55f2ebaa0a5a80610e3c3c1d58b9',
            version: "wc/v3"
        });      
    const params = {
      sku: req.query.sku
    }
    const responseWordpress = await api.get(`products`, params);
    return res.json(responseWordpress.data);   

  }catch(error){
      console.log(error);
  } 
  console.log(`PROCESSO FINALIZADO!`);
    
  return res.status(201).json({ status: "OK"});
})






produtosLimparRouter.get("/", async (req, res) => {

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
        responseWordpress = await api.get("products?per_page=100");
       
        let del: any[] = [];
        for (const key in responseWordpress.data) {

          const id = responseWordpress.data[key].id;
          del.push(id);
         
        }
        const data = {
          delete: del
        }
        console.log(data)
        const ret = await api.post("products/batch", data);
        console.log(ret)

      }while(!isEmpty(responseWordpress))

  }catch(error){
   
      console.log(error);
  } 
  console.log(`PROCESSO FINALIZADO!`);
    
  return res.status(201).json({ status: "OK"});
})

produtosRouter.post("/", async (req, res) => {

    try{
        const obj = req.body;

        const api = new WooCommerceRestApi({
              url: `${req.query.url}`, //'https://ofertabest.com',
              consumerKey: `${req.query.consumerKey}`, //'ck_5193b5cad53355a278e2b9eaf5ff15e32674dbd7',
              consumerSecret: `${req.query.consumerSecret}`, //'cs_d066c316183d55f2ebaa0a5a80610e3c3c1d58b9',
              version: "wc/v3"
          });      
  
           const responseWordpress = await api.post("products/batch", obj);
           return res.status(201).json(responseWordpress.data);   

    }catch(error){
        console.log(error);
    } 
    console.log(`PROCESSO FINALIZADO!`);
      
    return res.status(201).json({ status: "OK"});
})

insertProdutoRouter.post("/", async (req, res) => {

  let erro;
  try{

    const obj = req.body;

    const api = new WooCommerceRestApi({
        url: `${req.query.url}`, 
        consumerKey: `${req.query.consumerKey}`, 
        consumerSecret: `${req.query.consumerSecret}`, 
        version: "wc/v3"
      });      
    const responseWordpress = await api.post(`products/`, obj);
    return res.status(201).json(responseWordpress.data);     

  }catch(error){
    erro = error.message;
        console.log(error);
  } 
  
  return res.status(201).json({ status: "OK", error: erro});
})

updateProdutoRouter.post("/", async (req, res) => {
  let erro;
  try{

    const obj = req.body;

    const api = new WooCommerceRestApi({
        url: `${req.query.url}`, //'https://ofertabest.com',
        consumerKey: `${req.query.consumerKey}`, //'ck_5193b5cad53355a278e2b9eaf5ff15e32674dbd7',
        consumerSecret: `${req.query.consumerSecret}`, //'cs_d066c316183d55f2ebaa0a5a80610e3c3c1d58b9',
        version: "wc/v3"
      });      
    const responseWordpress = await api.put(`products/${req.query.id}`, obj);
    return res.status(201).json(responseWordpress.data);     

  }catch(error){
    erro = error.message;
        console.log(error);
  } 
  
  return res.status(201).json({ status: "OK", error: erro});
})


deletProdutoRouter.post("/", async (req, res) => {
  let erro;
  try{

    const obj = req.body;

    const api = new WooCommerceRestApi({
        url: `${req.query.url}`, 
        consumerKey: `${req.query.consumerKey}`, 
        consumerSecret: `${req.query.consumerSecret}`, 
        version: "wc/v3"
      });      
    const responseWordpress = await api.delete(`products/${req.query.id}`, {force: true});

    return res.status(201).json(responseWordpress.data);     

  }catch(error){
    erro = error.message;
        console.log(error);
  } 
  
  return res.status(201).json({ status: "OK", error: erro});
})


export { produtosRouter , insertProdutoRouter, updateProdutoRouter, deletProdutoRouter, produtoListAllRouter, produtosLimparRouter, produtoListSkuouter};

