export class AppLocalStorage {
  static setItem(name: string, value: object|string): void {
    localStorage.setItem(name, JSON.stringify(value));
  }

  static getItem(name: string): object|string|false {
    let stored = localStorage.getItem(name);
    let value;
    try {
      value = JSON.parse(stored);
    } catch (error) {
      return false;
    }

    return value;
  }

  static removeItem(name: string): void {
    localStorage.removeItem(name); 
  }
}
