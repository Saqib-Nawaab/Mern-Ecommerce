import CONFIG from "../config/config.js";
import ErrorHandler from "./ErrorHandler.js";


async function validateConfig(){
   const keys=Object.keys(CONFIG);

   keys.map((env)=>{
       if(!CONFIG[env]){
           throw new ErrorHandler(`[ENV_MISSING] -> Missing ${env} in environment variables`)
       }
   })

}

export default validateConfig;