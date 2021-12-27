
# v0.4.0 (major release)

## Breaking change

- removed `context.fluent.translator` property

## New features

- introduced `context.fluent.useLocale()` method

- Fluent library dependency updated to the latest version,
  this introduces better locale negotiation and
  a locale fallback feature


# v0.3.0 (minor release)

- updated `@moebius/fluent` dependency to the latest version
- message attributes are now supported


# v0.2.0 (major release)

## Breaking change

- context structure has changed to minimize
  any possible name clashes

## New features

- introduced `renegotiateLocale()` helper function


# v0.1.1 (patch release)

- translation context made optional


# v0.1.0 (minor release)

- updated `@moebius/fluent` dependency to the latest version
- automatic language negotiation is now supported


# v0.0.3 (patch release)

- updated `@moebius/fluent` dependency to the latest version


# v0.0.2 (minor release)

- introduced customized locale negotiation via `LocaleNegotiator`
- added `localeNegotiator` property
- added `defaultLocale` property
- `en` locale is now used as a fallback value
- updated and extended the documentation


# v0.0.1 (initial release)

Initial release.
