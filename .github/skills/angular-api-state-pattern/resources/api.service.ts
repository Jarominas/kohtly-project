import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ApiData {
  id: number;
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly distinctUrl = "https://api.example.com/data";

  getData(): Observable<ApiData[]> {
    return this.http.get<ApiData[]>(this.distinctUrl);
  }

  getItem(id: number): Observable<ApiData> {
    return this.http.get<ApiData>(`${this.distinctUrl}/${id}`);
  }
}
