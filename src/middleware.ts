
import { Fluent, LocaleId, Translator } from '@moebius/fluent';
import { Context, Middleware, NextFunction } from 'grammy';

import { extendContext } from './context';
import { defaultLocaleNegotiator, LocaleNegotiator } from './locale-negotiator';


export interface GrammyFluentOptions {
  fluent: Fluent;
  defaultLocale?: LocaleId;
  localeNegotiator?: LocaleNegotiator;
}


const fallbackLocale = 'en';


export function useFluent(
  options: GrammyFluentOptions

): Middleware {

  const {
    fluent,
    defaultLocale = fallbackLocale,
    localeNegotiator = defaultLocaleNegotiator,

  } = options;


  /**
   * Middleware function that adds fluent functionality
   * to the context object.
   */
  return async function fluentMiddleware(
    context: Context,
    next: NextFunction

  ): Promise<void> {

    let locale: LocaleId;
    let translator: Translator;

    await negotiateLocale();


    await next();


    async function negotiateLocale() {

      // Determining the locale to use for translations
      locale = (
        await localeNegotiator?.(context) ||
        defaultLocale
      );

      // Getting the translator for the detected locale
      translator = fluent.getTranslator({
        locales: locale,
      });

      // Adding helpers to the bots context
      extendContext({
        context,
        fluent,
        translator,
        renegotiateLocale: negotiateLocale,
      });

    }

  }

}
