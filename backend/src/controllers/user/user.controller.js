
import prisma from '../../utiles/prisma/prisma.js';

export class UserController {
    infouser = async(req,res,next)=>{
       try {
        const user = await prisma.Members.findFirst({
            where : {id : res.locals.user},
            select :{
                id : true,
                nickname : true,
                money: true
            }

        })
        const Restaurants = await prisma.Restaurants.findMany({
            where : { memberId : res.locals.user},
            select :{
                id : true,
                name : true,
                description : true,
                image : true,
                
            }
        })
        console.log(user , Restaurants)
        return res.status(200).json({user: user , Restaurants : Restaurants})

       }
       catch(err){
        return res.status(500).json({
            success: false,
            message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
          });

       }
       
      

    }
}
