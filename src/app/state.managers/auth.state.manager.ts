import { Subject } from 'rxjs';
import { UserModel } from '../models/user-model';
import { DnngStateManager } from '../base-state-manager/dnng.state.manager';
import * as storageKeys from '../utils/storageKeys';
import * as dateFormatter from 'date-and-time';
import { Injectable, NgZone } from '@angular/core';
import { Guid } from 'js-guid';
import { BindMethod } from '../decorators/bind-method';

interface RegisteredUserData extends UserModel {
  password: string;
}

@Injectable()
export class AuthStateManager extends DnngStateManager<UserModel> {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  private _isLogged = false;
  get isLogged(): boolean {
    return this._isLogged;
  }

  private _isLoggedChange$ = new Subject<boolean>();
  private _expireTimeoutValue: any = null;
  private _expireDate: Date | null = null;

  private _isSignInFailed$ = new Subject<boolean>();
  isSignInFailed$ = this._isSignInFailed$.asObservable();

  private _canExecuteLoggoutChange$ = new Subject<boolean>();
  private _canExecuteLogginChange$ = new Subject<boolean>();

  canExecuteLoggoutChange$ = this._canExecuteLoggoutChange$.asObservable();
  canExecuteLogginChange$ = this._canExecuteLogginChange$.asObservable();

  canExecuteLoggout: boolean | null = null;
  canExecuteLoggin: boolean | null = null;
  canExecuteRegisterUser: boolean | null = false;

  constructor(private _ngZone: NgZone) {
    super();
  }

  provideInitialState(): UserModel | null {

    this._isLoggedChange$.listen(this, (value) => {
      this.canExecuteLoggout = value;
      this.canExecuteLoggin = !value;
    });

    const loggedUser = this.getLoggedUserFromLocalStorage();

    return loggedUser;
  }

  @BindMethod loggout(): void {
    if (this.canExecuteLoggout) {
      this.writableState = null;
      this.removeLoggedUserFromLocalStorage();
      this.notifyChanges();
    }
  }

  @BindMethod loggin(): void {
    if (this.canExecuteLoggin) {
      this._isSignInFailed$.next(false);
      const registeredUsers = this.getRegisteredUsersFromLocalStorage();

      const newLoggedUser = registeredUsers.find(user => user.email === this.email);

      if (!newLoggedUser) {
        this._isSignInFailed$.next(true);
        return;
      }

      if (newLoggedUser.password !== this.password) {
        this._isSignInFailed$.next(true);
        return;
      }

      delete (newLoggedUser as any).password;

      this.setLoggedUserInLocalStorage(newLoggedUser);
      this.writableState = newLoggedUser;
      this.notifyChanges();
    }
  }

  @BindMethod registerUser(): void {
    if (this.canExecuteRegisterUser) {
      const registeredUsers = this.getRegisteredUsersFromLocalStorage();
      const registeredUser: RegisteredUserData = {
        id: Guid.newGuid().toString(),
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };
      registeredUsers.push(registeredUser);

      this.saveNewRegisteredUsersInLocalStorage(registeredUsers);

      delete (registeredUser as any).password;

      this.setLoggedUserInLocalStorage(registeredUser);
      this.writableState = registeredUser;
      this.notifyChanges();
    }
  }

  private setLoggedUserInLocalStorage(userData: UserModel): void {
    localStorage.setItem(storageKeys.loggedUserKey, JSON.stringify(userData));
    this._isLogged = true;
    this._isLoggedChange$.next(true);
    this.setExpireDateInLocalStorage();
  }

  private getLoggedUserFromLocalStorage(): UserModel | null {
    const loggedUserJson = localStorage.getItem(storageKeys.loggedUserKey);
    if (loggedUserJson) {
      this._isLogged = true;
      this._isLoggedChange$.next(true);
      this.getExpireDateFromLocalStorage();
      return JSON.parse(loggedUserJson) as UserModel;
    }
    return null;
  }

  private removeLoggedUserFromLocalStorage(): void {
    this._expireDate = null;
    this._isLogged = false;
    this._isLoggedChange$.next(false);
    clearTimeout(this._expireTimeoutValue);
    localStorage.removeItem(storageKeys.loggedUserKey);
    localStorage.removeItem(storageKeys.expireDateKey);
  }

  private setExpireDateInLocalStorage(): void {
    this._expireDate = dateFormatter.addMinutes(new Date(), 20);
    localStorage.setItem(storageKeys.expireDateKey, this._expireDate.toISOString());
    this._ngZone.runOutsideAngular(() => {
      this._expireTimeoutValue = setTimeout(this.loggout, 1200000);
    });
  }

  private getExpireDateFromLocalStorage(): void {
    const expireDateJson = localStorage.getItem(storageKeys.expireDateKey);
    if (expireDateJson) {
      this._expireDate = new Date(expireDateJson);
      this.provideTimeoutForCurrentExpireDate();
    }
  }

  private provideTimeoutForCurrentExpireDate(): void {
    if (this._expireDate) {
      const milliseconds = dateFormatter.subtract(new Date(), this._expireDate).toMilliseconds();
      this._ngZone.runOutsideAngular(() => {
        this._expireTimeoutValue = setTimeout(this.loggout, Math.abs(milliseconds));
      });
    }
  }

  private getRegisteredUsersFromLocalStorage(): RegisteredUserData[] {
    const registeredUsersJson = localStorage.getItem(storageKeys.registeredUsersKey);
    if (registeredUsersJson) {
      return JSON.parse(registeredUsersJson) as RegisteredUserData[];
    }
    localStorage.setItem(storageKeys.registeredUsersKey, JSON.stringify([]));
    return [];
  }

  private saveNewRegisteredUsersInLocalStorage(registeredUsers: RegisteredUserData[]): void {
    localStorage.setItem(storageKeys.registeredUsersKey, JSON.stringify(registeredUsers));
  }

  @BindMethod clearFields(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
