import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        userEmail,
      } = req.body.data;
    
      console.log(req.body.data)
      try{
        const residency = await prisma.residency.create({
            data: {
                title,
                description,
                price,
                address,
                country,
                city,
                facilities,
                image,
                owner: { connect: { email: userEmail } },
              },
        });
        res.json({ message: "Residency created successfully", residency });
      }catch(err) {
        if(err.code === "p2002")
        {
            throw new Error("A residency with address already there");
        }
        throw new Error(err.message);
      }
});


// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(residencies);
  });

  
// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const residency = await prisma.residency.findUnique({
        where: { id },
      });
      res.send(residency);
    } catch (err) {
      throw new Error(err.message);
    }
  });


// function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
        select: { bookedVisits: true },
      });
  
      const index = user.bookedVisits.findIndex((visit) => visit.id === id);
  
      if (index === -1) {
        res.status(404).json({ message: "Booking not found" });
      } else {
        user.bookedVisits.splice(index, 1);
        await prisma.user.update({
          where: { email },
          data: {
            bookedVisits: user.bookedVisits,
          },
        });
  
        res.send("Booking cancelled successfully");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });
  

