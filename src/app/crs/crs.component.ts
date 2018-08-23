import { Component, OnInit } from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-crs',
  templateUrl: './crs.component.html',
  styleUrls: ['./crs.component.css']
})
export class CrsComponent implements OnInit {
  items = [];
  tupleItems = [];
  pos: number;
  currInd: number;
  timerIntrval: any;

  constructor(private http: HttpClient) {
    const options = { headers: new HttpHeaders({ Range: 'bytes=0-49999' }) };
    const headers = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'Authorization, Range'
      })
    };


  }

  pushData() {
    if (this.currInd < this.items.length ) {
      for (let i = this.currInd; i < Math.min((this.currInd + 3), (this.items.length)) ; i++) {
        this.tupleItems.push(
          this.items[i]
        );
      }
      this.currInd += 3;
    }
  }

  getDataFirst() {
    this.http.get<any>('https://www.json-generator.com/api/json/get/cfmxDdlNqq?indent=2').subscribe(data => {
      this.items = data;
      this.pushData();
    });
  }

  getData() {
    if (this.items.length === 0) {
      this.getDataFirst();
    } else {
      this.pushData();
    }
  }

  ngOnInit() {
    this.pos = 0;
    this.currInd = 0;
    this.getDataFirst();
    this.timerIntrval = setInterval(() => {
      this.getData();
    }, 30000);

  }

  goNext() {
    if (this.pos < (this.items.length - 1)) {
      this.pos += 1;
    }
  }
  goPrev() {
    if (this.pos > 0) {
      this.pos -= 1;
    }
  }
}
