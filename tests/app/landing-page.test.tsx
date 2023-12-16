import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import LandingPage from '../../app/page';

const CLERK_USER_FIXTURE = {
	id: 'user.id.123',
	fullName: 'John Doe',
};

vi.mock('@clerk/nextjs', () => {
	return {
		auth: async () => ({
			userId: CLERK_USER_FIXTURE.id,
		}),
		ClerkProvider: ({ children }: React.PropsWithChildren) => <>{children}</>,
		useUser: () => ({
			isSignedIn: true,
			user: CLERK_USER_FIXTURE,
		}),
	};
});

describe('Landing Page', async () => {
	describe('signed in', async () => {
		beforeEach(async () => {
			render(await LandingPage());
		});

		it('Renders our heading', async () => {
			expect(screen.getByText('Your AI-Powered Journal')).toBeInTheDocument();
		});

		it('CTA link points to the journal dashboard', async () => {
			const ctaEl = screen.getByTestId('ctaLink');
			const href = ctaEl.getAttribute('href');

			expect(href).toBe('/journal');
		});
	});
});
