import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import{Post} from './post';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiServiceUrl = 'http://localhost:7070';
  constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]>{
    return this.http.get<any>(`${this.apiServiceUrl}/post/all`);
  }
  public addPost(post: Post): Observable<Post>{
    return this.http.post<any>(`${this.apiServiceUrl}/post/add`, post);
  }
  public updatePost(post: Post): Observable<Post>{
    return this.http.put<any>(`${this.apiServiceUrl}/post/update`, post);
  }
  public deletePost(postId: number): Observable<void >{
    return this.http.delete<void>(`${this.apiServiceUrl}/post/delete/${postId}`);
  }
}
