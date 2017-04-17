'use strict';

module.exports = function() {
  const app = this;

  // Initialize Default Admin User
  const userService = app.service('user');
  userService.find()
    .then(function(response) {
      if(response.data.length === 0) {
        userService.create({
          firstName: 'Admin',
          username: 'admin',
          email: 'admin@example.com',
          password: 'admin',
          role: 'admin'
        })
          .then(function(){
            console.info('Default Admin User Created...'); // eslint-disable-line no-console
          });
      }
    });

  // Initialize Ticket Categories
  const categoryService = app.service('categories');
  categoryService.find()
    .then(function(response) {
      if(response.data.length === 0) {
        categoryService.create([
          { type: 'Hardware' }, { type: 'Software' }, { type: 'Internet'}, { type: 'Network' }, { type: 'Printer' }, { type: 'Other'}
        ])
        .then(function(){
          console.info('Default Categories Created...'); // eslint-disable-line no-console
        });
      }
    });
};
