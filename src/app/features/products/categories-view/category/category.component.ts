import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() name!: string;
  @Input() id!: number;

  @Output() applyCategoryFilter = new EventEmitter();

  categoryImage = 'https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923__480.jpg';

  ngOnInit(): void { }

  openProductsPage(categoryName: string) {
    this.applyCategoryFilter.emit(categoryName);
  }

  getCategoryImage(name: string): string {
    switch (name) {
      case 'Home': return 'category_home.jpg';
      case 'Electronics': return 'category_electronics.webp';
      case 'Sports & Outdoors': return 'category_outdoors.png';
      case 'Kitchen': return 'category_kitchen.jpeg';
      default: return '';
    }
  }
}
