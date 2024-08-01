import User from "../Models/User.js";
import bcrypt from 'bcrypt'
import expressAsyncHandler from "express-async-handler";
import Inventory from "../Models/Inventory.js";

export const getAllUser = expressAsyncHandler(async(req , res) => {

    const users = await User.find({} , {password:0 , cpassword:0}).lean()

    //If no users
    if(!users?.length){
        return res.status(400).json({message:'No users found'})

    }
    res.json(users)
})

export const getStore = expressAsyncHandler(async(req , res) =>{
    const storeType = req.params.storeType

    if(!storeType){
        return res.status(400).json({message:'Store Type Required'})

    }
    const store = await Inventory.find({storeType}).lean()

    //if no user 
    if(!store){
        return res.status(400).json({message:'No user Found'})

    }

    res.json(store)
})

export const getInventory = expressAsyncHandler(async(req , res) =>{
    const inventoryId = req.params.inventoryId
    if(!inventoryId){
        return res.status(400).json({message:'User ID Required'})
    }

    const inventory = await Inventory.findOne({inventoryId}).lean()

    //If no user 
    if(!inventory){
        return res.status(400).json({message:'No user Found'})
    }

    res.json(inventory)

})



export const addInventory = expressAsyncHandler(async(req , res) =>{
    const {name , storeType , qty , single_price} = req.body

    //Create userObject
    const inventoryObject = {name , storeType , qty , single_price}

    // Create and store new user 
    const inventory = await new Inventory(inventoryObject).save()
    
    if(inventory){ // created 
        return res.status(201).json({message:`New inventory added in ${storeType}`})
    }else{
        return res.status(400).json({message:`Invalid inventory data recived`})
    }
})

export const updateInventory = expressAsyncHandler(async(req , res) => {
    var {name , storeType , qty , usedqty , single_price } = req.body
    const inventoryId = req.params.inventoryId;
    //console,log(inventoryId);
    //creating userObject

    const inventory = await Inventory.findOne({inventoryId})
    //console.log(inventory);
    if(!inventory){
        return res.status(400).json({message:'No inventory Found'})
    }

    const sub_totle = qty* single_price
    usedqty = inventory.usedqty + usedqty
    const remainqty = qty - usedqty

    const inventoryObject = {name , storeType , qty , usedqty , remainqty , single_price , sub_totle}

    //Create and Store new user 
    const inventoryUpdate = await Inventory.updateOne({inventoryId},inventoryObject)
    
    if(inventoryUpdate){
        return res.status(201).json({message:'Inventory Updated'})
    }else{
        return res.status(400).json({message:'Invalid Inventory data recived'})
    }
  
})

export const deleteInventory = expressAsyncHandler(async(req , res) =>{
    const inventoryId = req.params.inventoryId;
    console.log(inventoryId);
    //creating userObject

    const inventory = await Inventory.findOne({inventoryId})
    //console.log(inventory);
    if(!inventory){
        return res.status(400),json({message:'No inventory Found'})
    }

    //Create and store new user
    const inventoryDelete = await Inventory.deleteOne({inventoryId})

    if(inventoryDelete){ // creayed 
        return res.status(201).json({message:'Inventory Deleted'})
    }else{
        return res.status(400).json({message:'Invalid inventory Data recived'})
    }
})
