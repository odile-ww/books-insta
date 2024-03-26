import { Inject, Injectable } from '@angular/core';
import { ThemeState, ThemeContext, DarkThemeState } from './themeState';

@Injectable({
  providedIn: 'root',
})
export class ThemeService extends ThemeState {
  public state: ThemeContext<ThemeService>;

  constructor() {
    super();
    this.state = new DarkThemeState();
  }

  public override getStatus(): string {
    return this.state.getThemeState();
  }

  public toggleTheme(): void {
    return this.state.handleChangeTheme(this);
  }
}
