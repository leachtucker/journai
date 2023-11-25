import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';

import prisma from './db';
import { sleep } from './common';

export const createNewUserAfterAuth = async () => {
	const user = (await currentUser()) as User;

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
