import { SetMetadata } from '@nestjs/common';

export const SKIP_TRANSFORM_DECORATOR_KEY = 'decorator: skip_transform';

/**
 * The decorator is applied when an interface needs not transformed.
 * @returns isSkipTransform flag
 */
export const SkipTransform = () =>
  SetMetadata(SKIP_TRANSFORM_DECORATOR_KEY, true);
