import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public posts: Post[] = [];
  public editPost: Post | undefined;
  public deletePost: Post | undefined;
  
  constructor(private postService: PostService) {}
  
  ngOnInit() {
    this.getPosts();
  }

  public getPosts(): void{
    this.postService.getPosts().subscribe(
      {next: (response: Post[]) => {
        this.posts = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string, post?: Post): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPostModal');
    } else if (mode === 'delete') {
      this.deletePost = post;
      button.setAttribute('data-target', '#deletePostModal');
    } else if (mode === 'edit') {
      this.editPost = post;
      button.setAttribute('data-target', '#editPostModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddPost(addForm: NgForm): void {
    document.getElementById('add-post-form')?.click();
    this.postService.addPost(addForm.value).subscribe({
      next: (response: Post) => {
        console.log(response);
        this.getPosts();
        addForm.reset();
      },
      error : (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
  });
  }

  public onUpdatePost(post: Post): void {
    this.editPost = post;
    this.postService.updatePost(post).subscribe({
      next: (response: Post) => {
        console.log(response);
        this.getPosts();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getPosts();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public searchPosts(key: string): void {
    console.log(key);
    const results: Post[] = [];
    for (const post of this.posts) {
      if (post.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || post.ville.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(post);
      }
    }
    this.posts = results;
    if (results.length === 0 || !key) {
      this.getPosts();
    }
  }

}
