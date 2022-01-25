
import { LocaleId } from '@moebius/fluent';
import { Context } from 'grammy';


export type LocaleNegotiator<
  ContextType extends Context = Context

> = (context: ContextType) => (
  | LocaleId
  | undefined
  | PromiseLike<LocaleId | undefined>
);


/**
 * Default implementation of locale negotiator
 * that returns locale specified in users Telegram settings.
 */
export const defaultLocaleNegotiator: LocaleNegotiator = (
  context => context.from?.language_code
);
