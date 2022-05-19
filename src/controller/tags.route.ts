import { Router } from 'express';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const tagsRouter = Router();

tagsRouter.get("/", async (req, res) => {

    try{
       
        const obj = req.body;

        const api = new WooCommerceRestApi({
                  url: `${req.query.url}`, //'https://ofertabest.com',
                  consumerKey: `${req.query.consumerKey}`, //'ck_5193b5cad53355a278e2b9eaf5ff15e32674dbd7',
                  consumerSecret: `${req.query.consumerSecret}`, //'cs_d066c316183d55f2ebaa0a5a80610e3c3c1d58b9',
                  version: "wc/v3"
        });      
      
        const responseWordpress = await api.post("products/tags/batch", obj);
        return res.status(201).json(responseWordpress.data);   

    }catch(error){
        console.log(error);
    } 
    console.log(`PROCESSO FINALIZADO!`);
      
    return res.status(201).json({ status: "OK"});
})


export { tagsRouter };


var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    if (obj == null) return true;

    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}



/*
const data = {
            create: [
              {
                name: "Albums"
              },
              {
                name: "Clothing"
              }
            ],
            update: [
              {
                id: 10,
                description: "Nice hoodies"
              }
            ],
            delete: [
              11,
              12
            ]
          };
*/          
