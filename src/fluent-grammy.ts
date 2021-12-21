
import { Fluent, Translator } from '@moebius/fluent';
import { TranslationContext } from '@moebius/fluent/dist/types/translator';
import { Context, Middleware, NextFunction } from 'grammy';


export interface GrammyFluentOptions {
  fluent: Fluent;
}

export interface FluentContextFlavor {
  fluent: Fluent;
  translator: Translator;
  translate: (messageId: string, context: TranslationContext) => string;
  t: (messageId: string, context: TranslationContext) => string;
}


export function useFluent(
  options: GrammyFluentOptions

): Middleware {

  const { fluent } = options;


  /**
   * Middleware function that adds fluent functionality
   * to the context object.
   */
  return async function fluentMiddleware(
    context: Context,
    next: NextFunction

  ): Promise<void> {

    const { language_code: locale } = context.from;

    const translator = fluent.getTranslator({
      locales: locale,
    });

    const translate = translator.translate
      .bind(translator)
    ;

    Object.assign(context, <FluentContextFlavor> {
      fluent,
      translator,
      translate,
      t: translate,
    });

    await next();

  }

}
