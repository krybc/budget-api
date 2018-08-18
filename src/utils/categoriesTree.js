export default class CategoriesTree {
  constructor(categories) {
    this.categories = categories;
  }

  render() {
    let rootCategories = this.getRootCategories();
    let tree = [];

    rootCategories.forEach(item => {
      tree.push(this.renderChildrens(item, []));
    });

    return tree;
  }

  getRootCategories() {
    return this.categories.filter(category => {
      return category.parent === null;
    });
  }

  renderChildrens(category, categories = []) {
    category = category.toJSON();

    category.childrens = this.categories.filter(item => {
      if (item.parent !== null) {
        return item.parent.equals(category._id);
      }
    });

    return category;
  }
};