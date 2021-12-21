
# @moebius/grammy-fluent

---

<!-- NPM Badge -->
<a href="https://badge.fury.io/js/@moebius%2Fgrammy-fluent">
  <img src="https://badge.fury.io/js/@moebius%2Fgrammy-fluent.svg" alt="npm version" height="18">
</a>

<!-- MIT License Badge -->
<a href="https://opensource.org/licenses/MIT">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" height="20">
</a>

[Fluent][fluent-website] localization system integration
for [grammY]([grammy-website]) Telegram bot framework.


## Why Fluent?

I've studied several i18n standards and message formats and
have found that Fluent has all the required features and
at the same time provides a very user-friendly message format,
which is very important for non-dev people (i.e. translators).

It is also supported by Mozilla Foundation a well-respected
leader in world of OpenSource and the Web standards.

### Message format example

Consider the following message format example and see for yourself:

```fluent
-brand-name = Super Project

welcome =
  Welcome, {$name}, to the {-brand-name}!
  Your balance is: {
    NUMBER($value, maximumFractionDigits: 2)
  }
  You have { NUMBER($applesCount) ->
    [0] no apples
    [one] {$applesCount} apple
    *[other] {$applesCount} apples
  }
```

### Fluent features

- Variable substitution (aka placeables),

- Built-in and custom formatters that could be applied
  to the values of the rendered variables,

- Conditional substitution (selection) based on variable value,

- Powerful pluralization with built-in rules for every locale.


## Library features

- **Built on top** of [@moebius/fluent][moebius-fluent] library,
  that on itself simplifies Fluent integration,

- **Adds helper functions** to grammY bot's context to
  simplify message translation,

- Automatically uses translation locale based on the language
  selected by the user in their Telegram settings,

- Gives you **full access to `Fluent` instance**, so you can
  [configure it][moebius-fluent] yourself as you see fit,

- Uses **peer dependencies** so that you can use a wide
  combination of library versions in your project,

- **All LTS Node.js versions are supported**
  (starting from Node 12),

- **Written completely in TypeScript** from scratch in
  a very strict manner with 100% type coverage
  (and no *any*'s), ensuring that the library code is
  correct (type safe) by itself and also **provides high
  quality typing declarations** to make sure that your
  code is also correct and type safe,

- **Enables amazing type completion** for your IDE

  (even if you are not using TypeScript) thanks to the
  provided typing declarations,

- **Minimal possible dependencies**
  (all are high quality ones) updated to the latest versions,

- **Source maps** for the library is generated and provided
  to you for easier debugging.


## Install

Install the libraries:

```shell
npm install --save @moebius/grammy-fluent @moebius/fluent
```


## Usage

```typescript
import { Fluent } from '@moebius/fluent';

// Create an instance of @moebius/fluent and configure it
const fluent = new Fluent();

// Add trsnslations that you need
await fluent.addTranslation({
  locales: 'en',
  source: `
-brand-name = Super Project

welcome =
  Welcome, {$name}, to the {-brand-name}!
  Your balance is: {
    NUMBER($value, maximumFractionDigits: 2)
  }
  You have { NUMBER($applesCount) ->
    [0] no apples
    [one] {$applesCount} apple
    *[other] {$applesCount} apples
  }
  `,

  // All the aspects of Fluent are highly configurable
  bundleOptions: {
    // Use this option to avoid invisible characters
    // around placeables
    useIsolating: false,
  },
});

// Add fluent middleware to the bot
bot.use(useFluent({
  fluent,
}));

bot.command('i18n_test', async context => {

  // Call the "translate" or "t" helper to render the
  // message by specifying it's ID and
  // additional parameters:
  await context.reply(context.t('welcome', {
    name: context.from.first_name,
    value: 123.456,
    applesCount: 1,
  }));

  // The locale to use will be detected automatically

});
```


## API

### useFluent

```typescript
function useFluent(options: GrammyFluentOptions): Middleware;
```

Call this function to add Fluent middleware to your bot, e.g:

```typescript
bot.use(useFluent({
  fluent,
}));
```

The following options are supported:

| Name   | Type   | Description                                   |
| ------ | ------ |-----------------------------------------------|
| fluent | Fluent | A pre-configured instance of [Fluent][moebius-fluent] to use. |

> Please, see [@moebius/fluent documentation]([moebius-fluent])
  for all the Fluent configuration instructions.

### Context helpers

The following helpers are added to the bot's context by the
middleware:

| Name           | Type                                                         | Description                                                        |
| -------------- | ------------------------------------------------------------ |--------------------------------------------------------------------|
| fluent         | Fluent                                                       | An instance of [Fluent][moebius-fluent].                           |
| translator     | Translator                                                   | An instance of [Translator][moebius-fluent].                                       |
| translate \| t | (**messageId**: string, **context**: TranslationContext) => string | Translation function bound to the automatically detected user locale. Shorthand alias "t" is also available. |


## License (MIT)

Copyright © 2021 Slava Fomin II

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[grammy-website]: https://grammy.dev/
[fluent-website]: https://projectfluent.org/
[moebius-fluent]: https://github.com/the-moebius/fluent
