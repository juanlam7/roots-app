import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss']
})
export class ListJobsComponent implements OnInit {

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    this.jobsData();
  }

  jobsData() {
    this.jobsService.getJobs().subscribe((data) => {
      console.log(data)
    })
  }
}
