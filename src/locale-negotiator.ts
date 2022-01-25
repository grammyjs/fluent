
import { LocaleId } from '@moebius/fluent';
import { Context } from 'grammy';


export type LocaleNegotiator<
  ContextType extends Context = Context

> = (context: ContextType) => (LocaleId | PromiseLike<LocaleId>);


/**
 * Default implementation of locale negotiator
 * that returns locale specified in users Telegram settings.
 */
export function defaultLocaleNegotiator(context: Context) {
  return context.from?.language_code;
}
