import { SetMetadata } from '@nestjs/common';

export const SKIP_AUTH_DECORATOR_KEY = 'decorator: skip_auth';

/**
 * the decorator is applied when an interface does not need authtication.
 * @returns isSkipAuth flag
 */
export const SkipAuth = () => SetMetadata(SKIP_AUTH_DECORATOR_KEY, true);
