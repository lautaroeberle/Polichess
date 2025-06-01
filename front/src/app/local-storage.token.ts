import { InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const LOCAL_STORAGE = new InjectionToken<Storage | null>('localStorage', {
  providedIn: 'root',
  factory: () => {
    return isPlatformBrowser(inject(PLATFORM_ID)) ? localStorage : null;
  }
});
