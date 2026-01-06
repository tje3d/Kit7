import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    const search = url.searchParams.get('search') || '';

    const where = search ? {
        OR: [
            { name: { contains: search } },
            { email: { contains: search } }
        ]
    } : {};

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            orderBy: { id: 'desc' },
            skip,
            take: limit
        }),
        prisma.user.count({ where })
    ]);

    return { 
        users,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const email = data.get('email')?.toString();

        if (!email) {
            return fail(400, { email, name, error: 'Email is required.' });
        }

        try {
            // Check for existing user with this email
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                return fail(400, { email, name, error: 'Email already exists.' });
            }

            await prisma.user.create({
                data: { email, name }
            });
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Could not create user.' });
        }

        return { success: true };
    },

    update: async ({ request }) => {
        const data = await request.formData();
        const id = Number(data.get('id'));
        const name = data.get('name')?.toString();
        const email = data.get('email')?.toString();

        if (!id || !email) {
            return fail(400, { email, name, error: 'ID and Email are required.' });
        }

        try {
            // Check for existing user with this email (excluding the current user)
            const existingUser = await prisma.user.findFirst({
                where: { 
                    email,
                    NOT: { id }
                }
            });

            if (existingUser) {
                return fail(400, { email, name, error: 'Email already exists.' });
            }

            await prisma.user.update({
                where: { id },
                data: { email, name }
            });
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Could not update user.' });
        }

        return { success: true };
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const id = Number(data.get('id'));

        if (!id) {
            return fail(400, { id, missing: true });
        }

        try {
            await prisma.user.delete({
                where: { id }
            });
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Could not delete user.' });
        }

        return { success: true };
    }
};
