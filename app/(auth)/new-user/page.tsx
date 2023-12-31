import { redirect } from 'next/navigation';

import { createNewUserAfterAuth } from '@/utils/auth';
import { sleep } from '@/utils/common';

const Page = async () => {
	await createNewUserAfterAuth();
	await sleep(5000);
	redirect('/journal');
};

export default Page;
