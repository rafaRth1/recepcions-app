import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface BusinessError extends Error {
	code: string;
	isBusinessError: true;
	data?: unknown;
}

export interface NetworkError {
	code: string;
	message: string;
	status: number;
}

class HttpClient {
	private static instances: Map<string, HttpClient> = new Map();
	private axiosInstance: AxiosInstance;
	private token: string | null = null;

	private constructor(baseURL: string) {
		this.axiosInstance = axios.create({
			baseURL,
			// timeout: 30000,
		});

		this.setupInterceptors();
	}

	public static getInstance(baseURL: string, name: string = 'default'): HttpClient {
		if (!HttpClient.instances.has(name)) {
			HttpClient.instances.set(name, new HttpClient(baseURL));
		}
		return HttpClient.instances.get(name)!;
	}

	private setupInterceptors(): void {
		this.axiosInstance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				if (this.token) {
					if (!config.headers) {
						config.headers = new AxiosHeaders();
					}

					if (config.headers instanceof AxiosHeaders) {
						config.headers.set('Authorization', `Bearer ${this.token}`);
					} else {
						(config.headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
					}
				}

				return config;
			},
			(error: unknown) => {
				return Promise.reject(error);
			}
		);
	}

	public setToken(token: string | null): void {
		this.token = token;
	}

	public clearToken(): void {
		this.token = null;
	}

	public getToken(): string | null {
		return this.token;
	}

	public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.get<T>(url, config);
	}

	public post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.post<T>(url, data, config);
	}

	public put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.put<T>(url, data, config);
	}

	public patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.patch<T>(url, data, config);
	}

	public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.delete<T>(url, config);
	}
}

/**
 * Cliente HTTP para API principal
 *
 */
export const clientAxios = HttpClient.getInstance(import.meta.env.VITE_BACKEND_URL, 'main');
