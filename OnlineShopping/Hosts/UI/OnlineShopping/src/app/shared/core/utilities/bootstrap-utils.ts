import {
  APP_BOOTSTRAP_LISTENER,
  Type
} from '@angular/core';
import { EffectSources } from '@ngrx/effects';


/**
 * See https://github.com/ngrx/platform/issues/931
 * This utility class is based on the workaround suggested by Brandon Roberts here https://github.com/brandonroberts/effects-issue-example
 * We had to refactor it and use the effects type as injection token for the effects injection to avoid their shadowing when
 * EffectsBootstrapProvider.provide is called multiple times.
 */
export abstract class EffectsBootstrapProvider {

  static provide(effects: Type<any>[]) {
    return [
      effects,
      {
        provide: APP_BOOTSTRAP_LISTENER,
        multi: true,
        useFactory: (sources: EffectSources, ...spreadEffects: Type<any>[]) => () => spreadEffects.forEach(effect => sources.addEffects(effect)),
        deps: [ EffectSources, ...effects ]
      }
    ];
  }

}
