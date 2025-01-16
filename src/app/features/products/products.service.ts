import { Injectable } from '@angular/core';
import { Subject, map, tap } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  categoryFilter$ = new Subject<string>();
  categoryFilter = this.categoryFilter$.asObservable();

  constructor(private apollo: Apollo) { }

  setCategoryFilter(category: string) {
    this.categoryFilter$.next(category);
  }

  // Get all products (including sortBy and category)
  getProducts(sortBy?: string, category?: string) {
    const categoryQuery = category ? `where: {category: {name: {_eq: "${category}"}}},` : '';
    const sortByQuery = sortBy ? `order_by: {price: ${sortBy}},` : '';

    return this.apollo
      .watchQuery({
        query: gql`
          {
            product(${categoryQuery}${sortByQuery}) {
                  EAN
                  categoryId
                  subcategoryId
                  description
                  id
                  images
                  inStock
                  name
                  price
                  category {
                    id
                    name
                  }
                  subcategory {
                    id
                    name
                  }
                }
          }
        `,
      }).valueChanges
  }

  getProductsDefault() {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            product {
                  EAN
                  categoryId
                  subcategoryId
                  description
                  id
                  images
                  inStock
                  name
                  price
                  category {
                    id
                    name
                  }
                  subcategory {
                    id
                    name
                  }
                }
          }
        `,
      }).valueChanges
  }

  // TODO: Add after valueChanges if requests are happening too quickly .pipe(debounce(() => interval(500)))
  getProductsByPrice(priceFrom: number, priceTo: number) {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            product(where: {price: {_gte: "${priceFrom}", _lte: "${priceTo}"}}) {
                  EAN
                  categoryId
                  description
                  id
                  images
                  inStock
                  name
                  price
                  subcategoryId
                  subcategory {
                    id
                    name
                  }
                  category {
                    name
                    id
                  }
                }
          }`,
      }).valueChanges
  }

  searchProducts(searchInput: string) {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            product(where: { name: { _ilike: "%${searchInput}%" } }) {
              EAN
              categoryId
              subcategoryId
              description
              id
              inStock
              images
              name
              price
              subcategory {
                name
                id
              }
              category {
                name
                id
              }
        }}
        `,
      }).valueChanges
  }

  getProductBySubcategory(category: string) {
    return this.apollo
      .watchQuery({
        query: gql`
        {
          product(where: {subCategory: {_like: "%${category}%"}}) {
          id
          category
          description
          images
          inStock
          name
          price
          productId
          subCategory
        }}
      `
      }).valueChanges
  }

  getProductById(id: number) {
    return this.apollo
      .watchQuery({
        query: gql`
        {
          product(where: { id: { _eq: ${id} } }) {
            EAN
            categoryId
            subcategoryId
            description
            id
            inStock
            images
            name
            price
            subcategory {
              name
              id
            }
            category {
              name
              id
            }
          }}`
      }).valueChanges
  }

  getProductsFromSubcategories(categories: string[]) {
    return this.apollo
      .watchQuery({
        query: gql`
        {
          product(where: { subCategory: { _in: ${categories} } }) {
          subCategory
          productId
          price
          name
          inStock
          images
          id
          description
          category
      }}`
      }).valueChanges
  }

  getProductsByCategory(category: string) {
    return this.apollo
      .watchQuery({
        query: gql`
      {
        product(where: {category: {name: {_eq: "${category}"}}}) {
          EAN
          categoryId
          subcategoryId
          description
          id
          inStock
          images
          name
          price
          subcategory {
            name
            id
          }
          category {
            name
            id
          }
        }}`
      }).valueChanges
  }

  getFilteredProducts(filter: string[]) {
    if (filter.length === 0) {
      return this.getProductsDefault();
    }
    return this.apollo
      .watchQuery({
        query: gql`
      {
        product(where: {subcategory: {name: {_in: [${filter.map(f => `"${f}"`)}]}}}) {
          EAN
          categoryId
          subcategoryId
          description
          id
          inStock
          images
          name
          price
          subcategory {
            name
            id
          }
          category {
            name
            id
          }
        }}`
      }).valueChanges
  }

  // Get categories and subcategories for filter component
  getProductCategories() {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            category {
          id
          name
          subcategories {
            name
            id
            categoryId
          }
        }}
        `,
      }).valueChanges
  }

  getSuggestedProducts() {
    return this.apollo
      .watchQuery({
        query: gql`
        {
        product(limit: 10) {
          EAN
          categoryId
          description
          id
          inStock
          images
          name
          price
          subcategory {
            name
            id
          }
          category {
            name
            id
          }}}`,
      }).valueChanges
  }
}

export const initialProds = [
{
  "EAN": 910101,
  "categoryId": 3,
  "subcategoryId": 6,
  "description": "The Franklin Sports Volleyball set is a classic outdoor game that will bring hours of fun for all ages. The set includes all you need for a day of fun: (1) volleyball pole set and net, (1) volleyball and pump and (6) ground stakes and ropes.",
  "id": 101,
  "images": [
      "assets/101-1.jpg",
      "assets/101-2.jpg",
      "assets/101-3.jpg",
  ],
  "inStock": 2,
  "name": "Franklin Outdoor Volleyball Net Sets",
  "price": 6200,
  "category": {
      "id": 3,
      "name": "Sports & Outdoors"
  },
  "subcategory": {
      "id": 6,
      "name": "Bikes"
  }
},
{
  "EAN": 910202,
  "categoryId": 4,
  "subcategoryId": 7,
  "description": `Holds 6 cans or 4 L.
Compact and portable with a carrying handle so it can be easily taken on the go.
Self-locking latch helps keep beverages or snacks secure.`,
  "id": 102,
  "images": [
      "assets/102-1.jpg",
      "assets/102-2.jpg",
      "assets/102-3.jpg",
      "assets/102-4.jpg",
  ],
  "inStock": 1,
  "name": "Frigidaire EFMIS151 Mini Portable",
  "price": 23000,
  "category": {
    "id": 4,
    "name": "Kitchen"
}
},
{
  "EAN": 910303,
  "categoryId": 4,
  "subcategoryId": 7,
  "description": `Coffee Table, Lift Top Coffee Table with Storage Drawers and Hidden Compartment, Retro Central Table with Wooden Lift Tabletop for Living Room, Espresso`,
  "id": 103,
  "images": [
      "assets/103-1.jpg",
      "assets/103-2.jpg",
      "assets/103-3.jpg",
  ],
  "inStock": 3,
  "name": "FABATO 41.7'' Lift Top Coffee Table",
  "price": 14600,
  "category": {
    "id": 4,
    "name": "Home"
},

},

]
