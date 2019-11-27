import { AxiosRequestConfig } from "./types";

import xhr from './xhr';

export default function Axios(config: AxiosRequestConfig): void {
    // todo
    xhr(config);
}