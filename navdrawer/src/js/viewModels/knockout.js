/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
 function(oj, ko, $) {

     // Class to represent a row in the seat reservations grid
     function SeatReservation(name, initialMeal) {
         var self = this;
         self.name = name;
         self.meal = ko.observable(initialMeal);

         self.formattedPrice = ko.computed(function() {
             var price = self.meal().price;
             return price ? "$" + price.toFixed(2) : "None";
         });
     }


     function ViewModel() {
        var self = this;

        self.firstName = ko.observable("Bert");
        self.lastName = ko.observable("Bertington");
        self.fullName = ko.computed(function() {
            return self.firstName() + " " + self.lastName();
        }, self);
        self.capitalizeLastName = function() {
            var currentVal = self.lastName();        // Read the current value
            self.lastName(currentVal.toUpperCase()); // Write back a modified value
        };


        // list and collections
         // Non-editable catalog data - would come from the server
         self.availableMeals = [
             { mealName: "Standard (sandwich)", price: 0 },
             { mealName: "Premium (lobster)", price: 34.95 },
             { mealName: "Ultimate (whole zebra)", price: 290 }
         ];

         // Editable data
         self.seats = ko.observableArray([
             new SeatReservation("Steve", self.availableMeals[0]),
             new SeatReservation("Bert", self.availableMeals[0])
         ]);

         // Operations
         self.addSeat = function() {
             self.seats.push(new SeatReservation("", self.availableMeals[0]));
         }
         self.removeSeat = function(seat) { self.seats.remove(seat) }
         self.totalSurcharge = ko.computed(function() {
             var total = 0;
             for (var i = 0; i < self.seats().length; i++)
                 total += self.seats()[i].meal().price;
             return total;
         });

         //single page app
         self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];

         self.chosenFolderId = ko.observable();

         // Behaviours
         self.goToFolder = function(folder) { self.chosenFolderId(folder); };


     }

     return new ViewModel();
  }
);
