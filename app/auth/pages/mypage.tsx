import { useRouter,BlitzPage,Routes } from "blitz";
import Layout from "app/core/layouts/Layout";

const mypage :  BlitzPage= () =>{

     const router=useRouter()

     return(
         <div>
             This Is My Page
         </div>
     )
 
}
export default mypage;
