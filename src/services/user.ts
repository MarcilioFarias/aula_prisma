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

export const findEmail = async (email: string) => {
    return await prisma.user.findMany({
        //criar metodo para fazer filtro por nome ou email
        where: {
            email: {
                endsWith: email
            }            
        },
        select: {
            id: true,
            name: true,
            email: true,
            updatedAt: true,
            createdAt: true
        }
    });
}

export const findUserPost = async (title: string) => {
    return await prisma.user.findMany({
        //criar metodo para fazer filtro por nome ou email
        where: {
            Post: {
                some: {
                    title: {
                        startsWith: title,
                        mode: 'insensitive'
                    }
                }
            }            
        },
        select: {
            id: true,
            name: true,
            email: true,
            updatedAt: true,
            createdAt: true
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

