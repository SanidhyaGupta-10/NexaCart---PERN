import { eq } from "drizzle-orm";
import { db } from "./index";
import { 
    users, 
    comments, 
    products ,
    type NewUser,
    type NewComment,
    type NewProduct,
} from "./schema";

// User Queries

export const createUser = async (data: NewUser) => {
    const [user] = await db.insert(users).values(data).returning();
    return user;
};

export const getUserById = async (id: string) => {
    return db.query.users.findFirst({
        where: eq(users.id, id)
    });
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
    const [user] = await db.update(users).set(data)
    .where(eq(users.id, id)).returning();
    return user;
};

// upsert => create or update
export const upsertUser = async (data: NewUser) => {
    const existingUser = await getUserById(data.id);
    if (existingUser) return updateUser(data.id, data);

    return createUser(data);
};

// Product Queries
export const createProduct = async (data: NewProduct) => {
    const [product] = await db.insert(products).values(data).returning();
    return product;
};