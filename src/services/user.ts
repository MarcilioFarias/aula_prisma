import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        return await prisma.user.create({
            data
        });
    } catch(error){
        return false;
    }
};

export const createUsers = async (data: Prisma.UserCreateInput[]) =>{
    try {
        return await prisma.user.createMany({data, skipDuplicates: true})
    } catch(error){
        return false;
    }
}

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    });
}

export const getUserByEmail = async (email: string) => {
    try{
        return await prisma.user.findUnique({
            where: {email}
        });
    } catch(error){
        return false;
    }
}

