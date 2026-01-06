import prisma from '$lib/server/prisma';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const users = await prisma.user.findMany();
	return {
		users
	};
}
