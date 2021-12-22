
import { Fluent, Translator, TranslationContext } from '@moebius/fluent';
import { Context } from 'grammy';


export interface FluentContextFlavor {
  fluent: {
    instance: Fluent;
    translator: Translator;
    renegotiateLocale: () => Promise<void>;
  };
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
  renegotiateLocale: () => Promise<void>;

}): void {

  const {
    context,
    fluent,
    translator,
    renegotiateLocale,

  } = options;

  const translate = translator.translate
    .bind(translator)
  ;

  const contextExtension: FluentContextFlavor = {
    fluent: {
      instance: fluent,
      translator,
      renegotiateLocale,
    },
    translate,
    t: translate,
  };

  Object.assign(context, contextExtension);

}
