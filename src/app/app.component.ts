import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public posts: Post[] = [];
  
  constructor(private postService: PostService) {}
  
  ngOnInit() {
    this.getPosts();
  }

  public getPosts(): void{
    this.postService.getPosts().subscribe(
      (response: Post[]) => {
        this.posts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }





  public onAddPost(addForm: NgForm): void {
    const button = document.getElementById('add-post-form');
    if(button !=null){
      button.click();
    this.postService.addPost(addForm.value).subscribe(
      (response: Post) => {
        console.log(response);
        this.getPosts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
    }
  }

  public onUpdatePost(post: Post): void {
    this.postService.updatePost(post).subscribe(
      (response: Post) => {
        console.log(response);
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public searchPosts(key: string): void {
  //   console.log(key);
  //   const results: Post[] = [];
  //   for (const post of this.posts) {
  //     if (post.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || post.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || post.ville.toLowerCase().indexOf(key.toLowerCase()) !== -1 {
  //       results.push(post);
  //     }
  //   }
  //   this.posts = results;
  //   if (results.length === 0 || !key) {
  //     this.getPosts();
  //   }
  // }






  public onOpenModal(post: Post | null, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal'); 
    if(mode == 'add'){
      button.setAttribute('data-target', '#addPostModal');
    }
    if(mode == 'edit'){
      button.setAttribute('data-target', '#updatePostModal');
    }
    if(mode == 'delete'){
      button.setAttribute('data-target', '#deletePostModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
