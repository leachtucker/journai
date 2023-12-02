import { auth, currentUser } from '@clerk/nextjs';

import prisma from './db';

export const createNewUserAfterAuth = async () => {
	const user = (await currentUser())!;

	const userExistsInDb = await prisma.user.findUnique({
		where: { clerkId: user.id },
	});

	if (userExistsInDb) return;

	const email = user.emailAddresses.find(
		(email) => email.id == user.primaryEmailAddressId
	)!;

	return prisma.user.create({
		data: {
			clerkId: user.id,
			email: email.emailAddress,
			firstName: user.firstName!,
			lastName: user.lastName!,
		},
	});
};

export const getUserByClerkId = async (clerkId: string) => {
	const user = await prisma.user.findUnique({
		where: { clerkId },
	});

	return user;
};

export const getCurrentUser = async () => {
	const currAuth = auth();
	const user = await getUserByClerkId(currAuth.userId!);

	if (!user) {
		throw new Error(`No user exists for this clerkId: ${currAuth.userId}`);
	}

	return user;
};
