import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenFound = localStorage.getItem('userToken');
  const router = inject(Router);
  if (tokenFound) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
