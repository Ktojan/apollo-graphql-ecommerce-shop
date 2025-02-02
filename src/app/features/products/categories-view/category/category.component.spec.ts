import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize input properties correctly', () => {
    component.name = 'Home';
    component.id = 1;
    fixture.detectChanges();

    expect(component.name).toEqual('Home');
    expect(component.id).toEqual(1);
  });

  it('should emit applyCategoryFilter event with the correct category name', () => {
    spyOn(component.applyCategoryFilter, 'emit');

    const testCategoryName = 'Electronics';
    component.openProductsPage(testCategoryName);

    expect(component.applyCategoryFilter.emit).toHaveBeenCalledWith(testCategoryName);
  });

  it('should return correct image based on category name', () => {
    expect(component.getCategoryImage('Home')).toEqual('category_home.jpg');
    expect(component.getCategoryImage('Electronics')).toEqual('category_electronics.webp');
    expect(component.getCategoryImage('Sports & Outdoors')).toEqual('category_outdoors.png');
    expect(component.getCategoryImage('Kitchen')).toEqual('category_kitchen.jpeg');
    expect(component.getCategoryImage('Someother')).toEqual('');
  });
});


