import {Component, ViewChild} from '@angular/core';
import {Tour} from "../../model/tour";
import {TourServiceService} from "../../service/tour-service.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent {
  p: number = 1;
  tours: Tour[] = [];
  tour!: Tour;
  detailForm!: FormGroup;
  tourForm!: FormGroup;
  formName: string = "Create Form";


  constructor(private tourService: TourServiceService) {
    this.findAll();
    this.detailForm = new FormGroup({
      title: new FormControl,
      price: new FormControl,
      description: new FormControl
    })
    this.tourForm = new FormGroup({
      id: new FormControl,
      title: new FormControl,
      price: new FormControl,
      description: new FormControl
    })
  }

  findAll() {
    return this.tourService.findAll().subscribe((data) => {
      this.tours = data;
    });
  }

  findOne(id: number) {
    return this.tourService.findOne(id).subscribe((data) => {
      this.detailForm.patchValue(data);
    })
  }

  // @ts-ignore
  delete(id: number) {
    if (confirm("Do you really delete this?")) {
      return this.tourService.delete(id).subscribe(() => {
        this.findAll();
      });
    }
  }

  onSubmit() {
    this.tour = this.tourForm.value;
    if (this.tour.id !== null) {
      return this.tourService.edit(this.tour.id, this.tour).subscribe(() => {
        this.findAll();
        this.tourForm.reset();
        this.btnModal.nativeElement.click();
      })
    } else {
      return this.tourService.create(this.tour).subscribe(() => {
        this.findAll();
        this.tourForm.reset();
        this.btnModal.nativeElement.click();
      });
    }
  }

  editForm(id: number) {
    return this.tourService.findOne(id).subscribe((data) => {
      console.log(data)
      this.tourForm.patchValue(data);
      this.formName = "Update form"
    })
  }

  formNameCreate() {
    this.formName = "Create Form";
  }

// @ts-ignore
  @ViewChild('btnModal') btnModal: ElementRef;
}
