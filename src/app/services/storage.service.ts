import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private cookieName = 'user-info';

    // Lưu thông tin người dùng vào cookie
    setUserInfo(userInfo: any) {
        this.setCookie(this.cookieName, JSON.stringify(userInfo), 365);
    }

    // Lấy thông tin người dùng từ cookie
    getUserInfo(): any {
        const cookieValue = this.getCookie(this.cookieName);
        return cookieValue ? JSON.parse(cookieValue) : null;
    }

    // Tạo và ghi một cookie
    private setCookie(name: string, value: any, days: number) {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/;`;
    }

    // Đọc một cookie
    private getCookie(name: string): string | null {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [key, value] = cookie.trim().split('=');
            if (key === name) {
                return value;
            }
        }
        return null;
    }
}