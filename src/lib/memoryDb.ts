import { randomUUID } from "crypto";

// In-memory mock store replacing Prisma/MongoDB.
// NOTE: on a serverless host (Vercel) this does NOT persist across
// invocations or cold starts, and is not shared between API routes.
// It exists to unblock builds and local/demo usage.

export type Post = {
	id: string;
	title: string;
	content: string;
	image: string;
	ownerName: string;
	ownerPicture: string;
	tags: string[];
};

type PostCreateArgs = { data: Omit<Post, "id"> };
type PostUpdateArgs = { where: { id: string }; data: Partial<Omit<Post, "id">> };
type PostDeleteArgs = { where: { id: string } };

// Persist the store on globalThis so it survives module reloads (HMR in dev)
// within a single process instance.
const globalForDb = globalThis as unknown as { __postsStore?: Post[] };

const store: Post[] = globalForDb.__postsStore ?? (globalForDb.__postsStore = []);

export const db = {
	post: {
		async findMany(): Promise<Post[]> {
			return [...store];
		},

		async create({ data }: PostCreateArgs): Promise<Post> {
			const post: Post = { id: randomUUID(), ...data };
			store.push(post);
			return post;
		},

		async update({ where, data }: PostUpdateArgs): Promise<Post> {
			const index = store.findIndex((p) => p.id === where.id);
			if (index === -1) {
				throw new Error(`Post with id ${where.id} not found`);
			}
			store[index] = { ...store[index], ...data };
			return store[index];
		},

		async delete({ where }: PostDeleteArgs): Promise<Post> {
			const index = store.findIndex((p) => p.id === where.id);
			if (index === -1) {
				throw new Error(`Post with id ${where.id} not found`);
			}
			const [removed] = store.splice(index, 1);
			return removed;
		},
	},
};
