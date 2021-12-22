
import { Fluent, Translator, TranslationContext } from '@moebius/fluent';
import { Context } from 'grammy';


export interface FluentContextFlavor {
  fluent: Fluent;
  translator: Translator;
  translate: (messageId: string, context?: TranslationContext) => string;
  t: (messageId: string, context?: TranslationContext) => string;
}


/**
 * Extends the specified context with helpers in-place.
 */
export function extendContext(options: {
  context: Context;
  fluent: Fluent;
  translator: Translator;

}): void {

  const { context, fluent, translator } = options;

  const translate = translator.translate
    .bind(translator)
  ;

  Object.assign(context, <FluentContextFlavor> {
    fluent,
    translator,
    translate,
    t: translate,
  });

}
