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

    // basic
    self.firstName = ko.observable("Bert");
    self.lastName = ko.observable("Bertington");
    self.fullName = ko.computed(function() {
        return self.firstName() + " " + self.lastName();
    }, self);
    self.capitalizeLastName = function() {
        var currentVal = self.lastName();        // Read the current value
        self.lastName(currentVal.toUpperCase()); // Write back a modified value
    };

    // seats
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];

    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Bert", self.availableMeals[0])
    ]);

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

    // css
    self.items = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.currentItem = ko.observable();
    self.clickItem = function(item) { self.currentItem(item); };
}

ko.applyBindings(new ViewModel());


