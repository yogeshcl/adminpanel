import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ManagetrendService } from './../../@core/utils/managetrend.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { hashtagmain } from './../../@core/data/trenddatainterface';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent implements OnInit {
  searchKeyword:string;
  errorMessage;
  //   todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];
  api ;
  done : Array<hashtagmain> = [] ;
  todo : Array<hashtagmain> = [] ;
  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];
  constructor(private dataservice: ManagetrendService,private _snackBar: MatSnackBar,private router: Router) { }

  ngOnInit() {
    this.dataservice.getTrendingHastags()
    .subscribe({
      next: data => {
          this.api = data;
          console.log(this.api);
          for (let val of this.api){
              this.todo.push(val)
          }

      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  })  
    
    // this.dataservice.getHashtags()
    //     .subscribe({
    //       next: data => {
    //           this.api = data.hashtags;
    //           console.log(this.api);
    //           for (let val of this.api){
    //               this.done.push(val)
    //           }

    //       },
    //       error: error => {
    //           this.errorMessage = error.message;
    //           console.error('There was an error!', error);
    //       }
    //   })
    
  }
 
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    console.log(this.done)
    console.log(this.api)
    }
    
  }
  deleteItem(value){
    var i =0;
    for (let val of this.todo){
      if(val.hashtag == value){
        this.todo.splice(i, 1);
        break;
      }
      i += 1
    }
    
    console.log(this.todo)
  }

  getList(value){
      this.searchKeyword = value;
      console.log(value)
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  updateTrend(){
    var data :Array<string> = [];
    for (let val of this.todo){
      data.push(val["_id"])
  }
    this.dataservice.updateTrendingHastags(data)
    .subscribe({
      next: data => {
          this.openSnackBar("trends updated","okay");
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  })  

  }
search(value){
  this.dataservice.searchHashtag(value)
  .subscribe({
    next: data => {
            this.done = []
              for (let val of data){
                  this.done.push(val)
              }
              // console.log(this.done);
              this.openSnackBar("search successfull","okay");
  },
  error: error => {
      this.errorMessage = error.message;
      console.error('There was an error!', error);
  }
  })
}

logout(){
  this.dataservice.logout();
  this.openSnackBar("logout successful","cool");
  this.router.navigate(['./signin']);
}

}