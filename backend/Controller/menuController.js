
import Menu from '../Models/Menu.js'; 
import bcrypt from 'bcrypt'
import expressAsyncHandler from "express-async-handler";

export const getMenu = expressAsyncHandler(async(req, res) =>{
    const menu_day = req.params.menu_day
    //console.log(menu_day);
    //Confirm data
    if(!menu_day){
        return res.status(400).json({message:'Menu Day Require'})
    }

    const menu = await Menu.find({menu_day}).lean()
    //console.log(menu);
    //if no user 
    if(!menu){
        return res.status(400).json({message:'No Menu Found'})
    }

    res.json({menu, message:"Your menu on screen"})

})

export const addMenu = expressAsyncHandler(async(req, res) =>{

    // read date=s=a from req body 
    const{menu_day, menu_breakfast , menu_lunch , menu_dinner , special_menu } = req.body
    if(!menu_day){
        return res.status(400).json({Message:'Menu Day Require'})
    }

    if(menu_breakfast.length === 0 && menu_lunch.length === 0 && menu_dinner.length === 0){
        const result = await Menu.deleteOne({menu_day})
        const reply = `Menu of ${menu_day} deleted`
        return res.json({message:"Menu deleted successfully"})
    }

    //duplicate entry than update menu
    const duplicate = await Menu.findOne({menu_day}).lean().exec()
    if(duplicate){
        const updatedPlan = await Menu.updateOne({menu_day} , {menu_breakfast,menu_lunch , menu_dinner, special_menu})
        return res.json({ message: `${menu_day} plan updated` })
    }

    // creating userObject
    const menuObject = {menu_day , menu_breakfast , menu_lunch , menu_dinner , special_menu}
    
    // Create and store new user 
    const menu = await new Menu(menuObject).save()
    
    if(menu){ // created 
        return res.status(201).json({message:`Your ${menu_day} menu added` })
    }
    else {
        return res.status(400).json({ message: 'Invalid menu data received' })
    }
})

export const updateMenu = expressAsyncHandler(async (req, res) => {
    const { menu_day, menu_breakfast, menu_lunch, menu_dinner, special_menu } = req.body;

    // Does the menu exist to update
    const menu = await Menu.findOne({ menu_day }).exec();
    //console.log(menu);
    if (!menu) {
        return res.status(400).json({ message: 'Menu not found' });
    }

    const updatedMenu = await Menu.updateOne(
        { menu_day },
        { menu_breakfast, menu_lunch, menu_dinner, special_menu }
    );
    res.json({ message: `${menu_day} menu updated` });
})


export const deleteMenu = expressAsyncHandler(async (req, res) => {
    const { menu_day } = req.body;

    // Confirm data
    if (!menu_day) {
        return res.status(400).json({ message: 'Menu Day Required' });
    }

    // Does the menu exist to delete
    const menu = await Menu.findOne({ menu_day }).exec();

    if (!menu) {
        return res.status(400).json({ message: 'Menu not Found' });
    }

    const result = await Menu.deleteOne({ menu_day });

    const reply = `Menu of ${menu_day} deleted`;

    res.json({ message: reply });
});