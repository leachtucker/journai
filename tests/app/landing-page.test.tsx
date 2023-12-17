import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import LandingPage from '../../app/page';

const mocks = vi.hoisted(() => {
	return {
		auth: vi.fn(),
		ClerkProvider: vi.fn(),
		useUser: vi.fn(),
	};
});

vi.mock('@clerk/nextjs', () => {
	return mocks;
});

const CLERK_USER_FIXTURE = {
	id: 'user.id.123',
	fullName: 'John Doe',
};

const setupClerkMocks = (isSignedIn: boolean) => {
	mocks.auth.mockImplementation(async () => ({
		userId: isSignedIn ? CLERK_USER_FIXTURE.id : null,
	}));

	mocks.useUser.mockImplementation(() => ({
		isSignedIn,
		user: isSignedIn ? CLERK_USER_FIXTURE : null,
	}));

	mocks.ClerkProvider.mockImplementation(
		({ children }: React.PropsWithChildren) => <>{children}</>
	);
};

describe('Landing Page', async () => {
	describe('logged-in', async () => {
		beforeEach(async () => {
			setupClerkMocks(true);
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

	describe('logged-out', async () => {
		beforeEach(async () => {
			setupClerkMocks(false);
			render(await LandingPage());
		});

		it('CTA link points to the new user page', async () => {
			const ctaEl = screen.getByTestId('ctaLink');
			const href = ctaEl.getAttribute('href');

			expect(href).toBe('/new-user');
		});
	});
});
