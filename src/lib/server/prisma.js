import { DATABASE_URL } from '$env/static/private';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { dev } from '$app/environment';

/** @type {PrismaClient} */
let prisma;

if (!dev) {
	const pool = new pg.Pool({ connectionString: DATABASE_URL });
	const adapter = new PrismaPg(pool);
	prisma = new PrismaClient({ adapter });
} else {
	if (!globalThis.__prisma) {
		const pool = new pg.Pool({ connectionString: DATABASE_URL });
		const adapter = new PrismaPg(pool);
		globalThis.__prisma = new PrismaClient({ adapter });
	}
	prisma = globalThis.__prisma;
}

export default prisma;
