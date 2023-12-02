import { SignUp } from '@clerk/nextjs';

const { AFTER_SIGN_UP_URL, AFTER_SIGN_IN_URL } = process.env;

const Page = () => {
	return (
		<SignUp
			afterSignUpUrl={AFTER_SIGN_UP_URL}
			afterSignInUrl={AFTER_SIGN_IN_URL}
			redirectUrl={AFTER_SIGN_UP_URL}
		/>
	);
};

export default Page;
