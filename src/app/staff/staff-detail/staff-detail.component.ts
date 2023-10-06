import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api/api.service";
import { StaffMember } from "../../api/models/staff-member.model";
import { FormControl, FormGroup } from "@angular/forms";
import { query } from "@angular/animations";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
  staffMember: StaffMember[] = [];
  public StaffStorage: StaffMember[] = [];

  staffMemberForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    position: new FormControl(''),
    birth: new FormControl('')
  });

  constructor(public apiService: ApiService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', id);
    if (id !== null && id !== undefined) {
      const parsedId = Number.parseInt(id);
      console.log('Parsed ID:', parsedId);

      const staffMember = this.apiService.getUserById(parsedId)

      if (staffMember != null || staffMember != undefined) {
        console.log(staffMember.name)
        this.staffMemberForm.setValue({
          name: staffMember.name || '',
          position: staffMember.position || '',
          birth: staffMember.birth || ''
        });
      }

    }
  }

  protected readonly query = query;
}
