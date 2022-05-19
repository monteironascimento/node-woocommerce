import { Router } from 'express';
import axios from 'axios';
import { connectToJwt } from 'wordpress-jwt-auth';
const imagensLimparRouter = Router();

imagensLimparRouter.get("/", async (req, res) => {

    try{
  
      if(process.env.NODE_ENV === 'production'){
        return res.status(201).json({ status: "OK"});
      }
  
        let responseWordpress ;
          
          responseWordpress = await axios.get("https://ofertabest.com/wp-json/wp/v2/media");
            for (const key in responseWordpress.data) {


                    const WP_URL = 'https://ofertabest.com';
                   
                     
                    const { generateToken } = await connectToJwt(WP_URL);
                    const { token } = await generateToken('monteiro', 'Monteiro01*');
                    console.log(token);
                    const authHeader = { headers: { Authorization: `bearer ${token}` } };
                     
                    axios.delete(`${WP_URL}/wp-json/wp/v2/media/${responseWordpress.data[key].id}`, authHeader);
             
            }
  
    }catch(error){
     
        console.log(error);
    } 
    console.log(`PROCESSO FINALIZADO!`);
      
    return res.status(201).json({ status: "OK"});
  })

  export { imagensLimparRouter };

