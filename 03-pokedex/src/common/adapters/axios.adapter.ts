import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable} from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            console.log(error);
            throw new Error('Error');
        }
    }

    async post(url: string, data: any) {

        return;
    }

    async put(url: string, data: any) {

        return;
    }
    
    async patch(url: string, data: any) {

        return;
    }

    async delete(url: string) {

        return;
    }

}