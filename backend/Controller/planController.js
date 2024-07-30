import Plan from '../Models/Plan.js';
import bcrypt from 'bcrypt'
import expressAsyncHandler from 'express-async-handler';

export const getPlan = expressAsyncHandler(async(req , res ) =>{
    const plan_type = req.params.plan_type
    //console.log(plan_type);

    //confirm data
    if(!plan_type){
        return res.status(400).json({message:'Plan type Require'})
    }

    const plan = await Plan.find({plan_type}).lean()

    //if no user 
    if(!plan){
        return res.status(400).json({message:'No plan Found'})
    }

    res.json({plan, "message":"Plan is on Screen"})
})

export const getAllPlan = expressAsyncHandler(async (req , res)=> {
    const plans = await Plan.find().lean()

    // If no users 
    if (!plans?.length) {
        return res.status(400).json({ message: 'No plan setted yet' })
    }

    res.json(plans)
})

export const addPlan = expressAsyncHandler(async(req , res ) => {

    //read data from req body
    const {plan_type , plan_desc , plan_price} = req.body

    // const deplicate entry
    const duplicate = await Plan.findOne({plan_type}).lean().exec()
    if(duplicate){
        const updatePlan = await Plan.updateOne({plan_type},{plan_desc , plan_price})
        return res.json({message:`${plan_type} plan updated`})
    }

    // creating userObject
    const planObject = {plan_type , plan_desc , plan_price}
    
    //Create and store new user 
    const plan  = await new Plan(planObject).save()
    if(plan){
        return res.status(201).json({message:`Your ${plan_type} added`})
    } else {
        return res.status(400).json({ message: 'Invalid plan data received' })
    }
})

export const updatePlan = expressAsyncHandler(async (req, res) => {
    const {plan_type , plan_desc , plan_price } = req.body

    // Does the plan exist to update?
    const plan = await Plan.find({plan_type}).exec()
    console.log(plan);
    if (!plan) {
        return res.status(400).json({ message: 'Plan not found' })
    }

    plan.plan_type = plan_type
    plan.plan_desc = plan_desc
    plan.plan_price =plan_price

    const updatedPlan = await Plan.updateOne({plan_type} , {plan_type,plan_desc , plan_price})

    res.json({ message: `${plan_type} plan updated` })
})



export const deletePlan = expressAsyncHandler(async (req, res) => {
    const { plan_type } = req.body;

    // Confirm data
    if (!plan_type) {
        return res.status(400).json({ message: 'Plan Type Required' });
    }

    // Does the plan exist to delete?
    const plan = await Plan.findOne({ plan_type }).exec();

    if (!plan) {
        return res.status(400).json({ message: 'Plan not found' });
    }

    // Delete the plan(s)
    const result = await Plan.deleteMany({ plan_type });

    const reply = `Plan(s) with type ${plan_type} deleted`;

    res.json(reply);
});